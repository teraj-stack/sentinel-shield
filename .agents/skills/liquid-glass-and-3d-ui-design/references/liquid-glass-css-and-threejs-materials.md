# Reference: Liquid Glass CSS Recipes & Three.js 3D Layered Materials

## 1. Complete CSS Token & Component Recipes (Liquid Glass UI Kit)

```css
:root {
  --lg-surface-bg: #e5e5e3;
  --lg-blur: blur(18px) saturate(160%);
  --lg-rim-light: inset 0 2px 2.5px rgba(255, 255, 255, 0.95);
  --lg-rim-inner: inset 0 -3px 6px rgba(15, 23, 42, 0.08), inset 0 0 0 1.2px rgba(255, 255, 255, 0.68);
  --lg-shadow-neutral: 0 12px 24px -6px rgba(15, 23, 42, 0.12), 0 4px 8px -2px rgba(15, 23, 42, 0.06);
  --lg-accent-turquoise: #17c6c6;
  --lg-accent-lime: #b8ff01;
  --lg-accent-cobalt: #0a58ff;
}

/* Base Liquid Glass Capsule Button / Pill */
.lg-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 9999px;
  backdrop-filter: var(--lg-blur);
  -webkit-backdrop-filter: var(--lg-blur);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.28) 100%);
  box-shadow: var(--lg-rim-light), var(--lg-rim-inner), var(--lg-shadow-neutral);
  color: #16181d;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease;
  cursor: pointer;
  user-select: none;
}

.lg-pill:hover {
  transform: translateY(-1.5px);
}

.lg-pill:active {
  transform: translateY(0.5px) scale(0.99);
}

/* Pastel Tinted Variants with Subsurface Caustic Glow */
.lg-pill--periwinkle {
  background: linear-gradient(145deg, rgba(214, 222, 255, 0.78) 0%, rgba(182, 198, 255, 0.38) 100%);
  box-shadow:
    var(--lg-rim-light),
    var(--lg-rim-inner),
    0 14px 26px -6px rgba(128, 148, 248, 0.42),
    0 4px 10px rgba(128, 148, 248, 0.22);
}

.lg-pill--mint {
  background: linear-gradient(145deg, rgba(216, 242, 224, 0.78) 0%, rgba(184, 228, 202, 0.36) 100%);
  box-shadow:
    var(--lg-rim-light),
    var(--lg-rim-inner),
    0 14px 26px -6px rgba(116, 198, 152, 0.38);
}

.lg-pill--amber {
  background: linear-gradient(145deg, rgba(255, 226, 194, 0.82) 0%, rgba(252, 190, 134, 0.44) 100%);
  box-shadow:
    var(--lg-rim-light),
    var(--lg-rim-inner),
    0 16px 28px -5px rgba(248, 165, 85, 0.48),
    0 4px 12px rgba(248, 165, 85, 0.28);
}

/* Liquid Glass Folder Card */
.lg-folder-card {
  position: relative;
  border-radius: 26px;
  padding: 28px;
  backdrop-filter: blur(22px) saturate(170%);
  -webkit-backdrop-filter: blur(22px) saturate(170%);
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0.22) 100%);
  box-shadow:
    inset 0 2px 3px rgba(255, 255, 255, 0.95),
    inset 0 -3px 8px rgba(15, 23, 42, 0.07),
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.65),
    0 20px 40px -12px rgba(15, 23, 42, 0.14);
}

/* Spatial HUD Asymmetric Cutout Navbar (Antarctica Pattern) */
.hud-cutout-nav {
  display: inline-flex;
  align-items: flex-start;
  filter: drop-shadow(0 12px 28px rgba(12, 38, 56, 0.14));
}

.hud-cutout-nav__logo-well {
  width: 78px;
  height: 98px;
  background: rgba(244, 250, 252, 0.92);
  backdrop-filter: blur(16px);
  border-radius: 22px 0 22px 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hud-cutout-nav__bar {
  height: 58px;
  padding: 0 12px 0 24px;
  background: rgba(244, 250, 252, 0.92);
  backdrop-filter: blur(16px);
  border-radius: 0 18px 18px 0;
  display: flex;
  align-items: center;
  gap: 28px;
}
```

## 2. Three.js Materials for Layered 3D Shields & Cloud Nodes

```typescript
import * as THREE from 'three';

export function createLiquidGlassMaterials() {
  // 1. Front Refractive Frosted Glass (Shield Front / Orbiting Ribbons)
  const frostedCyanGlass = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#70b5ff'),
    transmission: 0.86,
    opacity: 1,
    transparent: true,
    roughness: 0.14,
    metalness: 0.02,
    ior: 1.46,
    thickness: 1.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.5,
  });

  // 2. Neon Lime Accent Core Layer (Image 4 Shield Mid-Ring)
  const neonLimeCore = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b8ff01'),
    emissive: new THREE.Color('#8ce600'),
    emissiveIntensity: 0.45,
    roughness: 0.2,
    metalness: 0.1,
  });

  // 3. Periwinkle Translucent Mid-Layer
  const periwinkleLayer = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#6b84ff'),
    transmission: 0.55,
    transparent: true,
    roughness: 0.22,
    ior: 1.38,
    thickness: 0.9,
    clearcoat: 0.8,
  });

  // 4. Matte Studio White Hardware Pedestal Base (Image 5 Cloud Base)
  const studioPedestalWhite = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#f6f9fc'),
    roughness: 0.32,
    metalness: 0.08,
  });

  return {
    frostedCyanGlass,
    neonLimeCore,
    periwinkleLayer,
    studioPedestalWhite,
  };
}
```

