import React from "react";

const PlayButton: React.FC = () => {
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
};

export default PlayButton;
