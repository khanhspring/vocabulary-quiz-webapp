import { cookies } from 'next/headers';

type Options = {
  auth?: boolean;
};

export async function getAccessToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');
  return token?.value;
}

async function get(
  path: string,
  params?: Record<string, string>,
  options: Options = { auth: true },
) {
  let query = '';
  if (params) {
    query = new URLSearchParams(params).toString();
  }
  const url = `${process.env.API_URL}${path}?${query}`;
  const token = await getAccessToken();
  return fetch(url, {
    method: 'GET',
    credentials: options.auth ? 'include' : undefined,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

async function post(
  path: string,
  body: never,
  options: Options = { auth: true },
) {
  const url = `${process.env.API_URL}${path}`;
  const token = await getAccessToken();
  return fetch(url, {
    method: 'POST',
    credentials: options.auth ? 'include' : undefined,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}

export const restClient = {
  get,
  post,
};
