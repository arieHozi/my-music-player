import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  songs,
}) => {
  const audioRef = useRef(null);
  // useEffect(() => {
  //   if (isPlaying && audioRef.current.paused) {
  //     audioRef.current.play();
  //   }
  // }, [isPlaying, currentSong]);

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculate precentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const precentage = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPrecentage: precentage,
    });
  };

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const skipTrackHandler = async (diraction) => {
    let newIndex = songs.indexOf(currentSong) + diraction;
    newIndex >= 0
      ? await setCurrentSong(songs[newIndex % songs.length])
      : await setCurrentSong(songs[songs.length - 1]);
    // setCurrentSong(songs[newIndex % songs.length]);
  };
  const autoPlayerHandler = () => {
    //if already playing then new song will plat also
    // if paused them new song will be paused also
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  //add the styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPrecentage}%)`,
  };

  const songHasEnded = () => {
    skipTrackHandler(1);
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right,${currentSong.colors[0]},${currentSong.colors[1]})`,
          }}
          className="track"
        >
          <input
            className="svg"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(-1)}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={!isPlaying ? faPlay : faPause}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(1)}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onLoadedData={autoPlayerHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songHasEnded}
      ></audio>
    </div>
  );
};

export default Player;
