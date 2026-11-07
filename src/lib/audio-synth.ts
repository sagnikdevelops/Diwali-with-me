/**
 * Native Web Audio API Sound Synthesizer
 * Zero dependencies, zero external audio files required, ₹0 budget compliance.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private sfxEnabled: boolean = true;

  private playAssetSound(src: string, volume: number, fallback?: () => void) {
    if (typeof window === "undefined" || this.isMuted || !this.sfxEnabled) return;

    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => {
      fallback?.();
    });
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
  }

  public playDiyaLight() {
    if (this.isMuted || !this.sfxEnabled) return;

    // Play synchronized match-strike & flame ignition audio
    this.playAssetSound("/audio/sfx/diya-light.wav", 0.95, () => {
      const audio = new Audio("/audio/sfx/diya-light.mp3");
      audio.preload = "auto";
      audio.volume = 0.95;
      audio.addEventListener("loadedmetadata", () => {
        if (audio.duration > 4) {
          audio.currentTime = 2.5; // Synchronize with match strike if using raw audio
        }
      });
      audio.play().catch(() => {
        this.playDiyaChime();
      });
    });
  }

  public playDiyaChime() {
    if (this.isMuted || !this.sfxEnabled) return;

    const ctx = this.getContext();
    if (!ctx) return;

    // Harmonic bell chord: G5 (784Hz), B5 (987Hz), D6 (1174Hz), G6 (1568Hz)
    const notes = [783.99, 987.77, 1174.66, 1567.98];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.3);
    });
  }

  public playFireworkLaunch() {
    if (this.isMuted || !this.sfxEnabled) return;

    this.playAssetSound("/audio/sfx/firework-launch.mp3", 0.85, () => {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.65;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const t = i / bufferSize;
        const tone = Math.sin(2 * Math.PI * (180 + t * 2100) * (i / ctx.sampleRate));
        const hiss = (Math.random() * 2 - 1) * (1 - t);
        data[i] = (tone * 0.3 + hiss * 0.25) * Math.exp(-i / (ctx.sampleRate * 0.28));
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      source.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      source.stop(now + 0.6);
    });
  }

  public playFireworkBurst() {
    if (this.isMuted || !this.sfxEnabled) return;

    this.playAssetSound("/audio/sfx/firework-burst.mp3", 0.85, () => {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Low thump oscillator
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);

      oscGain.gain.setValueAtTime(0.25, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);

      // Crackle noise burst
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.1));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(2.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.15, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.55);
    });
  }

  public playLanternShimmer() {
    if (this.isMuted || !this.sfxEnabled) return;

    this.playAssetSound("/audio/sfx/lantern-rise.mp3", 0.8, () => {
      const ctx = this.getContext();
      if (!ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      const now = ctx.currentTime;

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.09 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 1.6);
      });
    });
  }

  public playGiftReveal() {
    if (this.isMuted || !this.sfxEnabled) return;

    this.playAssetSound("/audio/sfx/gift-reveal.mp3", 0.8, () => {
      const ctx = this.getContext();
      if (!ctx) return;

      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.85);
      });
    });
  }

  public playSubtleClick() {
    if (this.isMuted || !this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }
}

export const audioSynth = new AudioSynthesizer();

