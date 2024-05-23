import SpotifyWebApi from "spotify-web-api-js";
import ls from "../ls/ls";
import { useStore } from "../store/store";
import { getAlbums , connect } from "../spotify/spotifyApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "http";
import TrackObjectFull from "spotify-web-api-js";
import { readSync } from "fs";

// type Album = {
//   album_type: string;
//   artists: {
//     external_urls: {
//       spotify: string;
//     };
//     href: string;
//     id: string;
//     name: string;
//     type: string;
//     uri: string;
//   }[];
//   available_markets: string[];
//   external_urls: {
//     spotify: string;
//   };
//   href: string;
//   id: string;
//   images: {
//     height: number;
//     url: string;
//     width: number;
//   }[];
//   name: string;
//   release_date: string;
//   release_date_precision: string;
//   total_tracks: number;
//   type: string;
//   uri: string;
// };

export default function Home() {
  const accessToken = useStore((state) => state.accessToken);
  const expired_at = useStore((state) => state.expired_at);

  const navigate = useNavigate();
  // const [songs, setSongs] = useState([]);

  const [songs, setSongs] = useState<any>([]);

  useEffect(() => {
    if (!accessToken || expired_at.getTime() < Date.now()) {
      console.log("No access token or expired token");
      navigate("/");
    }
    // connect(accessToken);
  }, []);

  // console.log(accessToken, expired_at);

  async function getSongs() {
    const data = await getAlbums(accessToken);
    setSongs(data);
  }

  // async function getSongs() {
  //   try {
  //     const data = await getAlbums(accessToken);
  //     setSongs(data);
  //   } catch (error) {
  //     console.error("Error getting songs:", error);
  //   }
  // }

  console.log(songs, "songs");

  console.log(accessToken);
  console.log(expired_at);

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          ls.clear();
          console.log("clicked");
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          getSongs();
        }}
      >
        Get Albums
      </button>
      <div>
        {songs.map((song: any) => {
          return (
            <div>
              {song.title}
              <img src={song.img  } alt="" />
            </div>
          )
        })}
      </div>
    </div>
  );
}

function Song(song: any) {
  return (
    <div>
      <img src="" alt="" />
    </div>
  );
}
