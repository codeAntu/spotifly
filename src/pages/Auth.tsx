// import { useEffect } from "react";
// import { useStore } from "../store/store";
// import queryString from "query-string";
// import axios from "axios";
// import { Buffer } from "buffer";
// import { useNavigate } from "react-router-dom";

// export default function Auth() {
//   const accessToken = useStore((state) => state.accessToken);
//   const refreshToken = useStore((state) => state.refreshToken);
//   const setAccessToken = useStore((state) => state.setAccessToken);
//   const setRefreshToken = useStore((state) => state.setRefreshToken);
//   const navigate = useNavigate();

//   const clientId = import.meta.env.VITE_CLIENT_ID as string;
//   const clientSecret = import.meta.env.VITE_CLIENT_SECRET as string;
//   const encodedCredentials = Buffer.from(
//     `${clientId}:${clientSecret}`
//   ).toString("base64");
//   const code = queryString.parse(window.location.search).code as string;
//   const redirectUri = "http://localhost:5173/";

//   console.log(code);

//   useEffect(() => {
//     if (code.length === 0) return;
//     if (accessToken) return;
//     axios({
//       method: "post",
//       url: "https://accounts.spotify.com/api/token",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${encodedCredentials}`,
//       },
//       data: queryString.stringify({
//         grant_type: "authorization_code",
//         code,
//         redirect_uri: redirectUri,
//       }),
//     })
//       .then((response) => {
//         console.log(response.data);
//         setAccessToken(response.data.access_token);
//         setRefreshToken(response.data.refresh_token);
//         navigate("/");
//       })
//       .catch((error: any) => {
//         console.error(error.response.data);
//       });
//   }, []);

//   // console.log(accessToken, refreshToken);

//   const refreshTokenFunc = async (refresh_token: string) => {
//     const clientId = import.meta.env.VITE_CLIENT_ID as string;
//     const clientSecret = import.meta.env.VITE_CLIENT_SECRET as string;
//     const encodedCredentials = Buffer.from(
//       `${clientId}:${clientSecret}`
//     ).toString("base64");

//     try {
//       const response = await axios({
//         method: "post",
//         url: "https://accounts.spotify.com/api/token",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: `Basic ${encodedCredentials}`,
//         },
//         data: queryString.stringify({
//           grant_type: "refresh_token",
//           refresh_token: refreshToken,
//         }),
//       });

//       const { access_token, refresh_token } = response.data;

//       localStorage.setItem('access_token', access_token);
//       // localStorage.setItem('refresh_token', refresh_token);
//       console.log("done");
//       console.log(response.data);
      

//       // console.log(access_token, refresh_token); 

//       // setAccessToken(access_token);
//       // setRefreshToken(refresh_token);
//     } catch (error: any) {
//       console.error(error.response.data);
//     }
//   };

//   return (
//     <div>
//       <h1>{accessToken}</h1>
//       <div>
//         <button
//           onClick={() => {
//             setAccessToken("1234");
//           }}
//         >
//           setAccessToken
//         </button>
//         <button
//           onClick={() => {
//             setRefreshToken("124");
//           }}
//         >
//           setAccessToken2
//         </button>
//         <button
//           onClick={() => {
//             setAccessToken("");
//           }}
//         >
//           clearAccessToken
//         </button>
//         <button
//           onClick={() => {
//             refreshTokenFunc(refreshToken);
//           }}
//         >
//           Refresh Token
//         </button>
//       </div>
//     </div>
//   );
// }
