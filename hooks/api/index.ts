import { SupaflixApi } from "./api";
import { fetcher } from "./fetcher";
export { SupaflixApi } from './api';
export { useSupaflixApi } from './use_supaflix_api'
export type { Response } from './h'

export const supaflixApi = new SupaflixApi({
  fetcher,
  version: '1',
  apiBase: (process.env.NEXT_PUBLIC_API || 'http://localhost:8080/') + "api/",
  session_id: null
});
