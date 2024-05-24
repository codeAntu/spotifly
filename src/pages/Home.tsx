import { useStore } from "../store/store";
import { getAlbums, connect } from "../spotify/spotifyApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface Song {
  albumUri: string;
  artist: string;
  img: string;
  title: string;
  uri: string;
}

export default function Home() {
  const accessToken = useStore((state) => state.accessToken);
  const expired_at = useStore((state) => state.expired_at);
  const navigate = useNavigate();
  const [songs, setSongs] = useState<any>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (!accessToken || expired_at.getTime() < Date.now()) {
      console.log("No access token or expired token");
      navigate("/");
    }
  }, []);

  // useEffect(() => {
  //  connect(accessToken);
  // }, []);

  async function getSongs() {
    const data = await getAlbums(accessToken);
    setSongs(data);
  }

  // console.log(songs, "songs");

  return (
    <div className="w-full  h-[100dvh] flex items-center flex-col">
      <div className="w-full border-2 border-black  max-w-[1000px] p-5 grid gap-5">
        <div className="flex flex-col gap-3 ">
          <div className="text-2xl font-bold">Heading</div>
          <div className="border-2 border-black rounded-xl flex justify-normal items-center px-2 py-2 gap-3 ">
            <Search size={24} className="text-black" />
            <input
              type="text"
              placeholder="search any song"
              className="w-full text-lg font-semibold text-black/70 outline-none border-none"
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {songs.map((song: Song) => (
              <Song {...song} />
            ))}
          </div>
        </div>
      </div>
      <button onClick={getSongs} className="bg-black text-white p-2 rounded-lg">
        Get Songs
      </button>
    </div>
  );
}

function Song(song: Song) {
  return (
    <div className="bg-black/5 rounded-xl flex ">
      <img
        src={song.img}
        alt=""
        className="w-24 aspect-square px-2 py-2 rounded-[17PX] "
      />
      <div className="py-2 px-2">
        <div className="text-lg font-bold line-clamp-1">{song.title}</div>
        <div className="text-lg font-semibold text-black/70">{song.artist}</div>
      </div>
    </div>
  );
}

function Player({ trackUri }: { trackUri: string }) {
  // console.log(trackUri, "trackUri");

  return (
    <iframe
      src={`https://open.spotify.com/embed/track/5RWZ6TVZ0HeFTdRWu3VQ7w`}
      width="5000"
      height="8000"
      frameBorder="0"
      allowTransparency={true}
      allow="encrypted-media"
    ></iframe>
  );
}
