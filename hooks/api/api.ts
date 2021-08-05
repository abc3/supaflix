import {
  Errors,
  Fetcher,
  ItemsResponse
} from "./h";
import { getItem } from "../../lib/cookie";


export interface SupaflixApiParams {
  session_id: string | null,
  version: string,
  fetcher: Fetcher,
  apiBase: string
}

export class SupaflixApi {
  private readonly f: Fetcher;
  private session_id: string | null;
  private readonly version: string;
  private readonly apiBase: string;

  constructor(p: SupaflixApiParams) {
    this.f = p.fetcher;
    this.session_id = p.session_id;
    this.version = p.version;
    this.apiBase = p.apiBase;
  }

  updateSessionId(session_id: string | null) {
    this.session_id = session_id;
  }

  setSessionId() {
    if (!this.session_id) {
      if (typeof localStorage !== 'undefined') {
        this.session_id = localStorage.getItem('session_id') || null;
      } else {
        this.session_id = getItem('session_id');
      }
    }

    if (this.session_id) {
      this.f.addHeader('client-session', this.session_id);
    } else {
      // this.f.addHeader('client-session', 'none');
      throw new Error(Errors.USER_MUST_BE_LOGGED_IN)
    }
  }

  getItems() {
    return this.f.get<ItemsResponse>(`${this.apiBase}items`);
  }

}
