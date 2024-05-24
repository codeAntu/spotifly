import SpotifyWebApi from "spotify-web-api-js";
import { useStore } from "../store/store";

// const accessToken = import.meta.env.VITE_CLIENT_ID as string;
// const accessToken = useStore((state) => state.accessToken);

const spotifyApi = new SpotifyWebApi();

async function getAlbums(accessToken: string) {
  spotifyApi.setAccessToken(accessToken);
  const data = await spotifyApi.searchTracks("Love");
   
  const newData = data.tracks.items.map((item) => {
    return {
      artist: item.artists[0].name,
      title: item.name,
      uri: item.uri,
      albumUri: item.album.uri,
      img: item.album.images[0].url,
    };
  });
  

  return newData;
}

async function connect(accessToken : string) {
  spotifyApi.setAccessToken(accessToken);
  const data = await spotifyApi.getMe();
  console.log(data);
  return data;
}


export { getAlbums , connect};
