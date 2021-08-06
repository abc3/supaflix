# Supaflex, video gallery hosted on Supabase

### The project uses Supabase storage as CDN for HLS streaming

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:8080](http://localhost:3000) with your browser to see the result.

### Upload new video
```json
$ curl -H "Content-Type: application/json" \
-X POST http://localhost:8080/api/items -d \
'{
  "title": "Test title",
  "description": "test description",
  "source_path": "https://didkyjgwsjjjadhqgwqr.supabase.in/storage/v1/object/public/media/sources/test_video.mp4"
}'
```
