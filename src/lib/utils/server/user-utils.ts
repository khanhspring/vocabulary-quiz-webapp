import { getAccessToken } from '@/lib/utils/server/rest-client';
import { User } from '@/types/common';

export async function getCurrentUser() {
  try {
    const accessToken = await getAccessToken();
    const userInfoResponse = await fetch(`${process.env.USER_INFO_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userInfoResponse.ok || userInfoResponse.redirected) {
      return undefined;
    }

    const userRes = await userInfoResponse?.json();
    return userRes as User;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
