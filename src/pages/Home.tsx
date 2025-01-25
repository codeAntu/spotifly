import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { connect, getAlbums } from "../spotify/spotifyApi";
import { useStore } from "../store/store";

interface Song {
  albumUri: string;
  artists: string;
  img: string;
  title: string;
  uri: string;
  duration: number;
  release_date: string;
}

export default function Home() {
  const accessToken = useStore((state) => state.accessToken);
  const expired_at = useStore((state) => state.expired_at);
  const navigate = useNavigate();
  const [songs, setSongs] = useState<any>([]);
  const [search, setSearch] = useState<string>("Love");
  const [nextUrl, setNextUrl] = useState<string>("");
  const [playing, setPlaying] = useState<string>("");
  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!accessToken || expired_at.getTime() < Date.now()) {
      console.log("No access token or expired token");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    connect(accessToken);
  }, []);

  async function getSongs(search: string) {
    const [data, next] = await getAlbums(accessToken, search);
    setSongs(data);
    setNextUrl(next.toString());
  }

  async function getNextSongs(search: string) {
    const [data, next] = await getAlbums(accessToken, search);
    setSongs([...songs, ...data]);
    if (next) setNextUrl(next.toString());
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      if (search.length > 0) getSongs(search);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    if (inView && nextUrl) {
      getNextSongs(nextUrl);
    }
  }, [inView, search]);

  console.log(songs);

  return (
    <div className="w-full h-[100dvh] flex items-center flex-col">
      <div className="w-full max-w-[1200px] p-4 grid gap-5 pb-[200px]">
        <div className="flex flex-col gap-3 ">
          <div className="text-2xl font-bold text-[#4cce96]">Spotifly</div>
          <div className="border border-black/80 rounded-xl flex justify-normal items-center px-2 py-2 gap-2 ">
            <Search size={24} className="text-black/60" />
            <input
              type="text"
              placeholder="Search any song or artist "
              className="w-full text-lg font-semibold text-black/70 outline-none border-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div>
          {songs.length === 0 && (
            <div className="text-lg font-semibold text-black/60 text-center py-10 px-5">
              Search for a song or artist and listen to it here...
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {songs.map((song: Song) => (
              <Song
                song={song}
                onclick={() => {
                  setPlaying(song.uri.split("spotify:track:")[1]);
                }}
              />
            ))}
          </div>
          <Player trackUri={playing} />
        </div>
        <div ref={ref} className="h-1 w-1"></div>
      </div>
    </div>
  );
}

function getReleaseDate(date: string) {
  const currentDate = new Date();
  const releaseDate = new Date(date);
  const diffTime = Math.abs(currentDate.getTime() - releaseDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.ceil(diffDays / 7);
  const diffMonths = Math.ceil(diffDays / 30);
  const diffYears = Math.ceil(diffDays / 365);

  if (diffYears > 1) return `${diffYears} years ago`;
  if (diffMonths > 1) return `${diffMonths} months ago`;
  if (diffWeeks > 1) return `${diffWeeks} weeks ago`;
  if (diffDays > 1) return `${diffDays} days ago`;
}
function getDuration(duration: number) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds;
}

function Song({ song, onclick }: { song: Song; onclick: () => void }) {
  return (
    <div
      className="bg-black/5 rounded-3xl flex border-black/5 border "
      onClick={onclick}
    >
      <img
        src={song.img}
        alt=""
        className="w-24 aspect-square px-3 py-3 rounded-3xl"
      />
      <div className="py-2 px-2 ">
        <div className="text-lg font-bold line-clamp-1">{song.title}</div>
        <div className="text-sm font-semibold text-black/60 line-clamp-1">
          {song.artists}
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-xs py-0.5 rounded-full font-semibold ">
            {" "}
            {getDuration(song.duration)}
          </div>
          <div className="p-1 bg-black/35 rounded-full"></div>
          <div className="text-xs py-0.5 rounded-full font-semibold ">
            {getReleaseDate(song.release_date)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Player({ trackUri }: { trackUri: string }) {
  if (!trackUri) return null;
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackUri}`}
      width="100%"
      height="160"
      allowTransparency={true}
      allow="encrypted-media"
      className="fixed bottom-0 z-10 right-0 left-0 bg-white px-2.5 bg-transparent"
    ></iframe>
  );
}
