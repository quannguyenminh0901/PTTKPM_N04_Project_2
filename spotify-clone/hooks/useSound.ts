import { useState, useEffect } from 'react';

interface SoundOptions {
  volume: number;
  onplay: () => void;
  onend: () => void;
  onpause: () => void;
  format: string[];
}

interface SoundResult {
  play: () => void;
  pause: () => void;
  sound: HTMLAudioElement | null;
}

const useSound = (songUrl: string, options: SoundOptions): SoundResult => {
  const [audio] = useState(new Audio(songUrl));
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    audio.play();
  };

  const pause = () => {
    audio.pause();
  };

  useEffect(() => {
    audio.volume = options.volume;

    audio.addEventListener('play', () => {
      setIsPlaying(true);
      options.onplay();
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      options.onend();
    });

    audio.addEventListener('pause', () => {
      setIsPlaying(false);
      options.onpause();
    });

    return () => {
      audio.removeEventListener('play', options.onplay);
      audio.removeEventListener('ended', options.onend);
      audio.removeEventListener('pause', options.onpause);
    };
  }, [audio, options]);

  return { play, pause, sound: audio };
};

export default useSound;
