const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useCallback = __vite__cjsImport0_react["useCallback"];const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport4_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/holoarch_studio/node_modules/.vite/deps/react.js?v=c1c4f681";
import { Cloud, FolderOpen, Upload, Download, Trash2, RefreshCw, FileCode2, Image as ImageIcon, Database, ExternalLink, AlertTriangle, Search, Activity, LogOut, CheckCircle2, FileJson, Sparkles } from "/apps/holoarch_studio/node_modules/.vite/deps/lucide-react.js?v=c1c4f681";
import { initAuth, googleSignIn, getAccessToken, logout, listDriveFiles, uploadTextFileToDrive, uploadDataUrlFileToDrive, updateDriveFileContent, downloadDriveFileText, deleteDriveFile, fetchDriveStorageInfo, fetchDriveActivities, subscribeToUserFirestoreProjects, createFirestoreARProject, updateFirestoreARProject, deleteFirestoreARProject } from "/apps/holoarch_studio/src/utils/googleDriveAuth.ts";
import { generateOBJContent, generateSTLContent } from "/apps/holoarch_studio/src/utils/exporters.ts";
var _jsxFileName = "/app/applet/src/components/GoogleDriveWorkspacePanel.tsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/apps/holoarch_studio/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c1c4f681";
export const GoogleDriveWorkspacePanel = ({ config, onLoadConfig, latestScreenshot, systemPromptMarkdown, onNotify }) => {
	const [needsAuth, setNeedsAuth] = useState(true);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	// Google Drive state
	const [driveFiles, setDriveFiles] = useState([]);
	const [driveQuota, setDriveQuota] = useState(null);
	const [driveActivities, setDriveActivities] = useState([]);
	const [isLoadingDrive, setIsLoadingDrive] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [onlyHoloArchFilter, setOnlyHoloArchFilter] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [projectTitleInput, setProjectTitleInput] = useState("HoloArch_Makieta_3D_AR");
	const [errorBanner, setErrorBanner] = useState(null);
	// Firestore real-time projects state
	const [firestoreProjects, setFirestoreProjects] = useState([]);
	// Mandatory confirmation modal for destructive/mutating operations
	const [pendingConfirm, setPendingConfirm] = useState(null);
	const [isExecutingConfirm, setIsExecutingConfirm] = useState(false);
	const loadDriveWorkspaceData = useCallback(async (activeToken) => {
		const accessToken = activeToken || await getAccessToken();
		if (!accessToken) {
			setNeedsAuth(true);
			return;
		}
		setIsLoadingDrive(true);
		setErrorBanner(null);
		try {
			const [files, quota, activities] = await Promise.all([
				listDriveFiles(accessToken, {
					searchQuery,
					onlyHoloArch: onlyHoloArchFilter
				}),
				fetchDriveStorageInfo(accessToken).catch(() => null),
				fetchDriveActivities(accessToken).catch(() => [])
			]);
			setDriveFiles(files);
			if (quota) setDriveQuota(quota);
			setDriveActivities(activities);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Błąd komunikacji z Google Drive";
			setErrorBanner(msg);
		} finally {
			setIsLoadingDrive(false);
		}
	}, [onlyHoloArchFilter, searchQuery]);
	// Initialize Firebase Auth & Google OAuth state listener
	useEffect(() => {
		const unsubscribe = initAuth((authedUser, accessToken) => {
			setUser(authedUser);
			setToken(accessToken);
			setNeedsAuth(false);
		}, (authedUser) => {
			setUser(authedUser || null);
			setToken(null);
			setNeedsAuth(true);
		});
		return () => unsubscribe();
	}, []);
	// Subscribe to Firestore /projects collection when user is authenticated
	useEffect(() => {
		if (!user?.uid) {
			setFirestoreProjects([]);
			return;
		}
		const unsubFirestore = subscribeToUserFirestoreProjects(user.uid, (projects) => {
			setFirestoreProjects(projects);
		}, (err) => {
			const msg = err instanceof Error ? err.message : String(err);
			if (msg.includes("Quota exceeded")) {
				setErrorBanner("Przekroczono dzienny limit odczytów Firestore (Spark Free Tier). Limit odnowi się jutro.");
			}
		});
		return () => unsubFirestore();
	}, [user?.uid]);
	// Reload Drive files when token or filter changes
	useEffect(() => {
		if (token && !needsAuth) {
			loadDriveWorkspaceData(token);
		}
	}, [
		token,
		needsAuth,
		onlyHoloArchFilter,
		loadDriveWorkspaceData
	]);
	const handleLogin = async () => {
		setIsLoggingIn(true);
		setErrorBanner(null);
		try {
			const result = await googleSignIn();
			if (result) {
				setUser(result.user);
				setToken(result.accessToken);
				setNeedsAuth(false);
				onNotify(`Połączono z Google Drive i Firebase jako ${result.user.email}`);
				await loadDriveWorkspaceData(result.accessToken);
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Logowanie przez Google nie powiodło się.";
			setErrorBanner(msg);
		} finally {
			setIsLoggingIn(false);
		}
	};
	const handleLogout = async () => {
		await logout();
		setUser(null);
		setToken(null);
		setNeedsAuth(true);
		setDriveFiles([]);
		setFirestoreProjects([]);
		onNotify("Wylogowano z konta Google Workspace / Firebase");
	};
	// Upload current AR Project JSON to Google Drive + sync record in Firestore
	const handleSaveProjectToDriveAndFirestore = async () => {
		const accessToken = await getAccessToken();
		if (!accessToken) {
			setNeedsAuth(true);
			return;
		}
		setIsUploading(true);
		setErrorBanner(null);
		try {
			const cleanTitle = projectTitleInput.trim().replace(/[^a-zA-Z0-9_-]/g, "_") || "HoloArch_Project";
			const fileName = cleanTitle.startsWith("HoloArch") ? `${cleanTitle}.json` : `HoloArch_${cleanTitle}.json`;
			const payloadString = JSON.stringify({
				app: "HoloArch_AR_Studio",
				exportedAt: new Date().toISOString(),
				config
			}, null, 2);
			const uploadedDriveFile = await uploadTextFileToDrive(accessToken, fileName, payloadString, "application/json", "HoloArch_AR_Studio 3D Hologram Configuration JSON");
			if (user) {
				await createFirestoreARProject(config, projectTitleInput.trim() || fileName, uploadedDriveFile.id);
			}
			onNotify(`Zapisano projekt „${uploadedDriveFile.name}” na Google Drive oraz w bazie Firestore!`);
			await loadDriveWorkspaceData(accessToken);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Nie udało się zapisać projektu na Google Drive";
			setErrorBanner(msg);
		} finally {
			setIsUploading(false);
		}
	};
	// Export 3D Mesh (.OBJ or .STL) directly to Google Drive
	const handleUpload3DMeshToDrive = async (format) => {
		const accessToken = await getAccessToken();
		if (!accessToken) {
			setNeedsAuth(true);
			return;
		}
		setIsUploading(true);
		setErrorBanner(null);
		try {
			const timestamp = new Date().toISOString().slice(0, 10);
			const fileName = `HoloArch_${config.sceneId}_${timestamp}.${format}`;
			const content = format === "obj" ? generateOBJContent(config) : generateSTLContent(config);
			const mimeType = format === "obj" ? "text/plain" : "model/stl";
			const uploaded = await uploadTextFileToDrive(accessToken, fileName, content, mimeType, `HoloArch_AR_Studio 3D Architectural Mesh (${format.toUpperCase()})`);
			onNotify(`Wyeksportowano siatkę 3D „${uploaded.name}” bezpośrednio na Google Drive!`);
			await loadDriveWorkspaceData(accessToken);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Błąd wysyłania modelu 3D na Google Drive";
			setErrorBanner(msg);
		} finally {
			setIsUploading(false);
		}
	};
	// Upload latest AR Screenshot (.png) or System Prompt (.md) to Google Drive
	const handleUploadScreenshotOrPrompt = async (mode) => {
		const accessToken = await getAccessToken();
		if (!accessToken) {
			setNeedsAuth(true);
			return;
		}
		setIsUploading(true);
		setErrorBanner(null);
		try {
			const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
			if (mode === "screenshot") {
				if (!latestScreenshot) {
					onNotify("Najpierw wykonaj zrzut ekranu 3D przyciskiem „Zrzut do galerii” pod sceną!");
					setIsUploading(false);
					return;
				}
				const fileName = `HoloArch_AR_Viewport_${timestamp}.png`;
				const uploaded = await uploadDataUrlFileToDrive(accessToken, fileName, latestScreenshot.dataUrl, "image/png", "HoloArch_AR_Studio 3D Viewport Capture");
				onNotify(`Zapisano zrzut ekranu AR „${uploaded.name}” na Google Drive!`);
			} else {
				const fileName = `HoloArch_Prompt_Spec_${config.sceneId}_${timestamp}.md`;
				const uploaded = await uploadTextFileToDrive(accessToken, fileName, systemPromptMarkdown, "text/markdown", "HoloArch_AR_Studio Architectural Prompt & Unity C# Spec");
				onNotify(`Zapisano dokumentację promptu „${uploaded.name}” na Google Drive!`);
			}
			await loadDriveWorkspaceData(accessToken);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Błąd zapisu na Google Drive";
			setErrorBanner(msg);
		} finally {
			setIsUploading(false);
		}
	};
	// Load a JSON project file from Google Drive into the 3D simulator
	const handleLoadProjectFromDrive = async (file) => {
		const accessToken = await getAccessToken();
		if (!accessToken) {
			setNeedsAuth(true);
			return;
		}
		setIsLoadingDrive(true);
		setErrorBanner(null);
		try {
			const rawText = await downloadDriveFileText(accessToken, file.id);
			const parsed = JSON.parse(rawText);
			const targetConfig = parsed.config ? parsed.config : parsed;
			onLoadConfig(targetConfig, `Google Drive: ${file.name}`);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Wybrany plik nie jest poprawnym projektem JSON HoloArch.";
			setErrorBanner(msg);
		} finally {
			setIsLoadingDrive(false);
		}
	};
	// Execute confirmed mutating/destructive action (Overwrite Drive file, Delete Drive file, Update/Delete Firestore doc)
	const handleConfirmExecute = async () => {
		if (!pendingConfirm) return;
		setIsExecutingConfirm(true);
		setErrorBanner(null);
		try {
			if (pendingConfirm.type === "delete_drive") {
				const accessToken = await getAccessToken();
				if (!accessToken) {
					setNeedsAuth(true);
					return;
				}
				await deleteDriveFile(accessToken, pendingConfirm.targetId);
				onNotify(`Usunięto plik „${pendingConfirm.targetName}” z Google Drive.`);
				await loadDriveWorkspaceData(accessToken);
			} else if (pendingConfirm.type === "overwrite_drive") {
				const accessToken = await getAccessToken();
				if (!accessToken) {
					setNeedsAuth(true);
					return;
				}
				const payloadString = JSON.stringify({
					app: "HoloArch_AR_Studio",
					updatedAt: new Date().toISOString(),
					config
				}, null, 2);
				await updateDriveFileContent(accessToken, pendingConfirm.targetId, payloadString, "application/json");
				onNotify(`Nadpisano plik projektu „${pendingConfirm.targetName}” na Google Drive bieżącą sceną 3D.`);
				await loadDriveWorkspaceData(accessToken);
			} else if (pendingConfirm.type === "delete_firestore") {
				await deleteFirestoreARProject(pendingConfirm.targetId);
				onNotify(`Usunięto projekt „${pendingConfirm.targetName}” z bazy Firestore.`);
			} else if (pendingConfirm.type === "update_firestore") {
				await updateFirestoreARProject(pendingConfirm.targetId, config, pendingConfirm.targetName);
				onNotify(`Zaktualizowano projekt „${pendingConfirm.targetName}” w bazie danych Firestore.`);
			}
			setPendingConfirm(null);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Operacja nie powiodła się.";
			setErrorBanner(msg);
		} finally {
			setIsExecutingConfirm(false);
		}
	};
	const formatBytes = (bytesStr) => {
		if (!bytesStr) return "—";
		const num = Number(bytesStr);
		if (!Number.isFinite(num) || num <= 0) return "0 B";
		const units = [
			"B",
			"KB",
			"MB",
			"GB",
			"TB"
		];
		const i = Math.min(units.length - 1, Math.floor(Math.log(num) / Math.log(1024)));
		return `${(num / Math.pow(1024, i)).toFixed(i > 1 ? 2 : 0)} ${units[i]}`;
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		id: "google-drive",
		className: "bg-slate-900/75 border border-cyan-500/30 rounded-2xl p-6 space-y-6 shadow-2xl",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2 text-xs font-mono text-cyan-400",
							children: [/* @__PURE__ */ _jsxDEV(Cloud, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 449,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "GOOGLE WORKSPACE DRIVE API v3 + FIREBASE FIRESTORE CLOUD" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 450,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 448,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-xl font-bold text-white font-display flex items-center gap-2.5",
							children: /* @__PURE__ */ _jsxDEV("span", { children: "Chmura Projektów Google Drive i Baza Danych Firebase Firestore" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 453,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 452,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-300 max-w-3xl",
							children: "Zapisuj i wczytuj pełne konfiguracje scen 3D (`.json`), eksportuj modele geometryczne (`.obj`, `.stl`), zrzuty ekranu AR (`.png`) oraz dokumentację promptów (`.md`) bezpośrednio na swój dysk Google Drive i synchronizuj kolekcję projektów w czasie rzeczywistym przez Firebase Firestore."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 455,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 447,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center gap-3 shrink-0",
					children: needsAuth ? /* @__PURE__ */ _jsxDEV("button", {
						className: "gsi-material-button",
						onClick: handleLogin,
						disabled: isLoggingIn,
						children: [/* @__PURE__ */ _jsxDEV("div", { className: "gsi-material-button-state" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 471,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "gsi-material-button-content-wrapper",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "gsi-material-button-icon",
									children: /* @__PURE__ */ _jsxDEV("svg", {
										version: "1.1",
										xmlns: "http://www.w3.org/2000/svg",
										viewBox: "0 0 48 48",
										xmlnsXlink: "http://www.w3.org/1999/xlink",
										style: { display: "block" },
										children: [
											/* @__PURE__ */ _jsxDEV("path", {
												fill: "#EA4335",
												d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 481,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("path", {
												fill: "#4285F4",
												d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 485,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("path", {
												fill: "#FBBC05",
												d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 489,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("path", {
												fill: "#34A853",
												d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 493,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("path", {
												fill: "none",
												d: "M0 0h48v48H0z"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 497,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 474,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 473,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									className: "gsi-material-button-contents",
									children: isLoggingIn ? "Łączenie z Google..." : "Sign in with Google"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 500,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									style: { display: "none" },
									children: "Sign in with Google"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 503,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 472,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 466,
						columnNumber: 13
					}, this) : /* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-3 bg-slate-950/90 border border-slate-800 px-3.5 py-2 rounded-xl",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "text-right",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center gap-1.5 text-xs font-semibold text-emerald-400",
								children: [/* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 510,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: user?.displayName || driveQuota?.userDisplayName || "Konto Google" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 511,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 509,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] font-mono text-slate-400",
								children: [user?.email || driveQuota?.userEmail, driveQuota?.usageInDrive ? ` · Drive: ${formatBytes(driveQuota.usageInDrive)}` : ""]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 513,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 508,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: handleLogout,
							className: "p-2 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-800 transition-colors",
							title: "Wyloguj z Google Drive i Firebase",
							children: /* @__PURE__ */ _jsxDEV(LogOut, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 525,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 520,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 507,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 464,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 446,
				columnNumber: 7
			}, this),
			errorBanner && /* @__PURE__ */ _jsxDEV("div", {
				className: "p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ _jsxDEV(AlertTriangle, { className: "w-4 h-4 text-rose-400 shrink-0" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 535,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("span", { children: errorBanner }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 536,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 534,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("button", {
					onClick: () => setErrorBanner(null),
					className: "text-[11px] underline text-rose-300 hover:text-white shrink-0",
					children: "Zamknij"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 538,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 533,
				columnNumber: 9
			}, this),
			needsAuth ? /* @__PURE__ */ _jsxDEV("div", {
				className: "rounded-xl border border-dashed border-slate-800 bg-slate-950/60 p-8 text-center space-y-4",
				children: [
					/* @__PURE__ */ _jsxDEV(FolderOpen, { className: "w-10 h-10 text-cyan-400 mx-auto opacity-80" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 549,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-1 max-w-xl mx-auto",
						children: [/* @__PURE__ */ _jsxDEV("h4", {
							className: "text-base font-semibold text-white",
							children: "Zaloguj się kontem Google, aby aktywować Google Drive oraz Firebase Firestore"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 551,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-400 leading-relaxed",
							children: "Po autoryzacji token OAuth 2.0 (przechowywany wyłącznie w pamięci RAM) umożliwi eksportowanie plików `.OBJ`, `.STL`, `.JSON` i zrzutów ekranu AR bezpośrednio na Twój Google Drive oraz synchronizację projektów w kolekcji `/projects` w Firestore."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 554,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 550,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex justify-center pt-1",
						children: /* @__PURE__ */ _jsxDEV("button", {
							className: "gsi-material-button",
							onClick: handleLogin,
							disabled: isLoggingIn,
							children: [/* @__PURE__ */ _jsxDEV("div", { className: "gsi-material-button-state" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 567,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "gsi-material-button-content-wrapper",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "gsi-material-button-icon",
										children: /* @__PURE__ */ _jsxDEV("svg", {
											version: "1.1",
											xmlns: "http://www.w3.org/2000/svg",
											viewBox: "0 0 48 48",
											xmlnsXlink: "http://www.w3.org/1999/xlink",
											style: { display: "block" },
											children: [
												/* @__PURE__ */ _jsxDEV("path", {
													fill: "#EA4335",
													d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 577,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("path", {
													fill: "#4285F4",
													d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 581,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("path", {
													fill: "#FBBC05",
													d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 585,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("path", {
													fill: "#34A853",
													d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 589,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("path", {
													fill: "none",
													d: "M0 0h48v48H0z"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 593,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 570,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 569,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										className: "gsi-material-button-contents",
										children: "Sign in with Google"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 596,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										style: { display: "none" },
										children: "Sign in with Google"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 597,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 568,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 562,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 561,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 548,
				columnNumber: 9
			}, this) : /* @__PURE__ */ _jsxDEV("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-4",
					children: /* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-3",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex-1 flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: projectTitleInput,
								onChange: (e) => setProjectTitleInput(e.target.value.slice(0, 120)),
								placeholder: "Nazwa projektu na Google Drive i w Firestore (max 120 znaków)...",
								className: "flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 608,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								onClick: handleSaveProjectToDriveAndFirestore,
								disabled: isUploading,
								className: "flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 rounded-lg transition-colors whitespace-nowrap shrink-0",
								children: [/* @__PURE__ */ _jsxDEV(Upload, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 620,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: isUploading ? "Wysyłanie..." : "Zapisz Projekt (.JSON) na Drive + Firestore" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 621,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 615,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 607,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => handleUpload3DMeshToDrive("obj"),
									disabled: isUploading,
									className: "flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 rounded-lg transition-colors",
									children: [/* @__PURE__ */ _jsxDEV(FileCode2, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 635,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Wyślij .OBJ na Drive" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 636,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 630,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => handleUpload3DMeshToDrive("stl"),
									disabled: isUploading,
									className: "flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 rounded-lg transition-colors",
									children: [/* @__PURE__ */ _jsxDEV(FileCode2, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 643,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Wyślij .STL na Drive" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 644,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 638,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => handleUploadScreenshotOrPrompt("screenshot"),
									disabled: isUploading,
									className: "flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-800 rounded-lg transition-colors",
									children: [/* @__PURE__ */ _jsxDEV(ImageIcon, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 651,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Wyślij Zrzut 3D (.PNG)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 652,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 646,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => handleUploadScreenshotOrPrompt("prompt_md"),
									disabled: isUploading,
									className: "flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-violet-300 border border-slate-800 rounded-lg transition-colors",
									children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 659,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Wyślij Specyfikację Promptu (.MD)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 660,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 654,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 629,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 606,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 605,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-4",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ _jsxDEV(FolderOpen, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 671,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("h4", {
									className: "text-sm font-semibold text-white",
									children: [
										"Pliki na Twoim Google Drive (",
										driveFiles.length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 672,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 670,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "relative",
										children: [/* @__PURE__ */ _jsxDEV(Search, { className: "w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 679,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "text",
											value: searchQuery,
											onChange: (e) => setSearchQuery(e.target.value),
											placeholder: "Szukaj na Drive...",
											className: "bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-2.5 py-1 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 680,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 678,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => setOnlyHoloArchFilter((prev) => !prev),
										className: `px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${onlyHoloArchFilter ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"}`,
										children: onlyHoloArchFilter ? "Tylko pliki HoloArch" : "Wszystkie pliki Drive"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 689,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => loadDriveWorkspaceData(token),
										disabled: isLoadingDrive,
										className: "p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800",
										title: "Odśwież listę plików Google Drive",
										children: /* @__PURE__ */ _jsxDEV(RefreshCw, { className: `w-3.5 h-3.5 ${isLoadingDrive ? "animate-spin text-cyan-400" : ""}` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 706,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 700,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 677,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 669,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "space-y-2 max-h-72 overflow-y-auto pr-1",
							children: driveFiles.length === 0 ? /* @__PURE__ */ _jsxDEV("div", {
								className: "p-6 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-lg",
								children: isLoadingDrive ? "Pobieranie listy plików z Google Drive..." : "Brak plików spełniających kryteria. Kliknij „Zapisz Projekt (.JSON) na Drive”, aby utworzyć pierwszy plik."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 715,
								columnNumber: 19
							}, this) : driveFiles.map((file) => {
								const isJson = file.mimeType.includes("json") || file.name.endsWith(".json");
								return /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between gap-3 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/90 text-xs hover:border-slate-700 transition-colors",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "min-w-0 flex items-center gap-2.5",
										children: [/* @__PURE__ */ _jsxDEV(FileJson, { className: "w-4 h-4 text-cyan-400 shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 730,
											columnNumber: 27
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ _jsxDEV("p", {
												className: "font-medium text-slate-100 truncate",
												children: file.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 732,
												columnNumber: 29
											}, this), /* @__PURE__ */ _jsxDEV("p", {
												className: "text-[11px] text-slate-400 font-mono tabular-nums truncate",
												children: [
													file.modifiedTime ? new Date(file.modifiedTime).toLocaleString("pl-PL") : "Drive",
													" ",
													"· ",
													formatBytes(file.size)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 733,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 731,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 729,
										columnNumber: 25
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-1.5 shrink-0",
										children: [
											isJson && /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV("button", {
												onClick: () => handleLoadProjectFromDrive(file),
												className: "px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-medium transition-colors flex items-center gap-1",
												title: "Wczytaj ten projekt z Google Drive do symulatora 3D",
												children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3 h-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 750,
													columnNumber: 33
												}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Wczytaj 3D" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 751,
													columnNumber: 33
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 745,
												columnNumber: 31
											}, this), /* @__PURE__ */ _jsxDEV("button", {
												onClick: () => setPendingConfirm({
													type: "overwrite_drive",
													targetId: file.id,
													targetName: file.name,
													description: `Czy na pewno chcesz nadpisać zawartość pliku „${file.name}” na Google Drive bieżącymi ustawieniami sceny 3D?`
												}),
												className: "px-2 py-1 rounded bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 transition-colors text-[11px]",
												title: "Nadpisz plik na Google Drive bieżącą konfiguracją",
												children: "Nadpisz"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 753,
												columnNumber: 31
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 744,
												columnNumber: 29
											}, this),
											file.webViewLink && /* @__PURE__ */ _jsxDEV("a", {
												href: file.webViewLink,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300",
												title: "Otwórz w Google Drive",
												children: /* @__PURE__ */ _jsxDEV(ExternalLink, { className: "w-3.5 h-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 777,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 770,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ _jsxDEV("button", {
												onClick: () => setPendingConfirm({
													type: "delete_drive",
													targetId: file.id,
													targetName: file.name,
													description: `Czy na pewno chcesz trwale usunąć plik „${file.name}” ze swojego dysku Google Drive? Tej operacji nie można cofnąć.`
												}),
												className: "p-1.5 rounded bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors",
												title: "Usuń plik z Google Drive",
												children: /* @__PURE__ */ _jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 792,
													columnNumber: 29
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 780,
												columnNumber: 27
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 742,
										columnNumber: 25
									}, this)]
								}, file.id, true, {
									fileName: _jsxFileName,
									lineNumber: 725,
									columnNumber: 23
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 713,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 668,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "lg:col-span-5 space-y-4",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsxDEV(Database, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 808,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("h4", {
										className: "text-sm font-semibold text-white",
										children: [
											"Kolekcja Firestore `/projects` (",
											firestoreProjects.length,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 809,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 807,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "text-[11px] font-mono text-emerald-400",
									children: "Real-time onSnapshot"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 813,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 806,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-2 max-h-40 overflow-y-auto pr-1",
								children: firestoreProjects.length === 0 ? /* @__PURE__ */ _jsxDEV("p", {
									className: "text-xs text-slate-400 py-3 text-center border border-dashed border-slate-800 rounded-lg",
									children: "Brak dokumentów w kolekcji `/projects` dla Twojego konta."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 820,
									columnNumber: 21
								}, this) : firestoreProjects.map((docItem) => /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ _jsxDEV("p", {
											className: "font-medium text-slate-100 truncate",
											children: docItem.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 830,
											columnNumber: 27
										}, this), /* @__PURE__ */ _jsxDEV("p", {
											className: "text-[11px] text-slate-400 font-mono truncate",
											children: [
												docItem.sceneId,
												" · skala ",
												docItem.modelScale,
												"x ·",
												" ",
												docItem.lightTemperatureK,
												"K"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 831,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 829,
										columnNumber: 25
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-1 shrink-0",
										children: [
											/* @__PURE__ */ _jsxDEV("button", {
												onClick: () => onLoadConfig({
													sceneId: docItem.sceneId,
													framework: docItem.framework,
													modelScale: docItem.modelScale,
													lightTemperatureK: docItem.lightTemperatureK,
													uiSettings: {
														...config.uiSettings,
														palette: docItem.palette
													}
												}, `Firestore: ${docItem.name}`),
												className: "px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium text-[11px]",
												children: "Zastosuj"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 837,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ _jsxDEV("button", {
												onClick: () => setPendingConfirm({
													type: "update_firestore",
													targetId: docItem.id,
													targetName: docItem.name,
													description: `Czy chcesz zaktualizować dokument „${docItem.name}” w bazie Firebase Firestore bieżącymi parametrami hologramu 3D?`
												}),
												className: "px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]",
												children: "Aktualizuj"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 857,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ _jsxDEV("button", {
												onClick: () => setPendingConfirm({
													type: "delete_firestore",
													targetId: docItem.id,
													targetName: docItem.name,
													description: `Czy na pewno chcesz usunąć dokument projektu „${docItem.name}” z bazy Firebase Firestore?`
												}),
												className: "p-1 rounded bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400",
												children: /* @__PURE__ */ _jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 881,
													columnNumber: 29
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 870,
												columnNumber: 27
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 836,
										columnNumber: 25
									}, this)]
								}, docItem.id, true, {
									fileName: _jsxFileName,
									lineNumber: 825,
									columnNumber: 23
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 818,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 805,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between",
								children: /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsxDEV(Activity, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 894,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("h4", {
										className: "text-xs font-semibold text-white uppercase tracking-wider font-mono",
										children: "Ostatnia Aktywność Google Drive (Drive Activity API)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 895,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 893,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 892,
								columnNumber: 17
							}, this), driveActivities.length === 0 ? /* @__PURE__ */ _jsxDEV("p", {
								className: "text-[11px] text-slate-500",
								children: "Brak zarejestrowanych zdarzeń lub trwa synchronizacja dziennika aktywności."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 901,
								columnNumber: 19
							}, this) : /* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-1.5 max-h-28 overflow-y-auto pr-1",
								children: driveActivities.map((act) => /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between gap-2 text-[11px] text-slate-300 bg-slate-900/60 px-2.5 py-1.5 rounded border border-slate-800/70",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "truncate",
										children: [
											/* @__PURE__ */ _jsxDEV("strong", {
												className: "text-cyan-300",
												children: [act.actionName, ":"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 912,
												columnNumber: 27
											}, this),
											" ",
											act.targetTitle
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 911,
										columnNumber: 25
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "text-slate-500 font-mono tabular-nums shrink-0",
										children: new Date(act.timestamp).toLocaleTimeString("pl-PL", {
											hour: "2-digit",
											minute: "2-digit"
										})
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 915,
										columnNumber: 25
									}, this)]
								}, act.id, true, {
									fileName: _jsxFileName,
									lineNumber: 907,
									columnNumber: 23
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 905,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 891,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 803,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 666,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 603,
				columnNumber: 9
			}, this),
			pendingConfirm && /* @__PURE__ */ _jsxDEV("div", {
				className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400",
								children: /* @__PURE__ */ _jsxDEV(AlertTriangle, { className: "w-5 h-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 937,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 936,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h4", {
								className: "text-base font-bold text-white",
								children: "Potwierdzenie modyfikacji danych w chmurze"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 940,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("p", {
								className: "text-xs text-slate-400 font-mono",
								children: pendingConfirm.targetName
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 943,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 939,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 935,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-200 leading-relaxed",
							children: pendingConfirm.description
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 947,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-end gap-2.5 pt-2",
							children: [/* @__PURE__ */ _jsxDEV("button", {
								onClick: () => setPendingConfirm(null),
								disabled: isExecutingConfirm,
								className: "px-4 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors",
								children: "Anuluj"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 952,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								onClick: handleConfirmExecute,
								disabled: isExecutingConfirm,
								className: `px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${pendingConfirm.type.startsWith("delete") ? "bg-rose-500 hover:bg-rose-400 text-white" : "bg-cyan-500 hover:bg-cyan-400 text-slate-950"}`,
								children: isExecutingConfirm ? "Wykonywanie..." : pendingConfirm.type.startsWith("delete") ? "Potwierdź usunięcie" : "Potwierdź zapis"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 959,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 951,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 934,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 933,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 441,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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Ozs7OztjQUNGOzs7OzthQUNGOzs7OztZQUNGOzs7Ozs7R0FJTixrQkFDQyx3QkFBQyxPQUFEO0lBQUssV0FBVTtjQUNiLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWY7TUFDRSx3QkFBQyxPQUFEO09BQUssV0FBVTtpQkFBZixDQUNFLHdCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUNiLHdCQUFDLGVBQUQsRUFBZSxXQUFVLFVBQVc7Ozs7O09BQ2pDOzs7O2lCQUNMLHdCQUFDLE9BQUQsYUFDRSx3QkFBQyxNQUFEO1FBQUksV0FBVTtrQkFBaUM7T0FFM0M7Ozs7aUJBQ0osd0JBQUMsS0FBRDtRQUFHLFdBQVU7a0JBQW9DLGVBQWU7T0FBYzs7OztlQUMzRTs7OztlQUNGOzs7Ozs7TUFFTCx3QkFBQyxLQUFEO09BQUcsV0FBVTtpQkFDVixlQUFlO01BQ2Y7Ozs7O01BRUgsd0JBQUMsT0FBRDtPQUFLLFdBQVU7aUJBQWYsQ0FDRSx3QkFBQyxVQUFEO1FBQ0UsZUFBZSxrQkFBa0IsSUFBSTtRQUNyQyxVQUFVO1FBQ1YsV0FBVTtrQkFDWDtPQUVPOzs7O2lCQUNSLHdCQUFDLFVBQUQ7UUFDRSxTQUFTO1FBQ1QsVUFBVTtRQUNWLFdBQVcsZ0VBQ1QsZUFBZSxLQUFLLFdBQVcsUUFBUSxJQUNuQyw2Q0FDQTtrQkFHTCxxQkFDRyxtQkFDQSxlQUFlLEtBQUssV0FBVyxRQUFRLElBQ3ZDLHdCQUNBO09BQ0U7Ozs7ZUFDTDs7Ozs7O0tBQ0Y7Ozs7OztHQUNGOzs7OztFQUVKOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJHb29nbGVEcml2ZVdvcmtzcGFjZVBhbmVsLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5pbXBvcnQge1xuICBDbG91ZCxcbiAgRm9sZGVyT3BlbixcbiAgVXBsb2FkLFxuICBEb3dubG9hZCxcbiAgVHJhc2gyLFxuICBSZWZyZXNoQ3csXG4gIEZpbGVDb2RlMixcbiAgSW1hZ2UgYXMgSW1hZ2VJY29uLFxuICBEYXRhYmFzZSxcbiAgRXh0ZXJuYWxMaW5rLFxuICBBbGVydFRyaWFuZ2xlLFxuICBTZWFyY2gsXG4gIEFjdGl2aXR5LFxuICBMb2dPdXQsXG4gIENoZWNrQ2lyY2xlMixcbiAgRmlsZUpzb24sXG4gIFNwYXJrbGVzLFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgQVJDb25maWdTdGF0ZSwgQ2FwdHVyZWRTY3JlZW5zaG90IH0gZnJvbSAnLi4vdHlwZXMvYXJTdHVkaW8nO1xuaW1wb3J0IHtcbiAgaW5pdEF1dGgsXG4gIGdvb2dsZVNpZ25JbixcbiAgZ2V0QWNjZXNzVG9rZW4sXG4gIGxvZ291dCxcbiAgbGlzdERyaXZlRmlsZXMsXG4gIHVwbG9hZFRleHRGaWxlVG9Ecml2ZSxcbiAgdXBsb2FkRGF0YVVybEZpbGVUb0RyaXZlLFxuICB1cGRhdGVEcml2ZUZpbGVDb250ZW50LFxuICBkb3dubG9hZERyaXZlRmlsZVRleHQsXG4gIGRlbGV0ZURyaXZlRmlsZSxcbiAgZmV0Y2hEcml2ZVN0b3JhZ2VJbmZvLFxuICBmZXRjaERyaXZlQWN0aXZpdGllcyxcbiAgc3Vic2NyaWJlVG9Vc2VyRmlyZXN0b3JlUHJvamVjdHMsXG4gIGNyZWF0ZUZpcmVzdG9yZUFSUHJvamVjdCxcbiAgdXBkYXRlRmlyZXN0b3JlQVJQcm9qZWN0LFxuICBkZWxldGVGaXJlc3RvcmVBUlByb2plY3QsXG4gIERyaXZlRmlsZUl0ZW0sXG4gIERyaXZlU3RvcmFnZVF1b3RhLFxuICBEcml2ZUFjdGl2aXR5RW50cnksXG4gIEZpcmVzdG9yZUFSUHJvamVjdERvYyxcbn0gZnJvbSAnLi4vdXRpbHMvZ29vZ2xlRHJpdmVBdXRoJztcbmltcG9ydCB7IGdlbmVyYXRlT0JKQ29udGVudCwgZ2VuZXJhdGVTVExDb250ZW50IH0gZnJvbSAnLi4vdXRpbHMvZXhwb3J0ZXJzJztcblxuaW50ZXJmYWNlIEdvb2dsZURyaXZlV29ya3NwYWNlUGFuZWxQcm9wcyB7XG4gIGNvbmZpZzogQVJDb25maWdTdGF0ZTtcbiAgb25Mb2FkQ29uZmlnOiAobG9hZGVkQ29uZmlnOiBQYXJ0aWFsPEFSQ29uZmlnU3RhdGU+LCBzb3VyY2VMYWJlbDogc3RyaW5nKSA9PiB2b2lkO1xuICBsYXRlc3RTY3JlZW5zaG90PzogQ2FwdHVyZWRTY3JlZW5zaG90O1xuICBzeXN0ZW1Qcm9tcHRNYXJrZG93bjogc3RyaW5nO1xuICBvbk5vdGlmeTogKG1zZzogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5pbnRlcmZhY2UgUGVuZGluZ0NvbmZpcm1BY3Rpb24ge1xuICB0eXBlOiAnZGVsZXRlX2RyaXZlJyB8ICdvdmVyd3JpdGVfZHJpdmUnIHwgJ2RlbGV0ZV9maXJlc3RvcmUnIHwgJ3VwZGF0ZV9maXJlc3RvcmUnO1xuICB0YXJnZXRJZDogc3RyaW5nO1xuICB0YXJnZXROYW1lOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBHb29nbGVEcml2ZVdvcmtzcGFjZVBhbmVsOiBSZWFjdC5GQzxHb29nbGVEcml2ZVdvcmtzcGFjZVBhbmVsUHJvcHM+ID0gKHtcbiAgY29uZmlnLFxuICBvbkxvYWRDb25maWcsXG4gIGxhdGVzdFNjcmVlbnNob3QsXG4gIHN5c3RlbVByb21wdE1hcmtkb3duLFxuICBvbk5vdGlmeSxcbn0pID0+IHtcbiAgY29uc3QgW25lZWRzQXV0aCwgc2V0TmVlZHNBdXRoXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFt0b2tlbiwgc2V0VG9rZW5dID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0xvZ2dpbmdJbiwgc2V0SXNMb2dnaW5nSW5dID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIEdvb2dsZSBEcml2ZSBzdGF0ZVxuICBjb25zdCBbZHJpdmVGaWxlcywgc2V0RHJpdmVGaWxlc10gPSB1c2VTdGF0ZTxEcml2ZUZpbGVJdGVtW10+KFtdKTtcbiAgY29uc3QgW2RyaXZlUXVvdGEsIHNldERyaXZlUXVvdGFdID0gdXNlU3RhdGU8RHJpdmVTdG9yYWdlUXVvdGEgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2RyaXZlQWN0aXZpdGllcywgc2V0RHJpdmVBY3Rpdml0aWVzXSA9IHVzZVN0YXRlPERyaXZlQWN0aXZpdHlFbnRyeVtdPihbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmdEcml2ZSwgc2V0SXNMb2FkaW5nRHJpdmVdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbaXNVcGxvYWRpbmcsIHNldElzVXBsb2FkaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW29ubHlIb2xvQXJjaEZpbHRlciwgc2V0T25seUhvbG9BcmNoRmlsdGVyXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbc2VhcmNoUXVlcnksIHNldFNlYXJjaFF1ZXJ5XSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbcHJvamVjdFRpdGxlSW5wdXQsIHNldFByb2plY3RUaXRsZUlucHV0XSA9IHVzZVN0YXRlPHN0cmluZz4oXG4gICAgJ0hvbG9BcmNoX01ha2lldGFfM0RfQVInXG4gICk7XG4gIGNvbnN0IFtlcnJvckJhbm5lciwgc2V0RXJyb3JCYW5uZXJdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gRmlyZXN0b3JlIHJlYWwtdGltZSBwcm9qZWN0cyBzdGF0ZVxuICBjb25zdCBbZmlyZXN0b3JlUHJvamVjdHMsIHNldEZpcmVzdG9yZVByb2plY3RzXSA9IHVzZVN0YXRlPEZpcmVzdG9yZUFSUHJvamVjdERvY1tdPihbXSk7XG5cbiAgLy8gTWFuZGF0b3J5IGNvbmZpcm1hdGlvbiBtb2RhbCBmb3IgZGVzdHJ1Y3RpdmUvbXV0YXRpbmcgb3BlcmF0aW9uc1xuICBjb25zdCBbcGVuZGluZ0NvbmZpcm0sIHNldFBlbmRpbmdDb25maXJtXSA9IHVzZVN0YXRlPFBlbmRpbmdDb25maXJtQWN0aW9uIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0V4ZWN1dGluZ0NvbmZpcm0sIHNldElzRXhlY3V0aW5nQ29uZmlybV0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG5cbiAgY29uc3QgbG9hZERyaXZlV29ya3NwYWNlRGF0YSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChhY3RpdmVUb2tlbj86IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYWN0aXZlVG9rZW4gfHwgKGF3YWl0IGdldEFjY2Vzc1Rva2VuKCkpO1xuICAgICAgaWYgKCFhY2Nlc3NUb2tlbikge1xuICAgICAgICBzZXROZWVkc0F1dGgodHJ1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0SXNMb2FkaW5nRHJpdmUodHJ1ZSk7XG4gICAgICBzZXRFcnJvckJhbm5lcihudWxsKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFtmaWxlcywgcXVvdGEsIGFjdGl2aXRpZXNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgIGxpc3REcml2ZUZpbGVzKGFjY2Vzc1Rva2VuLCB7XG4gICAgICAgICAgICBzZWFyY2hRdWVyeSxcbiAgICAgICAgICAgIG9ubHlIb2xvQXJjaDogb25seUhvbG9BcmNoRmlsdGVyLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGZldGNoRHJpdmVTdG9yYWdlSW5mbyhhY2Nlc3NUb2tlbikuY2F0Y2goKCkgPT4gbnVsbCksXG4gICAgICAgICAgZmV0Y2hEcml2ZUFjdGl2aXRpZXMoYWNjZXNzVG9rZW4pLmNhdGNoKCgpID0+IFtdKSxcbiAgICAgICAgXSk7XG4gICAgICAgIHNldERyaXZlRmlsZXMoZmlsZXMpO1xuICAgICAgICBpZiAocXVvdGEpIHNldERyaXZlUXVvdGEocXVvdGEpO1xuICAgICAgICBzZXREcml2ZUFjdGl2aXRpZXMoYWN0aXZpdGllcyk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc3QgbXNnID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdCxYLEhWQga29tdW5pa2FjamkgeiBHb29nbGUgRHJpdmUnO1xuICAgICAgICBzZXRFcnJvckJhbm5lcihtc2cpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nRHJpdmUoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29ubHlIb2xvQXJjaEZpbHRlciwgc2VhcmNoUXVlcnldXG4gICk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZSBBdXRoICYgR29vZ2xlIE9BdXRoIHN0YXRlIGxpc3RlbmVyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBpbml0QXV0aChcbiAgICAgIChhdXRoZWRVc2VyLCBhY2Nlc3NUb2tlbikgPT4ge1xuICAgICAgICBzZXRVc2VyKGF1dGhlZFVzZXIpO1xuICAgICAgICBzZXRUb2tlbihhY2Nlc3NUb2tlbik7XG4gICAgICAgIHNldE5lZWRzQXV0aChmYWxzZSk7XG4gICAgICB9LFxuICAgICAgKGF1dGhlZFVzZXIpID0+IHtcbiAgICAgICAgc2V0VXNlcihhdXRoZWRVc2VyIHx8IG51bGwpO1xuICAgICAgICBzZXRUb2tlbihudWxsKTtcbiAgICAgICAgc2V0TmVlZHNBdXRoKHRydWUpO1xuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlKCk7XG4gIH0sIFtdKTtcblxuICAvLyBTdWJzY3JpYmUgdG8gRmlyZXN0b3JlIC9wcm9qZWN0cyBjb2xsZWN0aW9uIHdoZW4gdXNlciBpcyBhdXRoZW50aWNhdGVkXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCF1c2VyPy51aWQpIHtcbiAgICAgIHNldEZpcmVzdG9yZVByb2plY3RzKFtdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdW5zdWJGaXJlc3RvcmUgPSBzdWJzY3JpYmVUb1VzZXJGaXJlc3RvcmVQcm9qZWN0cyhcbiAgICAgIHVzZXIudWlkLFxuICAgICAgKHByb2plY3RzKSA9PiB7XG4gICAgICAgIHNldEZpcmVzdG9yZVByb2plY3RzKHByb2plY3RzKTtcbiAgICAgIH0sXG4gICAgICAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKTtcbiAgICAgICAgaWYgKG1zZy5pbmNsdWRlcygnUXVvdGEgZXhjZWVkZWQnKSkge1xuICAgICAgICAgIHNldEVycm9yQmFubmVyKFxuICAgICAgICAgICAgJ1ByemVrcm9jem9ubyBkemllbm55IGxpbWl0IG9kY3p5dMOzdyBGaXJlc3RvcmUgKFNwYXJrIEZyZWUgVGllcikuIExpbWl0IG9kbm93aSBzacSZIGp1dHJvLidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gKCkgPT4gdW5zdWJGaXJlc3RvcmUoKTtcbiAgfSwgW3VzZXI/LnVpZF0pO1xuXG4gIC8vIFJlbG9hZCBEcml2ZSBmaWxlcyB3aGVuIHRva2VuIG9yIGZpbHRlciBjaGFuZ2VzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRva2VuICYmICFuZWVkc0F1dGgpIHtcbiAgICAgIGxvYWREcml2ZVdvcmtzcGFjZURhdGEodG9rZW4pO1xuICAgIH1cbiAgfSwgW3Rva2VuLCBuZWVkc0F1dGgsIG9ubHlIb2xvQXJjaEZpbHRlciwgbG9hZERyaXZlV29ya3NwYWNlRGF0YV0pO1xuXG4gIGNvbnN0IGhhbmRsZUxvZ2luID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldElzTG9nZ2luZ0luKHRydWUpO1xuICAgIHNldEVycm9yQmFubmVyKG51bGwpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnb29nbGVTaWduSW4oKTtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgc2V0VXNlcihyZXN1bHQudXNlcik7XG4gICAgICAgIHNldFRva2VuKHJlc3VsdC5hY2Nlc3NUb2tlbik7XG4gICAgICAgIHNldE5lZWRzQXV0aChmYWxzZSk7XG4gICAgICAgIG9uTm90aWZ5KGBQb8WCxIVjem9ubyB6IEdvb2dsZSBEcml2ZSBpIEZpcmViYXNlIGpha28gJHtyZXN1bHQudXNlci5lbWFpbH1gKTtcbiAgICAgICAgYXdhaXQgbG9hZERyaXZlV29ya3NwYWNlRGF0YShyZXN1bHQuYWNjZXNzVG9rZW4pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgbXNnID1cbiAgICAgICAgZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdMb2dvd2FuaWUgcHJ6ZXogR29vZ2xlIG5pZSBwb3dpb2TFgm8gc2nEmS4nO1xuICAgICAgc2V0RXJyb3JCYW5uZXIobXNnKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNMb2dnaW5nSW4oZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVMb2dvdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgbG9nb3V0KCk7XG4gICAgc2V0VXNlcihudWxsKTtcbiAgICBzZXRUb2tlbihudWxsKTtcbiAgICBzZXROZWVkc0F1dGgodHJ1ZSk7XG4gICAgc2V0RHJpdmVGaWxlcyhbXSk7XG4gICAgc2V0RmlyZXN0b3JlUHJvamVjdHMoW10pO1xuICAgIG9uTm90aWZ5KCdXeWxvZ293YW5vIHoga29udGEgR29vZ2xlIFdvcmtzcGFjZSAvIEZpcmViYXNlJyk7XG4gIH07XG5cbiAgLy8gVXBsb2FkIGN1cnJlbnQgQVIgUHJvamVjdCBKU09OIHRvIEdvb2dsZSBEcml2ZSArIHN5bmMgcmVjb3JkIGluIEZpcmVzdG9yZVxuICBjb25zdCBoYW5kbGVTYXZlUHJvamVjdFRvRHJpdmVBbmRGaXJlc3RvcmUgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCBnZXRBY2Nlc3NUb2tlbigpO1xuICAgIGlmICghYWNjZXNzVG9rZW4pIHtcbiAgICAgIHNldE5lZWRzQXV0aCh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRJc1VwbG9hZGluZyh0cnVlKTtcbiAgICBzZXRFcnJvckJhbm5lcihudWxsKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY2xlYW5UaXRsZSA9XG4gICAgICAgIHByb2plY3RUaXRsZUlucHV0LnRyaW0oKS5yZXBsYWNlKC9bXmEtekEtWjAtOV8tXS9nLCAnXycpIHx8ICdIb2xvQXJjaF9Qcm9qZWN0JztcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gY2xlYW5UaXRsZS5zdGFydHNXaXRoKCdIb2xvQXJjaCcpXG4gICAgICAgID8gYCR7Y2xlYW5UaXRsZX0uanNvbmBcbiAgICAgICAgOiBgSG9sb0FyY2hfJHtjbGVhblRpdGxlfS5qc29uYDtcblxuICAgICAgY29uc3QgcGF5bG9hZFN0cmluZyA9IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICB7XG4gICAgICAgICAgYXBwOiAnSG9sb0FyY2hfQVJfU3R1ZGlvJyxcbiAgICAgICAgICBleHBvcnRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgICBudWxsLFxuICAgICAgICAyXG4gICAgICApO1xuXG4gICAgICBjb25zdCB1cGxvYWRlZERyaXZlRmlsZSA9IGF3YWl0IHVwbG9hZFRleHRGaWxlVG9Ecml2ZShcbiAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgIGZpbGVOYW1lLFxuICAgICAgICBwYXlsb2FkU3RyaW5nLFxuICAgICAgICAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdIb2xvQXJjaF9BUl9TdHVkaW8gM0QgSG9sb2dyYW0gQ29uZmlndXJhdGlvbiBKU09OJ1xuICAgICAgKTtcblxuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgYXdhaXQgY3JlYXRlRmlyZXN0b3JlQVJQcm9qZWN0KFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICBwcm9qZWN0VGl0bGVJbnB1dC50cmltKCkgfHwgZmlsZU5hbWUsXG4gICAgICAgICAgdXBsb2FkZWREcml2ZUZpbGUuaWRcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgb25Ob3RpZnkoXG4gICAgICAgIGBaYXBpc2FubyBwcm9qZWt0IOKAniR7dXBsb2FkZWREcml2ZUZpbGUubmFtZX3igJ0gbmEgR29vZ2xlIERyaXZlIG9yYXogdyBiYXppZSBGaXJlc3RvcmUhYFxuICAgICAgKTtcbiAgICAgIGF3YWl0IGxvYWREcml2ZVdvcmtzcGFjZURhdGEoYWNjZXNzVG9rZW4pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgbXNnID1cbiAgICAgICAgZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdOaWUgdWRhxYJvIHNpxJkgemFwaXNhxIcgcHJvamVrdHUgbmEgR29vZ2xlIERyaXZlJztcbiAgICAgIHNldEVycm9yQmFubmVyKG1zZyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzVXBsb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRXhwb3J0IDNEIE1lc2ggKC5PQkogb3IgLlNUTCkgZGlyZWN0bHkgdG8gR29vZ2xlIERyaXZlXG4gIGNvbnN0IGhhbmRsZVVwbG9hZDNETWVzaFRvRHJpdmUgPSBhc3luYyAoZm9ybWF0OiAnb2JqJyB8ICdzdGwnKSA9PiB7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCBnZXRBY2Nlc3NUb2tlbigpO1xuICAgIGlmICghYWNjZXNzVG9rZW4pIHtcbiAgICAgIHNldE5lZWRzQXV0aCh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRJc1VwbG9hZGluZyh0cnVlKTtcbiAgICBzZXRFcnJvckJhbm5lcihudWxsKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gYEhvbG9BcmNoXyR7Y29uZmlnLnNjZW5lSWR9XyR7dGltZXN0YW1wfS4ke2Zvcm1hdH1gO1xuICAgICAgY29uc3QgY29udGVudCA9XG4gICAgICAgIGZvcm1hdCA9PT0gJ29iaicgPyBnZW5lcmF0ZU9CSkNvbnRlbnQoY29uZmlnKSA6IGdlbmVyYXRlU1RMQ29udGVudChjb25maWcpO1xuICAgICAgY29uc3QgbWltZVR5cGUgPSBmb3JtYXQgPT09ICdvYmonID8gJ3RleHQvcGxhaW4nIDogJ21vZGVsL3N0bCc7XG5cbiAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgdXBsb2FkVGV4dEZpbGVUb0RyaXZlKFxuICAgICAgICBhY2Nlc3NUb2tlbixcbiAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgIG1pbWVUeXBlLFxuICAgICAgICBgSG9sb0FyY2hfQVJfU3R1ZGlvIDNEIEFyY2hpdGVjdHVyYWwgTWVzaCAoJHtmb3JtYXQudG9VcHBlckNhc2UoKX0pYFxuICAgICAgKTtcbiAgICAgIG9uTm90aWZ5KGBXeWVrc3BvcnRvd2FubyBzaWF0a8SZIDNEIOKAniR7dXBsb2FkZWQubmFtZX3igJ0gYmV6cG/Fm3JlZG5pbyBuYSBHb29nbGUgRHJpdmUhYCk7XG4gICAgICBhd2FpdCBsb2FkRHJpdmVXb3Jrc3BhY2VEYXRhKGFjY2Vzc1Rva2VuKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnN0IG1zZyA9XG4gICAgICAgIGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnQsWCxIVkIHd5c3nFgmFuaWEgbW9kZWx1IDNEIG5hIEdvb2dsZSBEcml2ZSc7XG4gICAgICBzZXRFcnJvckJhbm5lcihtc2cpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc1VwbG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFVwbG9hZCBsYXRlc3QgQVIgU2NyZWVuc2hvdCAoLnBuZykgb3IgU3lzdGVtIFByb21wdCAoLm1kKSB0byBHb29nbGUgRHJpdmVcbiAgY29uc3QgaGFuZGxlVXBsb2FkU2NyZWVuc2hvdE9yUHJvbXB0ID0gYXN5bmMgKG1vZGU6ICdzY3JlZW5zaG90JyB8ICdwcm9tcHRfbWQnKSA9PiB7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCBnZXRBY2Nlc3NUb2tlbigpO1xuICAgIGlmICghYWNjZXNzVG9rZW4pIHtcbiAgICAgIHNldE5lZWRzQXV0aCh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRJc1VwbG9hZGluZyh0cnVlKTtcbiAgICBzZXRFcnJvckJhbm5lcihudWxsKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1s6Ll0vZywgJy0nKS5zbGljZSgwLCAxOSk7XG4gICAgICBpZiAobW9kZSA9PT0gJ3NjcmVlbnNob3QnKSB7XG4gICAgICAgIGlmICghbGF0ZXN0U2NyZWVuc2hvdCkge1xuICAgICAgICAgIG9uTm90aWZ5KCdOYWpwaWVydyB3eWtvbmFqIHpyenV0IGVrcmFudSAzRCBwcnp5Y2lza2llbSDigJ5acnp1dCBkbyBnYWxlcmlp4oCdIHBvZCBzY2VuxIUhJyk7XG4gICAgICAgICAgc2V0SXNVcGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGBIb2xvQXJjaF9BUl9WaWV3cG9ydF8ke3RpbWVzdGFtcH0ucG5nYDtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCB1cGxvYWREYXRhVXJsRmlsZVRvRHJpdmUoXG4gICAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgbGF0ZXN0U2NyZWVuc2hvdC5kYXRhVXJsLFxuICAgICAgICAgICdpbWFnZS9wbmcnLFxuICAgICAgICAgICdIb2xvQXJjaF9BUl9TdHVkaW8gM0QgVmlld3BvcnQgQ2FwdHVyZSdcbiAgICAgICAgKTtcbiAgICAgICAgb25Ob3RpZnkoYFphcGlzYW5vIHpyenV0IGVrcmFudSBBUiDigJ4ke3VwbG9hZGVkLm5hbWV94oCdIG5hIEdvb2dsZSBEcml2ZSFgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gYEhvbG9BcmNoX1Byb21wdF9TcGVjXyR7Y29uZmlnLnNjZW5lSWR9XyR7dGltZXN0YW1wfS5tZGA7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgdXBsb2FkVGV4dEZpbGVUb0RyaXZlKFxuICAgICAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICAgIHN5c3RlbVByb21wdE1hcmtkb3duLFxuICAgICAgICAgICd0ZXh0L21hcmtkb3duJyxcbiAgICAgICAgICAnSG9sb0FyY2hfQVJfU3R1ZGlvIEFyY2hpdGVjdHVyYWwgUHJvbXB0ICYgVW5pdHkgQyMgU3BlYydcbiAgICAgICAgKTtcbiAgICAgICAgb25Ob3RpZnkoYFphcGlzYW5vIGRva3VtZW50YWNqxJkgcHJvbXB0dSDigJ4ke3VwbG9hZGVkLm5hbWV94oCdIG5hIEdvb2dsZSBEcml2ZSFgKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGxvYWREcml2ZVdvcmtzcGFjZURhdGEoYWNjZXNzVG9rZW4pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgbXNnID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdCxYLEhWQgemFwaXN1IG5hIEdvb2dsZSBEcml2ZSc7XG4gICAgICBzZXRFcnJvckJhbm5lcihtc2cpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc1VwbG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIExvYWQgYSBKU09OIHByb2plY3QgZmlsZSBmcm9tIEdvb2dsZSBEcml2ZSBpbnRvIHRoZSAzRCBzaW11bGF0b3JcbiAgY29uc3QgaGFuZGxlTG9hZFByb2plY3RGcm9tRHJpdmUgPSBhc3luYyAoZmlsZTogRHJpdmVGaWxlSXRlbSkgPT4ge1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICBpZiAoIWFjY2Vzc1Rva2VuKSB7XG4gICAgICBzZXROZWVkc0F1dGgodHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0SXNMb2FkaW5nRHJpdmUodHJ1ZSk7XG4gICAgc2V0RXJyb3JCYW5uZXIobnVsbCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJhd1RleHQgPSBhd2FpdCBkb3dubG9hZERyaXZlRmlsZVRleHQoYWNjZXNzVG9rZW4sIGZpbGUuaWQpO1xuICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShyYXdUZXh0KTtcbiAgICAgIGNvbnN0IHRhcmdldENvbmZpZyA9IHBhcnNlZC5jb25maWcgPyBwYXJzZWQuY29uZmlnIDogcGFyc2VkO1xuICAgICAgb25Mb2FkQ29uZmlnKHRhcmdldENvbmZpZywgYEdvb2dsZSBEcml2ZTogJHtmaWxlLm5hbWV9YCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBtc2cgPVxuICAgICAgICBlcnIgaW5zdGFuY2VvZiBFcnJvclxuICAgICAgICAgID8gZXJyLm1lc3NhZ2VcbiAgICAgICAgICA6ICdXeWJyYW55IHBsaWsgbmllIGplc3QgcG9wcmF3bnltIHByb2pla3RlbSBKU09OIEhvbG9BcmNoLic7XG4gICAgICBzZXRFcnJvckJhbm5lcihtc2cpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0xvYWRpbmdEcml2ZShmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEV4ZWN1dGUgY29uZmlybWVkIG11dGF0aW5nL2Rlc3RydWN0aXZlIGFjdGlvbiAoT3ZlcndyaXRlIERyaXZlIGZpbGUsIERlbGV0ZSBEcml2ZSBmaWxlLCBVcGRhdGUvRGVsZXRlIEZpcmVzdG9yZSBkb2MpXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm1FeGVjdXRlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghcGVuZGluZ0NvbmZpcm0pIHJldHVybjtcbiAgICBzZXRJc0V4ZWN1dGluZ0NvbmZpcm0odHJ1ZSk7XG4gICAgc2V0RXJyb3JCYW5uZXIobnVsbCk7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHBlbmRpbmdDb25maXJtLnR5cGUgPT09ICdkZWxldGVfZHJpdmUnKSB7XG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICAgICAgaWYgKCFhY2Nlc3NUb2tlbikge1xuICAgICAgICAgIHNldE5lZWRzQXV0aCh0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgZGVsZXRlRHJpdmVGaWxlKGFjY2Vzc1Rva2VuLCBwZW5kaW5nQ29uZmlybS50YXJnZXRJZCk7XG4gICAgICAgIG9uTm90aWZ5KGBVc3VuacSZdG8gcGxpayDigJ4ke3BlbmRpbmdDb25maXJtLnRhcmdldE5hbWV94oCdIHogR29vZ2xlIERyaXZlLmApO1xuICAgICAgICBhd2FpdCBsb2FkRHJpdmVXb3Jrc3BhY2VEYXRhKGFjY2Vzc1Rva2VuKTtcbiAgICAgIH0gZWxzZSBpZiAocGVuZGluZ0NvbmZpcm0udHlwZSA9PT0gJ292ZXJ3cml0ZV9kcml2ZScpIHtcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCBnZXRBY2Nlc3NUb2tlbigpO1xuICAgICAgICBpZiAoIWFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgc2V0TmVlZHNBdXRoKHRydWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXlsb2FkU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAge1xuICAgICAgICAgICAgYXBwOiAnSG9sb0FyY2hfQVJfU3R1ZGlvJyxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICAyXG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IHVwZGF0ZURyaXZlRmlsZUNvbnRlbnQoXG4gICAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgICAgcGVuZGluZ0NvbmZpcm0udGFyZ2V0SWQsXG4gICAgICAgICAgcGF5bG9hZFN0cmluZyxcbiAgICAgICAgICAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgKTtcbiAgICAgICAgb25Ob3RpZnkoXG4gICAgICAgICAgYE5hZHBpc2FubyBwbGlrIHByb2pla3R1IOKAniR7cGVuZGluZ0NvbmZpcm0udGFyZ2V0TmFtZX3igJ0gbmEgR29vZ2xlIERyaXZlIGJpZcW8xIVjxIUgc2NlbsSFIDNELmBcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgbG9hZERyaXZlV29ya3NwYWNlRGF0YShhY2Nlc3NUb2tlbik7XG4gICAgICB9IGVsc2UgaWYgKHBlbmRpbmdDb25maXJtLnR5cGUgPT09ICdkZWxldGVfZmlyZXN0b3JlJykge1xuICAgICAgICBhd2FpdCBkZWxldGVGaXJlc3RvcmVBUlByb2plY3QocGVuZGluZ0NvbmZpcm0udGFyZ2V0SWQpO1xuICAgICAgICBvbk5vdGlmeShgVXN1bmnEmXRvIHByb2pla3Qg4oCeJHtwZW5kaW5nQ29uZmlybS50YXJnZXROYW1lfeKAnSB6IGJhenkgRmlyZXN0b3JlLmApO1xuICAgICAgfSBlbHNlIGlmIChwZW5kaW5nQ29uZmlybS50eXBlID09PSAndXBkYXRlX2ZpcmVzdG9yZScpIHtcbiAgICAgICAgYXdhaXQgdXBkYXRlRmlyZXN0b3JlQVJQcm9qZWN0KFxuICAgICAgICAgIHBlbmRpbmdDb25maXJtLnRhcmdldElkLFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICBwZW5kaW5nQ29uZmlybS50YXJnZXROYW1lXG4gICAgICAgICk7XG4gICAgICAgIG9uTm90aWZ5KFxuICAgICAgICAgIGBaYWt0dWFsaXpvd2FubyBwcm9qZWt0IOKAniR7cGVuZGluZ0NvbmZpcm0udGFyZ2V0TmFtZX3igJ0gdyBiYXppZSBkYW55Y2ggRmlyZXN0b3JlLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHNldFBlbmRpbmdDb25maXJtKG51bGwpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgbXNnID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdPcGVyYWNqYSBuaWUgcG93aW9kxYJhIHNpxJkuJztcbiAgICAgIHNldEVycm9yQmFubmVyKG1zZyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzRXhlY3V0aW5nQ29uZmlybShmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZvcm1hdEJ5dGVzID0gKGJ5dGVzU3RyPzogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCFieXRlc1N0cikgcmV0dXJuICfigJQnO1xuICAgIGNvbnN0IG51bSA9IE51bWJlcihieXRlc1N0cik7XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUobnVtKSB8fCBudW0gPD0gMCkgcmV0dXJuICcwIEInO1xuICAgIGNvbnN0IHVuaXRzID0gWydCJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJ107XG4gICAgY29uc3QgaSA9IE1hdGgubWluKHVuaXRzLmxlbmd0aCAtIDEsIE1hdGguZmxvb3IoTWF0aC5sb2cobnVtKSAvIE1hdGgubG9nKDEwMjQpKSk7XG4gICAgcmV0dXJuIGAkeyhudW0gLyBNYXRoLnBvdygxMDI0LCBpKSkudG9GaXhlZChpID4gMSA/IDIgOiAwKX0gJHt1bml0c1tpXX1gO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgaWQ9XCJnb29nbGUtZHJpdmVcIlxuICAgICAgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzc1IGJvcmRlciBib3JkZXItY3lhbi01MDAvMzAgcm91bmRlZC0yeGwgcC02IHNwYWNlLXktNiBzaGFkb3ctMnhsXCJcbiAgICA+XG4gICAgICB7LyogVG9wIEhlYWRlcjogR29vZ2xlIERyaXZlICsgRmlyZWJhc2UgRmlyZXN0b3JlIEludGVncmF0aW9uICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGxnOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi01XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWN5YW4tNDAwXCI+XG4gICAgICAgICAgICA8Q2xvdWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+R09PR0xFIFdPUktTUEFDRSBEUklWRSBBUEkgdjMgKyBGSVJFQkFTRSBGSVJFU1RPUkUgQ0xPVUQ8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtd2hpdGUgZm9udC1kaXNwbGF5IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVcIj5cbiAgICAgICAgICAgIDxzcGFuPkNobXVyYSBQcm9qZWt0w7N3IEdvb2dsZSBEcml2ZSBpIEJhemEgRGFueWNoIEZpcmViYXNlIEZpcmVzdG9yZTwvc3Bhbj5cbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbWF4LXctM3hsXCI+XG4gICAgICAgICAgICBaYXBpc3VqIGkgd2N6eXR1aiBwZcWCbmUga29uZmlndXJhY2plIHNjZW4gM0QgKGAuanNvbmApLCBla3Nwb3J0dWogbW9kZWxlXG4gICAgICAgICAgICBnZW9tZXRyeWN6bmUgKGAub2JqYCwgYC5zdGxgKSwgenJ6dXR5IGVrcmFudSBBUiAoYC5wbmdgKSBvcmF6IGRva3VtZW50YWNqxJlcbiAgICAgICAgICAgIHByb21wdMOzdyAoYC5tZGApIGJlenBvxZtyZWRuaW8gbmEgc3fDs2ogZHlzayBHb29nbGUgRHJpdmUgaSBzeW5jaHJvbml6dWoga29sZWtjasSZXG4gICAgICAgICAgICBwcm9qZWt0w7N3IHcgY3phc2llIHJ6ZWN6eXdpc3R5bSBwcnpleiBGaXJlYmFzZSBGaXJlc3RvcmUuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQXV0aCBTdGF0dXMgLyBPZmZpY2lhbCBTaWduIGluIHdpdGggR29vZ2xlIEJ1dHRvbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTMgc2hyaW5rLTBcIj5cbiAgICAgICAgICB7bmVlZHNBdXRoID8gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJnc2ktbWF0ZXJpYWwtYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTG9naW59XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvZ2dpbmdJbn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnc2ktbWF0ZXJpYWwtYnV0dG9uLXN0YXRlXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3NpLW1hdGVyaWFsLWJ1dHRvbi1jb250ZW50LXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdzaS1tYXRlcmlhbC1idXR0b24taWNvblwiPlxuICAgICAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uPVwiMS4xXCJcbiAgICAgICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDggNDhcIlxuICAgICAgICAgICAgICAgICAgICB4bWxuc1hsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwiI0VBNDMzNVwiXG4gICAgICAgICAgICAgICAgICAgICAgZD1cIk0yNCA5LjVjMy41NCAwIDYuNzEgMS4yMiA5LjIxIDMuNmw2Ljg1LTYuODVDMzUuOSAyLjM4IDMwLjQ3IDAgMjQgMCAxNC42MiAwIDYuNTEgNS4zOCAyLjU2IDEzLjIybDcuOTggNi4xOUMxMi40MyAxMy43MiAxNy43NCA5LjUgMjQgOS41elwiXG4gICAgICAgICAgICAgICAgICAgID48L3BhdGg+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgZmlsbD1cIiM0Mjg1RjRcIlxuICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNNDYuOTggMjQuNTVjMC0xLjU3LS4xNS0zLjA5LS4zOC00LjU1SDI0djkuMDJoMTIuOTRjLS41OCAyLjk2LTIuMjYgNS40OC00Ljc4IDcuMThsNy43MyA2YzQuNTEtNC4xOCA3LjA5LTEwLjM2IDcuMDktMTcuNjV6XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvcGF0aD5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwiI0ZCQkMwNVwiXG4gICAgICAgICAgICAgICAgICAgICAgZD1cIk0xMC41MyAyOC41OWMtLjQ4LTEuNDUtLjc2LTIuOTktLjc2LTQuNTlzLjI3LTMuMTQuNzYtNC41OWwtNy45OC02LjE5Qy45MiAxNi40NiAwIDIwLjEyIDAgMjRjMCAzLjg4LjkyIDcuNTQgMi41NiAxMC43OGw3Ljk3LTYuMTl6XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvcGF0aD5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwiIzM0QTg1M1wiXG4gICAgICAgICAgICAgICAgICAgICAgZD1cIk0yNCA0OGM2LjQ4IDAgMTEuOTMtMi4xMyAxNS44OS01LjgxbC03LjczLTZjLTIuMTUgMS40NS00LjkyIDIuMy04LjE2IDIuMy02LjI2IDAtMTEuNTctNC4yMi0xMy40Ny05LjkxbC03Ljk4IDYuMTlDNi41MSA0Mi42MiAxNC42MiA0OCAyNCA0OHpcIlxuICAgICAgICAgICAgICAgICAgICA+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwibm9uZVwiIGQ9XCJNMCAwaDQ4djQ4SDB6XCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ3NpLW1hdGVyaWFsLWJ1dHRvbi1jb250ZW50c1wiPlxuICAgICAgICAgICAgICAgICAge2lzTG9nZ2luZ0luID8gJ8WBxIVjemVuaWUgeiBHb29nbGUuLi4nIDogJ1NpZ24gaW4gd2l0aCBHb29nbGUnfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0+U2lnbiBpbiB3aXRoIEdvb2dsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBiZy1zbGF0ZS05NTAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcHgtMy41IHB5LTIgcm91bmRlZC14bFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtZW1lcmFsZC00MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e3VzZXI/LmRpc3BsYXlOYW1lIHx8IGRyaXZlUXVvdGE/LnVzZXJEaXNwbGF5TmFtZSB8fCAnS29udG8gR29vZ2xlJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgIHt1c2VyPy5lbWFpbCB8fCBkcml2ZVF1b3RhPy51c2VyRW1haWx9XG4gICAgICAgICAgICAgICAgICB7ZHJpdmVRdW90YT8udXNhZ2VJbkRyaXZlXG4gICAgICAgICAgICAgICAgICAgID8gYCDCtyBEcml2ZTogJHtmb3JtYXRCeXRlcyhkcml2ZVF1b3RhLnVzYWdlSW5Ecml2ZSl9YFxuICAgICAgICAgICAgICAgICAgICA6ICcnfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUxvZ291dH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctcm9zZS01MDAvMjAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC1yb3NlLTMwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJXeWxvZ3VqIHogR29vZ2xlIERyaXZlIGkgRmlyZWJhc2VcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPExvZ091dCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JCYW5uZXIgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctcm9zZS05NTAvNjAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC80MCB0ZXh0LXhzIHRleHQtcm9zZS0yMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPEFsZXJ0VHJpYW5nbGUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJvc2UtNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPntlcnJvckJhbm5lcn08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RXJyb3JCYW5uZXIobnVsbCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB1bmRlcmxpbmUgdGV4dC1yb3NlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHNocmluay0wXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBaYW1rbmlqXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAge25lZWRzQXV0aCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIGJvcmRlciBib3JkZXItZGFzaGVkIGJvcmRlci1zbGF0ZS04MDAgYmctc2xhdGUtOTUwLzYwIHAtOCB0ZXh0LWNlbnRlciBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8Rm9sZGVyT3BlbiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgdGV4dC1jeWFuLTQwMCBteC1hdXRvIG9wYWNpdHktODBcIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIG1heC13LXhsIG14LWF1dG9cIj5cbiAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIFphbG9ndWogc2nEmSBrb250ZW0gR29vZ2xlLCBhYnkgYWt0eXdvd2HEhyBHb29nbGUgRHJpdmUgb3JheiBGaXJlYmFzZSBGaXJlc3RvcmVcbiAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICBQbyBhdXRvcnl6YWNqaSB0b2tlbiBPQXV0aCAyLjAgKHByemVjaG93eXdhbnkgd3nFgsSFY3puaWUgdyBwYW1pxJljaSBSQU0pIHVtb8W8bGl3aVxuICAgICAgICAgICAgICBla3Nwb3J0b3dhbmllIHBsaWvDs3cgYC5PQkpgLCBgLlNUTGAsIGAuSlNPTmAgaSB6cnp1dMOzdyBla3JhbnUgQVIgYmV6cG/Fm3JlZG5pbyBuYVxuICAgICAgICAgICAgICBUd8OzaiBHb29nbGUgRHJpdmUgb3JheiBzeW5jaHJvbml6YWNqxJkgcHJvamVrdMOzdyB3IGtvbGVrY2ppIGAvcHJvamVjdHNgIHdcbiAgICAgICAgICAgICAgRmlyZXN0b3JlLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBwdC0xXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdzaS1tYXRlcmlhbC1idXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVMb2dpbn1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9nZ2luZ0lufVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdzaS1tYXRlcmlhbC1idXR0b24tc3RhdGVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnc2ktbWF0ZXJpYWwtYnV0dG9uLWNvbnRlbnQtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3NpLW1hdGVyaWFsLWJ1dHRvbi1pY29uXCI+XG4gICAgICAgICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb249XCIxLjFcIlxuICAgICAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCA0OCA0OFwiXG4gICAgICAgICAgICAgICAgICAgIHhtbG5zWGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJyB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCIjRUE0MzM1XCJcbiAgICAgICAgICAgICAgICAgICAgICBkPVwiTTI0IDkuNWMzLjU0IDAgNi43MSAxLjIyIDkuMjEgMy42bDYuODUtNi44NUMzNS45IDIuMzggMzAuNDcgMCAyNCAwIDE0LjYyIDAgNi41MSA1LjM4IDIuNTYgMTMuMjJsNy45OCA2LjE5QzEyLjQzIDEzLjcyIDE3Ljc0IDkuNSAyNCA5LjV6XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvcGF0aD5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwiIzQyODVGNFwiXG4gICAgICAgICAgICAgICAgICAgICAgZD1cIk00Ni45OCAyNC41NWMwLTEuNTctLjE1LTMuMDktLjM4LTQuNTVIMjR2OS4wMmgxMi45NGMtLjU4IDIuOTYtMi4yNiA1LjQ4LTQuNzggNy4xOGw3LjczIDZjNC41MS00LjE4IDcuMDktMTAuMzYgNy4wOS0xNy42NXpcIlxuICAgICAgICAgICAgICAgICAgICA+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCIjRkJCQzA1XCJcbiAgICAgICAgICAgICAgICAgICAgICBkPVwiTTEwLjUzIDI4LjU5Yy0uNDgtMS40NS0uNzYtMi45OS0uNzYtNC41OXMuMjctMy4xNC43Ni00LjU5bC03Ljk4LTYuMTlDLjkyIDE2LjQ2IDAgMjAuMTIgMCAyNGMwIDMuODguOTIgNy41NCAyLjU2IDEwLjc4bDcuOTctNi4xOXpcIlxuICAgICAgICAgICAgICAgICAgICA+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCIjMzRBODUzXCJcbiAgICAgICAgICAgICAgICAgICAgICBkPVwiTTI0IDQ4YzYuNDggMCAxMS45My0yLjEzIDE1Ljg5LTUuODFsLTcuNzMtNmMtMi4xNSAxLjQ1LTQuOTIgMi4zLTguMTYgMi4zLTYuMjYgMC0xMS41Ny00LjIyLTEzLjQ3LTkuOTFsLTcuOTggNi4xOUM2LjUxIDQyLjYyIDE0LjYyIDQ4IDI0IDQ4elwiXG4gICAgICAgICAgICAgICAgICAgID48L3BhdGg+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJub25lXCIgZD1cIk0wIDBoNDh2NDhIMHpcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnc2ktbWF0ZXJpYWwtYnV0dG9uLWNvbnRlbnRzXCI+U2lnbiBpbiB3aXRoIEdvb2dsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0+U2lnbiBpbiB3aXRoIEdvb2dsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgIHsvKiBRdWljayBDbG91ZCBVcGxvYWQgVG9vbGJhciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvamVjdFRpdGxlSW5wdXR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFByb2plY3RUaXRsZUlucHV0KGUudGFyZ2V0LnZhbHVlLnNsaWNlKDAsIDEyMCkpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOYXp3YSBwcm9qZWt0dSBuYSBHb29nbGUgRHJpdmUgaSB3IEZpcmVzdG9yZSAobWF4IDEyMCB6bmFrw7N3KS4uLlwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQteHMgdGV4dC1zbGF0ZS0xMDAgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1jeWFuLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTYXZlUHJvamVjdFRvRHJpdmVBbmRGaXJlc3RvcmV9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNVcGxvYWRpbmd9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgdGV4dC14cyBmb250LXNlbWlib2xkIGJnLWN5YW4tNTAwIGhvdmVyOmJnLWN5YW4tNDAwIGRpc2FibGVkOm9wYWNpdHktNTAgdGV4dC1zbGF0ZS05NTAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFVwbG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge2lzVXBsb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgPyAnV3lzecWCYW5pZS4uLidcbiAgICAgICAgICAgICAgICAgICAgICA6ICdaYXBpc3ogUHJvamVrdCAoLkpTT04pIG5hIERyaXZlICsgRmlyZXN0b3JlJ31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVVcGxvYWQzRE1lc2hUb0RyaXZlKCdvYmonKX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1VwbG9hZGluZ31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yIHRleHQteHMgZm9udC1tZWRpdW0gYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxGaWxlQ29kZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V3nFm2xpaiAuT0JKIG5hIERyaXZlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVVwbG9hZDNETWVzaFRvRHJpdmUoJ3N0bCcpfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzVXBsb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtYW1iZXItMzAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxGaWxlQ29kZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V3nFm2xpaiAuU1RMIG5hIERyaXZlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVVwbG9hZFNjcmVlbnNob3RPclByb21wdCgnc2NyZWVuc2hvdCcpfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzVXBsb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEltYWdlSWNvbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5XecWbbGlqIFpyenV0IDNEICguUE5HKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVVcGxvYWRTY3JlZW5zaG90T3JQcm9tcHQoJ3Byb21wdF9tZCcpfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzVXBsb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtdmlvbGV0LTMwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V3nFm2xpaiBTcGVjeWZpa2FjasSZIFByb21wdHUgKC5NRCk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02XCI+XG4gICAgICAgICAgICB7LyogTGVmdCA3IENvbHM6IEdvb2dsZSBEcml2ZSBGaWxlcyBCcm93c2VyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IGJnLXNsYXRlLTk1MC83MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPEZvbGRlck9wZW4gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICBQbGlraSBuYSBUd29pbSBHb29nbGUgRHJpdmUgKHtkcml2ZUZpbGVzLmxlbmd0aH0pXG4gICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNsYXRlLTQwMCBhYnNvbHV0ZSBsZWZ0LTIuNSB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzJcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFF1ZXJ5fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU3p1a2FqIG5hIERyaXZlLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBwbC04IHByLTIuNSBweS0xIHRleHQteHMgdGV4dC1zbGF0ZS0xMDAgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1jeWFuLTUwMFwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPbmx5SG9sb0FyY2hGaWx0ZXIoKHByZXYpID0+ICFwcmV2KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZC1sZyB0ZXh0LVsxMXB4XSBmb250LW1lZGl1bSBib3JkZXIgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICBvbmx5SG9sb0FyY2hGaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNTAwLzIwIGJvcmRlci1jeWFuLTUwMC81MCB0ZXh0LWN5YW4tMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtvbmx5SG9sb0FyY2hGaWx0ZXIgPyAnVHlsa28gcGxpa2kgSG9sb0FyY2gnIDogJ1dzenlzdGtpZSBwbGlraSBEcml2ZSd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBsb2FkRHJpdmVXb3Jrc3BhY2VEYXRhKHRva2VuKX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ0RyaXZlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIlxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIk9kxZt3aWXFvCBsaXN0xJkgcGxpa8OzdyBHb29nbGUgRHJpdmVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8UmVmcmVzaEN3XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgJHtpc0xvYWRpbmdEcml2ZSA/ICdhbmltYXRlLXNwaW4gdGV4dC1jeWFuLTQwMCcgOiAnJ31gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIG1heC1oLTcyIG92ZXJmbG93LXktYXV0byBwci0xXCI+XG4gICAgICAgICAgICAgICAge2RyaXZlRmlsZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgdGV4dC1jZW50ZXIgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBib3JkZXIgYm9yZGVyLWRhc2hlZCBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGdcIj5cbiAgICAgICAgICAgICAgICAgICAge2lzTG9hZGluZ0RyaXZlXG4gICAgICAgICAgICAgICAgICAgICAgPyAnUG9iaWVyYW5pZSBsaXN0eSBwbGlrw7N3IHogR29vZ2xlIERyaXZlLi4uJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ0JyYWsgcGxpa8OzdyBzcGXFgm5pYWrEhWN5Y2gga3J5dGVyaWEuIEtsaWtuaWog4oCeWmFwaXN6IFByb2pla3QgKC5KU09OKSBuYSBEcml2ZeKAnSwgYWJ5IHV0d29yennEhyBwaWVyd3N6eSBwbGlrLid9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgZHJpdmVGaWxlcy5tYXAoKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNKc29uID1cbiAgICAgICAgICAgICAgICAgICAgICBmaWxlLm1pbWVUeXBlLmluY2x1ZGVzKCdqc29uJykgfHwgZmlsZS5uYW1lLmVuZHNXaXRoKCcuanNvbicpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZmlsZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBwLTIuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC85MCB0ZXh0LXhzIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWxlSnNvbiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTEwMCB0cnVuY2F0ZVwiPntmaWxlLm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmaWxlLm1vZGlmaWVkVGltZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG5ldyBEYXRlKGZpbGUubW9kaWZpZWRUaW1lKS50b0xvY2FsZVN0cmluZygncGwtUEwnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdEcml2ZSd9eycgJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIMK3IHtmb3JtYXRCeXRlcyhmaWxlLnNpemUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0pzb24gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUxvYWRQcm9qZWN0RnJvbURyaXZlKGZpbGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkIGJnLWN5YW4tNTAwLzIwIGhvdmVyOmJnLWN5YW4tNTAwLzMwIHRleHQtY3lhbi0zMDAgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIldjenl0YWogdGVuIHByb2pla3QgeiBHb29nbGUgRHJpdmUgZG8gc3ltdWxhdG9yYSAzRFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+V2N6eXRhaiAzRDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFBlbmRpbmdDb25maXJtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdvdmVyd3JpdGVfZHJpdmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQ6IGZpbGUuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXROYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYEN6eSBuYSBwZXdubyBjaGNlc3ogbmFkcGlzYcSHIHphd2FydG/Fm8SHIHBsaWt1IOKAniR7ZmlsZS5uYW1lfeKAnSBuYSBHb29nbGUgRHJpdmUgYmllxbzEhWN5bWkgdXN0YXdpZW5pYW1pIHNjZW55IDNEP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTEgcm91bmRlZCBiZy1zbGF0ZS04MDAgaG92ZXI6YmctYW1iZXItNTAwLzIwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtYW1iZXItMzAwIHRyYW5zaXRpb24tY29sb3JzIHRleHQtWzExcHhdXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJOYWRwaXN6IHBsaWsgbmEgR29vZ2xlIERyaXZlIGJpZcW8xIVjxIUga29uZmlndXJhY2rEhVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hZHBpc3pcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZmlsZS53ZWJWaWV3TGluayAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e2ZpbGUud2ViVmlld0xpbmt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJPdHfDs3J6IHcgR29vZ2xlIERyaXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXh0ZXJuYWxMaW5rIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGVuZGluZ0NvbmZpcm0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGVsZXRlX2RyaXZlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQ6IGZpbGUuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGBDenkgbmEgcGV3bm8gY2hjZXN6IHRyd2FsZSB1c3VuxIXEhyBwbGlrIOKAniR7ZmlsZS5uYW1lfeKAnSB6ZSBzd29qZWdvIGR5c2t1IEdvb2dsZSBEcml2ZT8gVGVqIG9wZXJhY2ppIG5pZSBtb8W8bmEgY29mbsSFxIcuYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQgYmctc2xhdGUtODAwIGhvdmVyOmJnLXJvc2UtNTAwLzIwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtcm9zZS00MDAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiVXN1xYQgcGxpayB6IEdvb2dsZSBEcml2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFJpZ2h0IDUgQ29sczogUmVhbC1UaW1lIEZpcmViYXNlIEZpcmVzdG9yZSBQcm9qZWN0cyAmIERyaXZlIEFjdGl2aXR5ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi01IHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICB7LyogRmlyZXN0b3JlIENvbGxlY3Rpb24gL3Byb2plY3RzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MC83MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8RGF0YWJhc2UgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIEtvbGVrY2phIEZpcmVzdG9yZSBgL3Byb2plY3RzYCAoe2ZpcmVzdG9yZVByb2plY3RzLmxlbmd0aH0pXG4gICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIFJlYWwtdGltZSBvblNuYXBzaG90XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBtYXgtaC00MCBvdmVyZmxvdy15LWF1dG8gcHItMVwiPlxuICAgICAgICAgICAgICAgICAge2ZpcmVzdG9yZVByb2plY3RzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBweS0zIHRleHQtY2VudGVyIGJvcmRlciBib3JkZXItZGFzaGVkIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgIEJyYWsgZG9rdW1lbnTDs3cgdyBrb2xla2NqaSBgL3Byb2plY3RzYCBkbGEgVHdvamVnbyBrb250YS5cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgZmlyZXN0b3JlUHJvamVjdHMubWFwKChkb2NJdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtkb2NJdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHAtMi41IHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHNcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTEwMCB0cnVuY2F0ZVwiPntkb2NJdGVtLm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZG9jSXRlbS5zY2VuZUlkfSDCtyBza2FsYSB7ZG9jSXRlbS5tb2RlbFNjYWxlfXggwrd7JyAnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkb2NJdGVtLmxpZ2h0VGVtcGVyYXR1cmVLfUtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Mb2FkQ29uZmlnKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmVJZDogZG9jSXRlbS5zY2VuZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1ld29yazogZG9jSXRlbS5mcmFtZXdvcmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxTY2FsZTogZG9jSXRlbS5tb2RlbFNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0VGVtcGVyYXR1cmVLOiBkb2NJdGVtLmxpZ2h0VGVtcGVyYXR1cmVLLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpU2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZy51aVNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZTogZG9jSXRlbS5wYWxldHRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBGaXJlc3RvcmU6ICR7ZG9jSXRlbS5uYW1lfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIHJvdW5kZWQgYmctYW1iZXItNTAwLzIwIGhvdmVyOmJnLWFtYmVyLTUwMC8zMCB0ZXh0LWFtYmVyLTMwMCBmb250LW1lZGl1bSB0ZXh0LVsxMXB4XVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBaYXN0b3N1alxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQZW5kaW5nQ29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd1cGRhdGVfZmlyZXN0b3JlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQ6IGRvY0l0ZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE5hbWU6IGRvY0l0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGBDenkgY2hjZXN6IHpha3R1YWxpem93YcSHIGRva3VtZW50IOKAniR7ZG9jSXRlbS5uYW1lfeKAnSB3IGJhemllIEZpcmViYXNlIEZpcmVzdG9yZSBiaWXFvMSFY3ltaSBwYXJhbWV0cmFtaSBob2xvZ3JhbXUgM0Q/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMSByb3VuZGVkIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgdGV4dC1bMTFweF1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWt0dWFsaXp1alxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQZW5kaW5nQ29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkZWxldGVfZmlyZXN0b3JlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQ6IGRvY0l0ZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE5hbWU6IGRvY0l0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGBDenkgbmEgcGV3bm8gY2hjZXN6IHVzdW7EhcSHIGRva3VtZW50IHByb2pla3R1IOKAniR7ZG9jSXRlbS5uYW1lfeKAnSB6IGJhenkgRmlyZWJhc2UgRmlyZXN0b3JlP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgcm91bmRlZCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctcm9zZS01MDAvMjAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1yb3NlLTQwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBHb29nbGUgRHJpdmUgQWN0aXZpdHkgQVBJIHYyIExvZyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvNzAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgc3BhY2UteS0yLjVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICBPc3RhdG5pYSBBa3R5d25vxZvEhyBHb29nbGUgRHJpdmUgKERyaXZlIEFjdGl2aXR5IEFQSSlcbiAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtkcml2ZUFjdGl2aXRpZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgQnJhayB6YXJlamVzdHJvd2FueWNoIHpkYXJ6ZcWEIGx1YiB0cndhIHN5bmNocm9uaXphY2phIGR6aWVubmlrYSBha3R5d25vxZtjaS5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBtYXgtaC0yOCBvdmVyZmxvdy15LWF1dG8gcHItMVwiPlxuICAgICAgICAgICAgICAgICAgICB7ZHJpdmVBY3Rpdml0aWVzLm1hcCgoYWN0KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXthY3QuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS0zMDAgYmctc2xhdGUtOTAwLzYwIHB4LTIuNSBweS0xLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC83MFwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwXCI+e2FjdC5hY3Rpb25OYW1lfTo8L3N0cm9uZz57JyAnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7YWN0LnRhcmdldFRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgZm9udC1tb25vIHRhYnVsYXItbnVtcyBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bmV3IERhdGUoYWN0LnRpbWVzdGFtcCkudG9Mb2NhbGVUaW1lU3RyaW5nKCdwbC1QTCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIE1hbmRhdG9yeSBVc2VyIENvbmZpcm1hdGlvbiBEaWFsb2cgZm9yIERlc3RydWN0aXZlIC8gTXV0YXRpbmcgT3BlcmF0aW9ucyAqL31cbiAgICAgIHtwZW5kaW5nQ29uZmlybSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGJnLXNsYXRlLTk1MC84MCBiYWNrZHJvcC1ibHVyLXNtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtMnhsIG1heC13LW1kIHctZnVsbCBwLTYgc3BhY2UteS00IHNoYWRvdy0yeGxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLWFtYmVyLTUwMC8xNSBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCB0ZXh0LWFtYmVyLTQwMFwiPlxuICAgICAgICAgICAgICAgIDxBbGVydFRyaWFuZ2xlIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICBQb3R3aWVyZHplbmllIG1vZHlmaWthY2ppIGRhbnljaCB3IGNobXVyemVcbiAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+e3BlbmRpbmdDb25maXJtLnRhcmdldE5hbWV9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMjAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICB7cGVuZGluZ0NvbmZpcm0uZGVzY3JpcHRpb259XG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgZ2FwLTIuNSBwdC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQZW5kaW5nQ29uZmlybShudWxsKX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNFeGVjdXRpbmdDb25maXJtfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLWxnIHRleHQteHMgZm9udC1tZWRpdW0gYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBBbnVsdWpcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb25maXJtRXhlY3V0ZX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNFeGVjdXRpbmdDb25maXJtfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgICAgICAgcGVuZGluZ0NvbmZpcm0udHlwZS5zdGFydHNXaXRoKCdkZWxldGUnKVxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1yb3NlLTUwMCBob3ZlcjpiZy1yb3NlLTQwMCB0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1jeWFuLTUwMCBob3ZlcjpiZy1jeWFuLTQwMCB0ZXh0LXNsYXRlLTk1MCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpc0V4ZWN1dGluZ0NvbmZpcm1cbiAgICAgICAgICAgICAgICAgID8gJ1d5a29ueXdhbmllLi4uJ1xuICAgICAgICAgICAgICAgICAgOiBwZW5kaW5nQ29uZmlybS50eXBlLnN0YXJ0c1dpdGgoJ2RlbGV0ZScpXG4gICAgICAgICAgICAgICAgICA/ICdQb3R3aWVyZMW6IHVzdW5pxJljaWUnXG4gICAgICAgICAgICAgICAgICA6ICdQb3R3aWVyZMW6IHphcGlzJ31cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==