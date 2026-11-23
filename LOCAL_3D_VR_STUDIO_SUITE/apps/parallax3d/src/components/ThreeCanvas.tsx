const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"];const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/parallax3d/node_modules/.vite/deps/react.js?v=b44980a7";
import * as THREE from "/apps/parallax3d/node_modules/.vite/deps/three.js?v=dd6a7058";
import { OrbitControls } from "/apps/parallax3d/node_modules/.vite/deps/three_examples_jsm_controls_OrbitControls__js.js?v=36c316c2";
import { RoomEnvironment } from "/apps/parallax3d/node_modules/.vite/deps/three_examples_jsm_environments_RoomEnvironment__js.js?v=e1f4e3ce";
var _jsxFileName = "/app/applet/src/components/ThreeCanvas.tsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/apps/parallax3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=b44980a7";
// Pre-allocated scratch objects to eliminate Garbage Collection during render loop
const _vec3 = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3();
const _baseCamPos = new THREE.Vector3(0, 0, 2.2);
const _mouseTarget = new THREE.Vector2(0, 0);
const _mouseCurrent = new THREE.Vector2(0, 0);
export const ThreeCanvas = ({ imageUrl, depthUrl, imageDimensions, depthConfig, motionConfig, displayMode, depthColorMap = "turbo", onCanvasReady }) => {
	const containerRef = useRef(null);
	const canvasRef = useRef(null);
	// Mutable refs to hold current parameters for the 60fps render loop
	const depthConfigRef = useRef(depthConfig);
	const motionConfigRef = useRef(motionConfig);
	const displayModeRef = useRef(displayMode);
	const depthColorMapRef = useRef(depthColorMap);
	useEffect(() => {
		depthConfigRef.current = depthConfig;
	}, [depthConfig]);
	useEffect(() => {
		motionConfigRef.current = motionConfig;
	}, [motionConfig]);
	useEffect(() => {
		displayModeRef.current = displayMode;
	}, [displayMode]);
	useEffect(() => {
		depthColorMapRef.current = depthColorMap;
	}, [depthColorMap]);
	// Texture references
	const colorTexRef = useRef(null);
	const depthTexRef = useRef(null);
	const materialRef = useRef(null);
	const wireframeMatRef = useRef(null);
	const mainMeshRef = useRef(null);
	const frameGroupRef = useRef(null);
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		// Detect software WebGL guard
		const isSoftwareGl = (() => {
			const gl = document.createElement("canvas").getContext("webgl2");
			if (!gl) return true;
			const ext = gl.getExtension("WEBGL_debug_renderer_info");
			const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
			const gpu = String(gl.getParameter(param));
			gl.getExtension("WEBGL_lose_context")?.loseContext();
			return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
		})();
		// Scene setup
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(592139);
		scene.fog = new THREE.FogExp2(592139, .15);
		// Camera setup
		const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, .1, 100);
		camera.position.copy(_baseCamPos);
		// WebGL Renderer
		const renderer = new THREE.WebGLRenderer({
			antialias: !isSoftwareGl,
			powerPreference: "high-performance",
			preserveDrawingBuffer: true
		});
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.1;
		renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.shadowMap.enabled = !isSoftwareGl;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		canvasRef.current = renderer.domElement;
		renderer.domElement.style.display = "block";
		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";
		container.innerHTML = "";
		container.appendChild(renderer.domElement);
		if (onCanvasReady) {
			onCanvasReady(renderer.domElement);
		}
		// Studio Environment (PMREMGenerator + RoomEnvironment)
		const pmremGenerator = new THREE.PMREMGenerator(renderer);
		scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), .04).texture;
		pmremGenerator.dispose();
		// Studio 3-point lighting
		const keyLight = new THREE.DirectionalLight(16775149, 1.3);
		keyLight.position.set(2.5, 3.5, 3);
		scene.add(keyLight);
		const hemiLight = new THREE.HemisphereLight(14742270, 592139, .7);
		scene.add(hemiLight);
		const rimLight = new THREE.DirectionalLight(8490232, .6);
		rimLight.position.set(-2.5, -1.5, -1.5);
		scene.add(rimLight);
		// Orbit Controls
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = !isSoftwareGl;
		controls.dampingFactor = .05;
		controls.maxDistance = 6;
		controls.minDistance = .8;
		controls.maxPolarAngle = Math.PI * .75;
		controls.minPolarAngle = Math.PI * .25;
		controls.enabled = motionConfigRef.current.mode === "orbit";
		// Calculate aspect ratio for plane
		const imgAspect = (imageDimensions.width || 800) / (imageDimensions.height || 600);
		let planeW = 1.6;
		let planeH = 1.6 / imgAspect;
		if (imgAspect < 1) {
			planeH = 1.6;
			planeW = 1.6 * imgAspect;
		}
		// High subdivision plane for 3D displacement
		const subdivisions = isSoftwareGl ? 128 : 256;
		const geometry = new THREE.PlaneGeometry(planeW, planeH, subdivisions, subdivisions);
		// Texture Loader
		const textureLoader = new THREE.TextureLoader();
		const colorTex = textureLoader.load(imageUrl);
		colorTex.colorSpace = THREE.SRGBColorSpace;
		colorTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
		colorTex.wrapS = THREE.ClampToEdgeWrapping;
		colorTex.wrapT = THREE.ClampToEdgeWrapping;
		colorTexRef.current = colorTex;
		const depthTex = textureLoader.load(depthUrl);
		depthTex.wrapS = THREE.ClampToEdgeWrapping;
		depthTex.wrapT = THREE.ClampToEdgeWrapping;
		depthTexRef.current = depthTex;
		// Advanced Custom Parallax Occlusion + 3D Displacement Shader
		const customShaderMaterial = new THREE.ShaderMaterial({
			uniforms: {
				tColor: { value: colorTex },
				tDepth: { value: depthTex },
				uDepthScale: { value: depthConfigRef.current.scale * .22 },
				uFocusPlane: { value: depthConfigRef.current.focusPlane },
				uInverted: { value: depthConfigRef.current.inverted ? 1 : 0 },
				uEdgeDilation: { value: depthConfigRef.current.edgeDilation },
				uDofStrength: { value: depthConfigRef.current.dofStrength },
				uChromaticAberration: { value: depthConfigRef.current.chromaticAberration },
				uDisplayMode: { value: 0 },
				uColorMapType: { value: 1 },
				uCameraOffset: { value: new THREE.Vector2(0, 0) },
				uResolution: { value: new THREE.Vector2(imageDimensions.width, imageDimensions.height) }
			},
			vertexShader: `
        uniform sampler2D tDepth;
        uniform float uDepthScale;
        uniform float uFocusPlane;
        uniform float uInverted;
        
        varying vec2 vUv;
        varying vec3 vNormalVec;
        varying vec3 vViewPosition;
        varying float vDepthVal;

        void main() {
          vUv = uv;
          
          float d = texture2D(tDepth, uv).r;
          if (uInverted > 0.5) {
            d = 1.0 - d;
          }
          vDepthVal = d;

          // Focal plane displacement: points closer than focusPlane move forward (+Z),
          // points further move backward (-Z)
          float displacement = (d - uFocusPlane) * uDepthScale;
          
          vec3 transformed = position + normal * displacement;
          
          vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
          vViewPosition = -mvPosition.xyz;
          vNormalVec = normalMatrix * normal;
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
			fragmentShader: `
        uniform sampler2D tColor;
        uniform sampler2D tDepth;
        uniform float uDepthScale;
        uniform float uFocusPlane;
        uniform float uInverted;
        uniform float uEdgeDilation;
        uniform float uDofStrength;
        uniform float uChromaticAberration;
        uniform float uDisplayMode;
        uniform float uColorMapType;
        uniform vec2 uCameraOffset;
        
        varying vec2 vUv;
        varying vec3 vNormalVec;
        varying vec3 vViewPosition;
        varying float vDepthVal;

        // Turbo colormap approximation
        vec3 turboColormap(float x) {
          x = clamp(x, 0.0, 1.0);
          vec4 v4 = vec4(1.0, x, x * x, x * x * x);
          vec2 v2 = v4.zw * v4.z;
          return clamp(vec3(
            dot(v4.xy, vec2(0.13572138, 4.61539260)) + dot(v2, vec2(-42.66032258, 132.13108234)),
            dot(v4.xy, vec2(0.09140261, 2.19418839)) + dot(v2, vec2(4.84296658, -14.18503333)),
            dot(v4.xy, vec2(0.10667330, 12.64194608)) + dot(v2, vec2(-60.58204836, 110.36276771))
          ), 0.0, 1.0);
        }

        // Magma colormap
        vec3 magmaColormap(float x) {
          x = clamp(x, 0.0, 1.0);
          float r = clamp(x * 1.5, 0.0, 1.0);
          float g = clamp((x - 0.25) * 1.4, 0.0, 1.0);
          float b = clamp(0.2 + x * 0.8 * (1.0 - x * 0.5), 0.0, 1.0);
          return vec3(r, g, b);
        }

        void main() {
          vec2 uv = vUv;
          
          // Parallax UV correction based on view ray to eliminate tearing
          vec3 viewDir = normalize(vViewPosition);
          float depthVal = vDepthVal;
          vec2 parallaxOffset = (viewDir.xy / max(0.001, viewDir.z)) * ((depthVal - uFocusPlane) * uDepthScale * 0.06);
          
          vec2 sampleUv = clamp(uv - parallaxOffset, 0.001, 0.999);

          // 1. Depth Map display mode
          if (uDisplayMode > 1.5) {
            float d = depthVal;
            vec3 col = vec3(d);
            if (uColorMapType > 2.5) {
              // Cyber Neon
              col = vec3(d * 1.2, 0.3 + d * 0.7, 0.8 + d * 0.2);
            } else if (uColorMapType > 1.5) {
              col = magmaColormap(d);
            } else if (uColorMapType > 0.5) {
              col = turboColormap(d);
            }
            gl_FragColor = vec4(col, 1.0);
            return;
          }

          // 2. Anaglyph 3D mode (Red/Cyan binocular glasses)
          if (uDisplayMode > 0.5 && uDisplayMode < 1.5) {
            float eyeSep = 0.012 * uDepthScale;
            vec2 leftUV = clamp(sampleUv - vec2(eyeSep * (depthVal - uFocusPlane), 0.0), 0.001, 0.999);
            vec2 rightUV = clamp(sampleUv + vec2(eyeSep * (depthVal - uFocusPlane), 0.0), 0.001, 0.999);
            
            vec4 colLeft = texture2D(tColor, leftUV);
            vec4 colRight = texture2D(tColor, rightUV);
            
            // Red channel from left eye, Green+Blue channels from right eye
            gl_FragColor = vec4(colLeft.r, colRight.g, colRight.b, 1.0);
            return;
          }

          // 3. Standard 3D Photo with chromatic aberration & subtle DOF bokeh
          vec4 finalColor;
          if (uChromaticAberration > 0.001) {
            float ca = uChromaticAberration * 0.02 * abs(depthVal - uFocusPlane);
            float r = texture2D(tColor, sampleUv + vec2(ca, 0.0)).r;
            float g = texture2D(tColor, sampleUv).g;
            float b = texture2D(tColor, sampleUv - vec2(ca, 0.0)).b;
            finalColor = vec4(r, g, b, 1.0);
          } else {
            finalColor = texture2D(tColor, sampleUv);
          }

          // Simulated Depth of Field blur on defocused layers
          if (uDofStrength > 0.05) {
            float dofAmount = abs(depthVal - uFocusPlane) * uDofStrength * 0.006;
            vec4 blurSample = vec4(0.0);
            blurSample += texture2D(tColor, sampleUv + vec2(dofAmount, 0.0));
            blurSample += texture2D(tColor, sampleUv - vec2(dofAmount, 0.0));
            blurSample += texture2D(tColor, sampleUv + vec2(0.0, dofAmount));
            blurSample += texture2D(tColor, sampleUv - vec2(0.0, dofAmount));
            blurSample *= 0.25;
            finalColor = mix(finalColor, blurSample, 0.65);
          }

          gl_FragColor = finalColor;
        }
      `,
			side: THREE.DoubleSide
		});
		materialRef.current = customShaderMaterial;
		// Displaced Mesh
		const mainMesh = new THREE.Mesh(geometry, customShaderMaterial);
		mainMesh.castShadow = !isSoftwareGl;
		mainMesh.receiveShadow = !isSoftwareGl;
		scene.add(mainMesh);
		mainMeshRef.current = mainMesh;
		// Wireframe Mesh (for topology inspection)
		const wireframeMat = new THREE.MeshBasicMaterial({
			color: 2282478,
			wireframe: true,
			transparent: true,
			opacity: .8
		});
		wireframeMatRef.current = wireframeMat;
		// 3-Part Procedural Museum Gallery Frame (`THREE.Group`)
		const frameGroup = new THREE.Group();
		const frameThickness = .08;
		const frameDepth = .09;
		const borderGeom = new THREE.BoxGeometry(planeW + frameThickness * 2, planeH + frameThickness * 2, frameDepth);
		const borderMat = new THREE.MeshStandardMaterial({
			color: 1579035,
			roughness: .35,
			metalness: .6
		});
		const borderMesh = new THREE.Mesh(borderGeom, borderMat);
		borderMesh.position.z = -frameDepth * .5 - .01;
		frameGroup.add(borderMesh);
		// Inner gold/bronze beveled accent rim
		const innerRimGeom = new THREE.BoxGeometry(planeW + .02, planeH + .02, .02);
		const innerRimMat = new THREE.MeshStandardMaterial({
			color: 14251782,
			roughness: .2,
			metalness: .85
		});
		const innerRimMesh = new THREE.Mesh(innerRimGeom, innerRimMat);
		innerRimMesh.position.z = .005;
		frameGroup.add(innerRimMesh);
		// Soft contact shadow plane beneath the 3D frame
		const shadowPlaneGeom = new THREE.PlaneGeometry(planeW * 1.4, .5);
		const shadowCanvas = document.createElement("canvas");
		shadowCanvas.width = 128;
		shadowCanvas.height = 128;
		const sCtx = shadowCanvas.getContext("2d");
		const sGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
		sGrad.addColorStop(0, "rgba(0, 0, 0, 0.6)");
		sGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
		sCtx.fillStyle = sGrad;
		sCtx.fillRect(0, 0, 128, 128);
		const shadowTex = new THREE.CanvasTexture(shadowCanvas);
		const shadowMat = new THREE.MeshBasicMaterial({
			map: shadowTex,
			transparent: true,
			depthWrite: false,
			opacity: .45
		});
		const shadowMesh = new THREE.Mesh(shadowPlaneGeom, shadowMat);
		shadowMesh.rotation.x = -Math.PI / 2;
		shadowMesh.position.y = -planeH * .5 - .08;
		shadowMesh.position.z = 0;
		frameGroup.add(shadowMesh);
		scene.add(frameGroup);
		frameGroupRef.current = frameGroup;
		frameGroup.visible = displayModeRef.current === "framed";
		// Interactive pointer movement handler
		const handlePointerMove = (e) => {
			const rect = renderer.domElement.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width * 2 - 1;
			const y = -((e.clientY - rect.top) / rect.height * 2 - 1);
			_mouseTarget.set(x, y);
		};
		window.addEventListener("pointermove", handlePointerMove);
		// Resize handler
		const handleResize = () => {
			if (!container) return;
			const w = container.clientWidth;
			const h = container.clientHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};
		window.addEventListener("resize", handleResize);
		// 60FPS Lossless Render Loop with exponential damping
		let frameId = 0;
		const clock = new THREE.Clock();
		let autoRotateAngle = 0;
		function afterDraw(cb) {
			const gl = renderer.getContext();
			const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
			gl.flush();
			const poll = () => {
				const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
				if (state === gl.UNSIGNALED) {
					frameId = window.setTimeout(poll, 5);
				} else {
					gl.deleteSync(sync);
					frameId = window.setTimeout(cb, 80);
				}
			};
			frameId = window.setTimeout(poll, 5);
		}
		function tick() {
			const dt = clock.getDelta();
			const time = clock.getElapsedTime();
			const mCfg = motionConfigRef.current;
			const dCfg = depthConfigRef.current;
			const dispMode = displayModeRef.current;
			// Accumulate auto-rotate angle around image center
			if (mCfg.autoRotate) {
				autoRotateAngle += dt * (mCfg.autoRotateSpeed ?? 1) * .8;
			}
			// Update shader uniforms
			if (customShaderMaterial) {
				customShaderMaterial.uniforms.uDepthScale.value = dCfg.scale * .22;
				customShaderMaterial.uniforms.uFocusPlane.value = dCfg.focusPlane;
				customShaderMaterial.uniforms.uInverted.value = dCfg.inverted ? 1 : 0;
				customShaderMaterial.uniforms.uEdgeDilation.value = dCfg.edgeDilation;
				customShaderMaterial.uniforms.uDofStrength.value = dCfg.dofStrength;
				customShaderMaterial.uniforms.uChromaticAberration.value = dCfg.chromaticAberration;
				// Display mode uniform
				if (dispMode === "anaglyph") {
					customShaderMaterial.uniforms.uDisplayMode.value = 1;
				} else if (dispMode === "depthmap") {
					customShaderMaterial.uniforms.uDisplayMode.value = 2;
					const colMap = depthColorMapRef.current;
					customShaderMaterial.uniforms.uColorMapType.value = colMap === "grayscale" ? 0 : colMap === "magma" ? 2 : colMap === "cyber" ? 3 : 1;
				} else {
					customShaderMaterial.uniforms.uDisplayMode.value = 0;
				}
			}
			// Toggle wireframe mode
			if (mainMesh) {
				if (dispMode === "mesh_wireframe") {
					mainMesh.material = wireframeMat;
				} else {
					mainMesh.material = customShaderMaterial;
				}
			}
			// Toggle framed group
			if (frameGroup) {
				frameGroup.visible = dispMode === "framed";
			}
			// Calculate camera motion / subtle frame shift ("nieznacznie przesuwający się kadr")
			controls.enabled = mCfg.mode === "orbit";
			if (mCfg.mode === "orbit") {
				controls.autoRotate = mCfg.autoRotate;
				controls.autoRotateSpeed = (mCfg.autoRotateSpeed ?? 1) * 2.5;
				controls.update();
			} else {
				const amp = mCfg.amplitude * .45;
				const spd = mCfg.speed * 1.5;
				// Smooth mouse damping: 1 - Math.exp(-10 * dt)
				const dampFactor = 1 - Math.exp(-10 * dt);
				_mouseCurrent.lerp(_mouseTarget, dampFactor);
				let offsetX = 0;
				let offsetY = 0;
				if (mCfg.mode === "circle") {
					offsetX = Math.cos(time * spd) * amp;
					offsetY = Math.sin(time * spd) * amp * .75;
				} else if (mCfg.mode === "horizontal") {
					offsetX = Math.sin(time * spd) * amp;
					offsetY = Math.sin(time * spd * 2) * amp * .2;
				} else if (mCfg.mode === "vertical") {
					offsetX = Math.cos(time * spd * 2) * amp * .2;
					offsetY = Math.sin(time * spd) * amp;
				} else if (mCfg.mode === "infinity") {
					offsetX = Math.sin(time * spd) * amp;
					offsetY = Math.sin(time * spd * 2) * (amp * .5);
				} else if (mCfg.mode === "breathe") {
					offsetX = Math.sin(time * spd * .7) * (amp * .3);
					offsetY = Math.cos(time * spd * .7) * (amp * .3);
					_baseCamPos.z = 2.2 + Math.sin(time * spd) * (amp * .4);
				} else if (mCfg.mode === "mouse") {
					offsetX = _mouseCurrent.x * amp * 1.2;
					offsetY = _mouseCurrent.y * amp * 1.2;
				}
				// When Auto-rotate is active, rotate camera around image center (0, 0, 0)
				// at the configured speed, independent of mouse movements
				if (mCfg.autoRotate) {
					const radius = _baseCamPos.z;
					const camX = Math.sin(autoRotateAngle) * radius;
					const camZ = Math.cos(autoRotateAngle) * radius;
					const camY = _baseCamPos.y + offsetY * .4;
					_targetCamPos.set(camX, camY, camZ);
				} else {
					// Add subtle interactive mouse influence if enabled and auto-rotate is off
					if (mCfg.interactiveMouse && mCfg.mode !== "mouse") {
						offsetX += _mouseCurrent.x * amp * mCfg.mouseSensitivity * .4;
						offsetY += _mouseCurrent.y * amp * mCfg.mouseSensitivity * .4;
					}
					_targetCamPos.set(_baseCamPos.x + offsetX, _baseCamPos.y + offsetY, _baseCamPos.z);
				}
				camera.position.copy(_targetCamPos);
				camera.lookAt(0, 0, 0);
				// Update shader camera offset uniform
				if (customShaderMaterial) {
					customShaderMaterial.uniforms.uCameraOffset.value.set(offsetX, offsetY);
				}
			}
			renderer.render(scene, camera);
			if (isSoftwareGl) {
				afterDraw(tick);
			} else {
				frameId = requestAnimationFrame(tick);
			}
		}
		tick();
		// Cleanup
		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("resize", handleResize);
			if (isSoftwareGl) {
				clearTimeout(frameId);
			} else {
				cancelAnimationFrame(frameId);
			}
			controls.dispose();
			renderer.dispose();
			geometry.dispose();
			customShaderMaterial.dispose();
			wireframeMat.dispose();
			borderGeom.dispose();
			innerRimGeom.dispose();
			shadowPlaneGeom.dispose();
			shadowTex.dispose();
		};
	}, [
		imageUrl,
		depthUrl,
		imageDimensions
	]);
	return /* @__PURE__ */ _jsxDEV("div", {
		ref: containerRef,
		className: "absolute inset-0 w-full h-full overflow-hidden select-none bg-zinc-950"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 590,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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RjtJQUVBLE9BQU8sU0FBUyxLQUFLLGFBQWE7SUFDbEMsT0FBTyxPQUFPLEdBQUcsR0FBRyxDQUFDOztJQUdyQixJQUFJLHNCQUFzQjtLQUN4QixxQkFBcUIsU0FBUyxjQUFjLE1BQU0sSUFBSSxTQUFTLE9BQU87SUFDeEU7R0FDRjtHQUVBLFNBQVMsT0FBTyxPQUFPLE1BQU07R0FFN0IsSUFBSSxjQUFjO0lBQ2hCLFVBQVUsSUFBSTtHQUNoQixPQUFPO0lBQ0wsVUFBVSxzQkFBc0IsSUFBSTtHQUN0QztFQUNGO0VBRUEsS0FBSzs7RUFHTCxhQUFhO0dBQ1gsT0FBTyxvQkFBb0IsZUFBZSxpQkFBaUI7R0FDM0QsT0FBTyxvQkFBb0IsVUFBVSxZQUFZO0dBQ2pELElBQUksY0FBYztJQUNoQixhQUFhLE9BQU87R0FDdEIsT0FBTztJQUNMLHFCQUFxQixPQUFPO0dBQzlCO0dBQ0EsU0FBUyxRQUFRO0dBQ2pCLFNBQVMsUUFBUTtHQUNqQixTQUFTLFFBQVE7R0FDakIscUJBQXFCLFFBQVE7R0FDN0IsYUFBYSxRQUFRO0dBQ3JCLFdBQVcsUUFBUTtHQUNuQixhQUFhLFFBQVE7R0FDckIsZ0JBQWdCLFFBQVE7R0FDeEIsVUFBVSxRQUFRO0VBQ3BCO0NBQ0YsR0FBRztFQUFDO0VBQVU7RUFBVTtDQUFlLENBQUM7Q0FFeEMsT0FDRSx3QkFBQyxPQUFEO0VBQ0UsS0FBSztFQUNMLFdBQVU7Q0FDWDs7Ozs7QUFFTCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUaHJlZUNhbnZhcy50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzLmpzJztcbmltcG9ydCB7IFJvb21FbnZpcm9ubWVudCB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9lbnZpcm9ubWVudHMvUm9vbUVudmlyb25tZW50LmpzJztcbmltcG9ydCB7IERlcHRoQ29uZmlnLCBNb3Rpb25Db25maWcsIERpc3BsYXlNb2RlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgVGhyZWVDYW52YXNQcm9wcyB7XG4gIGltYWdlVXJsOiBzdHJpbmc7XG4gIGRlcHRoVXJsOiBzdHJpbmc7XG4gIGltYWdlRGltZW5zaW9uczogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9O1xuICBkZXB0aENvbmZpZzogRGVwdGhDb25maWc7XG4gIG1vdGlvbkNvbmZpZzogTW90aW9uQ29uZmlnO1xuICBkaXNwbGF5TW9kZTogRGlzcGxheU1vZGU7XG4gIGRlcHRoQ29sb3JNYXA/OiAnZ3JheXNjYWxlJyB8ICd0dXJibycgfCAnbWFnbWEnIHwgJ2N5YmVyJztcbiAgb25DYW52YXNSZWFkeT86IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkO1xufVxuXG4vLyBQcmUtYWxsb2NhdGVkIHNjcmF0Y2ggb2JqZWN0cyB0byBlbGltaW5hdGUgR2FyYmFnZSBDb2xsZWN0aW9uIGR1cmluZyByZW5kZXIgbG9vcFxuY29uc3QgX3ZlYzMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3RhcmdldENhbVBvcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfYmFzZUNhbVBvcyA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDIuMik7XG5jb25zdCBfbW91c2VUYXJnZXQgPSBuZXcgVEhSRUUuVmVjdG9yMigwLCAwKTtcbmNvbnN0IF9tb3VzZUN1cnJlbnQgPSBuZXcgVEhSRUUuVmVjdG9yMigwLCAwKTtcblxuZXhwb3J0IGNvbnN0IFRocmVlQ2FudmFzOiBSZWFjdC5GQzxUaHJlZUNhbnZhc1Byb3BzPiA9ICh7XG4gIGltYWdlVXJsLFxuICBkZXB0aFVybCxcbiAgaW1hZ2VEaW1lbnNpb25zLFxuICBkZXB0aENvbmZpZyxcbiAgbW90aW9uQ29uZmlnLFxuICBkaXNwbGF5TW9kZSxcbiAgZGVwdGhDb2xvck1hcCA9ICd0dXJibycsXG4gIG9uQ2FudmFzUmVhZHksXG59KSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIC8vIE11dGFibGUgcmVmcyB0byBob2xkIGN1cnJlbnQgcGFyYW1ldGVycyBmb3IgdGhlIDYwZnBzIHJlbmRlciBsb29wXG4gIGNvbnN0IGRlcHRoQ29uZmlnUmVmID0gdXNlUmVmKGRlcHRoQ29uZmlnKTtcbiAgY29uc3QgbW90aW9uQ29uZmlnUmVmID0gdXNlUmVmKG1vdGlvbkNvbmZpZyk7XG4gIGNvbnN0IGRpc3BsYXlNb2RlUmVmID0gdXNlUmVmKGRpc3BsYXlNb2RlKTtcbiAgY29uc3QgZGVwdGhDb2xvck1hcFJlZiA9IHVzZVJlZihkZXB0aENvbG9yTWFwKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGRlcHRoQ29uZmlnUmVmLmN1cnJlbnQgPSBkZXB0aENvbmZpZztcbiAgfSwgW2RlcHRoQ29uZmlnXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbW90aW9uQ29uZmlnUmVmLmN1cnJlbnQgPSBtb3Rpb25Db25maWc7XG4gIH0sIFttb3Rpb25Db25maWddKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBkaXNwbGF5TW9kZVJlZi5jdXJyZW50ID0gZGlzcGxheU1vZGU7XG4gIH0sIFtkaXNwbGF5TW9kZV0pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGRlcHRoQ29sb3JNYXBSZWYuY3VycmVudCA9IGRlcHRoQ29sb3JNYXA7XG4gIH0sIFtkZXB0aENvbG9yTWFwXSk7XG5cbiAgLy8gVGV4dHVyZSByZWZlcmVuY2VzXG4gIGNvbnN0IGNvbG9yVGV4UmVmID0gdXNlUmVmPFRIUkVFLlRleHR1cmUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgZGVwdGhUZXhSZWYgPSB1c2VSZWY8VEhSRUUuVGV4dHVyZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBtYXRlcmlhbFJlZiA9IHVzZVJlZjxUSFJFRS5TaGFkZXJNYXRlcmlhbCB8IG51bGw+KG51bGwpO1xuICBjb25zdCB3aXJlZnJhbWVNYXRSZWYgPSB1c2VSZWY8VEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbWFpbk1lc2hSZWYgPSB1c2VSZWY8VEhSRUUuTWVzaCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBmcmFtZUdyb3VwUmVmID0gdXNlUmVmPFRIUkVFLkdyb3VwIHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBjb250YWluZXJSZWYuY3VycmVudDtcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgLy8gRGV0ZWN0IHNvZnR3YXJlIFdlYkdMIGd1YXJkXG4gICAgY29uc3QgaXNTb2Z0d2FyZUdsID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IGdsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnd2ViZ2wyJyk7XG4gICAgICBpZiAoIWdsKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGNvbnN0IGV4dCA9IGdsLmdldEV4dGVuc2lvbignV0VCR0xfZGVidWdfcmVuZGVyZXJfaW5mbycpO1xuICAgICAgY29uc3QgcGFyYW0gPSBleHQgPyBleHQuVU5NQVNLRURfUkVOREVSRVJfV0VCR0wgOiBnbC5SRU5ERVJFUjtcbiAgICAgIGNvbnN0IGdwdSA9IFN0cmluZyhnbC5nZXRQYXJhbWV0ZXIocGFyYW0pKTtcbiAgICAgIGdsLmdldEV4dGVuc2lvbignV0VCR0xfbG9zZV9jb250ZXh0Jyk/Lmxvc2VDb250ZXh0KCk7XG4gICAgICByZXR1cm4gL1N3aWZ0U2hhZGVyfGxsdm1waXBlfHNvZnRwaXBlfFNvZnR3YXJlfEJhc2ljIFJlbmRlci9pLnRlc3QoZ3B1KTtcbiAgICB9KSgpO1xuXG4gICAgLy8gU2NlbmUgc2V0dXBcbiAgICBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHgwOTA5MGIpO1xuICAgIHNjZW5lLmZvZyA9IG5ldyBUSFJFRS5Gb2dFeHAyKDB4MDkwOTBiLCAwLjE1KTtcblxuICAgIC8vIENhbWVyYSBzZXR1cFxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShcbiAgICAgIDQ1LFxuICAgICAgY29udGFpbmVyLmNsaWVudFdpZHRoIC8gY29udGFpbmVyLmNsaWVudEhlaWdodCxcbiAgICAgIDAuMSxcbiAgICAgIDEwMFxuICAgICk7XG4gICAgY2FtZXJhLnBvc2l0aW9uLmNvcHkoX2Jhc2VDYW1Qb3MpO1xuXG4gICAgLy8gV2ViR0wgUmVuZGVyZXJcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgIGFudGlhbGlhczogIWlzU29mdHdhcmVHbCxcbiAgICAgIHBvd2VyUHJlZmVyZW5jZTogJ2hpZ2gtcGVyZm9ybWFuY2UnLFxuICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlLFxuICAgIH0pO1xuICAgIHJlbmRlcmVyLm91dHB1dENvbG9yU3BhY2UgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZTtcbiAgICByZW5kZXJlci50b25lTWFwcGluZyA9IFRIUkVFLkFDRVNGaWxtaWNUb25lTWFwcGluZztcbiAgICByZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlID0gMS4xO1xuICAgIHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oaXNTb2Z0d2FyZUdsID8gMSA6IE1hdGgubWluKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCAyKSk7XG4gICAgcmVuZGVyZXIuc2V0U2l6ZShjb250YWluZXIuY2xpZW50V2lkdGgsIGNvbnRhaW5lci5jbGllbnRIZWlnaHQpO1xuICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gIWlzU29mdHdhcmVHbDtcbiAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXA7XG5cbiAgICBjYW52YXNSZWYuY3VycmVudCA9IHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICBpZiAob25DYW52YXNSZWFkeSkge1xuICAgICAgb25DYW52YXNSZWFkeShyZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBTdHVkaW8gRW52aXJvbm1lbnQgKFBNUkVNR2VuZXJhdG9yICsgUm9vbUVudmlyb25tZW50KVxuICAgIGNvbnN0IHBtcmVtR2VuZXJhdG9yID0gbmV3IFRIUkVFLlBNUkVNR2VuZXJhdG9yKHJlbmRlcmVyKTtcbiAgICBzY2VuZS5lbnZpcm9ubWVudCA9IHBtcmVtR2VuZXJhdG9yLmZyb21TY2VuZShuZXcgUm9vbUVudmlyb25tZW50KCksIDAuMDQpLnRleHR1cmU7XG4gICAgcG1yZW1HZW5lcmF0b3IuZGlzcG9zZSgpO1xuXG4gICAgLy8gU3R1ZGlvIDMtcG9pbnQgbGlnaHRpbmdcbiAgICBjb25zdCBrZXlMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmN2VkLCAxLjMpO1xuICAgIGtleUxpZ2h0LnBvc2l0aW9uLnNldCgyLjUsIDMuNSwgMyk7XG4gICAgc2NlbmUuYWRkKGtleUxpZ2h0KTtcblxuICAgIGNvbnN0IGhlbWlMaWdodCA9IG5ldyBUSFJFRS5IZW1pc3BoZXJlTGlnaHQoMHhlMGYyZmUsIDB4MDkwOTBiLCAwLjcpO1xuICAgIHNjZW5lLmFkZChoZW1pTGlnaHQpO1xuXG4gICAgY29uc3QgcmltTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweDgxOGNmOCwgMC42KTtcbiAgICByaW1MaWdodC5wb3NpdGlvbi5zZXQoLTIuNSwgLTEuNSwgLTEuNSk7XG4gICAgc2NlbmUuYWRkKHJpbUxpZ2h0KTtcblxuICAgIC8vIE9yYml0IENvbnRyb2xzXG4gICAgY29uc3QgY29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgIGNvbnRyb2xzLmVuYWJsZURhbXBpbmcgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIGNvbnRyb2xzLmRhbXBpbmdGYWN0b3IgPSAwLjA1O1xuICAgIGNvbnRyb2xzLm1heERpc3RhbmNlID0gNi4wO1xuICAgIGNvbnRyb2xzLm1pbkRpc3RhbmNlID0gMC44O1xuICAgIGNvbnRyb2xzLm1heFBvbGFyQW5nbGUgPSBNYXRoLlBJICogMC43NTtcbiAgICBjb250cm9scy5taW5Qb2xhckFuZ2xlID0gTWF0aC5QSSAqIDAuMjU7XG4gICAgY29udHJvbHMuZW5hYmxlZCA9IG1vdGlvbkNvbmZpZ1JlZi5jdXJyZW50Lm1vZGUgPT09ICdvcmJpdCc7XG5cbiAgICAvLyBDYWxjdWxhdGUgYXNwZWN0IHJhdGlvIGZvciBwbGFuZVxuICAgIGNvbnN0IGltZ0FzcGVjdCA9IChpbWFnZURpbWVuc2lvbnMud2lkdGggfHwgODAwKSAvIChpbWFnZURpbWVuc2lvbnMuaGVpZ2h0IHx8IDYwMCk7XG4gICAgbGV0IHBsYW5lVyA9IDEuNjtcbiAgICBsZXQgcGxhbmVIID0gMS42IC8gaW1nQXNwZWN0O1xuICAgIGlmIChpbWdBc3BlY3QgPCAxKSB7XG4gICAgICBwbGFuZUggPSAxLjY7XG4gICAgICBwbGFuZVcgPSAxLjYgKiBpbWdBc3BlY3Q7XG4gICAgfVxuXG4gICAgLy8gSGlnaCBzdWJkaXZpc2lvbiBwbGFuZSBmb3IgM0QgZGlzcGxhY2VtZW50XG4gICAgY29uc3Qgc3ViZGl2aXNpb25zID0gaXNTb2Z0d2FyZUdsID8gMTI4IDogMjU2O1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkocGxhbmVXLCBwbGFuZUgsIHN1YmRpdmlzaW9ucywgc3ViZGl2aXNpb25zKTtcblxuICAgIC8vIFRleHR1cmUgTG9hZGVyXG4gICAgY29uc3QgdGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XG4gICAgY29uc3QgY29sb3JUZXggPSB0ZXh0dXJlTG9hZGVyLmxvYWQoaW1hZ2VVcmwpO1xuICAgIGNvbG9yVGV4LmNvbG9yU3BhY2UgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZTtcbiAgICBjb2xvclRleC5hbmlzb3Ryb3B5ID0gcmVuZGVyZXIuY2FwYWJpbGl0aWVzLmdldE1heEFuaXNvdHJvcHkoKTtcbiAgICBjb2xvclRleC53cmFwUyA9IFRIUkVFLkNsYW1wVG9FZGdlV3JhcHBpbmc7XG4gICAgY29sb3JUZXgud3JhcFQgPSBUSFJFRS5DbGFtcFRvRWRnZVdyYXBwaW5nO1xuICAgIGNvbG9yVGV4UmVmLmN1cnJlbnQgPSBjb2xvclRleDtcblxuICAgIGNvbnN0IGRlcHRoVGV4ID0gdGV4dHVyZUxvYWRlci5sb2FkKGRlcHRoVXJsKTtcbiAgICBkZXB0aFRleC53cmFwUyA9IFRIUkVFLkNsYW1wVG9FZGdlV3JhcHBpbmc7XG4gICAgZGVwdGhUZXgud3JhcFQgPSBUSFJFRS5DbGFtcFRvRWRnZVdyYXBwaW5nO1xuICAgIGRlcHRoVGV4UmVmLmN1cnJlbnQgPSBkZXB0aFRleDtcblxuICAgIC8vIEFkdmFuY2VkIEN1c3RvbSBQYXJhbGxheCBPY2NsdXNpb24gKyAzRCBEaXNwbGFjZW1lbnQgU2hhZGVyXG4gICAgY29uc3QgY3VzdG9tU2hhZGVyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoe1xuICAgICAgdW5pZm9ybXM6IHtcbiAgICAgICAgdENvbG9yOiB7IHZhbHVlOiBjb2xvclRleCB9LFxuICAgICAgICB0RGVwdGg6IHsgdmFsdWU6IGRlcHRoVGV4IH0sXG4gICAgICAgIHVEZXB0aFNjYWxlOiB7IHZhbHVlOiBkZXB0aENvbmZpZ1JlZi5jdXJyZW50LnNjYWxlICogMC4yMiB9LFxuICAgICAgICB1Rm9jdXNQbGFuZTogeyB2YWx1ZTogZGVwdGhDb25maWdSZWYuY3VycmVudC5mb2N1c1BsYW5lIH0sXG4gICAgICAgIHVJbnZlcnRlZDogeyB2YWx1ZTogZGVwdGhDb25maWdSZWYuY3VycmVudC5pbnZlcnRlZCA/IDEuMCA6IDAuMCB9LFxuICAgICAgICB1RWRnZURpbGF0aW9uOiB7IHZhbHVlOiBkZXB0aENvbmZpZ1JlZi5jdXJyZW50LmVkZ2VEaWxhdGlvbiB9LFxuICAgICAgICB1RG9mU3RyZW5ndGg6IHsgdmFsdWU6IGRlcHRoQ29uZmlnUmVmLmN1cnJlbnQuZG9mU3RyZW5ndGggfSxcbiAgICAgICAgdUNocm9tYXRpY0FiZXJyYXRpb246IHsgdmFsdWU6IGRlcHRoQ29uZmlnUmVmLmN1cnJlbnQuY2hyb21hdGljQWJlcnJhdGlvbiB9LFxuICAgICAgICB1RGlzcGxheU1vZGU6IHsgdmFsdWU6IDAuMCB9LCAvLyAwOiBzdGFuZGFyZCwgMTogYW5hZ2x5cGgsIDI6IGRlcHRobWFwXG4gICAgICAgIHVDb2xvck1hcFR5cGU6IHsgdmFsdWU6IDEuMCB9LCAvLyAwOiBncmF5LCAxOiB0dXJibywgMjogbWFnbWEsIDM6IGN5YmVyXG4gICAgICAgIHVDYW1lcmFPZmZzZXQ6IHsgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKDAsIDApIH0sXG4gICAgICAgIHVSZXNvbHV0aW9uOiB7IHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMihpbWFnZURpbWVuc2lvbnMud2lkdGgsIGltYWdlRGltZW5zaW9ucy5oZWlnaHQpIH0sXG4gICAgICB9LFxuICAgICAgdmVydGV4U2hhZGVyOiBgXG4gICAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHREZXB0aDtcbiAgICAgICAgdW5pZm9ybSBmbG9hdCB1RGVwdGhTY2FsZTtcbiAgICAgICAgdW5pZm9ybSBmbG9hdCB1Rm9jdXNQbGFuZTtcbiAgICAgICAgdW5pZm9ybSBmbG9hdCB1SW52ZXJ0ZWQ7XG4gICAgICAgIFxuICAgICAgICB2YXJ5aW5nIHZlYzIgdlV2O1xuICAgICAgICB2YXJ5aW5nIHZlYzMgdk5vcm1hbFZlYztcbiAgICAgICAgdmFyeWluZyB2ZWMzIHZWaWV3UG9zaXRpb247XG4gICAgICAgIHZhcnlpbmcgZmxvYXQgdkRlcHRoVmFsO1xuXG4gICAgICAgIHZvaWQgbWFpbigpIHtcbiAgICAgICAgICB2VXYgPSB1djtcbiAgICAgICAgICBcbiAgICAgICAgICBmbG9hdCBkID0gdGV4dHVyZTJEKHREZXB0aCwgdXYpLnI7XG4gICAgICAgICAgaWYgKHVJbnZlcnRlZCA+IDAuNSkge1xuICAgICAgICAgICAgZCA9IDEuMCAtIGQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZEZXB0aFZhbCA9IGQ7XG5cbiAgICAgICAgICAvLyBGb2NhbCBwbGFuZSBkaXNwbGFjZW1lbnQ6IHBvaW50cyBjbG9zZXIgdGhhbiBmb2N1c1BsYW5lIG1vdmUgZm9yd2FyZCAoK1opLFxuICAgICAgICAgIC8vIHBvaW50cyBmdXJ0aGVyIG1vdmUgYmFja3dhcmQgKC1aKVxuICAgICAgICAgIGZsb2F0IGRpc3BsYWNlbWVudCA9IChkIC0gdUZvY3VzUGxhbmUpICogdURlcHRoU2NhbGU7XG4gICAgICAgICAgXG4gICAgICAgICAgdmVjMyB0cmFuc2Zvcm1lZCA9IHBvc2l0aW9uICsgbm9ybWFsICogZGlzcGxhY2VtZW50O1xuICAgICAgICAgIFxuICAgICAgICAgIHZlYzQgbXZQb3NpdGlvbiA9IG1vZGVsVmlld01hdHJpeCAqIHZlYzQodHJhbnNmb3JtZWQsIDEuMCk7XG4gICAgICAgICAgdlZpZXdQb3NpdGlvbiA9IC1tdlBvc2l0aW9uLnh5ejtcbiAgICAgICAgICB2Tm9ybWFsVmVjID0gbm9ybWFsTWF0cml4ICogbm9ybWFsO1xuICAgICAgICAgIFxuICAgICAgICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG12UG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgIGAsXG4gICAgICBmcmFnbWVudFNoYWRlcjogYFxuICAgICAgICB1bmlmb3JtIHNhbXBsZXIyRCB0Q29sb3I7XG4gICAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHREZXB0aDtcbiAgICAgICAgdW5pZm9ybSBmbG9hdCB1RGVwdGhTY2FsZTtcbiAgICAgICAgdW5pZm9ybSBmbG9hdCB1Rm9jdXNQbGFuZTtcbiAgICAgICAgdW5pZm9ybSBmbG9hdCB1SW52ZXJ0ZWQ7XG4gICAgICAgIHVuaWZvcm0gZmxvYXQgdUVkZ2VEaWxhdGlvbjtcbiAgICAgICAgdW5pZm9ybSBmbG9hdCB1RG9mU3RyZW5ndGg7XG4gICAgICAgIHVuaWZvcm0gZmxvYXQgdUNocm9tYXRpY0FiZXJyYXRpb247XG4gICAgICAgIHVuaWZvcm0gZmxvYXQgdURpc3BsYXlNb2RlO1xuICAgICAgICB1bmlmb3JtIGZsb2F0IHVDb2xvck1hcFR5cGU7XG4gICAgICAgIHVuaWZvcm0gdmVjMiB1Q2FtZXJhT2Zmc2V0O1xuICAgICAgICBcbiAgICAgICAgdmFyeWluZyB2ZWMyIHZVdjtcbiAgICAgICAgdmFyeWluZyB2ZWMzIHZOb3JtYWxWZWM7XG4gICAgICAgIHZhcnlpbmcgdmVjMyB2Vmlld1Bvc2l0aW9uO1xuICAgICAgICB2YXJ5aW5nIGZsb2F0IHZEZXB0aFZhbDtcblxuICAgICAgICAvLyBUdXJibyBjb2xvcm1hcCBhcHByb3hpbWF0aW9uXG4gICAgICAgIHZlYzMgdHVyYm9Db2xvcm1hcChmbG9hdCB4KSB7XG4gICAgICAgICAgeCA9IGNsYW1wKHgsIDAuMCwgMS4wKTtcbiAgICAgICAgICB2ZWM0IHY0ID0gdmVjNCgxLjAsIHgsIHggKiB4LCB4ICogeCAqIHgpO1xuICAgICAgICAgIHZlYzIgdjIgPSB2NC56dyAqIHY0Lno7XG4gICAgICAgICAgcmV0dXJuIGNsYW1wKHZlYzMoXG4gICAgICAgICAgICBkb3QodjQueHksIHZlYzIoMC4xMzU3MjEzOCwgNC42MTUzOTI2MCkpICsgZG90KHYyLCB2ZWMyKC00Mi42NjAzMjI1OCwgMTMyLjEzMTA4MjM0KSksXG4gICAgICAgICAgICBkb3QodjQueHksIHZlYzIoMC4wOTE0MDI2MSwgMi4xOTQxODgzOSkpICsgZG90KHYyLCB2ZWMyKDQuODQyOTY2NTgsIC0xNC4xODUwMzMzMykpLFxuICAgICAgICAgICAgZG90KHY0Lnh5LCB2ZWMyKDAuMTA2NjczMzAsIDEyLjY0MTk0NjA4KSkgKyBkb3QodjIsIHZlYzIoLTYwLjU4MjA0ODM2LCAxMTAuMzYyNzY3NzEpKVxuICAgICAgICAgICksIDAuMCwgMS4wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1hZ21hIGNvbG9ybWFwXG4gICAgICAgIHZlYzMgbWFnbWFDb2xvcm1hcChmbG9hdCB4KSB7XG4gICAgICAgICAgeCA9IGNsYW1wKHgsIDAuMCwgMS4wKTtcbiAgICAgICAgICBmbG9hdCByID0gY2xhbXAoeCAqIDEuNSwgMC4wLCAxLjApO1xuICAgICAgICAgIGZsb2F0IGcgPSBjbGFtcCgoeCAtIDAuMjUpICogMS40LCAwLjAsIDEuMCk7XG4gICAgICAgICAgZmxvYXQgYiA9IGNsYW1wKDAuMiArIHggKiAwLjggKiAoMS4wIC0geCAqIDAuNSksIDAuMCwgMS4wKTtcbiAgICAgICAgICByZXR1cm4gdmVjMyhyLCBnLCBiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZvaWQgbWFpbigpIHtcbiAgICAgICAgICB2ZWMyIHV2ID0gdlV2O1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIFBhcmFsbGF4IFVWIGNvcnJlY3Rpb24gYmFzZWQgb24gdmlldyByYXkgdG8gZWxpbWluYXRlIHRlYXJpbmdcbiAgICAgICAgICB2ZWMzIHZpZXdEaXIgPSBub3JtYWxpemUodlZpZXdQb3NpdGlvbik7XG4gICAgICAgICAgZmxvYXQgZGVwdGhWYWwgPSB2RGVwdGhWYWw7XG4gICAgICAgICAgdmVjMiBwYXJhbGxheE9mZnNldCA9ICh2aWV3RGlyLnh5IC8gbWF4KDAuMDAxLCB2aWV3RGlyLnopKSAqICgoZGVwdGhWYWwgLSB1Rm9jdXNQbGFuZSkgKiB1RGVwdGhTY2FsZSAqIDAuMDYpO1xuICAgICAgICAgIFxuICAgICAgICAgIHZlYzIgc2FtcGxlVXYgPSBjbGFtcCh1diAtIHBhcmFsbGF4T2Zmc2V0LCAwLjAwMSwgMC45OTkpO1xuXG4gICAgICAgICAgLy8gMS4gRGVwdGggTWFwIGRpc3BsYXkgbW9kZVxuICAgICAgICAgIGlmICh1RGlzcGxheU1vZGUgPiAxLjUpIHtcbiAgICAgICAgICAgIGZsb2F0IGQgPSBkZXB0aFZhbDtcbiAgICAgICAgICAgIHZlYzMgY29sID0gdmVjMyhkKTtcbiAgICAgICAgICAgIGlmICh1Q29sb3JNYXBUeXBlID4gMi41KSB7XG4gICAgICAgICAgICAgIC8vIEN5YmVyIE5lb25cbiAgICAgICAgICAgICAgY29sID0gdmVjMyhkICogMS4yLCAwLjMgKyBkICogMC43LCAwLjggKyBkICogMC4yKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodUNvbG9yTWFwVHlwZSA+IDEuNSkge1xuICAgICAgICAgICAgICBjb2wgPSBtYWdtYUNvbG9ybWFwKGQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1Q29sb3JNYXBUeXBlID4gMC41KSB7XG4gICAgICAgICAgICAgIGNvbCA9IHR1cmJvQ29sb3JtYXAoZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbCwgMS4wKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyAyLiBBbmFnbHlwaCAzRCBtb2RlIChSZWQvQ3lhbiBiaW5vY3VsYXIgZ2xhc3NlcylcbiAgICAgICAgICBpZiAodURpc3BsYXlNb2RlID4gMC41ICYmIHVEaXNwbGF5TW9kZSA8IDEuNSkge1xuICAgICAgICAgICAgZmxvYXQgZXllU2VwID0gMC4wMTIgKiB1RGVwdGhTY2FsZTtcbiAgICAgICAgICAgIHZlYzIgbGVmdFVWID0gY2xhbXAoc2FtcGxlVXYgLSB2ZWMyKGV5ZVNlcCAqIChkZXB0aFZhbCAtIHVGb2N1c1BsYW5lKSwgMC4wKSwgMC4wMDEsIDAuOTk5KTtcbiAgICAgICAgICAgIHZlYzIgcmlnaHRVViA9IGNsYW1wKHNhbXBsZVV2ICsgdmVjMihleWVTZXAgKiAoZGVwdGhWYWwgLSB1Rm9jdXNQbGFuZSksIDAuMCksIDAuMDAxLCAwLjk5OSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZlYzQgY29sTGVmdCA9IHRleHR1cmUyRCh0Q29sb3IsIGxlZnRVVik7XG4gICAgICAgICAgICB2ZWM0IGNvbFJpZ2h0ID0gdGV4dHVyZTJEKHRDb2xvciwgcmlnaHRVVik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFJlZCBjaGFubmVsIGZyb20gbGVmdCBleWUsIEdyZWVuK0JsdWUgY2hhbm5lbHMgZnJvbSByaWdodCBleWVcbiAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoY29sTGVmdC5yLCBjb2xSaWdodC5nLCBjb2xSaWdodC5iLCAxLjApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIDMuIFN0YW5kYXJkIDNEIFBob3RvIHdpdGggY2hyb21hdGljIGFiZXJyYXRpb24gJiBzdWJ0bGUgRE9GIGJva2VoXG4gICAgICAgICAgdmVjNCBmaW5hbENvbG9yO1xuICAgICAgICAgIGlmICh1Q2hyb21hdGljQWJlcnJhdGlvbiA+IDAuMDAxKSB7XG4gICAgICAgICAgICBmbG9hdCBjYSA9IHVDaHJvbWF0aWNBYmVycmF0aW9uICogMC4wMiAqIGFicyhkZXB0aFZhbCAtIHVGb2N1c1BsYW5lKTtcbiAgICAgICAgICAgIGZsb2F0IHIgPSB0ZXh0dXJlMkQodENvbG9yLCBzYW1wbGVVdiArIHZlYzIoY2EsIDAuMCkpLnI7XG4gICAgICAgICAgICBmbG9hdCBnID0gdGV4dHVyZTJEKHRDb2xvciwgc2FtcGxlVXYpLmc7XG4gICAgICAgICAgICBmbG9hdCBiID0gdGV4dHVyZTJEKHRDb2xvciwgc2FtcGxlVXYgLSB2ZWMyKGNhLCAwLjApKS5iO1xuICAgICAgICAgICAgZmluYWxDb2xvciA9IHZlYzQociwgZywgYiwgMS4wKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmluYWxDb2xvciA9IHRleHR1cmUyRCh0Q29sb3IsIHNhbXBsZVV2KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTaW11bGF0ZWQgRGVwdGggb2YgRmllbGQgYmx1ciBvbiBkZWZvY3VzZWQgbGF5ZXJzXG4gICAgICAgICAgaWYgKHVEb2ZTdHJlbmd0aCA+IDAuMDUpIHtcbiAgICAgICAgICAgIGZsb2F0IGRvZkFtb3VudCA9IGFicyhkZXB0aFZhbCAtIHVGb2N1c1BsYW5lKSAqIHVEb2ZTdHJlbmd0aCAqIDAuMDA2O1xuICAgICAgICAgICAgdmVjNCBibHVyU2FtcGxlID0gdmVjNCgwLjApO1xuICAgICAgICAgICAgYmx1clNhbXBsZSArPSB0ZXh0dXJlMkQodENvbG9yLCBzYW1wbGVVdiArIHZlYzIoZG9mQW1vdW50LCAwLjApKTtcbiAgICAgICAgICAgIGJsdXJTYW1wbGUgKz0gdGV4dHVyZTJEKHRDb2xvciwgc2FtcGxlVXYgLSB2ZWMyKGRvZkFtb3VudCwgMC4wKSk7XG4gICAgICAgICAgICBibHVyU2FtcGxlICs9IHRleHR1cmUyRCh0Q29sb3IsIHNhbXBsZVV2ICsgdmVjMigwLjAsIGRvZkFtb3VudCkpO1xuICAgICAgICAgICAgYmx1clNhbXBsZSArPSB0ZXh0dXJlMkQodENvbG9yLCBzYW1wbGVVdiAtIHZlYzIoMC4wLCBkb2ZBbW91bnQpKTtcbiAgICAgICAgICAgIGJsdXJTYW1wbGUgKj0gMC4yNTtcbiAgICAgICAgICAgIGZpbmFsQ29sb3IgPSBtaXgoZmluYWxDb2xvciwgYmx1clNhbXBsZSwgMC42NSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gZmluYWxDb2xvcjtcbiAgICAgICAgfVxuICAgICAgYCxcbiAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgfSk7XG4gICAgbWF0ZXJpYWxSZWYuY3VycmVudCA9IGN1c3RvbVNoYWRlck1hdGVyaWFsO1xuXG4gICAgLy8gRGlzcGxhY2VkIE1lc2hcbiAgICBjb25zdCBtYWluTWVzaCA9IG5ldyBUSFJFRS5NZXNoPFRIUkVFLlBsYW5lR2VvbWV0cnksIFRIUkVFLk1hdGVyaWFsPihnZW9tZXRyeSwgY3VzdG9tU2hhZGVyTWF0ZXJpYWwpO1xuICAgIG1haW5NZXNoLmNhc3RTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIG1haW5NZXNoLnJlY2VpdmVTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIHNjZW5lLmFkZChtYWluTWVzaCk7XG4gICAgbWFpbk1lc2hSZWYuY3VycmVudCA9IG1haW5NZXNoO1xuXG4gICAgLy8gV2lyZWZyYW1lIE1lc2ggKGZvciB0b3BvbG9neSBpbnNwZWN0aW9uKVxuICAgIGNvbnN0IHdpcmVmcmFtZU1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHgyMmQzZWUsXG4gICAgICB3aXJlZnJhbWU6IHRydWUsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuOCxcbiAgICB9KTtcbiAgICB3aXJlZnJhbWVNYXRSZWYuY3VycmVudCA9IHdpcmVmcmFtZU1hdDtcblxuICAgIC8vIDMtUGFydCBQcm9jZWR1cmFsIE11c2V1bSBHYWxsZXJ5IEZyYW1lIChgVEhSRUUuR3JvdXBgKVxuICAgIGNvbnN0IGZyYW1lR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICBjb25zdCBmcmFtZVRoaWNrbmVzcyA9IDAuMDg7XG4gICAgY29uc3QgZnJhbWVEZXB0aCA9IDAuMDk7XG4gICAgY29uc3QgYm9yZGVyR2VvbSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeShwbGFuZVcgKyBmcmFtZVRoaWNrbmVzcyAqIDIsIHBsYW5lSCArIGZyYW1lVGhpY2tuZXNzICogMiwgZnJhbWVEZXB0aCk7XG4gICAgY29uc3QgYm9yZGVyTWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweDE4MTgxYixcbiAgICAgIHJvdWdobmVzczogMC4zNSxcbiAgICAgIG1ldGFsbmVzczogMC42LFxuICAgIH0pO1xuICAgIGNvbnN0IGJvcmRlck1lc2ggPSBuZXcgVEhSRUUuTWVzaChib3JkZXJHZW9tLCBib3JkZXJNYXQpO1xuICAgIGJvcmRlck1lc2gucG9zaXRpb24ueiA9IC1mcmFtZURlcHRoICogMC41IC0gMC4wMTtcbiAgICBmcmFtZUdyb3VwLmFkZChib3JkZXJNZXNoKTtcblxuICAgIC8vIElubmVyIGdvbGQvYnJvbnplIGJldmVsZWQgYWNjZW50IHJpbVxuICAgIGNvbnN0IGlubmVyUmltR2VvbSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeShwbGFuZVcgKyAwLjAyLCBwbGFuZUggKyAwLjAyLCAwLjAyKTtcbiAgICBjb25zdCBpbm5lclJpbU1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhkOTc3MDYsXG4gICAgICByb3VnaG5lc3M6IDAuMixcbiAgICAgIG1ldGFsbmVzczogMC44NSxcbiAgICB9KTtcbiAgICBjb25zdCBpbm5lclJpbU1lc2ggPSBuZXcgVEhSRUUuTWVzaChpbm5lclJpbUdlb20sIGlubmVyUmltTWF0KTtcbiAgICBpbm5lclJpbU1lc2gucG9zaXRpb24ueiA9IDAuMDA1O1xuICAgIGZyYW1lR3JvdXAuYWRkKGlubmVyUmltTWVzaCk7XG5cbiAgICAvLyBTb2Z0IGNvbnRhY3Qgc2hhZG93IHBsYW5lIGJlbmVhdGggdGhlIDNEIGZyYW1lXG4gICAgY29uc3Qgc2hhZG93UGxhbmVHZW9tID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkocGxhbmVXICogMS40LCAwLjUpO1xuICAgIGNvbnN0IHNoYWRvd0NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHNoYWRvd0NhbnZhcy53aWR0aCA9IDEyODtcbiAgICBzaGFkb3dDYW52YXMuaGVpZ2h0ID0gMTI4O1xuICAgIGNvbnN0IHNDdHggPSBzaGFkb3dDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gICAgY29uc3Qgc0dyYWQgPSBzQ3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KDY0LCA2NCwgMCwgNjQsIDY0LCA2NCk7XG4gICAgc0dyYWQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDAsIDAsIDAsIDAuNiknKTtcbiAgICBzR3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMCwgMCwgMCwgMCknKTtcbiAgICBzQ3R4LmZpbGxTdHlsZSA9IHNHcmFkO1xuICAgIHNDdHguZmlsbFJlY3QoMCwgMCwgMTI4LCAxMjgpO1xuICAgIGNvbnN0IHNoYWRvd1RleCA9IG5ldyBUSFJFRS5DYW52YXNUZXh0dXJlKHNoYWRvd0NhbnZhcyk7XG4gICAgY29uc3Qgc2hhZG93TWF0ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgIG1hcDogc2hhZG93VGV4LFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIG9wYWNpdHk6IDAuNDUsXG4gICAgfSk7XG4gICAgY29uc3Qgc2hhZG93TWVzaCA9IG5ldyBUSFJFRS5NZXNoKHNoYWRvd1BsYW5lR2VvbSwgc2hhZG93TWF0KTtcbiAgICBzaGFkb3dNZXNoLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgc2hhZG93TWVzaC5wb3NpdGlvbi55ID0gLXBsYW5lSCAqIDAuNSAtIDAuMDg7XG4gICAgc2hhZG93TWVzaC5wb3NpdGlvbi56ID0gMDtcbiAgICBmcmFtZUdyb3VwLmFkZChzaGFkb3dNZXNoKTtcblxuICAgIHNjZW5lLmFkZChmcmFtZUdyb3VwKTtcbiAgICBmcmFtZUdyb3VwUmVmLmN1cnJlbnQgPSBmcmFtZUdyb3VwO1xuICAgIGZyYW1lR3JvdXAudmlzaWJsZSA9IGRpc3BsYXlNb2RlUmVmLmN1cnJlbnQgPT09ICdmcmFtZWQnO1xuXG4gICAgLy8gSW50ZXJhY3RpdmUgcG9pbnRlciBtb3ZlbWVudCBoYW5kbGVyXG4gICAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSAoZTogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICBjb25zdCByZWN0ID0gcmVuZGVyZXIuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHggPSAoKGUuY2xpZW50WCAtIHJlY3QubGVmdCkgLyByZWN0LndpZHRoKSAqIDIgLSAxO1xuICAgICAgY29uc3QgeSA9IC0oKChlLmNsaWVudFkgLSByZWN0LnRvcCkgLyByZWN0LmhlaWdodCkgKiAyIC0gMSk7XG4gICAgICBfbW91c2VUYXJnZXQuc2V0KHgsIHkpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBoYW5kbGVQb2ludGVyTW92ZSk7XG5cbiAgICAvLyBSZXNpemUgaGFuZGxlclxuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG4gICAgICBjb25zdCB3ID0gY29udGFpbmVyLmNsaWVudFdpZHRoO1xuICAgICAgY29uc3QgaCA9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgICBjYW1lcmEuYXNwZWN0ID0gdyAvIGg7XG4gICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3LCBoKTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVSZXNpemUpO1xuXG4gICAgLy8gNjBGUFMgTG9zc2xlc3MgUmVuZGVyIExvb3Agd2l0aCBleHBvbmVudGlhbCBkYW1waW5nXG4gICAgbGV0IGZyYW1lSWQgPSAwO1xuICAgIGNvbnN0IGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XG4gICAgbGV0IGF1dG9Sb3RhdGVBbmdsZSA9IDA7XG5cbiAgICBmdW5jdGlvbiBhZnRlckRyYXcoY2I6ICgpID0+IHZvaWQpIHtcbiAgICAgIGNvbnN0IGdsID0gcmVuZGVyZXIuZ2V0Q29udGV4dCgpIGFzIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG4gICAgICBjb25zdCBzeW5jID0gZ2wuZmVuY2VTeW5jKGdsLlNZTkNfR1BVX0NPTU1BTkRTX0NPTVBMRVRFLCAwKTtcbiAgICAgIGdsLmZsdXNoKCk7XG4gICAgICBjb25zdCBwb2xsID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHN5bmMgJiYgZ2wuZ2V0U3luY1BhcmFtZXRlcihzeW5jLCBnbC5TWU5DX1NUQVRVUyk7XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gZ2wuVU5TSUdOQUxFRCkge1xuICAgICAgICAgIGZyYW1lSWQgPSB3aW5kb3cuc2V0VGltZW91dChwb2xsLCA1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnbC5kZWxldGVTeW5jKHN5bmMpO1xuICAgICAgICAgIGZyYW1lSWQgPSB3aW5kb3cuc2V0VGltZW91dChjYiwgODApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZnJhbWVJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KHBvbGwsIDUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgICBjb25zdCBkdCA9IGNsb2NrLmdldERlbHRhKCk7XG4gICAgICBjb25zdCB0aW1lID0gY2xvY2suZ2V0RWxhcHNlZFRpbWUoKTtcblxuICAgICAgY29uc3QgbUNmZyA9IG1vdGlvbkNvbmZpZ1JlZi5jdXJyZW50O1xuICAgICAgY29uc3QgZENmZyA9IGRlcHRoQ29uZmlnUmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCBkaXNwTW9kZSA9IGRpc3BsYXlNb2RlUmVmLmN1cnJlbnQ7XG5cbiAgICAgIC8vIEFjY3VtdWxhdGUgYXV0by1yb3RhdGUgYW5nbGUgYXJvdW5kIGltYWdlIGNlbnRlclxuICAgICAgaWYgKG1DZmcuYXV0b1JvdGF0ZSkge1xuICAgICAgICBhdXRvUm90YXRlQW5nbGUgKz0gZHQgKiAobUNmZy5hdXRvUm90YXRlU3BlZWQgPz8gMS4wKSAqIDAuODtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHNoYWRlciB1bmlmb3Jtc1xuICAgICAgaWYgKGN1c3RvbVNoYWRlck1hdGVyaWFsKSB7XG4gICAgICAgIGN1c3RvbVNoYWRlck1hdGVyaWFsLnVuaWZvcm1zLnVEZXB0aFNjYWxlLnZhbHVlID0gZENmZy5zY2FsZSAqIDAuMjI7XG4gICAgICAgIGN1c3RvbVNoYWRlck1hdGVyaWFsLnVuaWZvcm1zLnVGb2N1c1BsYW5lLnZhbHVlID0gZENmZy5mb2N1c1BsYW5lO1xuICAgICAgICBjdXN0b21TaGFkZXJNYXRlcmlhbC51bmlmb3Jtcy51SW52ZXJ0ZWQudmFsdWUgPSBkQ2ZnLmludmVydGVkID8gMS4wIDogMC4wO1xuICAgICAgICBjdXN0b21TaGFkZXJNYXRlcmlhbC51bmlmb3Jtcy51RWRnZURpbGF0aW9uLnZhbHVlID0gZENmZy5lZGdlRGlsYXRpb247XG4gICAgICAgIGN1c3RvbVNoYWRlck1hdGVyaWFsLnVuaWZvcm1zLnVEb2ZTdHJlbmd0aC52YWx1ZSA9IGRDZmcuZG9mU3RyZW5ndGg7XG4gICAgICAgIGN1c3RvbVNoYWRlck1hdGVyaWFsLnVuaWZvcm1zLnVDaHJvbWF0aWNBYmVycmF0aW9uLnZhbHVlID0gZENmZy5jaHJvbWF0aWNBYmVycmF0aW9uO1xuXG4gICAgICAgIC8vIERpc3BsYXkgbW9kZSB1bmlmb3JtXG4gICAgICAgIGlmIChkaXNwTW9kZSA9PT0gJ2FuYWdseXBoJykge1xuICAgICAgICAgIGN1c3RvbVNoYWRlck1hdGVyaWFsLnVuaWZvcm1zLnVEaXNwbGF5TW9kZS52YWx1ZSA9IDEuMDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXNwTW9kZSA9PT0gJ2RlcHRobWFwJykge1xuICAgICAgICAgIGN1c3RvbVNoYWRlck1hdGVyaWFsLnVuaWZvcm1zLnVEaXNwbGF5TW9kZS52YWx1ZSA9IDIuMDtcbiAgICAgICAgICBjb25zdCBjb2xNYXAgPSBkZXB0aENvbG9yTWFwUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgY3VzdG9tU2hhZGVyTWF0ZXJpYWwudW5pZm9ybXMudUNvbG9yTWFwVHlwZS52YWx1ZSA9XG4gICAgICAgICAgICBjb2xNYXAgPT09ICdncmF5c2NhbGUnID8gMC4wIDogY29sTWFwID09PSAnbWFnbWEnID8gMi4wIDogY29sTWFwID09PSAnY3liZXInID8gMy4wIDogMS4wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN1c3RvbVNoYWRlck1hdGVyaWFsLnVuaWZvcm1zLnVEaXNwbGF5TW9kZS52YWx1ZSA9IDAuMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUb2dnbGUgd2lyZWZyYW1lIG1vZGVcbiAgICAgIGlmIChtYWluTWVzaCkge1xuICAgICAgICBpZiAoZGlzcE1vZGUgPT09ICdtZXNoX3dpcmVmcmFtZScpIHtcbiAgICAgICAgICBtYWluTWVzaC5tYXRlcmlhbCA9IHdpcmVmcmFtZU1hdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYWluTWVzaC5tYXRlcmlhbCA9IGN1c3RvbVNoYWRlck1hdGVyaWFsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvZ2dsZSBmcmFtZWQgZ3JvdXBcbiAgICAgIGlmIChmcmFtZUdyb3VwKSB7XG4gICAgICAgIGZyYW1lR3JvdXAudmlzaWJsZSA9IGRpc3BNb2RlID09PSAnZnJhbWVkJztcbiAgICAgIH1cblxuICAgICAgLy8gQ2FsY3VsYXRlIGNhbWVyYSBtb3Rpb24gLyBzdWJ0bGUgZnJhbWUgc2hpZnQgKFwibmllem5hY3puaWUgcHJ6ZXN1d2FqxIVjeSBzacSZIGthZHJcIilcbiAgICAgIGNvbnRyb2xzLmVuYWJsZWQgPSBtQ2ZnLm1vZGUgPT09ICdvcmJpdCc7XG5cbiAgICAgIGlmIChtQ2ZnLm1vZGUgPT09ICdvcmJpdCcpIHtcbiAgICAgICAgY29udHJvbHMuYXV0b1JvdGF0ZSA9IG1DZmcuYXV0b1JvdGF0ZTtcbiAgICAgICAgY29udHJvbHMuYXV0b1JvdGF0ZVNwZWVkID0gKG1DZmcuYXV0b1JvdGF0ZVNwZWVkID8/IDEuMCkgKiAyLjU7XG4gICAgICAgIGNvbnRyb2xzLnVwZGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYW1wID0gbUNmZy5hbXBsaXR1ZGUgKiAwLjQ1O1xuICAgICAgICBjb25zdCBzcGQgPSBtQ2ZnLnNwZWVkICogMS41O1xuXG4gICAgICAgIC8vIFNtb290aCBtb3VzZSBkYW1waW5nOiAxIC0gTWF0aC5leHAoLTEwICogZHQpXG4gICAgICAgIGNvbnN0IGRhbXBGYWN0b3IgPSAxIC0gTWF0aC5leHAoLTEwICogZHQpO1xuICAgICAgICBfbW91c2VDdXJyZW50LmxlcnAoX21vdXNlVGFyZ2V0LCBkYW1wRmFjdG9yKTtcblxuICAgICAgICBsZXQgb2Zmc2V0WCA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRZID0gMDtcblxuICAgICAgICBpZiAobUNmZy5tb2RlID09PSAnY2lyY2xlJykge1xuICAgICAgICAgIG9mZnNldFggPSBNYXRoLmNvcyh0aW1lICogc3BkKSAqIGFtcDtcbiAgICAgICAgICBvZmZzZXRZID0gTWF0aC5zaW4odGltZSAqIHNwZCkgKiBhbXAgKiAwLjc1O1xuICAgICAgICB9IGVsc2UgaWYgKG1DZmcubW9kZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgb2Zmc2V0WCA9IE1hdGguc2luKHRpbWUgKiBzcGQpICogYW1wO1xuICAgICAgICAgIG9mZnNldFkgPSBNYXRoLnNpbih0aW1lICogc3BkICogMikgKiBhbXAgKiAwLjI7XG4gICAgICAgIH0gZWxzZSBpZiAobUNmZy5tb2RlID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgb2Zmc2V0WCA9IE1hdGguY29zKHRpbWUgKiBzcGQgKiAyKSAqIGFtcCAqIDAuMjtcbiAgICAgICAgICBvZmZzZXRZID0gTWF0aC5zaW4odGltZSAqIHNwZCkgKiBhbXA7XG4gICAgICAgIH0gZWxzZSBpZiAobUNmZy5tb2RlID09PSAnaW5maW5pdHknKSB7XG4gICAgICAgICAgb2Zmc2V0WCA9IE1hdGguc2luKHRpbWUgKiBzcGQpICogYW1wO1xuICAgICAgICAgIG9mZnNldFkgPSBNYXRoLnNpbih0aW1lICogc3BkICogMikgKiAoYW1wICogMC41KTtcbiAgICAgICAgfSBlbHNlIGlmIChtQ2ZnLm1vZGUgPT09ICdicmVhdGhlJykge1xuICAgICAgICAgIG9mZnNldFggPSBNYXRoLnNpbih0aW1lICogc3BkICogMC43KSAqIChhbXAgKiAwLjMpO1xuICAgICAgICAgIG9mZnNldFkgPSBNYXRoLmNvcyh0aW1lICogc3BkICogMC43KSAqIChhbXAgKiAwLjMpO1xuICAgICAgICAgIF9iYXNlQ2FtUG9zLnogPSAyLjIgKyBNYXRoLnNpbih0aW1lICogc3BkKSAqIChhbXAgKiAwLjQpO1xuICAgICAgICB9IGVsc2UgaWYgKG1DZmcubW9kZSA9PT0gJ21vdXNlJykge1xuICAgICAgICAgIG9mZnNldFggPSBfbW91c2VDdXJyZW50LnggKiBhbXAgKiAxLjI7XG4gICAgICAgICAgb2Zmc2V0WSA9IF9tb3VzZUN1cnJlbnQueSAqIGFtcCAqIDEuMjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gQXV0by1yb3RhdGUgaXMgYWN0aXZlLCByb3RhdGUgY2FtZXJhIGFyb3VuZCBpbWFnZSBjZW50ZXIgKDAsIDAsIDApXG4gICAgICAgIC8vIGF0IHRoZSBjb25maWd1cmVkIHNwZWVkLCBpbmRlcGVuZGVudCBvZiBtb3VzZSBtb3ZlbWVudHNcbiAgICAgICAgaWYgKG1DZmcuYXV0b1JvdGF0ZSkge1xuICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IF9iYXNlQ2FtUG9zLno7XG4gICAgICAgICAgY29uc3QgY2FtWCA9IE1hdGguc2luKGF1dG9Sb3RhdGVBbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgY29uc3QgY2FtWiA9IE1hdGguY29zKGF1dG9Sb3RhdGVBbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgY29uc3QgY2FtWSA9IF9iYXNlQ2FtUG9zLnkgKyBvZmZzZXRZICogMC40O1xuICAgICAgICAgIF90YXJnZXRDYW1Qb3Muc2V0KGNhbVgsIGNhbVksIGNhbVopO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEFkZCBzdWJ0bGUgaW50ZXJhY3RpdmUgbW91c2UgaW5mbHVlbmNlIGlmIGVuYWJsZWQgYW5kIGF1dG8tcm90YXRlIGlzIG9mZlxuICAgICAgICAgIGlmIChtQ2ZnLmludGVyYWN0aXZlTW91c2UgJiYgbUNmZy5tb2RlICE9PSAnbW91c2UnKSB7XG4gICAgICAgICAgICBvZmZzZXRYICs9IF9tb3VzZUN1cnJlbnQueCAqIGFtcCAqIG1DZmcubW91c2VTZW5zaXRpdml0eSAqIDAuNDtcbiAgICAgICAgICAgIG9mZnNldFkgKz0gX21vdXNlQ3VycmVudC55ICogYW1wICogbUNmZy5tb3VzZVNlbnNpdGl2aXR5ICogMC40O1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGFyZ2V0Q2FtUG9zLnNldChfYmFzZUNhbVBvcy54ICsgb2Zmc2V0WCwgX2Jhc2VDYW1Qb3MueSArIG9mZnNldFksIF9iYXNlQ2FtUG9zLnopO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmNvcHkoX3RhcmdldENhbVBvcyk7XG4gICAgICAgIGNhbWVyYS5sb29rQXQoMCwgMCwgMCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHNoYWRlciBjYW1lcmEgb2Zmc2V0IHVuaWZvcm1cbiAgICAgICAgaWYgKGN1c3RvbVNoYWRlck1hdGVyaWFsKSB7XG4gICAgICAgICAgY3VzdG9tU2hhZGVyTWF0ZXJpYWwudW5pZm9ybXMudUNhbWVyYU9mZnNldC52YWx1ZS5zZXQob2Zmc2V0WCwgb2Zmc2V0WSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuXG4gICAgICBpZiAoaXNTb2Z0d2FyZUdsKSB7XG4gICAgICAgIGFmdGVyRHJhdyh0aWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZyYW1lSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGljaygpO1xuXG4gICAgLy8gQ2xlYW51cFxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBoYW5kbGVQb2ludGVyTW92ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlUmVzaXplKTtcbiAgICAgIGlmIChpc1NvZnR3YXJlR2wpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGZyYW1lSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZnJhbWVJZCk7XG4gICAgICB9XG4gICAgICBjb250cm9scy5kaXNwb3NlKCk7XG4gICAgICByZW5kZXJlci5kaXNwb3NlKCk7XG4gICAgICBnZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgICBjdXN0b21TaGFkZXJNYXRlcmlhbC5kaXNwb3NlKCk7XG4gICAgICB3aXJlZnJhbWVNYXQuZGlzcG9zZSgpO1xuICAgICAgYm9yZGVyR2VvbS5kaXNwb3NlKCk7XG4gICAgICBpbm5lclJpbUdlb20uZGlzcG9zZSgpO1xuICAgICAgc2hhZG93UGxhbmVHZW9tLmRpc3Bvc2UoKTtcbiAgICAgIHNoYWRvd1RleC5kaXNwb3NlKCk7XG4gICAgfTtcbiAgfSwgW2ltYWdlVXJsLCBkZXB0aFVybCwgaW1hZ2VEaW1lbnNpb25zXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgdy1mdWxsIGgtZnVsbCBvdmVyZmxvdy1oaWRkZW4gc2VsZWN0LW5vbmUgYmctemluYy05NTBcIlxuICAgIC8+XG4gICk7XG59O1xuIl19