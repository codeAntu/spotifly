import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import { useStore } from "../store/store";

export default function Login() {
  const navigate = useNavigate();
  const client_id = "def12aa29212414cb49a5b71dc4f8131";
  const scope = "user-read-private user-read-email";
  const redirect_uri = "http://localhost:5173/";
  const state = "34fFs29kd09";
  const code = queryString.parse(window.location.search).code as string;

  // const accessToken = useStore((state) => state.accessToken);
  // const refreshToken = useStore((state) => state.refreshToken);
  // const setAccessToken = useStore((state) => state.setAccessToken);
  // const setRefreshToken = useStore((state) => state.setRefreshToken);

  // const clientId = import.meta.env.VITE_CLIENT_ID as string;
  // const clientSecret = import.meta.env.VITE_CLIENT_SECRET as string;
  // const encodedCredentials = Buffer.from(
  //   `${clientId}:${clientSecret}`
  // ).toString("base64");
  // const redirectUri = "http://localhost:5173/";
  
  
  const Auth_url =
    "https://accounts.spotify.com/authorize?" +
    queryString.stringify({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    });

  // const code = queryString.parse(window.location.search).code as string;

  if (code) {
    // navigate("/auth?code=" + code);

    
  } else {
    // Redirect to Auth_url if there's no code in the URL
    window.location.href = Auth_url;
  }

  return (
    <div>
      <h1>LogIn</h1>
      <a href={Auth_url}>
        <button>LogIn</button>
      </a>
    </div>
  );
}
