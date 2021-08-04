import { Dict, Errors, Response } from "./h";

const fetchParams: RequestInit = {
  // mode: 'no-cors',
  cache: 'no-cache',
  redirect: 'follow',
};

type Methods = 'get' | 'post' | 'delete'
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


async function fetchWithNetworkCheck<T>(url: string, method: Methods = 'get', body?: Dict) {
  if (method === 'post') {
    addHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  } else {
    removeHeader('content-type');
  }
  let lastError;
  const params = Object.assign({}, fetchParams, { method, body: body ? toString(body) : null });
  for (let i = 0; i < 10; i++) {
    try {
      return await fetch(url, params);
    } catch (e) {
      console.error(e)
      lastError = e;
      await wait(2000);
    }
  }
  throw new Error(Errors.NETWORK_ERROR);
}

async function fetchWithJsonCheck<T>(url: string, method: Methods = 'get', body?: Dict): Promise<Response<T>> {
  let lastError;
  for (let i = 0; i < 10; i++) {
    const result = await fetchWithNetworkCheck(url, method, body);
    try {
      if (typeof result === 'string') {
        return result;
      } else {
        return await result.json();
      }
    } catch (e) {
      lastError = e;
      await wait(2000);
    }
  }
  throw new Error(Errors.SERVICE_IS_NOT_AVAILABLE);
}

async function query<T>(url: string, method: Methods = 'get', body?: Dict): Promise<Response<T>> {
  if (!url) {
    throw new Error('Url must be specified');
  }
  return await fetchWithJsonCheck(url, method, body);
}

export function get<T>(url: string) {
  return query<T>(url, 'get');
}

export function addHeader(k: string, v: string) {
  if (fetchParams.headers) {
    (fetchParams.headers as Record<string, string>)[ k ] = v
  } else {
    fetchParams.headers = { [ k ]: v }
  }
}

export function removeHeader(k: string) {
  if (fetchParams.headers) {
    delete (fetchParams.headers as Record<string, string>)[ k ];
  }
}

export function post<T>(url: string, params: Dict = {}) {
  return query<T>(url, 'post', params);
}

export function del<T>(url: string) {
  return query<T>(url, 'delete');
}


const replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+',
  '%00': '\x00',
};

function encode(str: string): string {
  // @ts-ignore
  return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, (match) => replace[ match ]);
}


function toString(dict: Dict) {
  const query: string[] = [];
  for (let key in dict) {
    if (dict.hasOwnProperty(key)) {
      query.push(encode(key) + '=' + encode(dict[ key ]));
    }
  }
  return query.join('&');
}

export const fetcher = {
  get,
  post,
  del,
  addHeader,
  removeHeader
}
