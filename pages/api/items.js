import { createClient } from '@supabase/supabase-js'
import path from 'path'
import fs from 'fs'
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const supabase = createClient(
  "https://didkyjgwsjjjadhqgwqr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODA5MDExMiwiZXhwIjoxOTQzNjY2MTEyfQ.vEmHvo261gfH1tZAJyWn78LroArUuyematUmCOzuUTI"
)

const preloadPublicUrl = id => {
  const { publicURL } = supabase
    .storage
    .from('media')
    .getPublicUrl(`items/${id}/preload.png`)
  return publicURL
}

const mediaPublicUrl = id => {
  const { publicURL } = supabase
    .storage
    .from('media')
    .getPublicUrl(`items/${id}/playlist.m3u8`)
  return publicURL
}

const getAllFiles = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);

const preload = async (source, tmpDir) => {
  const cmd = `ffmpeg -i ${source} -ss 00:00:05 -frames:v 1 ${tmpDir}/preload.png`
  return exec(cmd);
}

const transcode = async (source, output) => {
  const cmd = `
    ffmpeg -i ${source} \
    -filter_complex \
    "[0:v]split=2[v1][v2];\
    [v1]copy[v1out];\
    [v2]scale=w=1280:h=720[v2out]" \
    -map [v1out] -c:v:0 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 2M -maxrate:v:0 2M -minrate:v:0 2M -bufsize:v:0 5M -preset slow -g 24 -sc_threshold 0 -keyint_min 24 \
    -map [v2out] -c:v:1 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 1M -maxrate:v:0 1M -minrate:v:0 1M -bufsize:v:0 2M -preset slow -g 24 -sc_threshold 0 -keyint_min 24 \
    -map a:0 -c:a:0 aac -b:a:0 96k -ac 2 \
    -map a:0 -c:a:1 aac -b:a:1 96k -ac 2 \
    -f hls \
    -hls_time 4 \
    -hls_playlist_type vod \
    -hls_segment_type mpegts \
    -hls_segment_filename ${output}/q_%v/chunk_%d.ts \
    -master_pl_name playlist.m3u8 \
    -var_stream_map "v:0,a:0 v:1,a:1" ${output}/q_%v/playlist.m3u8
  `
  return exec(cmd);
}

const uploadDir = (dir, id) => {
  let tmpDir = dir.split('/').slice(-2).join('/')
  getAllFiles(dir).forEach(filePath => {
    let fileOut = filePath.replace(tmpDir, "")
    const { data, error } = supabase
      .storage
      .from('media')
      .upload(`items/${id}${fileOut}`, fs.readFileSync(filePath, null), {
        cacheControl: 3600,
        upsert: false
      })
    });
}

export default async (req, res) => {
  let response = {}
  switch (req.method) {
    case 'GET':
      if (req.query?.id) {
        const { data } = await supabase.from('items')
          .select()
          .eq('id', req.query.id)
        if (data.length == 1) {
          const id = req.query?.id
          data[0].preload   = preloadPublicUrl(id)
          data[0].media_url = mediaPublicUrl(id)
          response = {
            item: data[0]
          }
        } else {
          response = { isError: true }
        }
      } else {
        const { data } = await supabase.from('items').select()
        response = {
          items: data.map(el => {
            el.preload = preloadPublicUrl(el.id)
            return el
          })
        }
      }
      break;
    case 'POST':
      const { data, error } = await supabase
        .from('items')
        .insert([
          { title: req.body.title, description: req.body.description }
      ])
      let id = data[0].id
      let tmpDir = `./tmp/${id}`
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }
      await preload(req.body.source_path, tmpDir)
      transcode(req.body.source_path, tmpDir).then(res => {
        uploadDir(tmpDir, id)
        fs.rmdirSync(tmpDir, { recursive: true });
      })
      response = { message: "video added to a transcoding queue" }
      break;
  }

  res.json(JSON.stringify(response))
}