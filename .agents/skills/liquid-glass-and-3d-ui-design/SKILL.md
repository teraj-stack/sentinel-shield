---
name: liquid-glass-and-3d-ui-design
description: >-
  Use this skill when designing or building websites, dashboards, UI kits, or 3D web/mobile
  applications that require the "Liquid Glass" refractive UI aesthetic, full-bleed spatial HUD
  dashboards with cutout navigation bars, or multi-layered 3D isometric icons and glowing SaaS hero
  scenes (such as layered security shields, isometric cloud bases with orbiting glass ribbons, and
  encrypted channel pedestals).
---

# Liquid Glass UI, Spatial HUD Dashboards & 3D Layered Assets Skill

This skill codifies the visual design language, lighting physics, CSS/SVG shaders, and 3D material setups required to build applications matching the five reference styles:

1. **Tactile Liquid Glass UI Kit** (molded optical resin/glass pills, refractive specular rims, subsurface pastel caustics, physical glass toggles, folder-tabbed glass containers).
2. **Spatial HUD & Cutout Environmental Dashboards** (*Antarctica* style: full-screen 3D/photorealistic glacial or architectural viewport overlaid with inverted-corner cutout navbars, topographic contour SVG maps, and frosted telemetry widgets).
3. **3D Glowing Pedestal & Encrypted Channel Architecture Hero** (*COCO* style: white-to-cobalt radial aura, edge-lit futuristic dock, floating cyan glass emblem and 3D chat blocks).
4. **Multi-Layered 3D Security Shield Emblem** (4-layer stacked isometric shield: brushed silver base, indigo slab, neon lime `#B8FF01` core ring, and frosted cyan-blue front shield with raised 3D `✓`).
5. **Isometric 3D Cloud Hardware Node with Orbiting Glass Ribbons** (clean white studio cyclorama, rounded hardware pedestal with recessed azure well, multi-layered acrylic cloud, and curved transparent glass panels in orbit).

---

## 1. Visual Design System Rules

### A. Tactile "Liquid Glass" Components (Image 2 Pattern)
Unlike flat `backdrop-filter: blur()` glassmorphism, **Liquid Glass** simulates thick, curved optical acrylic (`4px–12px` thickness) resting on a matte light surface (`#E5E5E3` to `#EEF2F7`):
- **Triple-Layer Specular Rim (`box-shadow`)**:
  1. Top-left crisp white refraction edge: `inset 0 2px 3px rgba(255, 255, 255, 0.95)`
  2. Inner optical volume rim: `inset 0 -3px 6px rgba(15, 23, 42, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.65)`
  3. Subsurface Caustic Drop Shadow: Soft shadow beneath the element tinted with the button's internal pastel hue (e.g., warm amber glow `0 12px 24px -6px rgba(245, 166, 91, 0.42)` or periwinkle glow `0 12px 24px -6px rgba(139, 156, 248, 0.45)`).
- **Pastel Optical Tints**:
  - *Periwinkle / Workspace Blue*: `linear-gradient(135deg, rgba(210,220,255,0.68), rgba(180,196,252,0.38))`
  - *Mint Sage*: `linear-gradient(135deg, rgba(212,240,222,0.68), rgba(182,226,200,0.36))`
  - *Warm Amber / Peach*: `linear-gradient(135deg, rgba(255,224,190,0.75), rgba(250,188,135,0.42))`
  - *Rose Quartz*: `linear-gradient(135deg, rgba(252,212,232,0.70), rgba(240,180,212,0.38))`
  - *Clear Crystal Folder Card*: `linear-gradient(145deg, rgba(255,255,255,0.62), rgba(255,255,255,0.22))` with an SVG/CSS folder tab silhouette (`border-radius: 24px`).

### B. Spatial HUD & Asymmetric Cutout Navigation (Image 1 Pattern)
When overlaying UI on top of an interactive 3D clinic model or environmental scene:
- **Asymmetric Cutout Navbar ("Liquid Notch")**:
  - Top-left brand badge drops down into a vertical tab while the horizontal menu bar extends right, connected by a smooth concave inner corner radius (`24px` inverted SVG clip-path or radial-gradient mask).
  - Accent buttons use saturated glacial turquoise (`#15C5C5` to `#00B4D8`) with crisp white icons.
- **Floating Telemetry & Topographic Overlays**:
  - Display key metrics in ultra-light/regular large numerals (`56px–72px`, e.g., `64°` or distance in meters `12.4m`) paired with thin `1px` SVG topographic contour lines (`stroke: rgba(255,255,255,0.65)`).
  - Right-hand column stacks rounded-square media/camera preview cards (`border-radius: 22px`, `border: 2px solid rgba(255,255,255,0.75)`) above a frosted assistant/doctor profile card (`@martha` / `Asystent Kliniki`) with a floating circular turquoise action badge (`↗`).

### C. 3D Layered Isometric Icons & Hero Scenes (Images 3, 4, 5 Patterns)
When rendering 3D emblems or scene nodes in Three.js / WebGL / SVG-3D:
- **Multi-Layer Stacked Extrusion (Shield & Cloud Pattern)**:
  - Never use a single flat mesh. Stack **3 to 4 parallel extruded layers** along the Z-axis (`z = 0`, `z = 0.18`, `z = 0.34`, `z = 0.50`) with alternating materials:
    1. *Layer 1 (Back)*: Matte white/silver structural plate (`roughness: 0.35`, `metalness: 0.2`).
    2. *Layer 2 (Mid-Back)*: Translucent cobalt/periwinkle acrylic (`#6A85FF`).
    3. *Layer 3 (Accent Core)*: High-emission neon lime (`#B8FF01`) or electric cyan (`#00E5FF`) rim that casts a colored edge glow onto adjacent layers.
    4. *Layer 4 (Front Face)*: Refractive frosted glass (`transmission: 0.88`, `ior: 1.45`, `thickness: 1.2`, `roughness: 0.12`) with a raised 3D white symbol (`✓` or medical cross `+`).
- **Orbiting Glass Ribbons & Glowing Pedestal Base**:
  - Place primary 3D objects on a rounded square or beveled cylindrical hardware base with an inset glowing blue cavity (`#0077FF`) and neon cyan edge-light strips.
  - Surround floating central icons with 2 curved cylindrical glass arc segments (`RingGeometry` / `CylinderGeometry` with `thetaLength: Math.PI * 0.55`, `openEnded: true`) slowly rotating in opposite directions.

---

## 2. Implementation Reference

For ready-to-use CSS variables, Liquid Glass component classes, SVG folder-tab shapes, and Three.js `MeshPhysicalMaterial` / WebGL helper functions, read:
- [liquid-glass-css-and-threejs-materials.md](./references/liquid-glass-css-and-threejs-materials.md)

