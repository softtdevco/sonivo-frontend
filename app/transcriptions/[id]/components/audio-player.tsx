"use client";
import React, { useMemo, useCallback, useRef, useEffect } from "react";
import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa6";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";

interface AudioPlayerProps {
  audioUrl: string;
  onTimeUpdate?: (time: number) => void;
}

const AudioPlayer = ({ audioUrl, onTimeUpdate }: AudioPlayerProps) => {
  const containerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);

  // Add effect to initialize waveform
 

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: '#4d4d4d',
    progressColor: '#ef5a3c',
    cursorColor: '#1c2833',
    url: audioUrl,
    normalize: true,
    minPxPerSec: 1,
    plugins: useMemo(() => [Timeline.create()], []),
    fillParent: true,
    autoScroll: false,
    barWidth: 4,
    barGap: 2,
    peaks: undefined,
    duration: undefined,
    mediaControls: false,
    interact: false,
    hideScrollbar: true,
    cursorWidth: 2,
  });

  

  const onPlayPause = useCallback(() => {
    wavesurfer?.playPause();
  }, [wavesurfer]);

  const handleMute = useCallback(() => {
    if (wavesurfer) {
      const newMutedState = !isMuted;
      wavesurfer.setMuted(newMutedState);
      setIsMuted(newMutedState);
    }
  }, [wavesurfer, isMuted]);

  const handlePlaybackRate = useCallback((rate: number) => {
    if (wavesurfer) {
      wavesurfer.setPlaybackRate(rate);
      setPlaybackRate(rate);
    }
  }, [wavesurfer]);

  React.useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(currentTime);
    }
  }, [currentTime, onTimeUpdate]);

  return (
    <div className="mt-8 border-b pb-4">
      <div 
        ref={containerRef} 
        className="w-full h-[100px] rounded-lg p-4 overflow-hidden"
      />
      
      <div className="flex items-center justify-center gap-6 mt-4">
        <select 
          value={playbackRate}
          onChange={(e) => handlePlaybackRate(Number(e.target.value))}
          className="p-2 rounded-md border border-[#dedede] text-[#1c2833] outline-none"
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>

        <button 
          onClick={() => wavesurfer?.skip(-10)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaBackward className="size-5 text-[#1c2833]" />
        </button>

        <button 
          onClick={onPlayPause}
          className="p-3 rounded-full bg-[#ef5a3c] hover:bg-[#ef5a3c]/80 transition-colors"
        >
          {isPlaying ? (
            <FaPause className="size-5 text-white" />
          ) : (
            <FaPlay className="size-5 text-white" />
          )}
        </button>

        <button 
          onClick={() => wavesurfer?.skip(10)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaForward className="size-5 text-[#1c2833]" />
        </button>

        <button 
          onClick={handleMute}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isMuted ? (
            <IoMdVolumeOff className="size-5 text-[#1c2833]" />
          ) : (
            <IoMdVolumeHigh className="size-5 text-[#1c2833]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer; 