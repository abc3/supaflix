# Supaflex, video gallery hosted on Supabase

### The project uses Supabase storage as CDN for HLS streaming
<img width="986" alt="Screenshot 2021-08-06 at 18 03 55" src="https://user-images.githubusercontent.com/1172600/128539224-c733972e-9c28-424f-9b4e-f50f04b694fb.png">

### Quick start

#### Install dependencies

```bash
yarn install
```

#### Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:8080](http://localhost:3000) with your browser to see the result.

### Upload new video

The source video file will be transcoded to adaptive HLS and uploaded to the Supabase storage.

```json
$ curl -H "Content-Type: application/json" \
-X POST http://localhost:8080/api/items -d \
'{
  "title": "Test title",
  "description": "test description",
  "source_path": "https://didkyjgwsjjjadhqgwqr.supabase.in/storage/v1/object/public/media/sources/test_video.mp4"
}'
```

### Requirements
* FFmpeg
