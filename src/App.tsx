import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "./store/store";
import queryString from "query-string";
import ls from "./ls/ls";
import { getAccessToken, getRefreshToken } from "./auth/auth";

const App: React.FC = () => {
  const accessToken = useStore((state) => state.accessToken);
  const refreshToken = useStore((state) => state.refreshToken);
  const expired_at = useStore((state) => state.expired_at);
  const setAccessToken = useStore((state) => state.setAccessToken);
  const setRefreshToken = useStore((state) => state.setRefreshToken);
  const setExpired_at = useStore((state) => state.setExpired_at);
  const navigate = useNavigate();
  const code = queryString.parse(window.location.search).code as string;
  const client_id = import.meta.env.VITE_CLIENT_ID as string;
  const scope = "user-read-private user-read-email";
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI as string;
  const state = "34fFs29kd09";

  const Auth_url =
    "https://accounts.spotify.com/authorize?" +
    queryString.stringify({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    });

    console.log(client_id);
    console.log(redirect_uri);
    
    

  // useEffect(() => {
  //   if (accessToken && Date.now() - expired_at.getTime() < 0) {
  //     navigate("/home");
  //     // window.location.href = "/home";
  //   }

  //   if (!accessToken && !code) {
  //     console.log("no access token and no code");
  //     window.location.href = Auth_url;
  //   }

  //   if (accessToken && Date.now() - expired_at.getTime() > 0) {
  //     console.log("expired");
  //     getRefreshToken(refreshToken).then((data) => {
  //       console.log(data);
  //       setAccessToken(data.access_token);
  //       setExpired_at(new Date(new Date().getTime() + data.expires_in * 1000));
  //       if (data.refresh_token) setRefreshToken(data.refresh_token);
  //     });
  //     // navigate("/home");
  //   }

  //   if (code) {
  //     console.log("code");
  //     getAccessToken(code).then((data) => {
  //       setAccessToken(data.access_token);
  //       setRefreshToken(data.refresh_token);
  //       setExpired_at(new Date(new Date().getTime() + data.expires_in * 1000));
  //     });
  //     if (accessToken && expired_at.getTime() > Date.now()) navigate("/home");
  //   }
  // });

  return (
    <div className="App">
      <h1>Spotify</h1>
    </div>
  );
};

export default App;
