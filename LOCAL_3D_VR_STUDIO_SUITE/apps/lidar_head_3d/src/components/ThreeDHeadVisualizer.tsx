import __vite__cjsImport0_react_jsxDevRuntime from "/apps/lidar_head_3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=04dca6e3"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/apps/lidar_head_3d/node_modules/.vite/deps/react.js?v=04dca6e3"; const useRef = __vite__cjsImport1_react["useRef"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useState = __vite__cjsImport1_react["useState"];
const BASE_MESH_POINTS = [
  // Primary Face Landmarks
  { id: "nose_tip", x: 0, y: 0, z: 45 },
  { id: "nose_bridge", x: 0, y: 15, z: 35 },
  { id: "nose_l", x: -12, y: -5, z: 30 },
  { id: "nose_r", x: 12, y: -5, z: 30 },
  { id: "forehead_center", x: 0, y: 48, z: 20 },
  { id: "forehead_l1", x: -22, y: 42, z: 18 },
  { id: "forehead_r1", x: 22, y: 42, z: 18 },
  { id: "forehead_l2", x: -44, y: 35, z: 8 },
  { id: "forehead_r2", x: 44, y: 35, z: 8 },
  { id: "eye_l_inner", x: -16, y: 16, z: 20 },
  { id: "eye_l_outer", x: -34, y: 16, z: 15 },
  { id: "eye_r_inner", x: 16, y: 16, z: 20 },
  { id: "eye_r_outer", x: 34, y: 16, z: 15 },
  { id: "cheek_l_high", x: -42, y: 5, z: 15 },
  { id: "cheek_r_high", x: 42, y: 5, z: 15 },
  { id: "cheek_l_low", x: -35, y: -18, z: 15 },
  { id: "cheek_r_low", x: 35, y: -18, z: 15 },
  { id: "mouth_top", x: 0, y: -18, z: 24 },
  { id: "mouth_bottom", x: 0, y: -30, z: 24 },
  { id: "mouth_l", x: -20, y: -24, z: 20 },
  { id: "mouth_r", x: 20, y: -24, z: 20 },
  { id: "chin_center", x: 0, y: -48, z: 22 },
  { id: "chin_l", x: -16, y: -45, z: 18 },
  { id: "chin_r", x: 16, y: -45, z: 18 },
  // Outer jaw points
  { id: "jaw_l_high", x: -55, y: 10, z: -10 },
  { id: "jaw_r_high", x: 55, y: 10, z: -10 },
  { id: "jaw_l_mid", x: -48, y: -15, z: -2 },
  { id: "jaw_r_mid", x: 48, y: -15, z: -2 },
  { id: "jaw_l_low", x: -32, y: -35, z: 8 },
  { id: "jaw_r_low", x: 32, y: -35, z: 8 },
  // Fused LiDAR grid points (simulating active depth scan points scattered in the bounds)
  { id: "lidar_1", x: -20, y: 30, z: 12, isLidarSensor: true },
  { id: "lidar_2", x: 20, y: 30, z: 12, isLidarSensor: true },
  { id: "lidar_3", x: -10, y: 10, z: 25, isLidarSensor: true },
  { id: "lidar_4", x: 10, y: 10, z: 25, isLidarSensor: true },
  { id: "lidar_5", x: -25, y: -8, z: 18, isLidarSensor: true },
  { id: "lidar_6", x: 25, y: -8, z: 18, isLidarSensor: true },
  { id: "lidar_7", x: -12, y: -35, z: 15, isLidarSensor: true },
  { id: "lidar_8", x: 12, y: -35, z: 15, isLidarSensor: true },
  { id: "lidar_9", x: 0, y: 32, z: 16, isLidarSensor: true },
  { id: "lidar_10", x: 0, y: -10, z: 28, isLidarSensor: true }
];
const BELLY_MESH_POINTS = [
  // Belly button (navel center)
  { id: "belly_navel", x: 0, y: 0, z: 46 },
  { id: "belly_navel_u", x: 0, y: 15, z: 38 },
  { id: "belly_navel_d", x: 0, y: -15, z: 38 },
  { id: "belly_navel_l", x: -15, y: 0, z: 38 },
  { id: "belly_navel_r", x: 15, y: 0, z: 38 },
  // Upper belly crease (horizontal curve)
  { id: "belly_u_mid", x: 0, y: 45, z: 20 },
  { id: "belly_u_l1", x: -24, y: 42, z: 18 },
  { id: "belly_u_r1", x: 24, y: 42, z: 18 },
  { id: "belly_u_l2", x: -48, y: 34, z: 10 },
  { id: "belly_u_r2", x: 48, y: 34, z: 10 },
  { id: "belly_u_l3", x: -70, y: 24, z: -4 },
  { id: "belly_u_r3", x: 70, y: 24, z: -4 },
  // Abdominal fold (mid section of the 'oponka' fat roll ring)
  { id: "belly_m_l1", x: -32, y: 2, z: 34 },
  { id: "belly_m_r1", x: 32, y: 2, z: 34 },
  { id: "belly_m_l2", x: -55, y: -2, z: 24 },
  { id: "belly_m_r2", x: 55, y: -2, z: 24 },
  { id: "belly_m_l3", x: -75, y: -6, z: 10 },
  { id: "belly_m_r3", x: 75, y: -6, z: 10 },
  // Lower belly fold
  { id: "belly_d_mid", x: 0, y: -45, z: 24 },
  { id: "belly_d_l1", x: -24, y: -42, z: 22 },
  { id: "belly_d_r1", x: 24, y: -42, z: 22 },
  { id: "belly_d_l2", x: -48, y: -34, z: 14 },
  { id: "belly_d_r2", x: 48, y: -34, z: 14 },
  { id: "belly_d_l3", x: -70, y: -24, z: 4 },
  { id: "belly_d_r3", x: 70, y: -24, z: 4 },
  // Abdominal peripheral scatter
  { id: "belly_lidar_1", x: -20, y: 22, z: 26, isLidarSensor: true },
  { id: "belly_lidar_2", x: 20, y: 22, z: 26, isLidarSensor: true },
  { id: "belly_lidar_3", x: -35, y: -22, z: 20, isLidarSensor: true },
  { id: "belly_lidar_4", x: 35, y: -22, z: 20, isLidarSensor: true },
  { id: "belly_lidar_5", x: 0, y: 28, z: 28, isLidarSensor: true },
  { id: "belly_lidar_6", x: 0, y: -28, z: 28, isLidarSensor: true },
  { id: "belly_lidar_7", x: -55, y: 10, z: 15, isLidarSensor: true },
  { id: "belly_lidar_8", x: 55, y: 10, z: 15, isLidarSensor: true }
];
function getCircumcircle(p0, p1, p2) {
  const d = 2 * (p0.x * (p1.y - p2.y) + p1.x * (p2.y - p0.y) + p2.x * (p0.y - p1.y));
  if (Math.abs(d) < 1e-9) {
    return { cx: 0, cy: 0, r: 1e9 };
  }
  const ux = ((p0.x * p0.x + p0.y * p0.y) * (p1.y - p2.y) + (p1.x * p1.x + p1.y * p1.y) * (p2.y - p0.y) + (p2.x * p2.x + p2.y * p2.y) * (p0.y - p1.y)) / d;
  const uy = ((p0.x * p0.x + p0.y * p0.y) * (p2.x - p1.x) + (p1.x * p1.x + p1.y * p1.y) * (p0.x - p2.x) + (p2.x * p2.x + p2.y * p2.y) * (p1.x - p0.x)) / d;
  const dx = p0.x - ux;
  const dy = p0.y - uy;
  const r = Math.sqrt(dx * dx + dy * dy);
  return { cx: ux, cy: uy, r };
}
function computeDelaunay(points) {
  if (points.length < 3) return [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  points.forEach((p) => {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  });
  const dx = maxX - minX;
  const dy = maxY - minY;
  const deltaMax = Math.max(dx, dy);
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const st0 = { id: "st0", x: midX - 20 * deltaMax, y: midY - deltaMax, z: 0 };
  const st1 = { id: "st1", x: midX, y: midY + 20 * deltaMax, z: 0 };
  const st2 = { id: "st2", x: midX + 20 * deltaMax, y: midY - deltaMax, z: 0 };
  let triangles = [];
  const c = getCircumcircle(st0, st1, st2);
  triangles.push({ v0: st0, v1: st1, v2: st2, cx: c.cx, cy: c.cy, r: c.r });
  points.forEach((p) => {
    const badTriangles = [];
    triangles.forEach((t) => {
      const dist = Math.sqrt((p.x - t.cx) ** 2 + (p.y - t.cy) ** 2);
      if (dist < t.r - 1e-9) {
        badTriangles.push(t);
      }
    });
    const polygon = [];
    badTriangles.forEach((t) => {
      const edges = [
        { from: t.v0, to: t.v1 },
        { from: t.v1, to: t.v2 },
        { from: t.v2, to: t.v0 }
      ];
      edges.forEach((edge) => {
        let shared = false;
        for (let i = 0; i < badTriangles.length; i++) {
          const other = badTriangles[i];
          if (other === t) continue;
          const otherEdges = [
            { from: other.v0, to: other.v1 },
            { from: other.v1, to: other.v2 },
            { from: other.v2, to: other.v0 }
          ];
          const isMatch = otherEdges.some(
            (oe) => oe.from.id === edge.from.id && oe.to.id === edge.to.id || oe.from.id === edge.to.id && oe.to.id === edge.from.id
          );
          if (isMatch) {
            shared = true;
            break;
          }
        }
        if (!shared) {
          polygon.push(edge);
        }
      });
    });
    triangles = triangles.filter((t) => !badTriangles.includes(t));
    polygon.forEach((edge) => {
      const circ = getCircumcircle(edge.from, edge.to, p);
      triangles.push({ v0: edge.from, v1: edge.to, v2: p, cx: circ.cx, cy: circ.cy, r: circ.r });
    });
  });
  triangles = triangles.filter(
    (t) => t.v0.id !== "st0" && t.v0.id !== "st1" && t.v0.id !== "st2" && t.v1.id !== "st0" && t.v1.id !== "st1" && t.v1.id !== "st2" && t.v2.id !== "st0" && t.v2.id !== "st1" && t.v2.id !== "st2"
  );
  return triangles;
}
export const ThreeDHeadVisualizer = ({
  yaw,
  pitch,
  roll,
  distance,
  faceDetected,
  minTriangleAngle,
  maxTriangleEdgeLength,
  enforceDelaunayCondition,
  onTriangulationStats,
  scanType = "chomiki_twarz",
  showLiveMesh = true,
  showRealTimeMetrics = true
}) => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState(null);
  const [hoveredTriangle, setHoveredTriangle] = useState(null);
  const [projectedNodes, setProjectedNodes] = useState([]);
  const [trianglesList, setTrianglesList] = useState([]);
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * canvas.width;
    const y = (e.clientY - rect.top) / rect.height * canvas.height;
    setMousePos({ x, y });
  };
  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredTriangle(null);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 16;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.save();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 110, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      if (!faceDetected) {
        ctx.save();
        ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2, canvas.height / 2, 70, 90, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "rgba(239, 68, 68, 0.8)";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillText("AWAITING 3D COHERENCE...", canvas.width / 2, canvas.height / 2 + 120);
        ctx.restore();
        return;
      }
      if (!showLiveMesh) {
        ctx.save();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 70, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "rgba(56, 189, 248, 0.6)";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillText("LIVE WIREFRAME OVERLAY SUSPENDED", canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillStyle = "rgba(56, 189, 248, 0.35)";
        ctx.fillText("(continuousScanning active / showLiveMesh = false)", canvas.width / 2, canvas.height / 2 + 10);
        ctx.restore();
        const pointsToUse2 = scanType === "oponka_brzuch" ? BELLY_MESH_POINTS : BASE_MESH_POINTS;
        const radPitch2 = pitch * Math.PI / 180;
        const radYaw2 = yaw * Math.PI / 180;
        const radRoll2 = roll * Math.PI / 180;
        const nominalDistance2 = 0.36;
        const distanceScale2 = nominalDistance2 / distance * 1.7;
        const centerX2 = canvas.width / 2;
        const centerY2 = canvas.height / 2;
        const nodes2 = pointsToUse2.map((pt) => {
          const jitterZ = pt.isLidarSensor ? Math.sin(Date.now() / 150 + pt.x) * 0.8 : 0;
          const y1 = pt.y * Math.cos(radPitch2) - (pt.z + jitterZ) * Math.sin(radPitch2);
          const z1 = pt.y * Math.sin(radPitch2) + (pt.z + jitterZ) * Math.cos(radPitch2);
          const x2 = pt.x * Math.cos(radYaw2) + z1 * Math.sin(radYaw2);
          const z2 = -pt.x * Math.sin(radYaw2) + z1 * Math.cos(radYaw2);
          const x3 = x2 * Math.cos(radRoll2) - y1 * Math.sin(radRoll2);
          const y3 = x2 * Math.sin(radRoll2) + y1 * Math.cos(radRoll2);
          return {
            id: pt.id,
            x: centerX2 + x3 * distanceScale2,
            y: centerY2 - y3 * distanceScale2,
            z: z2,
            isLidar: pt.isLidarSensor
          };
        });
        const delaunayTriangles2 = computeDelaunay(nodes2);
        onTriangulationStats({
          total: delaunayTriangles2.length,
          skinny: 0,
          tooLong: 0
        });
        return;
      }
      const radPitch = pitch * Math.PI / 180;
      const radYaw = yaw * Math.PI / 180;
      const radRoll = roll * Math.PI / 180;
      const nominalDistance = 0.36;
      const baseScale = 1.7;
      const distanceScale = nominalDistance / distance * baseScale;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const pointsToUse = scanType === "oponka_brzuch" ? BELLY_MESH_POINTS : BASE_MESH_POINTS;
      const nodes = pointsToUse.map((pt) => {
        const jitterZ = pt.isLidarSensor ? Math.sin(Date.now() / 150 + pt.x) * 0.8 : 0;
        const y1 = pt.y * Math.cos(radPitch) - (pt.z + jitterZ) * Math.sin(radPitch);
        const z1 = pt.y * Math.sin(radPitch) + (pt.z + jitterZ) * Math.cos(radPitch);
        const x2 = pt.x * Math.cos(radYaw) + z1 * Math.sin(radYaw);
        const z2 = -pt.x * Math.sin(radYaw) + z1 * Math.cos(radYaw);
        const x3 = x2 * Math.cos(radRoll) - y1 * Math.sin(radRoll);
        const y3 = x2 * Math.sin(radRoll) + y1 * Math.cos(radRoll);
        const screenX = centerX + x3 * distanceScale;
        const screenY = centerY - y3 * distanceScale;
        return {
          id: pt.id,
          x: screenX,
          y: screenY,
          z: z2,
          isLidar: pt.isLidarSensor
        };
      });
      setProjectedNodes(nodes);
      const delaunayTriangles = computeDelaunay(nodes);
      setTrianglesList(delaunayTriangles);
      let skinnyCount = 0;
      let tooLongCount = 0;
      let totalCount = delaunayTriangles.length;
      const getMmDistance = (n1, n2) => {
        const dx = (n1.x - n2.x) / distanceScale;
        const dy = (n1.y - n2.y) / distanceScale;
        const dz = n1.z - n2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
      };
      let activeHovered = null;
      if (mousePos) {
        for (let i = 0; i < delaunayTriangles.length; i++) {
          const t = delaunayTriangles[i];
          const area = 0.5 * (-t.v1.y * t.v2.x + t.v0.y * (-t.v1.x + t.v2.x) + t.v0.x * (t.v1.y - t.v2.y) + t.v1.x * t.v2.y);
          const s = 1 / (2 * area) * (t.v0.y * t.v2.x - t.v0.x * t.v2.y + (t.v2.y - t.v0.y) * mousePos.x + (t.v0.x - t.v2.x) * mousePos.y);
          const u = 1 / (2 * area) * (t.v0.x * t.v1.y - t.v0.y * t.v1.x + (t.v0.y - t.v1.y) * mousePos.x + (t.v1.x - t.v0.x) * mousePos.y);
          if (s >= 0 && u >= 0 && 1 - s - u >= 0) {
            activeHovered = t;
            break;
          }
        }
      }
      setHoveredTriangle(activeHovered);
      delaunayTriangles.forEach((t) => {
        const e1 = getMmDistance(t.v0, t.v1);
        const e2 = getMmDistance(t.v1, t.v2);
        const e3 = getMmDistance(t.v2, t.v0);
        const calculateAngle = (a, b, c) => {
          const val = (b * b + c * c - a * a) / (2 * b * c);
          return Math.acos(Math.max(-1, Math.min(1, val))) * 180 / Math.PI;
        };
        const angle0 = calculateAngle(e1, e2, e3);
        const angle1 = calculateAngle(e2, e3, e1);
        const angle2 = calculateAngle(e3, e1, e2);
        const minAngle = Math.min(angle0, angle1, angle2);
        const maxEdge = Math.max(e1, e2, e3);
        const isSkinny = minAngle < minTriangleAngle;
        const isTooLong = maxEdge > maxTriangleEdgeLength * 15;
        if (isSkinny) skinnyCount++;
        if (isTooLong) tooLongCount++;
        const isHovered = activeHovered && (activeHovered.v0.id === t.v0.id && activeHovered.v1.id === t.v1.id && activeHovered.v2.id === t.v2.id);
        let strokeColor = "rgba(56, 189, 248, 0.2)";
        let fillColor = "rgba(56, 189, 248, 0.02)";
        if (isTooLong) {
          strokeColor = "rgba(239, 68, 68, 0.35)";
          fillColor = "rgba(239, 68, 68, 0.03)";
        } else if (isSkinny) {
          strokeColor = "rgba(245, 158, 11, 0.35)";
          fillColor = "rgba(245, 158, 11, 0.03)";
        } else {
          strokeColor = "rgba(16, 185, 129, 0.3)";
          fillColor = "rgba(16, 185, 129, 0.04)";
        }
        if (isHovered) {
          strokeColor = "#10b981";
          fillColor = "rgba(16, 185, 129, 0.15)";
        }
        ctx.beginPath();
        ctx.moveTo(t.v0.x, t.v0.y);
        ctx.lineTo(t.v1.x, t.v1.y);
        ctx.lineTo(t.v2.x, t.v2.y);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = isHovered ? 1.5 : 0.85;
        ctx.stroke();
      });
      onTriangulationStats({
        total: totalCount,
        skinny: skinnyCount,
        tooLong: tooLongCount
      });
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.isLidar ? 1.8 : 2.5, 0, Math.PI * 2);
        if (n.isLidar) {
          ctx.fillStyle = "#38bdf8";
        } else if (n.id === "nose_tip" || n.id === "belly_navel") {
          ctx.fillStyle = "#f59e0b";
          ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = "#10b981";
        }
        ctx.fill();
      });
      if (activeHovered && enforceDelaunayCondition) {
        ctx.save();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(activeHovered.cx, activeHovered.cy, activeHovered.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = "#38bdf8";
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(activeHovered.cx - 5, activeHovered.cy);
        ctx.lineTo(activeHovered.cx + 5, activeHovered.cy);
        ctx.moveTo(activeHovered.cx, activeHovered.cy - 5);
        ctx.lineTo(activeHovered.cx, activeHovered.cy + 5);
        ctx.stroke();
        ctx.fillStyle = "#38bdf8";
        ctx.font = "8px monospace";
        ctx.fillText("CIRCUMCENTER", activeHovered.cx + 8, activeHovered.cy - 3);
        nodes.forEach((n) => {
          if (n.id === activeHovered?.v0.id || n.id === activeHovered?.v1.id || n.id === activeHovered?.v2.id) {
            return;
          }
          const dist = Math.sqrt((n.x - activeHovered.cx) ** 2 + (n.y - activeHovered.cy) ** 2);
          if (dist < activeHovered.r - 0.5) {
            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = "#ef4444";
            ctx.font = "7px monospace";
            ctx.fillText("INCIRCLE VIOLATION", n.x + 8, n.y + 2);
          }
        });
        ctx.restore();
      }
      ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 120);
      ctx.lineTo(centerX, centerY + 120);
      ctx.moveTo(centerX - 120, centerY);
      ctx.lineTo(centerX + 120, centerY);
      ctx.stroke();
    };
    const animLoop = () => {
      render();
      animationId = requestAnimationFrame(animLoop);
    };
    animLoop();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [yaw, pitch, roll, distance, faceDetected, minTriangleAngle, maxTriangleEdgeLength, enforceDelaunayCondition, mousePos, scanType, showLiveMesh]);
  return /* @__PURE__ */ jsxDEV("div", { className: "relative border border-slate-800 rounded-xl overflow-hidden bg-slate-950/80 aspect-square flex items-center justify-center", children: [
    /* @__PURE__ */ jsxDEV(
      "canvas",
      {
        ref: canvasRef,
        width: 340,
        height: 340,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        className: "w-full h-full max-w-[340px] max-h-[340px] z-10 block cursor-crosshair"
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
        lineNumber: 662,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-700 pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
      lineNumber: 672,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-700 pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
      lineNumber: 673,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-700 pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
      lineNumber: 674,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-700 pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
      lineNumber: 675,
      columnNumber: 7
    }, this),
    showRealTimeMetrics && /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-3 left-3 flex flex-col font-mono text-[9px] text-slate-400 gap-0.5 z-20 bg-slate-950/95 px-2 py-1.5 rounded border border-slate-800 shadow-xl max-w-[200px]", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 justify-between", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "TRIS COUNT:" }, void 0, false, {
          fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
          lineNumber: 681,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: trianglesList.length }, void 0, false, {
          fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
          lineNumber: 682,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
        lineNumber: 680,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 justify-between", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "YAW / PITCH:" }, void 0, false, {
          fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
          lineNumber: 685,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          yaw.toFixed(1),
          "° / ",
          pitch.toFixed(1),
          "°"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
          lineNumber: 686,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
        lineNumber: 684,
        columnNumber: 11
      }, this),
      hoveredTriangle && /* @__PURE__ */ jsxDEV("div", { className: "border-t border-slate-800 mt-1 pt-1 text-[8px] text-sky-400 flex flex-col gap-0.5", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-bold uppercase text-sky-300", children: "Selected Tri:" }, void 0, false, {
          fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
          lineNumber: 690,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "R_Circum: ",
          hoveredTriangle.r.toFixed(1),
          " px"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
          lineNumber: 691,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Vertices: ",
          hoveredTriangle.v0.id,
          ", ",
          hoveredTriangle.v1.id
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
          lineNumber: 692,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
        lineNumber: 689,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
      lineNumber: 679,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 right-3 font-mono text-[8px] text-sky-400 tracking-widest uppercase z-20 bg-slate-950/80 px-2 py-1 rounded border border-sky-950", children: scanType === "oponka_brzuch" ? "OB_ABDOMEN_MESH" : "DF_FACE_MESH" }, void 0, false, {
      fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
      lineNumber: 698,
      columnNumber: 7
    }, this),
    showRealTimeMetrics && showLiveMesh && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 left-3 font-mono text-[8px] text-slate-500 z-20 pointer-events-none", children: "HOVER TO TEST INCIRCLE" }, void 0, false, {
      fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
      lineNumber: 704,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ThreeDHeadVisualizer.tsx",
    lineNumber: 660,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRocmVlREhlYWRWaXN1YWxpemVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUcmlhbmdsZTNEIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgVGhyZWVESGVhZFZpc3VhbGl6ZXJQcm9wcyB7XG4gIHlhdzogbnVtYmVyOyAgICAgICAgICAgICAgICAgIC8vIGRlZ3JlZXNcbiAgcGl0Y2g6IG51bWJlcjsgICAgICAgICAgICAgICAgLy8gZGVncmVlc1xuICByb2xsOiBudW1iZXI7ICAgICAgICAgICAgICAgICAvLyBkZWdyZWVzXG4gIGRpc3RhbmNlOiBudW1iZXI7ICAgICAgICAgICAgIC8vIG1ldGVycyAoMC4yNSAtIDAuNDApXG4gIGZhY2VEZXRlY3RlZDogYm9vbGVhbjtcbiAgbWluVHJpYW5nbGVBbmdsZTogbnVtYmVyOyAgICAgLy8gZS5nLiAzMC4wXG4gIG1heFRyaWFuZ2xlRWRnZUxlbmd0aDogbnVtYmVyOyAvLyBlLmcuIDUuMCBpbiB2aXJ0dWFsIG1tXG4gIGVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbjogYm9vbGVhbjtcbiAgb25Ucmlhbmd1bGF0aW9uU3RhdHM6IChzdGF0czogeyB0b3RhbDogbnVtYmVyOyBza2lubnk6IG51bWJlcjsgdG9vTG9uZzogbnVtYmVyIH0pID0+IHZvaWQ7XG4gIHNjYW5UeXBlPzogc3RyaW5nO1xuICBzaG93TGl2ZU1lc2g/OiBib29sZWFuO1xuICBzaG93UmVhbFRpbWVNZXRyaWNzPzogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIFBvaW50M0Qge1xuICBpZDogc3RyaW5nO1xuICB4OiBudW1iZXI7ICAvLyByYXcgY29vcmRpbmF0ZXMgaW4gdmlydHVhbCBtbVxuICB5OiBudW1iZXI7XG4gIHo6IG51bWJlcjtcbiAgaXNMaWRhclNlbnNvcj86IGJvb2xlYW47XG59XG5cbi8vIEdlbmVyYXRlIGJhc2UgaGVhZCBtZXNoIHBvaW50cyAoYXBwcm94LiBmYWNlIHN0cnVjdHVyZSBpbiB2aXJ0dWFsIG1tKVxuLy8gQSBub3JtYWwgZmFjZSBpcyByb3VnaGx5IDE0MG1tIHdpZGUsIDE4MG1tIGhpZ2gsIGFuZCAxMDBtbSBkZWVwXG5jb25zdCBCQVNFX01FU0hfUE9JTlRTOiBQb2ludDNEW10gPSBbXG4gIC8vIFByaW1hcnkgRmFjZSBMYW5kbWFya3NcbiAgeyBpZDogJ25vc2VfdGlwJywgeDogMCwgeTogMCwgejogNDUgfSxcbiAgeyBpZDogJ25vc2VfYnJpZGdlJywgeDogMCwgeTogMTUsIHo6IDM1IH0sXG4gIHsgaWQ6ICdub3NlX2wnLCB4OiAtMTIsIHk6IC01LCB6OiAzMCB9LFxuICB7IGlkOiAnbm9zZV9yJywgeDogMTIsIHk6IC01LCB6OiAzMCB9LFxuICBcbiAgeyBpZDogJ2ZvcmVoZWFkX2NlbnRlcicsIHg6IDAsIHk6IDQ4LCB6OiAyMCB9LFxuICB7IGlkOiAnZm9yZWhlYWRfbDEnLCB4OiAtMjIsIHk6IDQyLCB6OiAxOCB9LFxuICB7IGlkOiAnZm9yZWhlYWRfcjEnLCB4OiAyMiwgeTogNDIsIHo6IDE4IH0sXG4gIHsgaWQ6ICdmb3JlaGVhZF9sMicsIHg6IC00NCwgeTogMzUsIHo6IDggfSxcbiAgeyBpZDogJ2ZvcmVoZWFkX3IyJywgeDogNDQsIHk6IDM1LCB6OiA4IH0sXG4gIFxuICB7IGlkOiAnZXllX2xfaW5uZXInLCB4OiAtMTYsIHk6IDE2LCB6OiAyMCB9LFxuICB7IGlkOiAnZXllX2xfb3V0ZXInLCB4OiAtMzQsIHk6IDE2LCB6OiAxNSB9LFxuICB7IGlkOiAnZXllX3JfaW5uZXInLCB4OiAxNiwgeTogMTYsIHo6IDIwIH0sXG4gIHsgaWQ6ICdleWVfcl9vdXRlcicsIHg6IDM0LCB5OiAxNiwgejogMTUgfSxcbiAgXG4gIHsgaWQ6ICdjaGVla19sX2hpZ2gnLCB4OiAtNDIsIHk6IDUsIHo6IDE1IH0sXG4gIHsgaWQ6ICdjaGVla19yX2hpZ2gnLCB4OiA0MiwgeTogNSwgejogMTUgfSxcbiAgeyBpZDogJ2NoZWVrX2xfbG93JywgeDogLTM1LCB5OiAtMTgsIHo6IDE1IH0sXG4gIHsgaWQ6ICdjaGVla19yX2xvdycsIHg6IDM1LCB5OiAtMTgsIHo6IDE1IH0sXG4gIFxuICB7IGlkOiAnbW91dGhfdG9wJywgeDogMCwgeTogLTE4LCB6OiAyNCB9LFxuICB7IGlkOiAnbW91dGhfYm90dG9tJywgeDogMCwgeTogLTMwLCB6OiAyNCB9LFxuICB7IGlkOiAnbW91dGhfbCcsIHg6IC0yMCwgeTogLTI0LCB6OiAyMCB9LFxuICB7IGlkOiAnbW91dGhfcicsIHg6IDIwLCB5OiAtMjQsIHo6IDIwIH0sXG4gIFxuICB7IGlkOiAnY2hpbl9jZW50ZXInLCB4OiAwLCB5OiAtNDgsIHo6IDIyIH0sXG4gIHsgaWQ6ICdjaGluX2wnLCB4OiAtMTYsIHk6IC00NSwgejogMTggfSxcbiAgeyBpZDogJ2NoaW5fcicsIHg6IDE2LCB5OiAtNDUsIHo6IDE4IH0sXG5cbiAgLy8gT3V0ZXIgamF3IHBvaW50c1xuICB7IGlkOiAnamF3X2xfaGlnaCcsIHg6IC01NSwgeTogMTAsIHo6IC0xMCB9LFxuICB7IGlkOiAnamF3X3JfaGlnaCcsIHg6IDU1LCB5OiAxMCwgejogLTEwIH0sXG4gIHsgaWQ6ICdqYXdfbF9taWQnLCB4OiAtNDgsIHk6IC0xNSwgejogLTIgfSxcbiAgeyBpZDogJ2phd19yX21pZCcsIHg6IDQ4LCB5OiAtMTUsIHo6IC0yIH0sXG4gIHsgaWQ6ICdqYXdfbF9sb3cnLCB4OiAtMzIsIHk6IC0zNSwgejogOCB9LFxuICB7IGlkOiAnamF3X3JfbG93JywgeDogMzIsIHk6IC0zNSwgejogOCB9LFxuXG4gIC8vIEZ1c2VkIExpREFSIGdyaWQgcG9pbnRzIChzaW11bGF0aW5nIGFjdGl2ZSBkZXB0aCBzY2FuIHBvaW50cyBzY2F0dGVyZWQgaW4gdGhlIGJvdW5kcylcbiAgeyBpZDogJ2xpZGFyXzEnLCB4OiAtMjAsIHk6IDMwLCB6OiAxMiwgaXNMaWRhclNlbnNvcjogdHJ1ZSB9LFxuICB7IGlkOiAnbGlkYXJfMicsIHg6IDIwLCB5OiAzMCwgejogMTIsIGlzTGlkYXJTZW5zb3I6IHRydWUgfSxcbiAgeyBpZDogJ2xpZGFyXzMnLCB4OiAtMTAsIHk6IDEwLCB6OiAyNSwgaXNMaWRhclNlbnNvcjogdHJ1ZSB9LFxuICB7IGlkOiAnbGlkYXJfNCcsIHg6IDEwLCB5OiAxMCwgejogMjUsIGlzTGlkYXJTZW5zb3I6IHRydWUgfSxcbiAgeyBpZDogJ2xpZGFyXzUnLCB4OiAtMjUsIHk6IC04LCB6OiAxOCwgaXNMaWRhclNlbnNvcjogdHJ1ZSB9LFxuICB7IGlkOiAnbGlkYXJfNicsIHg6IDI1LCB5OiAtOCwgejogMTgsIGlzTGlkYXJTZW5zb3I6IHRydWUgfSxcbiAgeyBpZDogJ2xpZGFyXzcnLCB4OiAtMTIsIHk6IC0zNSwgejogMTUsIGlzTGlkYXJTZW5zb3I6IHRydWUgfSxcbiAgeyBpZDogJ2xpZGFyXzgnLCB4OiAxMiwgeTogLTM1LCB6OiAxNSwgaXNMaWRhclNlbnNvcjogdHJ1ZSB9LFxuICB7IGlkOiAnbGlkYXJfOScsIHg6IDAsIHk6IDMyLCB6OiAxNiwgaXNMaWRhclNlbnNvcjogdHJ1ZSB9LFxuICB7IGlkOiAnbGlkYXJfMTAnLCB4OiAwLCB5OiAtMTAsIHo6IDI4LCBpc0xpZGFyU2Vuc29yOiB0cnVlIH0sXG5dO1xuXG5jb25zdCBCRUxMWV9NRVNIX1BPSU5UUzogUG9pbnQzRFtdID0gW1xuICAvLyBCZWxseSBidXR0b24gKG5hdmVsIGNlbnRlcilcbiAgeyBpZDogJ2JlbGx5X25hdmVsJywgeDogMCwgeTogMCwgejogNDYgfSxcbiAgeyBpZDogJ2JlbGx5X25hdmVsX3UnLCB4OiAwLCB5OiAxNSwgejogMzggfSxcbiAgeyBpZDogJ2JlbGx5X25hdmVsX2QnLCB4OiAwLCB5OiAtMTUsIHo6IDM4IH0sXG4gIHsgaWQ6ICdiZWxseV9uYXZlbF9sJywgeDogLTE1LCB5OiAwLCB6OiAzOCB9LFxuICB7IGlkOiAnYmVsbHlfbmF2ZWxfcicsIHg6IDE1LCB5OiAwLCB6OiAzOCB9LFxuICBcbiAgLy8gVXBwZXIgYmVsbHkgY3JlYXNlIChob3Jpem9udGFsIGN1cnZlKVxuICB7IGlkOiAnYmVsbHlfdV9taWQnLCB4OiAwLCB5OiA0NSwgejogMjAgfSxcbiAgeyBpZDogJ2JlbGx5X3VfbDEnLCB4OiAtMjQsIHk6IDQyLCB6OiAxOCB9LFxuICB7IGlkOiAnYmVsbHlfdV9yMScsIHg6IDI0LCB5OiA0MiwgejogMTggfSxcbiAgeyBpZDogJ2JlbGx5X3VfbDInLCB4OiAtNDgsIHk6IDM0LCB6OiAxMCB9LFxuICB7IGlkOiAnYmVsbHlfdV9yMicsIHg6IDQ4LCB5OiAzNCwgejogMTAgfSxcbiAgeyBpZDogJ2JlbGx5X3VfbDMnLCB4OiAtNzAsIHk6IDI0LCB6OiAtNCB9LFxuICB7IGlkOiAnYmVsbHlfdV9yMycsIHg6IDcwLCB5OiAyNCwgejogLTQgfSxcbiAgXG4gIC8vIEFiZG9taW5hbCBmb2xkIChtaWQgc2VjdGlvbiBvZiB0aGUgJ29wb25rYScgZmF0IHJvbGwgcmluZylcbiAgeyBpZDogJ2JlbGx5X21fbDEnLCB4OiAtMzIsIHk6IDIsIHo6IDM0IH0sXG4gIHsgaWQ6ICdiZWxseV9tX3IxJywgeDogMzIsIHk6IDIsIHo6IDM0IH0sXG4gIHsgaWQ6ICdiZWxseV9tX2wyJywgeDogLTU1LCB5OiAtMiwgejogMjQgfSxcbiAgeyBpZDogJ2JlbGx5X21fcjInLCB4OiA1NSwgeTogLTIsIHo6IDI0IH0sXG4gIHsgaWQ6ICdiZWxseV9tX2wzJywgeDogLTc1LCB5OiAtNiwgejogMTAgfSxcbiAgeyBpZDogJ2JlbGx5X21fcjMnLCB4OiA3NSwgeTogLTYsIHo6IDEwIH0sXG4gIFxuICAvLyBMb3dlciBiZWxseSBmb2xkXG4gIHsgaWQ6ICdiZWxseV9kX21pZCcsIHg6IDAsIHk6IC00NSwgejogMjQgfSxcbiAgeyBpZDogJ2JlbGx5X2RfbDEnLCB4OiAtMjQsIHk6IC00MiwgejogMjIgfSxcbiAgeyBpZDogJ2JlbGx5X2RfcjEnLCB4OiAyNCwgeTogLTQyLCB6OiAyMiB9LFxuICB7IGlkOiAnYmVsbHlfZF9sMicsIHg6IC00OCwgeTogLTM0LCB6OiAxNCB9LFxuICB7IGlkOiAnYmVsbHlfZF9yMicsIHg6IDQ4LCB5OiAtMzQsIHo6IDE0IH0sXG4gIHsgaWQ6ICdiZWxseV9kX2wzJywgeDogLTcwLCB5OiAtMjQsIHo6IDQgfSxcbiAgeyBpZDogJ2JlbGx5X2RfcjMnLCB4OiA3MCwgeTogLTI0LCB6OiA0IH0sXG4gIFxuICAvLyBBYmRvbWluYWwgcGVyaXBoZXJhbCBzY2F0dGVyXG4gIHsgaWQ6ICdiZWxseV9saWRhcl8xJywgeDogLTIwLCB5OiAyMiwgejogMjYsIGlzTGlkYXJTZW5zb3I6IHRydWUgfSxcbiAgeyBpZDogJ2JlbGx5X2xpZGFyXzInLCB4OiAyMCwgeTogMjIsIHo6IDI2LCBpc0xpZGFyU2Vuc29yOiB0cnVlIH0sXG4gIHsgaWQ6ICdiZWxseV9saWRhcl8zJywgeDogLTM1LCB5OiAtMjIsIHo6IDIwLCBpc0xpZGFyU2Vuc29yOiB0cnVlIH0sXG4gIHsgaWQ6ICdiZWxseV9saWRhcl80JywgeDogMzUsIHk6IC0yMiwgejogMjAsIGlzTGlkYXJTZW5zb3I6IHRydWUgfSxcbiAgeyBpZDogJ2JlbGx5X2xpZGFyXzUnLCB4OiAwLCB5OiAyOCwgejogMjgsIGlzTGlkYXJTZW5zb3I6IHRydWUgfSxcbiAgeyBpZDogJ2JlbGx5X2xpZGFyXzYnLCB4OiAwLCB5OiAtMjgsIHo6IDI4LCBpc0xpZGFyU2Vuc29yOiB0cnVlIH0sXG4gIHsgaWQ6ICdiZWxseV9saWRhcl83JywgeDogLTU1LCB5OiAxMCwgejogMTUsIGlzTGlkYXJTZW5zb3I6IHRydWUgfSxcbiAgeyBpZDogJ2JlbGx5X2xpZGFyXzgnLCB4OiA1NSwgeTogMTAsIHo6IDE1LCBpc0xpZGFyU2Vuc29yOiB0cnVlIH0sXG5dO1xuXG4vLyBIZWxwZXIgc3RydWN0dXJlcyBmb3IgQm93eWVyLVdhdHNvbiBEZWxhdW5heSBUcmlhbmd1bGF0aW9uXG5pbnRlcmZhY2UgTm9kZSB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB6OiBudW1iZXI7XG4gIGlkOiBzdHJpbmc7XG4gIGlzTGlkYXI/OiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgVHJpYW5nbGUge1xuICB2MDogTm9kZTtcbiAgdjE6IE5vZGU7XG4gIHYyOiBOb2RlO1xuICBjeDogbnVtYmVyOyAvLyBDaXJjdW1jZW50ZXIgeFxuICBjeTogbnVtYmVyOyAvLyBDaXJjdW1jZW50ZXIgeVxuICByOiBudW1iZXI7ICAvLyBDaXJjdW1yYWRpdXNcbn1cblxuLy8gQ2FsY3VsYXRlIENpcmN1bWNpcmNsZVxuZnVuY3Rpb24gZ2V0Q2lyY3VtY2lyY2xlKHAwOiBOb2RlLCBwMTogTm9kZSwgcDI6IE5vZGUpOiB7IGN4OiBudW1iZXI7IGN5OiBudW1iZXI7IHI6IG51bWJlciB9IHtcbiAgY29uc3QgZCA9IDIgKiAocDAueCAqIChwMS55IC0gcDIueSkgKyBwMS54ICogKHAyLnkgLSBwMC55KSArIHAyLnggKiAocDAueSAtIHAxLnkpKTtcbiAgaWYgKE1hdGguYWJzKGQpIDwgMWUtOSkge1xuICAgIC8vIENvbGxpbmVhciBwb2ludHMsIHJldHVybiBleHRyZW1lbHkgbGFyZ2UgY2lyY3VtY2lyY2xlXG4gICAgcmV0dXJuIHsgY3g6IDAsIGN5OiAwLCByOiAxZTkgfTtcbiAgfVxuICBcbiAgY29uc3QgdXggPSAoKHAwLnggKiBwMC54ICsgcDAueSAqIHAwLnkpICogKHAxLnkgLSBwMi55KSArIFxuICAgICAgICAgICAgICAocDEueCAqIHAxLnggKyBwMS55ICogcDEueSkgKiAocDIueSAtIHAwLnkpICsgXG4gICAgICAgICAgICAgIChwMi54ICogcDIueCArIHAyLnkgKiBwMi55KSAqIChwMC55IC0gcDEueSkpIC8gZDtcbiAgICAgICAgICAgICAgXG4gIGNvbnN0IHV5ID0gKChwMC54ICogcDAueCArIHAwLnkgKiBwMC55KSAqIChwMi54IC0gcDEueCkgKyBcbiAgICAgICAgICAgICAgKHAxLnggKiBwMS54ICsgcDEueSAqIHAxLnkpICogKHAwLnggLSBwMi54KSArIFxuICAgICAgICAgICAgICAocDIueCAqIHAyLnggKyBwMi55ICogcDIueSkgKiAocDEueCAtIHAwLngpKSAvIGQ7XG4gICAgICAgICAgICAgIFxuICBjb25zdCBkeCA9IHAwLnggLSB1eDtcbiAgY29uc3QgZHkgPSBwMC55IC0gdXk7XG4gIGNvbnN0IHIgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICBcbiAgcmV0dXJuIHsgY3g6IHV4LCBjeTogdXksIHIgfTtcbn1cblxuLy8gQm93eWVyLVdhdHNvbiBEZWxhdW5heSBUcmlhbmd1bGF0aW9uXG5mdW5jdGlvbiBjb21wdXRlRGVsYXVuYXkocG9pbnRzOiBOb2RlW10pOiBUcmlhbmdsZVtdIHtcbiAgaWYgKHBvaW50cy5sZW5ndGggPCAzKSByZXR1cm4gW107XG5cbiAgLy8gRmluZCBib3VuZGluZyBib3ggdG8gY29uc3RydWN0IHN1cGVyLXRyaWFuZ2xlXG4gIGxldCBtaW5YID0gSW5maW5pdHksIG1pblkgPSBJbmZpbml0eSwgbWF4WCA9IC1JbmZpbml0eSwgbWF4WSA9IC1JbmZpbml0eTtcbiAgcG9pbnRzLmZvckVhY2gocCA9PiB7XG4gICAgaWYgKHAueCA8IG1pblgpIG1pblggPSBwLng7XG4gICAgaWYgKHAueSA8IG1pblkpIG1pblkgPSBwLnk7XG4gICAgaWYgKHAueCA+IG1heFgpIG1heFggPSBwLng7XG4gICAgaWYgKHAueSA+IG1heFkpIG1heFkgPSBwLnk7XG4gIH0pO1xuXG4gIGNvbnN0IGR4ID0gbWF4WCAtIG1pblg7XG4gIGNvbnN0IGR5ID0gbWF4WSAtIG1pblk7XG4gIGNvbnN0IGRlbHRhTWF4ID0gTWF0aC5tYXgoZHgsIGR5KTtcbiAgY29uc3QgbWlkWCA9IChtaW5YICsgbWF4WCkgLyAyO1xuICBjb25zdCBtaWRZID0gKG1pblkgKyBtYXhZKSAvIDI7XG5cbiAgLy8gRGVmaW5lIHN1cGVyLXRyaWFuZ2xlIHZlcnRpY2VzIChzdWZmaWNpZW50bHkgbGFyZ2UgdG8gZW5jb21wYXNzIGFsbCBwb2ludHMpXG4gIGNvbnN0IHN0MDogTm9kZSA9IHsgaWQ6ICdzdDAnLCB4OiBtaWRYIC0gMjAgKiBkZWx0YU1heCwgeTogbWlkWSAtIGRlbHRhTWF4LCB6OiAwIH07XG4gIGNvbnN0IHN0MTogTm9kZSA9IHsgaWQ6ICdzdDEnLCB4OiBtaWRYLCB5OiBtaWRZICsgMjAgKiBkZWx0YU1heCwgejogMCB9O1xuICBjb25zdCBzdDI6IE5vZGUgPSB7IGlkOiAnc3QyJywgeDogbWlkWCArIDIwICogZGVsdGFNYXgsIHk6IG1pZFkgLSBkZWx0YU1heCwgejogMCB9O1xuXG4gIGxldCB0cmlhbmdsZXM6IFRyaWFuZ2xlW10gPSBbXTtcbiAgY29uc3QgYyA9IGdldENpcmN1bWNpcmNsZShzdDAsIHN0MSwgc3QyKTtcbiAgdHJpYW5nbGVzLnB1c2goeyB2MDogc3QwLCB2MTogc3QxLCB2Mjogc3QyLCBjeDogYy5jeCwgY3k6IGMuY3ksIHI6IGMuciB9KTtcblxuICBwb2ludHMuZm9yRWFjaChwID0+IHtcbiAgICBjb25zdCBiYWRUcmlhbmdsZXM6IFRyaWFuZ2xlW10gPSBbXTtcbiAgICB0cmlhbmdsZXMuZm9yRWFjaCh0ID0+IHtcbiAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoKHAueCAtIHQuY3gpICoqIDIgKyAocC55IC0gdC5jeSkgKiogMik7XG4gICAgICBpZiAoZGlzdCA8IHQuciAtIDFlLTkpIHtcbiAgICAgICAgYmFkVHJpYW5nbGVzLnB1c2godCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwb2x5Z29uOiB7IGZyb206IE5vZGU7IHRvOiBOb2RlIH1bXSA9IFtdO1xuICAgIGJhZFRyaWFuZ2xlcy5mb3JFYWNoKHQgPT4ge1xuICAgICAgY29uc3QgZWRnZXMgPSBbXG4gICAgICAgIHsgZnJvbTogdC52MCwgdG86IHQudjEgfSxcbiAgICAgICAgeyBmcm9tOiB0LnYxLCB0bzogdC52MiB9LFxuICAgICAgICB7IGZyb206IHQudjIsIHRvOiB0LnYwIH1cbiAgICAgIF07XG5cbiAgICAgIGVkZ2VzLmZvckVhY2goZWRnZSA9PiB7XG4gICAgICAgIC8vIEZpbmQgaWYgdGhpcyBlZGdlIGlzIHNoYXJlZCB3aXRoIGFueSBvdGhlciBiYWQgdHJpYW5nbGVcbiAgICAgICAgbGV0IHNoYXJlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhZFRyaWFuZ2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG90aGVyID0gYmFkVHJpYW5nbGVzW2ldO1xuICAgICAgICAgIGlmIChvdGhlciA9PT0gdCkgY29udGludWU7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3Qgb3RoZXJFZGdlcyA9IFtcbiAgICAgICAgICAgIHsgZnJvbTogb3RoZXIudjAsIHRvOiBvdGhlci52MSB9LFxuICAgICAgICAgICAgeyBmcm9tOiBvdGhlci52MSwgdG86IG90aGVyLnYyIH0sXG4gICAgICAgICAgICB7IGZyb206IG90aGVyLnYyLCB0bzogb3RoZXIudjAgfVxuICAgICAgICAgIF07XG5cbiAgICAgICAgICBjb25zdCBpc01hdGNoID0gb3RoZXJFZGdlcy5zb21lKG9lID0+IFxuICAgICAgICAgICAgKG9lLmZyb20uaWQgPT09IGVkZ2UuZnJvbS5pZCAmJiBvZS50by5pZCA9PT0gZWRnZS50by5pZCkgfHxcbiAgICAgICAgICAgIChvZS5mcm9tLmlkID09PSBlZGdlLnRvLmlkICYmIG9lLnRvLmlkID09PSBlZGdlLmZyb20uaWQpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChpc01hdGNoKSB7XG4gICAgICAgICAgICBzaGFyZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzaGFyZWQpIHtcbiAgICAgICAgICBwb2x5Z29uLnB1c2goZWRnZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUmVtb3ZlIGJhZCB0cmlhbmdsZXNcbiAgICB0cmlhbmdsZXMgPSB0cmlhbmdsZXMuZmlsdGVyKHQgPT4gIWJhZFRyaWFuZ2xlcy5pbmNsdWRlcyh0KSk7XG5cbiAgICAvLyBDcmVhdGUgbmV3IHRyaWFuZ2xlcyBmcm9tIHAgdG8gYWxsIHBvbHlnb24gZWRnZXNcbiAgICBwb2x5Z29uLmZvckVhY2goZWRnZSA9PiB7XG4gICAgICBjb25zdCBjaXJjID0gZ2V0Q2lyY3VtY2lyY2xlKGVkZ2UuZnJvbSwgZWRnZS50bywgcCk7XG4gICAgICB0cmlhbmdsZXMucHVzaCh7IHYwOiBlZGdlLmZyb20sIHYxOiBlZGdlLnRvLCB2MjogcCwgY3g6IGNpcmMuY3gsIGN5OiBjaXJjLmN5LCByOiBjaXJjLnIgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFJlbW92ZSBhbnkgdHJpYW5nbGVzIGNvbnRhaW5pbmcgc3VwZXItdHJpYW5nbGUgdmVydGljZXNcbiAgdHJpYW5nbGVzID0gdHJpYW5nbGVzLmZpbHRlcih0ID0+IFxuICAgIHQudjAuaWQgIT09ICdzdDAnICYmIHQudjAuaWQgIT09ICdzdDEnICYmIHQudjAuaWQgIT09ICdzdDInICYmXG4gICAgdC52MS5pZCAhPT0gJ3N0MCcgJiYgdC52MS5pZCAhPT0gJ3N0MScgJiYgdC52MS5pZCAhPT0gJ3N0MicgJiZcbiAgICB0LnYyLmlkICE9PSAnc3QwJyAmJiB0LnYyLmlkICE9PSAnc3QxJyAmJiB0LnYyLmlkICE9PSAnc3QyJ1xuICApO1xuXG4gIHJldHVybiB0cmlhbmdsZXM7XG59XG5cbmV4cG9ydCBjb25zdCBUaHJlZURIZWFkVmlzdWFsaXplcjogUmVhY3QuRkM8VGhyZWVESGVhZFZpc3VhbGl6ZXJQcm9wcz4gPSAoe1xuICB5YXcsXG4gIHBpdGNoLFxuICByb2xsLFxuICBkaXN0YW5jZSxcbiAgZmFjZURldGVjdGVkLFxuICBtaW5UcmlhbmdsZUFuZ2xlLFxuICBtYXhUcmlhbmdsZUVkZ2VMZW5ndGgsXG4gIGVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbixcbiAgb25Ucmlhbmd1bGF0aW9uU3RhdHMsXG4gIHNjYW5UeXBlID0gJ2Nob21pa2lfdHdhcnonLFxuICBzaG93TGl2ZU1lc2ggPSB0cnVlLFxuICBzaG93UmVhbFRpbWVNZXRyaWNzID0gdHJ1ZSxcbn0pID0+IHtcbiAgY29uc3QgY2FudmFzUmVmID0gdXNlUmVmPEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIFxuICAvLyBJbnRlcmFjdGl2ZSBob3ZlcmluZy9zZWxlY3RlZCB0cmlhbmdsZSBmb3IgSW5DaXJjbGUgZGVtb25zdHJhdGlvblxuICBjb25zdCBbbW91c2VQb3MsIHNldE1vdXNlUG9zXSA9IHVzZVN0YXRlPHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaG92ZXJlZFRyaWFuZ2xlLCBzZXRIb3ZlcmVkVHJpYW5nbGVdID0gdXNlU3RhdGU8VHJpYW5nbGUgfCBudWxsPihudWxsKTtcblxuICAvLyBDYWNoZSBvZiBwcm9qZWN0ZWQgY29vcmRpbmF0ZXMgJiBjb21wdXRlZCBEZWxhdW5heSB0cmlhbmdsZXMgdG8gZGVjb3VwbGUgbG9naWNcbiAgY29uc3QgW3Byb2plY3RlZE5vZGVzLCBzZXRQcm9qZWN0ZWROb2Rlc10gPSB1c2VTdGF0ZTxOb2RlW10+KFtdKTtcbiAgY29uc3QgW3RyaWFuZ2xlc0xpc3QsIHNldFRyaWFuZ2xlc0xpc3RdID0gdXNlU3RhdGU8VHJpYW5nbGVbXT4oW10pO1xuXG4gIC8vIFVwZGF0ZSBob3ZlciBjb29yZGluYXRlc1xuICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSAoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgXG4gICAgLy8gU2NhbGUgbW91c2UgY29vcmRpbmF0ZXMgdG8gbWF0Y2ggY2FudmFzIGNvb3JkaW5hdGUgc2NhbGVcbiAgICBjb25zdCB4ID0gKChlLmNsaWVudFggLSByZWN0LmxlZnQpIC8gcmVjdC53aWR0aCkgKiBjYW52YXMud2lkdGg7XG4gICAgY29uc3QgeSA9ICgoZS5jbGllbnRZIC0gcmVjdC50b3ApIC8gcmVjdC5oZWlnaHQpICogY2FudmFzLmhlaWdodDtcbiAgICBzZXRNb3VzZVBvcyh7IHgsIHkgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICBzZXRNb3VzZVBvcyhudWxsKTtcbiAgICBzZXRIb3ZlcmVkVHJpYW5nbGUobnVsbCk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGlmICghY3R4KSByZXR1cm47XG5cbiAgICBsZXQgYW5pbWF0aW9uSWQ6IG51bWJlcjtcblxuICAgIGNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgIFxuICAgICAgLy8gRHJhdyBwcm9mZXNzaW9uYWwgYmx1ZXByaW50LWxpa2UgZ3JpZCBiYWNrZ3JvdW5kXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSg1NiwgMTg5LCAyNDgsIDAuMDQpJztcbiAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgY29uc3QgZ3JpZFNpemUgPSAxNjtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgY2FudmFzLndpZHRoOyB4ICs9IGdyaWRTaXplKSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyh4LCAwKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4LCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjYW52YXMuaGVpZ2h0OyB5ICs9IGdyaWRTaXplKSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbygwLCB5KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjYW52YXMud2lkdGgsIHkpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbmRlciBvdXRlciByYWRhciBib3VuZHNcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSg1NiwgMTg5LCAyNDgsIDAuMSknO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCAxMTAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgIGlmICghZmFjZURldGVjdGVkKSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDIzOSwgNjgsIDY4LCAwLjQpJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuNTtcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFs0LCA0XSk7XG4gICAgICAgIFxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5lbGxpcHNlKGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCA3MCwgOTAsIDAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgyMzksIDY4LCA2OCwgMC44KSc7XG4gICAgICAgIGN0eC5mb250ID0gJzlweCBtb25vc3BhY2UnO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGN0eC5maWxsVGV4dCgnQVdBSVRJTkcgM0QgQ09IRVJFTkNFLi4uJywgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIgKyAxMjApO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghc2hvd0xpdmVNZXNoKSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC4yKSc7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBjdHguc2V0TGluZURhc2goWzIsIDJdKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCA3MCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC42KSc7XG4gICAgICAgIGN0eC5mb250ID0gJzlweCBtb25vc3BhY2UnO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGN0eC5maWxsVGV4dCgnTElWRSBXSVJFRlJBTUUgT1ZFUkxBWSBTVVNQRU5ERUQnLCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiAtIDEwKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC4zNSknO1xuICAgICAgICBjdHguZmlsbFRleHQoJyhjb250aW51b3VzU2Nhbm5pbmcgYWN0aXZlIC8gc2hvd0xpdmVNZXNoID0gZmFsc2UpJywgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIgKyAxMCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBTdGlsbCBjYWxjdWxhdGUgc3RhdGlzdGljcyBzaWxlbnRseSBmb3IgdGhlIGNvaGVyZW5jZSBlbmdpbmVcbiAgICAgICAgY29uc3QgcG9pbnRzVG9Vc2UgPSBzY2FuVHlwZSA9PT0gJ29wb25rYV9icnp1Y2gnID8gQkVMTFlfTUVTSF9QT0lOVFMgOiBCQVNFX01FU0hfUE9JTlRTO1xuICAgICAgICBjb25zdCByYWRQaXRjaCA9IChwaXRjaCAqIE1hdGguUEkpIC8gMTgwO1xuICAgICAgICBjb25zdCByYWRZYXcgPSAoeWF3ICogTWF0aC5QSSkgLyAxODA7XG4gICAgICAgIGNvbnN0IHJhZFJvbGwgPSAocm9sbCAqIE1hdGguUEkpIC8gMTgwO1xuICAgICAgICBjb25zdCBub21pbmFsRGlzdGFuY2UgPSAwLjM2O1xuICAgICAgICBjb25zdCBkaXN0YW5jZVNjYWxlID0gKG5vbWluYWxEaXN0YW5jZSAvIGRpc3RhbmNlKSAqIDEuNztcbiAgICAgICAgY29uc3QgY2VudGVyWCA9IGNhbnZhcy53aWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IGNlbnRlclkgPSBjYW52YXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5vZGVzOiBOb2RlW10gPSBwb2ludHNUb1VzZS5tYXAoKHB0KSA9PiB7XG4gICAgICAgICAgY29uc3Qgaml0dGVyWiA9IHB0LmlzTGlkYXJTZW5zb3IgPyAoTWF0aC5zaW4oRGF0ZS5ub3coKSAvIDE1MCArIHB0LngpICogMC44KSA6IDA7XG4gICAgICAgICAgY29uc3QgeTEgPSBwdC55ICogTWF0aC5jb3MocmFkUGl0Y2gpIC0gKHB0LnogKyBqaXR0ZXJaKSAqIE1hdGguc2luKHJhZFBpdGNoKTtcbiAgICAgICAgICBjb25zdCB6MSA9IHB0LnkgKiBNYXRoLnNpbihyYWRQaXRjaCkgKyAocHQueiArIGppdHRlclopICogTWF0aC5jb3MocmFkUGl0Y2gpO1xuICAgICAgICAgIGNvbnN0IHgyID0gcHQueCAqIE1hdGguY29zKHJhZFlhdykgKyB6MSAqIE1hdGguc2luKHJhZFlhdyk7XG4gICAgICAgICAgY29uc3QgejIgPSAtcHQueCAqIE1hdGguc2luKHJhZFlhdykgKyB6MSAqIE1hdGguY29zKHJhZFlhdyk7XG4gICAgICAgICAgY29uc3QgeDMgPSB4MiAqIE1hdGguY29zKHJhZFJvbGwpIC0geTEgKiBNYXRoLnNpbihyYWRSb2xsKTtcbiAgICAgICAgICBjb25zdCB5MyA9IHgyICogTWF0aC5zaW4ocmFkUm9sbCkgKyB5MSAqIE1hdGguY29zKHJhZFJvbGwpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogcHQuaWQsXG4gICAgICAgICAgICB4OiBjZW50ZXJYICsgeDMgKiBkaXN0YW5jZVNjYWxlLFxuICAgICAgICAgICAgeTogY2VudGVyWSAtIHkzICogZGlzdGFuY2VTY2FsZSxcbiAgICAgICAgICAgIHo6IHoyLFxuICAgICAgICAgICAgaXNMaWRhcjogcHQuaXNMaWRhclNlbnNvclxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkZWxhdW5heVRyaWFuZ2xlcyA9IGNvbXB1dGVEZWxhdW5heShub2Rlcyk7XG4gICAgICAgIG9uVHJpYW5ndWxhdGlvblN0YXRzKHtcbiAgICAgICAgICB0b3RhbDogZGVsYXVuYXlUcmlhbmdsZXMubGVuZ3RoLFxuICAgICAgICAgIHNraW5ueTogMCxcbiAgICAgICAgICB0b29Mb25nOiAwLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBDb252ZXJ0IGFuZ2xlcyB0byByYWRpYW5zXG4gICAgICBjb25zdCByYWRQaXRjaCA9IChwaXRjaCAqIE1hdGguUEkpIC8gMTgwO1xuICAgICAgY29uc3QgcmFkWWF3ID0gKHlhdyAqIE1hdGguUEkpIC8gMTgwO1xuICAgICAgY29uc3QgcmFkUm9sbCA9IChyb2xsICogTWF0aC5QSSkgLyAxODA7XG5cbiAgICAgIC8vIERpc3RhbmNlIG1hcHBpbmc6IENsb3NlciA9IGxhcmdlciBzY2FsZS5cbiAgICAgIGNvbnN0IG5vbWluYWxEaXN0YW5jZSA9IDAuMzY7XG4gICAgICBjb25zdCBiYXNlU2NhbGUgPSAxLjc7IFxuICAgICAgY29uc3QgZGlzdGFuY2VTY2FsZSA9IChub21pbmFsRGlzdGFuY2UgLyBkaXN0YW5jZSkgKiBiYXNlU2NhbGU7XG5cbiAgICAgIGNvbnN0IGNlbnRlclggPSBjYW52YXMud2lkdGggLyAyO1xuICAgICAgY29uc3QgY2VudGVyWSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuXG4gICAgICAvLyAxLiBQcm9qZWN0IDNEIG5vZGVzIHRvIDJEIHNjcmVlbiBjb29yZGluYXRlc1xuICAgICAgY29uc3QgcG9pbnRzVG9Vc2UgPSBzY2FuVHlwZSA9PT0gJ29wb25rYV9icnp1Y2gnID8gQkVMTFlfTUVTSF9QT0lOVFMgOiBCQVNFX01FU0hfUE9JTlRTO1xuICAgICAgY29uc3Qgbm9kZXM6IE5vZGVbXSA9IHBvaW50c1RvVXNlLm1hcCgocHQpID0+IHtcbiAgICAgICAgLy8gU2xpZ2h0IG1pY3JvLWppdHRlciB0byBzaW11bGF0ZSBhY3RpdmUgNjBIeiBMaURBUiBmbHVjdHVhdGlvbnNcbiAgICAgICAgY29uc3Qgaml0dGVyWiA9IHB0LmlzTGlkYXJTZW5zb3IgPyAoTWF0aC5zaW4oRGF0ZS5ub3coKSAvIDE1MCArIHB0LngpICogMC44KSA6IDA7XG4gICAgICAgIFxuICAgICAgICAvLyBQaXRjaCAoWC1heGlzKVxuICAgICAgICBjb25zdCB5MSA9IHB0LnkgKiBNYXRoLmNvcyhyYWRQaXRjaCkgLSAocHQueiArIGppdHRlclopICogTWF0aC5zaW4ocmFkUGl0Y2gpO1xuICAgICAgICBjb25zdCB6MSA9IHB0LnkgKiBNYXRoLnNpbihyYWRQaXRjaCkgKyAocHQueiArIGppdHRlclopICogTWF0aC5jb3MocmFkUGl0Y2gpO1xuXG4gICAgICAgIC8vIFlhdyAoWS1heGlzKVxuICAgICAgICBjb25zdCB4MiA9IHB0LnggKiBNYXRoLmNvcyhyYWRZYXcpICsgejEgKiBNYXRoLnNpbihyYWRZYXcpO1xuICAgICAgICBjb25zdCB6MiA9IC1wdC54ICogTWF0aC5zaW4ocmFkWWF3KSArIHoxICogTWF0aC5jb3MocmFkWWF3KTtcblxuICAgICAgICAvLyBSb2xsIChaLWF4aXMpXG4gICAgICAgIGNvbnN0IHgzID0geDIgKiBNYXRoLmNvcyhyYWRSb2xsKSAtIHkxICogTWF0aC5zaW4ocmFkUm9sbCk7XG4gICAgICAgIGNvbnN0IHkzID0geDIgKiBNYXRoLnNpbihyYWRSb2xsKSArIHkxICogTWF0aC5jb3MocmFkUm9sbCk7XG5cbiAgICAgICAgLy8gTWFwIHRvIDJEIHNjcmVlbiBjb29yZGluYXRlXG4gICAgICAgIGNvbnN0IHNjcmVlblggPSBjZW50ZXJYICsgeDMgKiBkaXN0YW5jZVNjYWxlO1xuICAgICAgICBjb25zdCBzY3JlZW5ZID0gY2VudGVyWSAtIHkzICogZGlzdGFuY2VTY2FsZTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiBwdC5pZCxcbiAgICAgICAgICB4OiBzY3JlZW5YLFxuICAgICAgICAgIHk6IHNjcmVlblksXG4gICAgICAgICAgejogejIsXG4gICAgICAgICAgaXNMaWRhcjogcHQuaXNMaWRhclNlbnNvclxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFNhdmUgcHJvamVjdGVkIG5vZGVzIGZvciBtb3VzZS1ob3ZlciBjYWxjdWxhdGlvbnNcbiAgICAgIHNldFByb2plY3RlZE5vZGVzKG5vZGVzKTtcblxuICAgICAgLy8gMi4gQ29tcHV0ZSB0cnVlIERlbGF1bmF5IFRyaWFuZ3VsYXRpb24gb24gdGhlIDJEIHByb2plY3RlZCBjb29yZGluYXRlcyFcbiAgICAgIGNvbnN0IGRlbGF1bmF5VHJpYW5nbGVzID0gY29tcHV0ZURlbGF1bmF5KG5vZGVzKTtcbiAgICAgIHNldFRyaWFuZ2xlc0xpc3QoZGVsYXVuYXlUcmlhbmdsZXMpO1xuXG4gICAgICAvLyAzLiBBbmFseXplIGVhY2ggdHJpYW5nbGUgYmFzZWQgb24gcHJvdG9jb2wgY3JpdGVyaWFcbiAgICAgIGxldCBza2lubnlDb3VudCA9IDA7XG4gICAgICBsZXQgdG9vTG9uZ0NvdW50ID0gMDtcbiAgICAgIGxldCB0b3RhbENvdW50ID0gZGVsYXVuYXlUcmlhbmdsZXMubGVuZ3RoO1xuXG4gICAgICAvLyBNYXAgc2NhbGU6IGNvbnZlcnQgcGl4ZWxzIGJhY2sgdG8gdmlydHVhbCBtaWxsaW1ldGVycyAoMW1tIGlzIGFwcHJveCBkaXN0YW5jZVNjYWxlIHBpeGVscylcbiAgICAgIC8vIFNpbmNlIGhlYWQgYmFzZSB3aWR0aCBpcyAxMTBtbSwgd2UgY2hlY2sgZWRnZSBsZW5ndGhzIGluIHZpcnR1YWwgbW06XG4gICAgICBjb25zdCBnZXRNbURpc3RhbmNlID0gKG4xOiBOb2RlLCBuMjogTm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBkeCA9IChuMS54IC0gbjIueCkgLyBkaXN0YW5jZVNjYWxlO1xuICAgICAgICBjb25zdCBkeSA9IChuMS55IC0gbjIueSkgLyBkaXN0YW5jZVNjYWxlO1xuICAgICAgICBjb25zdCBkeiA9IG4xLnogLSBuMi56O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5ICsgZHogKiBkeik7XG4gICAgICB9O1xuXG4gICAgICAvLyBGaW5kIHdoaWNoIHRyaWFuZ2xlIGlzIGhvdmVyZWRcbiAgICAgIGxldCBhY3RpdmVIb3ZlcmVkOiBUcmlhbmdsZSB8IG51bGwgPSBudWxsO1xuICAgICAgaWYgKG1vdXNlUG9zKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVsYXVuYXlUcmlhbmdsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCB0ID0gZGVsYXVuYXlUcmlhbmdsZXNbaV07XG4gICAgICAgICAgLy8gU2ltcGxlIEJhcnljZW50cmljIGNvb3JkaW5hdGUgY2hlY2sgdG8gc2VlIGlmIG1vdXNlIGlzIGluc2lkZSB0cmlhbmdsZVxuICAgICAgICAgIGNvbnN0IGFyZWEgPSAwLjUgKiAoLXQudjEueSAqIHQudjIueCArIHQudjAueSAqICgtdC52MS54ICsgdC52Mi54KSArIHQudjAueCAqICh0LnYxLnkgLSB0LnYyLnkpICsgdC52MS54ICogdC52Mi55KTtcbiAgICAgICAgICBjb25zdCBzID0gMSAvICgyICogYXJlYSkgKiAodC52MC55ICogdC52Mi54IC0gdC52MC54ICogdC52Mi55ICsgKHQudjIueSAtIHQudjAueSkgKiBtb3VzZVBvcy54ICsgKHQudjAueCAtIHQudjIueCkgKiBtb3VzZVBvcy55KTtcbiAgICAgICAgICBjb25zdCB1ID0gMSAvICgyICogYXJlYSkgKiAodC52MC54ICogdC52MS55IC0gdC52MC55ICogdC52MS54ICsgKHQudjAueSAtIHQudjEueSkgKiBtb3VzZVBvcy54ICsgKHQudjEueCAtIHQudjAueCkgKiBtb3VzZVBvcy55KTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAocyA+PSAwICYmIHUgPj0gMCAmJiAoMSAtIHMgLSB1KSA+PSAwKSB7XG4gICAgICAgICAgICBhY3RpdmVIb3ZlcmVkID0gdDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0SG92ZXJlZFRyaWFuZ2xlKGFjdGl2ZUhvdmVyZWQpO1xuXG4gICAgICAvLyA0LiBSZW5kZXIgVHJpYW5nbGVzXG4gICAgICBkZWxhdW5heVRyaWFuZ2xlcy5mb3JFYWNoKHQgPT4ge1xuICAgICAgICAvLyBDYWxjdWxhdGUgZWRnZSBsZW5ndGhzIGluIG1tXG4gICAgICAgIGNvbnN0IGUxID0gZ2V0TW1EaXN0YW5jZSh0LnYwLCB0LnYxKTtcbiAgICAgICAgY29uc3QgZTIgPSBnZXRNbURpc3RhbmNlKHQudjEsIHQudjIpO1xuICAgICAgICBjb25zdCBlMyA9IGdldE1tRGlzdGFuY2UodC52MiwgdC52MCk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIGludGVybmFsIGFuZ2xlcyB1c2luZyBMYXcgb2YgQ29zaW5lc1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVBbmdsZSA9IChhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsID0gKGIgKiBiICsgYyAqIGMgLSBhICogYSkgLyAoMiAqIGIgKiBjKTtcbiAgICAgICAgICByZXR1cm4gKE1hdGguYWNvcyhNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgdmFsKSkpICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFuZ2xlMCA9IGNhbGN1bGF0ZUFuZ2xlKGUxLCBlMiwgZTMpO1xuICAgICAgICBjb25zdCBhbmdsZTEgPSBjYWxjdWxhdGVBbmdsZShlMiwgZTMsIGUxKTtcbiAgICAgICAgY29uc3QgYW5nbGUyID0gY2FsY3VsYXRlQW5nbGUoZTMsIGUxLCBlMik7XG5cbiAgICAgICAgY29uc3QgbWluQW5nbGUgPSBNYXRoLm1pbihhbmdsZTAsIGFuZ2xlMSwgYW5nbGUyKTtcbiAgICAgICAgY29uc3QgbWF4RWRnZSA9IE1hdGgubWF4KGUxLCBlMiwgZTMpO1xuXG4gICAgICAgIGNvbnN0IGlzU2tpbm55ID0gbWluQW5nbGUgPCBtaW5UcmlhbmdsZUFuZ2xlO1xuICAgICAgICBjb25zdCBpc1Rvb0xvbmcgPSBtYXhFZGdlID4gKG1heFRyaWFuZ2xlRWRnZUxlbmd0aCAqIDE1KTsgLy8gQWRqdXN0IHRocmVzaG9sZCBmb3Igc2NyZWVuIHJlc29sdXRpb24gdmlzdWFsIG1pbGxpbWV0ZXJzXG5cbiAgICAgICAgaWYgKGlzU2tpbm55KSBza2lubnlDb3VudCsrO1xuICAgICAgICBpZiAoaXNUb29Mb25nKSB0b29Mb25nQ291bnQrKztcblxuICAgICAgICBjb25zdCBpc0hvdmVyZWQgPSBhY3RpdmVIb3ZlcmVkICYmIChcbiAgICAgICAgICAoYWN0aXZlSG92ZXJlZC52MC5pZCA9PT0gdC52MC5pZCAmJiBhY3RpdmVIb3ZlcmVkLnYxLmlkID09PSB0LnYxLmlkICYmIGFjdGl2ZUhvdmVyZWQudjIuaWQgPT09IHQudjIuaWQpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGRyYXdpbmcgY29sb3Igc3R5bGVzXG4gICAgICAgIGxldCBzdHJva2VDb2xvciA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC4yKSc7IC8vIFNreSBkZWZhdWx0XG4gICAgICAgIGxldCBmaWxsQ29sb3IgPSAncmdiYSg1NiwgMTg5LCAyNDgsIDAuMDIpJztcblxuICAgICAgICBpZiAoaXNUb29Mb25nKSB7XG4gICAgICAgICAgc3Ryb2tlQ29sb3IgPSAncmdiYSgyMzksIDY4LCA2OCwgMC4zNSknOyAvLyBSZWQgZm9yIG91dCBvZiBsZW5ndGggc3BlY3NcbiAgICAgICAgICBmaWxsQ29sb3IgPSAncmdiYSgyMzksIDY4LCA2OCwgMC4wMyknO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU2tpbm55KSB7XG4gICAgICAgICAgc3Ryb2tlQ29sb3IgPSAncmdiYSgyNDUsIDE1OCwgMTEsIDAuMzUpJzsgLy8gT3JhbmdlL2FtYmVyIGZvciBza2lubnkgYW5nbGVzXG4gICAgICAgICAgZmlsbENvbG9yID0gJ3JnYmEoMjQ1LCAxNTgsIDExLCAwLjAzKSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSGVhbHRoeSBjb21wbGlhbnQgdHJpYW5nbGVcbiAgICAgICAgICBzdHJva2VDb2xvciA9ICdyZ2JhKDE2LCAxODUsIDEyOSwgMC4zKSc7IC8vIEVtZXJhbGRcbiAgICAgICAgICBmaWxsQ29sb3IgPSAncmdiYSgxNiwgMTg1LCAxMjksIDAuMDQpJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0hvdmVyZWQpIHtcbiAgICAgICAgICBzdHJva2VDb2xvciA9ICcjMTBiOTgxJzsgLy8gU29saWQgRW1lcmFsZCBoaWdobGlnaHRcbiAgICAgICAgICBmaWxsQ29sb3IgPSAncmdiYSgxNiwgMTg1LCAxMjksIDAuMTUpJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERyYXcgVHJpYW5nbGUgUGF0aHNcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKHQudjAueCwgdC52MC55KTtcbiAgICAgICAgY3R4LmxpbmVUbyh0LnYxLngsIHQudjEueSk7XG4gICAgICAgIGN0eC5saW5lVG8odC52Mi54LCB0LnYyLnkpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0cm9rZUNvbG9yO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gaXNIb3ZlcmVkID8gMS41IDogMC44NTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFVwZGF0ZSBwYXJlbnQgY2FsaWJyYXRpb24gc3RhdGUgb25jZSBwZXIgcmVuZGVyIGN5Y2xlXG4gICAgICBvblRyaWFuZ3VsYXRpb25TdGF0cyh7XG4gICAgICAgIHRvdGFsOiB0b3RhbENvdW50LFxuICAgICAgICBza2lubnk6IHNraW5ueUNvdW50LFxuICAgICAgICB0b29Mb25nOiB0b29Mb25nQ291bnQsXG4gICAgICB9KTtcblxuICAgICAgLy8gNS4gRHJhdyBhY3RpdmUgdmVydGljZXNcbiAgICAgIG5vZGVzLmZvckVhY2goKG4pID0+IHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKG4ueCwgbi55LCBuLmlzTGlkYXIgPyAxLjggOiAyLjUsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChuLmlzTGlkYXIpIHtcbiAgICAgICAgICAvLyBMaURBUiBkZWVwIHNjYW5uZXIgc2NhdHRlciBwb2ludHNcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMzOGJkZjgnOyAvLyBza3kgYmx1ZVxuICAgICAgICB9IGVsc2UgaWYgKG4uaWQgPT09ICdub3NlX3RpcCcgfHwgbi5pZCA9PT0gJ2JlbGx5X25hdmVsJykge1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2Y1OWUwYic7IC8vIGFtYmVyIHByaW1hcnkgY2VudGVyXG4gICAgICAgICAgY3R4LmFyYyhuLngsIG4ueSwgMS41LCAwLCBNYXRoLlBJICogMik7IC8vIG5lc3RlZCBvdXRlciBoYWxvXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMTBiOTgxJzsgLy8gZW1lcmFsZCBsYW5kbWFya3NcbiAgICAgICAgfVxuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIDYuIERyYXcgY2lyY3VtY2lyY2xlIHRlc3QgKEluQ2lyY2xlIGNvbmRpdGlvbiBkaXNwbGF5KSBpZiBob3ZlcmVkXG4gICAgICBpZiAoYWN0aXZlSG92ZXJlZCAmJiBlbmZvcmNlRGVsYXVuYXlDb25kaXRpb24pIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIERyYXcgZG90dGVkIENpcmN1bWNpcmNsZVxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSg1NiwgMTg5LCAyNDgsIDAuNiknO1xuICAgICAgICBjdHguc2V0TGluZURhc2goWzMsIDNdKTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuMjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKGFjdGl2ZUhvdmVyZWQuY3gsIGFjdGl2ZUhvdmVyZWQuY3ksIGFjdGl2ZUhvdmVyZWQuciwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgLy8gRHJhdyBDaXJjdW1jZW50ZXIgY3Jvc3NoYWlyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjMzhiZGY4JztcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhhY3RpdmVIb3ZlcmVkLmN4IC0gNSwgYWN0aXZlSG92ZXJlZC5jeSk7XG4gICAgICAgIGN0eC5saW5lVG8oYWN0aXZlSG92ZXJlZC5jeCArIDUsIGFjdGl2ZUhvdmVyZWQuY3kpO1xuICAgICAgICBjdHgubW92ZVRvKGFjdGl2ZUhvdmVyZWQuY3gsIGFjdGl2ZUhvdmVyZWQuY3kgLSA1KTtcbiAgICAgICAgY3R4LmxpbmVUbyhhY3RpdmVIb3ZlcmVkLmN4LCBhY3RpdmVIb3ZlcmVkLmN5ICsgNSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICAvLyBMYWJlbCBDaXJjdW1jZW50ZXJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMzhiZGY4JztcbiAgICAgICAgY3R4LmZvbnQgPSAnOHB4IG1vbm9zcGFjZSc7XG4gICAgICAgIGN0eC5maWxsVGV4dCgnQ0lSQ1VNQ0VOVEVSJywgYWN0aXZlSG92ZXJlZC5jeCArIDgsIGFjdGl2ZUhvdmVyZWQuY3kgLSAzKTtcblxuICAgICAgICAvLyBWZXJpZnkgSW5DaXJjbGUgdGVzdDogQ2hlY2sgaWYgYW55IG90aGVyIG5vZGVzIGFyZSBpbnNpZGUgdGhpcyBjaXJjbGVcbiAgICAgICAgbm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgICAgICBpZiAobi5pZCA9PT0gYWN0aXZlSG92ZXJlZD8udjAuaWQgfHwgbi5pZCA9PT0gYWN0aXZlSG92ZXJlZD8udjEuaWQgfHwgbi5pZCA9PT0gYWN0aXZlSG92ZXJlZD8udjIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gc2tpcCB2ZXJ0aWNlcyBvZiB0aGUgdHJpYW5nbGUgaXRzZWxmXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoKG4ueCAtIGFjdGl2ZUhvdmVyZWQhLmN4KSAqKiAyICsgKG4ueSAtIGFjdGl2ZUhvdmVyZWQhLmN5KSAqKiAyKTtcbiAgICAgICAgICBpZiAoZGlzdCA8IGFjdGl2ZUhvdmVyZWQhLnIgLSAwLjUpIHtcbiAgICAgICAgICAgIC8vIERyYXcgcmVkIHJpbmcgcmVwcmVzZW50aW5nIHZpb2xhdGlvbiBpZiBhbnlcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZWY0NDQ0JztcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxLjU7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHguYXJjKG4ueCwgbi55LCA2LCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2VmNDQ0NCc7XG4gICAgICAgICAgICBjdHguZm9udCA9ICc3cHggbW9ub3NwYWNlJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnSU5DSVJDTEUgVklPTEFUSU9OJywgbi54ICsgOCwgbi55ICsgMik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBEcmF3IGFsaWdubWVudCBjcm9zc2hhaXIgaW4gdmVyeSBmYWludCBiYWNrZ3JvdW5kXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgxNiwgMTg1LCAxMjksIDAuMDgpJztcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oY2VudGVyWCwgY2VudGVyWSAtIDEyMCk7XG4gICAgICBjdHgubGluZVRvKGNlbnRlclgsIGNlbnRlclkgKyAxMjApO1xuICAgICAgY3R4Lm1vdmVUbyhjZW50ZXJYIC0gMTIwLCBjZW50ZXJZKTtcbiAgICAgIGN0eC5saW5lVG8oY2VudGVyWCArIDEyMCwgY2VudGVyWSk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGFuaW1Mb29wID0gKCkgPT4ge1xuICAgICAgcmVuZGVyKCk7XG4gICAgICBhbmltYXRpb25JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltTG9vcCk7XG4gICAgfTtcblxuICAgIGFuaW1Mb29wKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uSWQpO1xuICAgIH07XG4gIH0sIFt5YXcsIHBpdGNoLCByb2xsLCBkaXN0YW5jZSwgZmFjZURldGVjdGVkLCBtaW5UcmlhbmdsZUFuZ2xlLCBtYXhUcmlhbmdsZUVkZ2VMZW5ndGgsIGVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbiwgbW91c2VQb3MsIHNjYW5UeXBlLCBzaG93TGl2ZU1lc2hdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gYmctc2xhdGUtOTUwLzgwIGFzcGVjdC1zcXVhcmUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgIHsvKiAzRCBEZWxhdW5heSBDYW52YXMgKi99XG4gICAgICA8Y2FudmFzXG4gICAgICAgIHJlZj17Y2FudmFzUmVmfVxuICAgICAgICB3aWR0aD17MzQwfVxuICAgICAgICBoZWlnaHQ9ezM0MH1cbiAgICAgICAgb25Nb3VzZU1vdmU9e2hhbmRsZU1vdXNlTW92ZX1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXtoYW5kbGVNb3VzZUxlYXZlfVxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG1heC13LVszNDBweF0gbWF4LWgtWzM0MHB4XSB6LTEwIGJsb2NrIGN1cnNvci1jcm9zc2hhaXJcIlxuICAgICAgLz5cblxuICAgICAgey8qIEFlc3RoZXRpYyBjb3JuZXIgYnJhY2tldHMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIGxlZnQtMiB3LTMgaC0zIGJvcmRlci10LTIgYm9yZGVyLWwtMiBib3JkZXItc2xhdGUtNzAwIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiByaWdodC0yIHctMyBoLTMgYm9yZGVyLXQtMiBib3JkZXItci0yIGJvcmRlci1zbGF0ZS03MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0yIGxlZnQtMiB3LTMgaC0zIGJvcmRlci1iLTIgYm9yZGVyLWwtMiBib3JkZXItc2xhdGUtNzAwIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMiByaWdodC0yIHctMyBoLTMgYm9yZGVyLWItMiBib3JkZXItci0yIGJvcmRlci1zbGF0ZS03MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgIHsvKiBMaXZlIG1ldHJpY3MgaW5kaWNhdG9yIG92ZXJsYXkgKi99XG4gICAgICB7c2hvd1JlYWxUaW1lTWV0cmljcyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTMgbGVmdC0zIGZsZXggZmxleC1jb2wgZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDAgZ2FwLTAuNSB6LTIwIGJnLXNsYXRlLTk1MC85NSBweC0yIHB5LTEuNSByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNoYWRvdy14bCBtYXgtdy1bMjAwcHhdXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5UUklTIENPVU5UOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+e3RyaWFuZ2xlc0xpc3QubGVuZ3RofTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPllBVyAvIFBJVENIOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPnt5YXcudG9GaXhlZCgxKX3CsCAvIHtwaXRjaC50b0ZpeGVkKDEpfcKwPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtob3ZlcmVkVHJpYW5nbGUgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXItdCBib3JkZXItc2xhdGUtODAwIG10LTEgcHQtMSB0ZXh0LVs4cHhdIHRleHQtc2t5LTQwMCBmbGV4IGZsZXgtY29sIGdhcC0wLjVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHVwcGVyY2FzZSB0ZXh0LXNreS0zMDBcIj5TZWxlY3RlZCBUcmk6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj5SX0NpcmN1bToge2hvdmVyZWRUcmlhbmdsZS5yLnRvRml4ZWQoMSl9IHB4PC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj5WZXJ0aWNlczoge2hvdmVyZWRUcmlhbmdsZS52MC5pZH0sIHtob3ZlcmVkVHJpYW5nbGUudjEuaWR9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0zIHJpZ2h0LTMgZm9udC1tb25vIHRleHQtWzhweF0gdGV4dC1za3ktNDAwIHRyYWNraW5nLXdpZGVzdCB1cHBlcmNhc2Ugei0yMCBiZy1zbGF0ZS05NTAvODAgcHgtMiBweS0xIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1za3ktOTUwXCI+XG4gICAgICAgIHtzY2FuVHlwZSA9PT0gJ29wb25rYV9icnp1Y2gnID8gJ09CX0FCRE9NRU5fTUVTSCcgOiAnREZfRkFDRV9NRVNIJ31cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSG92ZXIgdGlwICovfVxuICAgICAge3Nob3dSZWFsVGltZU1ldHJpY3MgJiYgc2hvd0xpdmVNZXNoICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMyBsZWZ0LTMgZm9udC1tb25vIHRleHQtWzhweF0gdGV4dC1zbGF0ZS01MDAgei0yMCBwb2ludGVyLWV2ZW50cy1ub25lXCI+XG4gICAgICAgICAgSE9WRVIgVE8gVEVTVCBJTkNJUkNMRVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFxcEJNO0FBcnBCTjtBQUFBO0FBQUE7QUFBQTtBQUtBLFNBQWdCLFFBQVEsV0FBVyxnQkFBZ0I7QUE0Qm5ELE1BQU0sbUJBQThCO0FBQUE7QUFBQSxFQUVsQyxFQUFFLElBQUksWUFBWSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztBQUFBLEVBQ3BDLEVBQUUsSUFBSSxlQUFlLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHO0FBQUEsRUFDeEMsRUFBRSxJQUFJLFVBQVUsR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUc7QUFBQSxFQUNyQyxFQUFFLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRztBQUFBLEVBRXBDLEVBQUUsSUFBSSxtQkFBbUIsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUc7QUFBQSxFQUM1QyxFQUFFLElBQUksZUFBZSxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsR0FBRztBQUFBLEVBQzFDLEVBQUUsSUFBSSxlQUFlLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHO0FBQUEsRUFDekMsRUFBRSxJQUFJLGVBQWUsR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFBQSxFQUN6QyxFQUFFLElBQUksZUFBZSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUFBLEVBRXhDLEVBQUUsSUFBSSxlQUFlLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxHQUFHO0FBQUEsRUFDMUMsRUFBRSxJQUFJLGVBQWUsR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUc7QUFBQSxFQUMxQyxFQUFFLElBQUksZUFBZSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRztBQUFBLEVBQ3pDLEVBQUUsSUFBSSxlQUFlLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHO0FBQUEsRUFFekMsRUFBRSxJQUFJLGdCQUFnQixHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRztBQUFBLEVBQzFDLEVBQUUsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFBQSxFQUN6QyxFQUFFLElBQUksZUFBZSxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRztBQUFBLEVBQzNDLEVBQUUsSUFBSSxlQUFlLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxHQUFHO0FBQUEsRUFFMUMsRUFBRSxJQUFJLGFBQWEsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUc7QUFBQSxFQUN2QyxFQUFFLElBQUksZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHO0FBQUEsRUFDMUMsRUFBRSxJQUFJLFdBQVcsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUc7QUFBQSxFQUN2QyxFQUFFLElBQUksV0FBVyxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsR0FBRztBQUFBLEVBRXRDLEVBQUUsSUFBSSxlQUFlLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHO0FBQUEsRUFDekMsRUFBRSxJQUFJLFVBQVUsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUc7QUFBQSxFQUN0QyxFQUFFLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsR0FBRztBQUFBO0FBQUEsRUFHckMsRUFBRSxJQUFJLGNBQWMsR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUk7QUFBQSxFQUMxQyxFQUFFLElBQUksY0FBYyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSTtBQUFBLEVBQ3pDLEVBQUUsSUFBSSxhQUFhLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHO0FBQUEsRUFDekMsRUFBRSxJQUFJLGFBQWEsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLEdBQUc7QUFBQSxFQUN4QyxFQUFFLElBQUksYUFBYSxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRTtBQUFBLEVBQ3hDLEVBQUUsSUFBSSxhQUFhLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxFQUFFO0FBQUE7QUFBQSxFQUd2QyxFQUFFLElBQUksV0FBVyxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxlQUFlLEtBQUs7QUFBQSxFQUMzRCxFQUFFLElBQUksV0FBVyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxlQUFlLEtBQUs7QUFBQSxFQUMxRCxFQUFFLElBQUksV0FBVyxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxlQUFlLEtBQUs7QUFBQSxFQUMzRCxFQUFFLElBQUksV0FBVyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxlQUFlLEtBQUs7QUFBQSxFQUMxRCxFQUFFLElBQUksV0FBVyxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxlQUFlLEtBQUs7QUFBQSxFQUMzRCxFQUFFLElBQUksV0FBVyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxlQUFlLEtBQUs7QUFBQSxFQUMxRCxFQUFFLElBQUksV0FBVyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxlQUFlLEtBQUs7QUFBQSxFQUM1RCxFQUFFLElBQUksV0FBVyxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxlQUFlLEtBQUs7QUFBQSxFQUMzRCxFQUFFLElBQUksV0FBVyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxlQUFlLEtBQUs7QUFBQSxFQUN6RCxFQUFFLElBQUksWUFBWSxHQUFHLEdBQUcsR0FBRyxLQUFL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QUFBLFVBQUU7QUFBQSxhQUE5QztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQWlEO0FBQUEsUUFDakQsdUJBQUMsVUFBSztBQUFBO0FBQUEsVUFBVyxnQkFBZ0IsR0FBRztBQUFBLFVBQUc7QUFBQSxVQUFHLGdCQUFnQixHQUFHO0FBQUEsYUFBN0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFnRTtBQUFBLFdBSGxFO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFJQTtBQUFBLFNBZEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWdCQTtBQUFBLElBR0YsdUJBQUMsU0FBSSxXQUFVLG1KQUNaLHVCQUFhLGtCQUFrQixvQkFBb0Isa0JBRHREO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FFQTtBQUFBLElBR0MsdUJBQXVCLGdCQUN0Qix1QkFBQyxTQUFJLFdBQVUsc0ZBQXFGLHNDQUFwRztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBRUE7QUFBQSxPQTlDSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBZ0RBO0FBRUo7IiwibmFtZXMiOlsicG9pbnRzVG9Vc2UiLCJyYWRQaXRjaCIsInJhZFlhdyIsInJhZFJvbGwiLCJub21pbmFsRGlzdGFuY2UiLCJkaXN0YW5jZVNjYWxlIiwiY2VudGVyWCIsImNlbnRlclkiLCJub2RlcyIsImRlbGF1bmF5VHJpYW5nbGVzIl19