import React from "react";

const LibrarySong = ({ song, setCurrentSong, currentSong }) => {
  const onSelectSongHandler = () => {
    if (song.id === currentSong.id) {
      setCurrentSong({
        ...song,
        active: true,
      });
    } else {
      setCurrentSong({
        ...song,
        active: false,
      });
    }
  };
  return (
    <div
      onClick={onSelectSongHandler}
      className={`library-song ${song.id === currentSong.id ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-desctiption">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
