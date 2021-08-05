export interface ApiRequest {
  session_id: string,
}

export type Dict = { [key: string]: string };

export enum Errors {
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVICE_IS_NOT_AVAILABLE = 'SERVICE_IS_NOT_AVAILABLE',
  USER_MUST_BE_LOGGED_IN = 'USER_MUST_BE_LOGGED_IN',
  API_NO_ERRORS = 'API_NO_ERRORS',
  API_USER_EXISTS = 'API_USER_EXISTS',
  API_WRONG_CREDENTIALS = 'API_WRONG_CREDENTIALS',
  API_NO_USER = 'API_NO_USER',
  API_UNHANDLED = 'API_UNHANDLED',
}

export interface ErrorData {
  code: number,
  message: string
}

export type Response<T> =
  | { isError: true, status: ErrorData }
  | { isError: false, value: T }

export type ResponseDirty<T> = T | { isError: boolean, status?: ErrorData, value?: T }

export interface Fetcher {
  get: <T>(url: string) => Promise<Response<T>>
  post: <T>(url: string, params: Dict) => Promise<Response<T>>
  del: <T>(url: string) => Promise<Response<T>>
  addHeader: (k: string, v: string) => void
  removeHeader: (k: string) => void
}

export interface ItemsResponse {
  items: Item[]
}

export interface Item {
  created: string,
  description: string,
  duration: number,
  id: number,
  preload: string,
  title: string
}
