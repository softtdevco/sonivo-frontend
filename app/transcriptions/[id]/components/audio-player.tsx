"use client";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa6";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";

interface AudioPlayerProps {
  audioUrl: string;
  onTimeUpdate?: (time: number) => void;
}

const AudioPlayer = ({ audioUrl, onTimeUpdate }: AudioPlayerProps) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!waveformRef.current) return;

    // Cleanup previous instance
    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    setIsLoading(true);

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#4d4d4d',
      progressColor: '#ef5a3c',
      cursorColor: '#1c2833',
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: 100,
      barGap: 3,
      normalize: true,
      fillParent: true,
      
    });

    ws.on('ready', () => {
      setIsLoading(false);
      wavesurfer.current = ws;
    });

    ws.on('error', (error) => {
      console.error('WaveSurfer error:', error);
      setIsLoading(false);
    });

    ws.on('play', () => setIsPlaying(true));
    ws.on('pause', () => setIsPlaying(false));
    ws.on('audioprocess', (time: number) => {
      onTimeUpdate?.(time);
    });

    try {
      ws.load(audioUrl);
    } catch (error) {
      console.error('Error loading audio:', error);
      setIsLoading(false);
    }

    return () => {
      if (ws) {
        ws.destroy();
      }
    };
  }, [audioUrl, onTimeUpdate]);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  const handleMute = () => {
    if (wavesurfer.current) {
      wavesurfer.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const handlePlaybackRate = (rate: number) => {
    if (wavesurfer.current) {
      wavesurfer.current.setPlaybackRate(rate);
      setPlaybackRate(rate);
    }
  };

  const handleForward = () => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      wavesurfer.current.seekTo((currentTime + 10) / wavesurfer.current.getDuration());
    }
  };

  const handleBackward = () => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      wavesurfer.current.seekTo(Math.max(0, (currentTime - 10)) / wavesurfer.current.getDuration());
    }
  };

  return (
    <div className="mt-8">
      <div ref={waveformRef} className="w-full rounded-lg p-4" />
      
      {/* Audio Controls */}
      <div className="flex items-center justify-center gap-6 mt-4">
        {/* Playback Speed */}
        <select 
          value={playbackRate}
          onChange={(e) => handlePlaybackRate(Number(e.target.value))}
          className="p-2 rounded-md border border-[#dedede] text-[#1c2833] outline-none"
          disabled={isLoading}
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>

        {/* Backward 10s */}
        <button 
          onClick={handleBackward}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          <FaBackward className="size-5 text-[#1c2833]" />
        </button>

        {/* Play/Pause */}
        <button 
          onClick={handlePlayPause}
          className="p-3 rounded-full bg-[#ef5a3c] hover:bg-[#ef5a3c]/80 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isPlaying ? (
            <FaPause className="size-5 text-white" />
          ) : (
            <FaPlay className="size-5 text-white" />
          )}
        </button>

        {/* Forward 10s */}
        <button 
          onClick={handleForward}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          <FaForward className="size-5 text-[#1c2833]" />
        </button>

        {/* Mute */}
        <button 
          onClick={handleMute}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
          disabled={isLoading}
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