import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const setAccessToken = (token: string) => {
  spotifyApi.setAccessToken(token);
};

export const getSpotifyApi = () => spotifyApi;
