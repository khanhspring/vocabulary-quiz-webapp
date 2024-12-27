import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.redirect('/login');
  }
  const response = await fetch(`${process.env.AUTH_TOKEN_URL}`, {
    method: 'POST',
    headers: {
      Authorization: `${process.env.AUTH_AUTHORIZATION}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.AUTH_REDIRECT_URI}`,
      code: `${code}`,
    }),
  });

  if (!response.ok) {
    return NextResponse.redirect('/login');
  }
  const json = await response.json();

  const redirectResponse = NextResponse.redirect(
    new URL('/', `${process.env.APP_URL}`),
    { status: 302 },
  );
  redirectResponse.cookies.set('access_token', json.access_token, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
  });

  redirectResponse.headers.append(
    'Set-Cookie',
    `access_token=${json.access_token}`,
  );

  return redirectResponse;
}
