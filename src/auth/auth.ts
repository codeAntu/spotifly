import axios from "axios";
import queryString from "query-string";
import { Buffer } from "buffer";

const clientId = import.meta.env.VITE_CLIENT_ID as string;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET as string;
const redirectUri = import.meta.env.VITE_REDIRECT_URI as string;

const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
);
const code = queryString.parse(window.location.search).code as string;

async function getAccessToken(code: string) {
  const response = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedCredentials}`,
    },
    data: queryString.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });
  return response.data;
}

async function getRefreshToken(refreshToken: string) {
  const response = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedCredentials}`,
    },
    data: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  return response.data;
}

export { getAccessToken, getRefreshToken };
