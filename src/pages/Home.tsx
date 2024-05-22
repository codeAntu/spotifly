import ls from "../ls/ls";
import { useStore } from "../store/store";

export default function Home() {
  const accessToken = useStore((state) => state.accessToken);
  const expired_at = useStore((state) => state.expired_at);
  console.log(accessToken, expired_at);

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
    </div>
  );
}
