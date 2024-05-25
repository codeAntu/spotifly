import SpotifyWebApi from "spotify-web-api-js";
import { useStore } from "../store/store";

// const accessToken = import.meta.env.VITE_CLIENT_ID as string;
// const accessToken = useStore((state) => state.accessToken);

const spotifyApi = new SpotifyWebApi();

async function getAlbums(accessToken: string, searchTracks: string) {
  spotifyApi.setAccessToken(accessToken);
  const data = await spotifyApi.searchTracks(searchTracks);
  console.log(data);
  const newData = data.tracks.items.map((item) => {
    return {
      artists: item.artists.map((artist) => artist.name).join(", "), 
      title: item.name,
      uri: item.uri,
      albumUri: item.album.uri,
      img: item.album.images[0].url,
      duration: item.duration_ms,
      // @ts-ignore
      release_date: item.album.release_date,
    };
  });

  return [newData, data.tracks.next];
}

async function connect(accessToken: string) {
  spotifyApi.setAccessToken(accessToken);
  const data = await spotifyApi.getMe();
  console.log(data);
  return data;
}

export { getAlbums, connect };
