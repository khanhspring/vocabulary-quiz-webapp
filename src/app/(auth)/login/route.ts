import { NextResponse } from 'next/server';

export async function GET() {
  const url = `${process.env.AUTH_URL}?response_type=code&client_id=${process.env.AUTH_CLIENT_ID}&scope=${process.env.AUTH_SCOPE}&redirect_uri=${process.env.AUTH_REDIRECT_URI}&continue`;
  return NextResponse.redirect(new URL(url));
}
