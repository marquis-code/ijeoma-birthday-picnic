import { useEffect, useRef, useState } from "react";

const CHORDS = [
  [261.63, 329.63, 392.0, 493.88],
  [220.0, 261.63, 329.63, 392.0],
  [174.61, 220.0, 261.63, 329.63],
  [196.0, 246.94, 293.66, 392.0],
];
const MELODY = [0, 2, 1, 3, 2, 0, 1, 2];
const STEP_MS = 640;

function createImpulse(context) {
  const seconds = 2.6;
  const length = Math.floor(context.sampleRate * seconds);
  const impulse = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = impulse.getChannelData(channel);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.6);
    }
  }
  return impulse;
}

export default function SoundButton() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const stepRef = useRef(0);
  const playingRef = useRef(false);

  function ensureAudio() {
    if (audioRef.current) return audioRef.current;
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;

    const context = new AudioCtor();
    const master = context.createGain();
    master.gain.value = 0;
    master.connect(context.destination);

    const dry = context.createGain();
    dry.gain.value = 0.8;
    dry.connect(master);

    const wet = context.createGain();
    wet.gain.value = 0.24;
    wet.connect(master);

    const convolver = context.createConvolver();
    convolver.buffer = createImpulse(context);
    convolver.connect(wet);

    audioRef.current = { context, master, dry, convolver };
    return audioRef.current;
  }

  function playNote(frequency, start, duration, volume) {
    const audio = audioRef.current;
    if (!audio) return;
    const { context, dry, convolver } = audio;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(dry);
    gain.connect(convolver);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.1);

    const shimmer = context.createOscillator();
    const shimmerGain = context.createGain();
    shimmer.type = "triangle";
    shimmer.frequency.setValueAtTime(frequency * 2, start);
    shimmerGain.gain.setValueAtTime(0.0001, start);
    shimmerGain.gain.linearRampToValueAtTime(volume * 0.2, start + 0.02);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, start + duration * 0.7);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(convolver);
    shimmer.start(start);
    shimmer.stop(start + duration);
  }

  function playStep() {
    const audio = audioRef.current;
    if (!audio || audio.context.state !== "running") return;
    const chord = CHORDS[Math.floor(stepRef.current / 4) % CHORDS.length];
    const now = audio.context.currentTime + 0.04;

    if (stepRef.current % 4 === 0) {
      playNote(chord[0] / 2, now, 3.4, 0.035);
    }

    const melodyIndex = MELODY[stepRef.current % MELODY.length] % chord.length;
    playNote(chord[melodyIndex] * 2, now, 1.9, 0.03);

    if (stepRef.current % 8 === 3) {
      playNote(chord[(stepRef.current + 2) % chord.length] * 4, now + 0.18, 1.2, 0.009);
    }

    stepRef.current += 1;
  }

  function start() {
    const audio = ensureAudio();
    if (!audio) return;
    if (audio.context.state === "suspended") audio.context.resume();

    if (!playingRef.current) {
      playingRef.current = true;
      stepRef.current = 0;
      const { context, master } = audio;
      master.gain.cancelScheduledValues(context.currentTime);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), context.currentTime);
      master.gain.linearRampToValueAtTime(0.8, context.currentTime + 1.4);
      playStep();
      timerRef.current = window.setInterval(playStep, STEP_MS);
      setPlaying(true);
    }
  }

  function stop() {
    const audio = audioRef.current;
    if (!audio) return;
    playingRef.current = false;
    const { context, master } = audio;
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.linearRampToValueAtTime(0.0001, context.currentTime + 0.7);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPlaying(false);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (audioRef.current) {
        const { context } = audioRef.current;
        if (context.state !== "closed") context.close();
      }
    };
  }, []);

  return (
    <button
      type="button"
      aria-pressed={playing}
      aria-label={playing ? "Pause the garden soundtrack" : "Play the garden soundtrack"}
      onClick={() => (playing ? stop() : start())}
      className="group fixed bottom-4 right-4 z-[96] flex h-[3rem] items-center gap-2.5 rounded-full border border-lilac/55 bg-plum px-4 text-cream shadow-[0_10px_35px_rgba(40,24,46,0.22)] transition hover:bg-plum-deep hover:shadow-[0_14px_40px_rgba(40,24,46,0.32)] max-[760px]:h-[2.7rem] max-[760px]:px-3"
    >
      <span className="sound-bars" data-playing={playing} aria-hidden="true">
        <i /> <i /> <i /> <i />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.56rem] uppercase tracking-[0.15em] opacity-0 transition-all duration-500 group-hover:max-w-[200px] group-hover:opacity-100 group-focus-visible:max-w-[200px] group-focus-visible:opacity-100 max-[760px]:hidden">
        {playing ? "Pause the soundtrack" : "Play the garden soundtrack"}
      </span>
    </button>
  );
}
