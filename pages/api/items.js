export default async (req, res) => {
  let response = {}
  switch (req.method) {
    case 'GET':
      response = [{
        id: 123,
        title: 'big buck bunny',
        preload: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
        duration: 120
      }]
      break;
    case 'POST':
      console.log(req.body)
      break;
  }

  res.json(JSON.stringify(response))
}