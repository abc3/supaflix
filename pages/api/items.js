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

export default async (req, res) => {
  let response = {}
  switch (req.method) {
    case 'GET':
      const { data } = await supabase.from('items').select()
      response = {
        items: data.map(el => {
          el.preload = preloadPublicUrl(el.id)
          return el
        })
      }
      break;
    case 'POST':
      console.log(req.body)
      break;
  }

  res.json(JSON.stringify(response))
}