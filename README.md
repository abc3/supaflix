# Supaflex, video gallery hosted on Supabase

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:8080](http://localhost:3000) with your browser to see the result.


## FFmpeg cmd

```
ffmpeg -i https://didkyjgwsjjjadhqgwqr.supabase.in/storage/v1/object/public/media/sources/test_video.mp4 \
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
-hls_segment_filename q_%v/chunk_%d.ts \
-master_pl_name playlist.m3u8 \
-var_stream_map "v:0,a:0 v:1,a:1" q_%v/playlist.m3u8
```