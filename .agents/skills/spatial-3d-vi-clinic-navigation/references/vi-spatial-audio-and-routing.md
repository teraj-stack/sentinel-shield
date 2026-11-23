# Reference: 3D Clinic Wayfinding Graph, HRTF Spatial Audio & Voice Guidance

## 1. Accessible Clinic Graph Schema (TypeScript / JavaScript)

```typescript
export type NodeType =
  | 'entrance'
  | 'reception'
  | 'corridor_junction'
  | 'tactile_crossing'
  | 'elevator'
  | 'stairs'
  | 'clinic_room'
  | 'restroom_accessible'
  | 'hazard';

export interface ClinicWayfindingNode {
  id: string;
  labelPl: string;
  labelEn: string;
  type: NodeType;
  position: [number, number, number]; // [x, y, z] in meters
  floor: number;
  brailleCode?: string;               // Identifier on physical door plaque
  audioBeaconFreqHz?: number;         // Base frequency for HRTF beacon
  landmarkHintPl: string;             // Tactile/acoustic cue for blind patients
}

export interface ClinicWayfindingEdge {
  from: string;
  to: string;
  distanceMeters: number;
  hasTactilePaving: boolean;          // Ścieżka naprowadzająca na podłodze
  handrailSide: 'left' | 'right' | 'both' | 'none';
  avoidForWheelchairOrBlind?: boolean; // e.g., open spiral stairs
}
```

## 2. HRTF 3D Spatial Audio Beacon Engine (Web Audio API)

Use `AudioContext` with a `PannerNode` configured to `HRTF` so blind patients wearing headphones hear the exact 3D direction (left/right, front/back, elevation, and distance attenuation) of the target clinic room:

```typescript
export class SpatialAudioBeaconEngine {
  private ctx: AudioContext | null = null;
  private panner: PannerNode | null = null;
  private timerId: number | null = null;

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  updateListenerPose(pos: [number, number, number], forwardYawRad: number) {
    if (!this.ctx) return;
    const listener = this.ctx.listener;
    const fx = Math.sin(forwardYawRad);
    const fz = -Math.cos(forwardYawRad);

    if (listener.positionX) {
      listener.positionX.value = pos[0];
      listener.positionY.value = pos[1];
      listener.positionZ.value = pos[2];
      listener.forwardX.value = fx;
      listener.forwardY.value = 0;
      listener.forwardZ.value = fz;
      listener.upX.value = 0;
      listener.upY.value = 1;
      listener.upZ.value = 0;
    } else {
      listener.setPosition(pos[0], pos[1], pos[2]);
      listener.setOrientation(fx, 0, fz, 0, 1, 0);
    }
  }

  emitPingAt(targetPos: [number, number, number], baseFreq = 528) {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const panner = this.ctx.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1.5;
    panner.maxDistance = 30;
    panner.rolloffFactor = 1.2;
    panner.positionX.setValueAtTime(targetPos[0], now);
    panner.positionY.setValueAtTime(targetPos[1], now);
    panner.positionZ.setValueAtTime(targetPos[2], now);

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.18);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc.connect(gain);
    gain.connect(panner);
    panner.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }
}
```

## 3. Clock-Face Direction & Polish TTS Narrator

```typescript
export function computeClockDirection(
  userPos: [number, number, number],
  userYawRad: number,
  targetPos: [number, number, number]
): { clockHour: number; distanceMeters: number; instructionPl: string } {
  const dx = targetPos[0] - userPos[0];
  const dz = targetPos[2] - userPos[2];
  const distanceMeters = Math.hypot(dx, dz);

  // Angle to target relative to user's forward heading
  const targetAngle = Math.atan2(dx, -dz);
  let relAngle = targetAngle - userYawRad;
  while (relAngle < -Math.PI) relAngle += Math.PI * 2;
  while (relAngle > Math.PI) relAngle -= Math.PI * 2;

  const deg = (relAngle * 180) / Math.PI;
  let clockHour = Math.round(((deg + 360) % 360) / 30);
  if (clockHour === 0) clockHour = 12;

  const steps = Math.max(1, Math.round(distanceMeters / 0.75));
  let turnPhrase = 'na wprost (godzina 12)';
  if (clockHour === 1 || clockHour === 2) turnPhrase = `lekko w prawo (godzina ${clockHour})`;
  else if (clockHour === 3 || clockHour === 4) turnPhrase = `w prawo (godzina ${clockHour})`;
  else if (clockHour >= 5 && clockHour <= 7) turnPhrase = `za Tobą (godzina ${clockHour}) — wykonaj obrót`;
  else if (clockHour === 8 || clockHour === 9) turnPhrase = `w lewo (godzina ${clockHour})`;
  else if (clockHour === 10 || clockHour === 11) turnPhrase = `lekko w lewo (godzina ${clockHour})`;

  return {
    clockHour,
    distanceMeters: Number(distanceMeters.toFixed(1)),
    instructionPl: `Kierunek: ${turnPhrase}, dystans ${distanceMeters.toFixed(1)} metra (około ${steps} kroków).`
  };
}
```

