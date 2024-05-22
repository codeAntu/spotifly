import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "./store/store";
import queryString from "query-string";
import Login from "./pages/Login";
import ls from "./ls/ls";

const App: React.FC = () => {
  const accessToken = useStore((state) => state.accessToken);
  const refreshToken = useStore((state) => state.refreshToken);
  const navigate = useNavigate();
  const code = queryString.parse(window.location.search).code as string;




  useEffect(() => {
    if(code) navigate("/auth?code=" + code);
    if (!accessToken && !code) navigate("/login");
  }, []);




  console.log(import.meta.env.VITE_CLIENT_ID)

  console.log(accessToken);
    


  return (
    <div className="App">
      {
        accessToken ? <div>Logged In</div> : <Login />
      }
      <div>Hello</div>
      <button
        onClick={
          () => {
            ls.clear();
            console.log("clicked");
          }
        }
      >
        Clear
      </button>
    </div>
  );
};

export default App;
