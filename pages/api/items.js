import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://didkyjgwsjjjadhqgwqr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODA5MDExMiwiZXhwIjoxOTQzNjY2MTEyfQ.vEmHvo261gfH1tZAJyWn78LroArUuyematUmCOzuUTI"
)

function preloadPublicUrl(id) {
  const { publicURL } = supabase
    .storage
    .from('media')
    .getPublicUrl(`items/${id}/preload.png`)
  return publicURL
}

function mediaPublicUrl(id) {
  const { publicURL } = supabase
    .storage
    .from('media')
    .getPublicUrl(`items/${id}/playlist.m3u8`)
  return publicURL
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
      console.log(req.body)
      break;
  }

  res.json(JSON.stringify(response))
}