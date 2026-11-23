import { initializeApp, getApps, getApp } from "/apps/holoarch_studio/node_modules/.vite/deps/firebase_app.js?v=c1c4f681";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "/apps/holoarch_studio/node_modules/.vite/deps/firebase_auth.js?v=c1c4f681";
import { getFirestore, collection, doc, setDoc, updateDoc, deleteDoc, query, where, onSnapshot, serverTimestamp, getDocFromServer } from "/apps/holoarch_studio/node_modules/.vite/deps/firebase_firestore.js?v=c1c4f681";
import firebaseConfig from "/apps/holoarch_studio/firebase-applet-config.json?import";
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
// Validate connection to Firestore on boot
async function testConnection() {
	try {
		await getDocFromServer(doc(db, "test", "connection"));
	} catch (error) {
		if (error instanceof Error && error.message.includes("the client is offline")) {
			console.error("Please check your Firebase configuration.");
		}
	}
}
testConnection();
export let OperationType = /* @__PURE__ */ function(OperationType) {
	OperationType["CREATE"] = "create";
	OperationType["UPDATE"] = "update";
	OperationType["DELETE"] = "delete";
	OperationType["LIST"] = "list";
	OperationType["GET"] = "get";
	OperationType["WRITE"] = "write";
	return OperationType;
}({});
export function handleFirestoreError(error, operationType, path) {
	const errInfo = {
		error: error instanceof Error ? error.message : String(error),
		authInfo: {
			userId: auth.currentUser?.uid,
			email: auth.currentUser?.email,
			emailVerified: auth.currentUser?.emailVerified,
			isAnonymous: auth.currentUser?.isAnonymous,
			tenantId: auth.currentUser?.tenantId,
			providerInfo: auth.currentUser?.providerData?.map((provider) => ({
				providerId: provider.providerId,
				email: provider.email
			})) || []
		},
		operationType,
		path
	};
	console.error("Firestore Error: ", JSON.stringify(errInfo));
	throw new Error(JSON.stringify(errInfo));
}
const VALID_ID_REGEX = /^[a-zA-Z0-9_-]+$/;
const MAX_NAME_LEN = 120;
export function subscribeToUserFirestoreProjects(userId, onData, onError) {
	const path = "projects";
	const q = query(collection(db, path), where("ownerId", "==", userId));
	return onSnapshot(q, (snapshot) => {
		const items = snapshot.docs.map((docSnap) => {
			const data = docSnap.data();
			return {
				id: docSnap.id,
				ownerId: String(data.ownerId || userId),
				name: String(data.name || "Projekt AR"),
				sceneId: data.sceneId || "skyline_financial",
				framework: data.framework || "unity_arfoundation",
				modelScale: Number(data.modelScale ?? 1),
				lightTemperatureK: Number(data.lightTemperatureK ?? 4200),
				palette: data.palette || "cyan_blueprint",
				driveFileId: data.driveFileId ? String(data.driveFileId) : undefined,
				createdAt: data.createdAt || null,
				updatedAt: data.updatedAt || null
			};
		});
		onData(items);
	}, (error) => {
		if (onError) onError(error);
		try {
			handleFirestoreError(error, "list", path);
		} catch {}
	});
}
export async function createFirestoreARProject(config, rawName, driveFileId) {
	const currentUser = auth.currentUser;
	if (!currentUser) {
		throw new Error("Musisz być zalogowany przez Google, aby zapisać projekt w Firestore.");
	}
	const sanitizedName = rawName.trim().slice(0, MAX_NAME_LEN) || "Projekt HoloArch AR";
	const docId = `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
	if (!VALID_ID_REGEX.test(docId)) {
		throw new Error("Nieprawidłowy identyfikator dokumentu.");
	}
	const path = `projects/${docId}`;
	const payload = {
		ownerId: currentUser.uid,
		name: sanitizedName,
		sceneId: config.sceneId,
		framework: config.framework,
		modelScale: Math.max(.1, Math.min(10, Number(config.modelScale) || 1)),
		lightTemperatureK: Math.max(1e3, Math.min(12e3, Number(config.lightTemperatureK) || 4200)),
		palette: config.uiSettings.palette,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	};
	if (driveFileId && driveFileId.length <= 128) {
		payload.driveFileId = driveFileId;
	}
	try {
		await setDoc(doc(db, "projects", docId), payload);
		return docId;
	} catch (error) {
		handleFirestoreError(error, "create", path);
	}
}
export async function updateFirestoreARProject(projectId, config, rawName, driveFileId) {
	const path = `projects/${projectId}`;
	const sanitizedName = rawName.trim().slice(0, MAX_NAME_LEN) || "Projekt HoloArch AR";
	const updates = {
		name: sanitizedName,
		sceneId: config.sceneId,
		framework: config.framework,
		modelScale: Math.max(.1, Math.min(10, Number(config.modelScale) || 1)),
		lightTemperatureK: Math.max(1e3, Math.min(12e3, Number(config.lightTemperatureK) || 4200)),
		palette: config.uiSettings.palette,
		updatedAt: serverTimestamp()
	};
	if (driveFileId !== undefined && driveFileId.length <= 128) {
		updates.driveFileId = driveFileId;
	}
	try {
		await updateDoc(doc(db, "projects", projectId), updates);
	} catch (error) {
		handleFirestoreError(error, "update", path);
	}
}
export async function deleteFirestoreARProject(projectId) {
	const path = `projects/${projectId}`;
	try {
		await deleteDoc(doc(db, "projects", projectId));
	} catch (error) {
		handleFirestoreError(error, "delete", path);
	}
}
export const SCOPES = [
	"https://www.googleapis.com/auth/drive",
	"https://www.googleapis.com/auth/drive.activity",
	"https://www.googleapis.com/auth/drive.activity.readonly",
	"https://www.googleapis.com/auth/drive.appdata",
	"https://www.googleapis.com/auth/drive.apps.readonly",
	"https://www.googleapis.com/auth/drive.file",
	"https://www.googleapis.com/auth/drive.install",
	"https://www.googleapis.com/auth/drive.meet.readonly",
	"https://www.googleapis.com/auth/drive.metadata",
	"https://www.googleapis.com/auth/drive.metadata.readonly",
	"https://www.googleapis.com/auth/drive.photos.readonly",
	"https://www.googleapis.com/auth/drive.readonly",
	"https://www.googleapis.com/auth/drive.scripts"
];
const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));
// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token strictly in memory (never in localStorage/sessionStorage).
let cachedAccessToken = null;
export const initAuth = (onAuthSuccess, onAuthFailure) => {
	return onAuthStateChanged(auth, async (user) => {
		if (user) {
			if (cachedAccessToken) {
				if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
			} else if (!isSigningIn) {
				cachedAccessToken = null;
				if (onAuthFailure) onAuthFailure(user);
			}
		} else {
			cachedAccessToken = null;
			if (onAuthFailure) onAuthFailure(null);
		}
	});
};
export const googleSignIn = async () => {
	try {
		isSigningIn = true;
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		if (!credential?.accessToken) {
			throw new Error("Failed to get access token from Firebase Auth");
		}
		cachedAccessToken = credential.accessToken;
		return {
			user: result.user,
			accessToken: cachedAccessToken
		};
	} catch (error) {
		console.error("Sign in error:", error);
		throw error;
	} finally {
		isSigningIn = false;
	}
};
export const getAccessToken = async () => {
	return cachedAccessToken;
};
export const logout = async () => {
	await auth.signOut();
	cachedAccessToken = null;
};
export async function fetchDriveStorageInfo(accessToken) {
	const res = await fetch("https://www.googleapis.com/drive/v3/about?fields=user(displayName,emailAddress),storageQuota(limit,usage,usageInDrive)", { headers: { Authorization: `Bearer ${accessToken}` } });
	if (!res.ok) {
		throw new Error(`Drive About API error (${res.status})`);
	}
	const data = await res.json();
	return {
		limit: data.storageQuota?.limit,
		usage: data.storageQuota?.usage,
		usageInDrive: data.storageQuota?.usageInDrive,
		userEmail: data.user?.emailAddress,
		userDisplayName: data.user?.displayName
	};
}
export async function listDriveFiles(accessToken, options = {}) {
	const clauses = ["trashed = false"];
	if (options.onlyHoloArch) {
		clauses.push("(name contains 'HoloArch' or description contains 'HoloArch_AR_Studio')");
	}
	if (options.searchQuery && options.searchQuery.trim()) {
		const escaped = options.searchQuery.trim().replace(/'/g, "\\'");
		clauses.push(`name contains '${escaped}'`);
	}
	const params = new URLSearchParams({
		pageSize: "25",
		orderBy: "modifiedTime desc",
		fields: "files(id,name,mimeType,modifiedTime,size,webViewLink,iconLink,description)",
		q: clauses.join(" and ")
	});
	const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, { headers: { Authorization: `Bearer ${accessToken}` } });
	if (!res.ok) {
		const errText = await res.text();
		throw new Error(`Google Drive list error (${res.status}): ${errText}`);
	}
	const data = await res.json();
	return Array.isArray(data.files) ? data.files : [];
}
export async function uploadTextFileToDrive(accessToken, fileName, content, mimeType, description = "HoloArch_AR_Studio Project Asset") {
	const metadata = {
		name: fileName,
		mimeType,
		description
	};
	const boundary = "-------HoloArchDriveBoundary7MA4YWxkTrZu0gW";
	const delimiter = `\r\n--${boundary}\r\n`;
	const closeDelimiter = `\r\n--${boundary}--`;
	const multipartBody = delimiter + "Content-Type: application/json; charset=UTF-8\r\n\r\n" + JSON.stringify(metadata) + delimiter + `Content-Type: ${mimeType}; charset=UTF-8\r\n\r\n` + content + closeDelimiter;
	const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,modifiedTime,size,webViewLink,description", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": `multipart/related; boundary=${boundary}`
		},
		body: multipartBody
	});
	if (!res.ok) {
		const errText = await res.text();
		throw new Error(`Upload failed (${res.status}): ${errText}`);
	}
	return await res.json();
}
export async function uploadDataUrlFileToDrive(accessToken, fileName, dataUrl, mimeType = "image/png", description = "HoloArch_AR_Studio Screenshot") {
	const base64Data = dataUrl.includes(",") ? dataUrl.split(",")[1] : dataUrl;
	const metadata = {
		name: fileName,
		mimeType,
		description
	};
	const boundary = "-------HoloArchDriveBinaryBoundary7MA4YWxk";
	const delimiter = `\r\n--${boundary}\r\n`;
	const closeDelimiter = `\r\n--${boundary}--`;
	const multipartBody = delimiter + "Content-Type: application/json; charset=UTF-8\r\n\r\n" + JSON.stringify(metadata) + delimiter + `Content-Type: ${mimeType}\r\n` + "Content-Transfer-Encoding: base64\r\n\r\n" + base64Data + closeDelimiter;
	const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,modifiedTime,size,webViewLink,description", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": `multipart/related; boundary=${boundary}`
		},
		body: multipartBody
	});
	if (!res.ok) {
		const errText = await res.text();
		throw new Error(`Image upload failed (${res.status}): ${errText}`);
	}
	return await res.json();
}
export async function updateDriveFileContent(accessToken, fileId, content, mimeType = "application/json") {
	const res = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${encodeURIComponent(fileId)}?uploadType=media&fields=id,name,mimeType,modifiedTime,size,webViewLink`, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": `${mimeType}; charset=UTF-8`
		},
		body: content
	});
	if (!res.ok) {
		const errText = await res.text();
		throw new Error(`Update failed (${res.status}): ${errText}`);
	}
	return await res.json();
}
export async function downloadDriveFileText(accessToken, fileId) {
	const res = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`, { headers: { Authorization: `Bearer ${accessToken}` } });
	if (!res.ok) {
		const errText = await res.text();
		throw new Error(`Download failed (${res.status}): ${errText}`);
	}
	return await res.text();
}
export async function deleteDriveFile(accessToken, fileId) {
	const res = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}`, {
		method: "DELETE",
		headers: { Authorization: `Bearer ${accessToken}` }
	});
	if (!res.ok) {
		const errText = await res.text();
		throw new Error(`Delete failed (${res.status}): ${errText}`);
	}
}
export async function fetchDriveActivities(accessToken) {
	try {
		const res = await fetch("https://driveactivity.googleapis.com/v2/activity:query", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ pageSize: 6 })
		});
		if (!res.ok) return [];
		const data = await res.json();
		const activities = Array.isArray(data.activities) ? data.activities : [];
		return activities.map((act, idx) => {
			const primary = act.primaryActionDetail || {};
			const actionKey = Object.keys(primary)[0] || "edit";
			const actionMap = {
				create: "Utworzono plik",
				edit: "Zaktualizowano plik",
				move: "Przeniesiono plik",
				rename: "Zmieniono nazwę",
				delete: "Usunięto plik",
				restore: "Przywrócono plik",
				permissionChange: "Zmieniono uprawnienia"
			};
			const targetTitle = act.targets?.[0]?.driveItem?.title || "Plik projektu Google Drive";
			const ts = act.timestamp || act.timeRange?.endTime || new Date().toISOString();
			return {
				id: `${ts}-${idx}`,
				timestamp: ts,
				actionName: actionMap[actionKey] || actionKey,
				targetTitle
			};
		});
	} catch {
		return [];
	}
}

//# sourceMappingURL=data:application/json;base64,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QUN2RSxPQUFPLFdBQVcsS0FBSyxLQUEwQixRQUFnQjtHQUMvRCxNQUFNLFVBQVUsSUFBSSx1QkFBdUIsQ0FBQztHQUM1QyxNQUFNLFlBQVksT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLE1BQU07R0FDN0MsTUFBTSxZQUFvQztJQUN4QyxRQUFRO0lBQ1IsTUFBTTtJQUNOLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLFNBQVM7SUFDVCxrQkFBa0I7R0FDcEI7R0FDQSxNQUFNLGNBQ0osSUFBSSxVQUFVLEVBQUUsRUFBRSxXQUFXLFNBQVM7R0FDeEMsTUFBTSxLQUFLLElBQUksYUFBYSxJQUFJLFdBQVcsV0FBVyxJQUFJLEtBQUssQ0FBQyxDQUFDLFlBQVk7R0FDN0UsT0FBTztJQUNMLElBQUksR0FBRyxHQUFHLEdBQUc7SUFDYixXQUFXO0lBQ1gsWUFBWSxVQUFVLGNBQWM7SUFDcEM7R0FDRjtFQUNGLENBQUM7Q0FDSCxRQUFRO0VBQ04sT0FBTyxDQUFDO0NBQ1Y7QUFDRiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJnb29nbGVEcml2ZUF1dGgudHMiXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCwgZ2V0QXBwcywgZ2V0QXBwIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7XG4gIGdldEF1dGgsXG4gIHNpZ25JbldpdGhQb3B1cCxcbiAgR29vZ2xlQXV0aFByb3ZpZGVyLFxuICBvbkF1dGhTdGF0ZUNoYW5nZWQsXG4gIFVzZXIsXG59IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xuaW1wb3J0IHtcbiAgZ2V0RmlyZXN0b3JlLFxuICBjb2xsZWN0aW9uLFxuICBkb2MsXG4gIHNldERvYyxcbiAgdXBkYXRlRG9jLFxuICBkZWxldGVEb2MsXG4gIHF1ZXJ5LFxuICB3aGVyZSxcbiAgb25TbmFwc2hvdCxcbiAgc2VydmVyVGltZXN0YW1wLFxuICBnZXREb2NGcm9tU2VydmVyLFxuICBUaW1lc3RhbXAsXG59IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XG5pbXBvcnQgZmlyZWJhc2VDb25maWcgZnJvbSAnLi4vLi4vZmlyZWJhc2UtYXBwbGV0LWNvbmZpZy5qc29uJztcbmltcG9ydCB7IEFSQ29uZmlnU3RhdGUgfSBmcm9tICcuLi90eXBlcy9hclN0dWRpbyc7XG5cbmNvbnN0IGFwcCA9IGdldEFwcHMoKS5sZW5ndGggPiAwID8gZ2V0QXBwKCkgOiBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcbmV4cG9ydCBjb25zdCBhdXRoID0gZ2V0QXV0aChhcHApO1xuZXhwb3J0IGNvbnN0IGRiID0gZ2V0RmlyZXN0b3JlKGFwcCwgZmlyZWJhc2VDb25maWcuZmlyZXN0b3JlRGF0YWJhc2VJZCk7XG5cbi8vIFZhbGlkYXRlIGNvbm5lY3Rpb24gdG8gRmlyZXN0b3JlIG9uIGJvb3RcbmFzeW5jIGZ1bmN0aW9uIHRlc3RDb25uZWN0aW9uKCkge1xuICB0cnkge1xuICAgIGF3YWl0IGdldERvY0Zyb21TZXJ2ZXIoZG9jKGRiLCAndGVzdCcsICdjb25uZWN0aW9uJykpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoJ3RoZSBjbGllbnQgaXMgb2ZmbGluZScpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdQbGVhc2UgY2hlY2sgeW91ciBGaXJlYmFzZSBjb25maWd1cmF0aW9uLicpO1xuICAgIH1cbiAgfVxufVxudGVzdENvbm5lY3Rpb24oKTtcblxuZXhwb3J0IGVudW0gT3BlcmF0aW9uVHlwZSB7XG4gIENSRUFURSA9ICdjcmVhdGUnLFxuICBVUERBVEUgPSAndXBkYXRlJyxcbiAgREVMRVRFID0gJ2RlbGV0ZScsXG4gIExJU1QgPSAnbGlzdCcsXG4gIEdFVCA9ICdnZXQnLFxuICBXUklURSA9ICd3cml0ZScsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlyZXN0b3JlRXJyb3JJbmZvIHtcbiAgZXJyb3I6IHN0cmluZztcbiAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZTtcbiAgcGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgYXV0aEluZm86IHtcbiAgICB1c2VySWQ/OiBzdHJpbmcgfCBudWxsO1xuICAgIGVtYWlsPzogc3RyaW5nIHwgbnVsbDtcbiAgICBlbWFpbFZlcmlmaWVkPzogYm9vbGVhbiB8IG51bGw7XG4gICAgaXNBbm9ueW1vdXM/OiBib29sZWFuIHwgbnVsbDtcbiAgICB0ZW5hbnRJZD86IHN0cmluZyB8IG51bGw7XG4gICAgcHJvdmlkZXJJbmZvPzoge1xuICAgICAgcHJvdmlkZXJJZD86IHN0cmluZyB8IG51bGw7XG4gICAgICBlbWFpbD86IHN0cmluZyB8IG51bGw7XG4gICAgfVtdO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRmlyZXN0b3JlRXJyb3IoXG4gIGVycm9yOiB1bmtub3duLFxuICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLFxuICBwYXRoOiBzdHJpbmcgfCBudWxsXG4pOiBuZXZlciB7XG4gIGNvbnN0IGVyckluZm86IEZpcmVzdG9yZUVycm9ySW5mbyA9IHtcbiAgICBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpLFxuICAgIGF1dGhJbmZvOiB7XG4gICAgICB1c2VySWQ6IGF1dGguY3VycmVudFVzZXI/LnVpZCxcbiAgICAgIGVtYWlsOiBhdXRoLmN1cnJlbnRVc2VyPy5lbWFpbCxcbiAgICAgIGVtYWlsVmVyaWZpZWQ6IGF1dGguY3VycmVudFVzZXI/LmVtYWlsVmVyaWZpZWQsXG4gICAgICBpc0Fub255bW91czogYXV0aC5jdXJyZW50VXNlcj8uaXNBbm9ueW1vdXMsXG4gICAgICB0ZW5hbnRJZDogYXV0aC5jdXJyZW50VXNlcj8udGVuYW50SWQsXG4gICAgICBwcm92aWRlckluZm86XG4gICAgICAgIGF1dGguY3VycmVudFVzZXI/LnByb3ZpZGVyRGF0YT8ubWFwKChwcm92aWRlcikgPT4gKHtcbiAgICAgICAgICBwcm92aWRlcklkOiBwcm92aWRlci5wcm92aWRlcklkLFxuICAgICAgICAgIGVtYWlsOiBwcm92aWRlci5lbWFpbCxcbiAgICAgICAgfSkpIHx8IFtdLFxuICAgIH0sXG4gICAgb3BlcmF0aW9uVHlwZSxcbiAgICBwYXRoLFxuICB9O1xuICBjb25zb2xlLmVycm9yKCdGaXJlc3RvcmUgRXJyb3I6ICcsIEpTT04uc3RyaW5naWZ5KGVyckluZm8pKTtcbiAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KGVyckluZm8pKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaXJlc3RvcmVBUlByb2plY3REb2Mge1xuICBpZDogc3RyaW5nO1xuICBvd25lcklkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgc2NlbmVJZDogQVJDb25maWdTdGF0ZVsnc2NlbmVJZCddO1xuICBmcmFtZXdvcms6IEFSQ29uZmlnU3RhdGVbJ2ZyYW1ld29yayddO1xuICBtb2RlbFNjYWxlOiBudW1iZXI7XG4gIGxpZ2h0VGVtcGVyYXR1cmVLOiBudW1iZXI7XG4gIHBhbGV0dGU6IEFSQ29uZmlnU3RhdGVbJ3VpU2V0dGluZ3MnXVsncGFsZXR0ZSddO1xuICBkcml2ZUZpbGVJZD86IHN0cmluZztcbiAgY3JlYXRlZEF0PzogVGltZXN0YW1wIHwgbnVsbDtcbiAgdXBkYXRlZEF0PzogVGltZXN0YW1wIHwgbnVsbDtcbn1cblxuY29uc3QgVkFMSURfSURfUkVHRVggPSAvXlthLXpBLVowLTlfLV0rJC87XG5jb25zdCBNQVhfTkFNRV9MRU4gPSAxMjA7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmVUb1VzZXJGaXJlc3RvcmVQcm9qZWN0cyhcbiAgdXNlcklkOiBzdHJpbmcsXG4gIG9uRGF0YTogKHByb2plY3RzOiBGaXJlc3RvcmVBUlByb2plY3REb2NbXSkgPT4gdm9pZCxcbiAgb25FcnJvcj86IChlcnI6IHVua25vd24pID0+IHZvaWRcbikge1xuICBjb25zdCBwYXRoID0gJ3Byb2plY3RzJztcbiAgY29uc3QgcSA9IHF1ZXJ5KGNvbGxlY3Rpb24oZGIsIHBhdGgpLCB3aGVyZSgnb3duZXJJZCcsICc9PScsIHVzZXJJZCkpO1xuICByZXR1cm4gb25TbmFwc2hvdChcbiAgICBxLFxuICAgIChzbmFwc2hvdCkgPT4ge1xuICAgICAgY29uc3QgaXRlbXM6IEZpcmVzdG9yZUFSUHJvamVjdERvY1tdID0gc25hcHNob3QuZG9jcy5tYXAoKGRvY1NuYXApID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGRvY1NuYXAuZGF0YSgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiBkb2NTbmFwLmlkLFxuICAgICAgICAgIG93bmVySWQ6IFN0cmluZyhkYXRhLm93bmVySWQgfHwgdXNlcklkKSxcbiAgICAgICAgICBuYW1lOiBTdHJpbmcoZGF0YS5uYW1lIHx8ICdQcm9qZWt0IEFSJyksXG4gICAgICAgICAgc2NlbmVJZDogKGRhdGEuc2NlbmVJZCBhcyBBUkNvbmZpZ1N0YXRlWydzY2VuZUlkJ10pIHx8ICdza3lsaW5lX2ZpbmFuY2lhbCcsXG4gICAgICAgICAgZnJhbWV3b3JrOiAoZGF0YS5mcmFtZXdvcmsgYXMgQVJDb25maWdTdGF0ZVsnZnJhbWV3b3JrJ10pIHx8ICd1bml0eV9hcmZvdW5kYXRpb24nLFxuICAgICAgICAgIG1vZGVsU2NhbGU6IE51bWJlcihkYXRhLm1vZGVsU2NhbGUgPz8gMS4wKSxcbiAgICAgICAgICBsaWdodFRlbXBlcmF0dXJlSzogTnVtYmVyKGRhdGEubGlnaHRUZW1wZXJhdHVyZUsgPz8gNDIwMCksXG4gICAgICAgICAgcGFsZXR0ZTpcbiAgICAgICAgICAgIChkYXRhLnBhbGV0dGUgYXMgQVJDb25maWdTdGF0ZVsndWlTZXR0aW5ncyddWydwYWxldHRlJ10pIHx8ICdjeWFuX2JsdWVwcmludCcsXG4gICAgICAgICAgZHJpdmVGaWxlSWQ6IGRhdGEuZHJpdmVGaWxlSWQgPyBTdHJpbmcoZGF0YS5kcml2ZUZpbGVJZCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgY3JlYXRlZEF0OiBkYXRhLmNyZWF0ZWRBdCB8fCBudWxsLFxuICAgICAgICAgIHVwZGF0ZWRBdDogZGF0YS51cGRhdGVkQXQgfHwgbnVsbCxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgb25EYXRhKGl0ZW1zKTtcbiAgICB9LFxuICAgIChlcnJvcikgPT4ge1xuICAgICAgaWYgKG9uRXJyb3IpIG9uRXJyb3IoZXJyb3IpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyb3IsIE9wZXJhdGlvblR5cGUuTElTVCwgcGF0aCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gTG9nZ2VkIHN0cnVjdHVyZWQgRmlyZXN0b3JlRXJyb3JJbmZvXG4gICAgICB9XG4gICAgfVxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlRmlyZXN0b3JlQVJQcm9qZWN0KFxuICBjb25maWc6IEFSQ29uZmlnU3RhdGUsXG4gIHJhd05hbWU6IHN0cmluZyxcbiAgZHJpdmVGaWxlSWQ/OiBzdHJpbmdcbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGN1cnJlbnRVc2VyID0gYXV0aC5jdXJyZW50VXNlcjtcbiAgaWYgKCFjdXJyZW50VXNlcikge1xuICAgIHRocm93IG5ldyBFcnJvcignTXVzaXN6IGJ5xIcgemFsb2dvd2FueSBwcnpleiBHb29nbGUsIGFieSB6YXBpc2HEhyBwcm9qZWt0IHcgRmlyZXN0b3JlLicpO1xuICB9XG5cbiAgY29uc3Qgc2FuaXRpemVkTmFtZSA9IHJhd05hbWUudHJpbSgpLnNsaWNlKDAsIE1BWF9OQU1FX0xFTikgfHwgJ1Byb2pla3QgSG9sb0FyY2ggQVInO1xuICBjb25zdCBkb2NJZCA9IGBwcm9qXyR7RGF0ZS5ub3coKX1fJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCA4KX1gO1xuICBpZiAoIVZBTElEX0lEX1JFR0VYLnRlc3QoZG9jSWQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOaWVwcmF3aWTFgm93eSBpZGVudHlmaWthdG9yIGRva3VtZW50dS4nKTtcbiAgfVxuXG4gIGNvbnN0IHBhdGggPSBgcHJvamVjdHMvJHtkb2NJZH1gO1xuICBjb25zdCBwYXlsb2FkOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHtcbiAgICBvd25lcklkOiBjdXJyZW50VXNlci51aWQsXG4gICAgbmFtZTogc2FuaXRpemVkTmFtZSxcbiAgICBzY2VuZUlkOiBjb25maWcuc2NlbmVJZCxcbiAgICBmcmFtZXdvcms6IGNvbmZpZy5mcmFtZXdvcmssXG4gICAgbW9kZWxTY2FsZTogTWF0aC5tYXgoMC4xLCBNYXRoLm1pbigxMC4wLCBOdW1iZXIoY29uZmlnLm1vZGVsU2NhbGUpIHx8IDEuMCkpLFxuICAgIGxpZ2h0VGVtcGVyYXR1cmVLOiBNYXRoLm1heChcbiAgICAgIDEwMDAsXG4gICAgICBNYXRoLm1pbigxMjAwMCwgTnVtYmVyKGNvbmZpZy5saWdodFRlbXBlcmF0dXJlSykgfHwgNDIwMClcbiAgICApLFxuICAgIHBhbGV0dGU6IGNvbmZpZy51aVNldHRpbmdzLnBhbGV0dGUsXG4gICAgY3JlYXRlZEF0OiBzZXJ2ZXJUaW1lc3RhbXAoKSxcbiAgICB1cGRhdGVkQXQ6IHNlcnZlclRpbWVzdGFtcCgpLFxuICB9O1xuXG4gIGlmIChkcml2ZUZpbGVJZCAmJiBkcml2ZUZpbGVJZC5sZW5ndGggPD0gMTI4KSB7XG4gICAgcGF5bG9hZC5kcml2ZUZpbGVJZCA9IGRyaXZlRmlsZUlkO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBzZXREb2MoZG9jKGRiLCAncHJvamVjdHMnLCBkb2NJZCksIHBheWxvYWQpO1xuICAgIHJldHVybiBkb2NJZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBoYW5kbGVGaXJlc3RvcmVFcnJvcihlcnJvciwgT3BlcmF0aW9uVHlwZS5DUkVBVEUsIHBhdGgpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVGaXJlc3RvcmVBUlByb2plY3QoXG4gIHByb2plY3RJZDogc3RyaW5nLFxuICBjb25maWc6IEFSQ29uZmlnU3RhdGUsXG4gIHJhd05hbWU6IHN0cmluZyxcbiAgZHJpdmVGaWxlSWQ/OiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBwYXRoID0gYHByb2plY3RzLyR7cHJvamVjdElkfWA7XG4gIGNvbnN0IHNhbml0aXplZE5hbWUgPSByYXdOYW1lLnRyaW0oKS5zbGljZSgwLCBNQVhfTkFNRV9MRU4pIHx8ICdQcm9qZWt0IEhvbG9BcmNoIEFSJztcblxuICBjb25zdCB1cGRhdGVzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHtcbiAgICBuYW1lOiBzYW5pdGl6ZWROYW1lLFxuICAgIHNjZW5lSWQ6IGNvbmZpZy5zY2VuZUlkLFxuICAgIGZyYW1ld29yazogY29uZmlnLmZyYW1ld29yayxcbiAgICBtb2RlbFNjYWxlOiBNYXRoLm1heCgwLjEsIE1hdGgubWluKDEwLjAsIE51bWJlcihjb25maWcubW9kZWxTY2FsZSkgfHwgMS4wKSksXG4gICAgbGlnaHRUZW1wZXJhdHVyZUs6IE1hdGgubWF4KFxuICAgICAgMTAwMCxcbiAgICAgIE1hdGgubWluKDEyMDAwLCBOdW1iZXIoY29uZmlnLmxpZ2h0VGVtcGVyYXR1cmVLKSB8fCA0MjAwKVxuICAgICksXG4gICAgcGFsZXR0ZTogY29uZmlnLnVpU2V0dGluZ3MucGFsZXR0ZSxcbiAgICB1cGRhdGVkQXQ6IHNlcnZlclRpbWVzdGFtcCgpLFxuICB9O1xuXG4gIGlmIChkcml2ZUZpbGVJZCAhPT0gdW5kZWZpbmVkICYmIGRyaXZlRmlsZUlkLmxlbmd0aCA8PSAxMjgpIHtcbiAgICB1cGRhdGVzLmRyaXZlRmlsZUlkID0gZHJpdmVGaWxlSWQ7XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IHVwZGF0ZURvYyhkb2MoZGIsICdwcm9qZWN0cycsIHByb2plY3RJZCksIHVwZGF0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGhhbmRsZUZpcmVzdG9yZUVycm9yKGVycm9yLCBPcGVyYXRpb25UeXBlLlVQREFURSwgcGF0aCk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUZpcmVzdG9yZUFSUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBwYXRoID0gYHByb2plY3RzLyR7cHJvamVjdElkfWA7XG4gIHRyeSB7XG4gICAgYXdhaXQgZGVsZXRlRG9jKGRvYyhkYiwgJ3Byb2plY3RzJywgcHJvamVjdElkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyb3IsIE9wZXJhdGlvblR5cGUuREVMRVRFLCBwYXRoKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgU0NPUEVTID0gW1xuICAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZScsXG4gICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmFjdGl2aXR5JyxcbiAgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuYWN0aXZpdHkucmVhZG9ubHknLFxuICAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5hcHBkYXRhJyxcbiAgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuYXBwcy5yZWFkb25seScsXG4gICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmZpbGUnLFxuICAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5pbnN0YWxsJyxcbiAgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUubWVldC5yZWFkb25seScsXG4gICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLm1ldGFkYXRhJyxcbiAgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUubWV0YWRhdGEucmVhZG9ubHknLFxuICAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5waG90b3MucmVhZG9ubHknLFxuICAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5yZWFkb25seScsXG4gICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLnNjcmlwdHMnLFxuXTtcblxuY29uc3QgcHJvdmlkZXIgPSBuZXcgR29vZ2xlQXV0aFByb3ZpZGVyKCk7XG5TQ09QRVMuZm9yRWFjaCgoc2NvcGUpID0+IHByb3ZpZGVyLmFkZFNjb3BlKHNjb3BlKSk7XG5cbi8vIEZsYWcgdG8gaW5kaWNhdGUgaWYgd2UgYXJlIGluIHRoZSBtaWRkbGUgb2YgYSBzaWduLWluIGZsb3cuXG5sZXQgaXNTaWduaW5nSW4gPSBmYWxzZTtcbi8vIENhY2hlIHRoZSBhY2Nlc3MgdG9rZW4gc3RyaWN0bHkgaW4gbWVtb3J5IChuZXZlciBpbiBsb2NhbFN0b3JhZ2Uvc2Vzc2lvblN0b3JhZ2UpLlxubGV0IGNhY2hlZEFjY2Vzc1Rva2VuOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuZXhwb3J0IGNvbnN0IGluaXRBdXRoID0gKFxuICBvbkF1dGhTdWNjZXNzPzogKHVzZXI6IFVzZXIsIHRva2VuOiBzdHJpbmcpID0+IHZvaWQsXG4gIG9uQXV0aEZhaWx1cmU/OiAodXNlcjogVXNlciB8IG51bGwpID0+IHZvaWRcbikgPT4ge1xuICByZXR1cm4gb25BdXRoU3RhdGVDaGFuZ2VkKGF1dGgsIGFzeW5jICh1c2VyOiBVc2VyIHwgbnVsbCkgPT4ge1xuICAgIGlmICh1c2VyKSB7XG4gICAgICBpZiAoY2FjaGVkQWNjZXNzVG9rZW4pIHtcbiAgICAgICAgaWYgKG9uQXV0aFN1Y2Nlc3MpIG9uQXV0aFN1Y2Nlc3ModXNlciwgY2FjaGVkQWNjZXNzVG9rZW4pO1xuICAgICAgfSBlbHNlIGlmICghaXNTaWduaW5nSW4pIHtcbiAgICAgICAgY2FjaGVkQWNjZXNzVG9rZW4gPSBudWxsO1xuICAgICAgICBpZiAob25BdXRoRmFpbHVyZSkgb25BdXRoRmFpbHVyZSh1c2VyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVkQWNjZXNzVG9rZW4gPSBudWxsO1xuICAgICAgaWYgKG9uQXV0aEZhaWx1cmUpIG9uQXV0aEZhaWx1cmUobnVsbCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnb29nbGVTaWduSW4gPSBhc3luYyAoKTogUHJvbWlzZTx7IHVzZXI6IFVzZXI7IGFjY2Vzc1Rva2VuOiBzdHJpbmcgfSB8IG51bGw+ID0+IHtcbiAgdHJ5IHtcbiAgICBpc1NpZ25pbmdJbiA9IHRydWU7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2lnbkluV2l0aFBvcHVwKGF1dGgsIHByb3ZpZGVyKTtcbiAgICBjb25zdCBjcmVkZW50aWFsID0gR29vZ2xlQXV0aFByb3ZpZGVyLmNyZWRlbnRpYWxGcm9tUmVzdWx0KHJlc3VsdCk7XG4gICAgaWYgKCFjcmVkZW50aWFsPy5hY2Nlc3NUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZ2V0IGFjY2VzcyB0b2tlbiBmcm9tIEZpcmViYXNlIEF1dGgnKTtcbiAgICB9XG5cbiAgICBjYWNoZWRBY2Nlc3NUb2tlbiA9IGNyZWRlbnRpYWwuYWNjZXNzVG9rZW47XG4gICAgcmV0dXJuIHsgdXNlcjogcmVzdWx0LnVzZXIsIGFjY2Vzc1Rva2VuOiBjYWNoZWRBY2Nlc3NUb2tlbiB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1NpZ24gaW4gZXJyb3I6JywgZXJyb3IpO1xuICAgIHRocm93IGVycm9yO1xuICB9IGZpbmFsbHkge1xuICAgIGlzU2lnbmluZ0luID0gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRBY2Nlc3NUb2tlbiA9IGFzeW5jICgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+ID0+IHtcbiAgcmV0dXJuIGNhY2hlZEFjY2Vzc1Rva2VuO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvZ291dCA9IGFzeW5jICgpID0+IHtcbiAgYXdhaXQgYXV0aC5zaWduT3V0KCk7XG4gIGNhY2hlZEFjY2Vzc1Rva2VuID0gbnVsbDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJpdmVGaWxlSXRlbSB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgbWltZVR5cGU6IHN0cmluZztcbiAgbW9kaWZpZWRUaW1lPzogc3RyaW5nO1xuICBzaXplPzogc3RyaW5nO1xuICB3ZWJWaWV3TGluaz86IHN0cmluZztcbiAgaWNvbkxpbms/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyaXZlU3RvcmFnZVF1b3RhIHtcbiAgbGltaXQ/OiBzdHJpbmc7XG4gIHVzYWdlPzogc3RyaW5nO1xuICB1c2FnZUluRHJpdmU/OiBzdHJpbmc7XG4gIHVzZXJFbWFpbD86IHN0cmluZztcbiAgdXNlckRpc3BsYXlOYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyaXZlQWN0aXZpdHlFbnRyeSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogc3RyaW5nO1xuICBhY3Rpb25OYW1lOiBzdHJpbmc7XG4gIHRhcmdldFRpdGxlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaERyaXZlU3RvcmFnZUluZm8oYWNjZXNzVG9rZW46IHN0cmluZyk6IFByb21pc2U8RHJpdmVTdG9yYWdlUXVvdGE+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2RyaXZlL3YzL2Fib3V0P2ZpZWxkcz11c2VyKGRpc3BsYXlOYW1lLGVtYWlsQWRkcmVzcyksc3RvcmFnZVF1b3RhKGxpbWl0LHVzYWdlLHVzYWdlSW5Ecml2ZSknLFxuICAgIHtcbiAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FjY2Vzc1Rva2VufWAgfSxcbiAgICB9XG4gICk7XG4gIGlmICghcmVzLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBEcml2ZSBBYm91dCBBUEkgZXJyb3IgKCR7cmVzLnN0YXR1c30pYCk7XG4gIH1cbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gIHJldHVybiB7XG4gICAgbGltaXQ6IGRhdGEuc3RvcmFnZVF1b3RhPy5saW1pdCxcbiAgICB1c2FnZTogZGF0YS5zdG9yYWdlUXVvdGE/LnVzYWdlLFxuICAgIHVzYWdlSW5Ecml2ZTogZGF0YS5zdG9yYWdlUXVvdGE/LnVzYWdlSW5Ecml2ZSxcbiAgICB1c2VyRW1haWw6IGRhdGEudXNlcj8uZW1haWxBZGRyZXNzLFxuICAgIHVzZXJEaXNwbGF5TmFtZTogZGF0YS51c2VyPy5kaXNwbGF5TmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxpc3REcml2ZUZpbGVzKFxuICBhY2Nlc3NUb2tlbjogc3RyaW5nLFxuICBvcHRpb25zOiB7IHNlYXJjaFF1ZXJ5Pzogc3RyaW5nOyBvbmx5SG9sb0FyY2g/OiBib29sZWFuIH0gPSB7fVxuKTogUHJvbWlzZTxEcml2ZUZpbGVJdGVtW10+IHtcbiAgY29uc3QgY2xhdXNlczogc3RyaW5nW10gPSBbJ3RyYXNoZWQgPSBmYWxzZSddO1xuICBpZiAob3B0aW9ucy5vbmx5SG9sb0FyY2gpIHtcbiAgICBjbGF1c2VzLnB1c2goXCIobmFtZSBjb250YWlucyAnSG9sb0FyY2gnIG9yIGRlc2NyaXB0aW9uIGNvbnRhaW5zICdIb2xvQXJjaF9BUl9TdHVkaW8nKVwiKTtcbiAgfVxuICBpZiAob3B0aW9ucy5zZWFyY2hRdWVyeSAmJiBvcHRpb25zLnNlYXJjaFF1ZXJ5LnRyaW0oKSkge1xuICAgIGNvbnN0IGVzY2FwZWQgPSBvcHRpb25zLnNlYXJjaFF1ZXJ5LnRyaW0oKS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIik7XG4gICAgY2xhdXNlcy5wdXNoKGBuYW1lIGNvbnRhaW5zICcke2VzY2FwZWR9J2ApO1xuICB9XG5cbiAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgcGFnZVNpemU6ICcyNScsXG4gICAgb3JkZXJCeTogJ21vZGlmaWVkVGltZSBkZXNjJyxcbiAgICBmaWVsZHM6ICdmaWxlcyhpZCxuYW1lLG1pbWVUeXBlLG1vZGlmaWVkVGltZSxzaXplLHdlYlZpZXdMaW5rLGljb25MaW5rLGRlc2NyaXB0aW9uKScsXG4gICAgcTogY2xhdXNlcy5qb2luKCcgYW5kICcpLFxuICB9KTtcblxuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vZHJpdmUvdjMvZmlsZXM/JHtwYXJhbXMudG9TdHJpbmcoKX1gLCB7XG4gICAgaGVhZGVyczogeyBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCB9LFxuICB9KTtcbiAgaWYgKCFyZXMub2spIHtcbiAgICBjb25zdCBlcnJUZXh0ID0gYXdhaXQgcmVzLnRleHQoKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEdvb2dsZSBEcml2ZSBsaXN0IGVycm9yICgke3Jlcy5zdGF0dXN9KTogJHtlcnJUZXh0fWApO1xuICB9XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShkYXRhLmZpbGVzKSA/IGRhdGEuZmlsZXMgOiBbXTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwbG9hZFRleHRGaWxlVG9Ecml2ZShcbiAgYWNjZXNzVG9rZW46IHN0cmluZyxcbiAgZmlsZU5hbWU6IHN0cmluZyxcbiAgY29udGVudDogc3RyaW5nLFxuICBtaW1lVHlwZTogc3RyaW5nLFxuICBkZXNjcmlwdGlvbiA9ICdIb2xvQXJjaF9BUl9TdHVkaW8gUHJvamVjdCBBc3NldCdcbik6IFByb21pc2U8RHJpdmVGaWxlSXRlbT4ge1xuICBjb25zdCBtZXRhZGF0YSA9IHtcbiAgICBuYW1lOiBmaWxlTmFtZSxcbiAgICBtaW1lVHlwZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgfTtcblxuICBjb25zdCBib3VuZGFyeSA9ICctLS0tLS0tSG9sb0FyY2hEcml2ZUJvdW5kYXJ5N01BNFlXeGtUclp1MGdXJztcbiAgY29uc3QgZGVsaW1pdGVyID0gYFxcclxcbi0tJHtib3VuZGFyeX1cXHJcXG5gO1xuICBjb25zdCBjbG9zZURlbGltaXRlciA9IGBcXHJcXG4tLSR7Ym91bmRhcnl9LS1gO1xuXG4gIGNvbnN0IG11bHRpcGFydEJvZHkgPVxuICAgIGRlbGltaXRlciArXG4gICAgJ0NvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFxcclxcblxcclxcbicgK1xuICAgIEpTT04uc3RyaW5naWZ5KG1ldGFkYXRhKSArXG4gICAgZGVsaW1pdGVyICtcbiAgICBgQ29udGVudC1UeXBlOiAke21pbWVUeXBlfTsgY2hhcnNldD1VVEYtOFxcclxcblxcclxcbmAgK1xuICAgIGNvbnRlbnQgK1xuICAgIGNsb3NlRGVsaW1pdGVyO1xuXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFxuICAgICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS91cGxvYWQvZHJpdmUvdjMvZmlsZXM/dXBsb2FkVHlwZT1tdWx0aXBhcnQmZmllbGRzPWlkLG5hbWUsbWltZVR5cGUsbW9kaWZpZWRUaW1lLHNpemUsd2ViVmlld0xpbmssZGVzY3JpcHRpb24nLFxuICAgIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IGBtdWx0aXBhcnQvcmVsYXRlZDsgYm91bmRhcnk9JHtib3VuZGFyeX1gLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IG11bHRpcGFydEJvZHksXG4gICAgfVxuICApO1xuXG4gIGlmICghcmVzLm9rKSB7XG4gICAgY29uc3QgZXJyVGV4dCA9IGF3YWl0IHJlcy50ZXh0KCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVcGxvYWQgZmFpbGVkICgke3Jlcy5zdGF0dXN9KTogJHtlcnJUZXh0fWApO1xuICB9XG4gIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBsb2FkRGF0YVVybEZpbGVUb0RyaXZlKFxuICBhY2Nlc3NUb2tlbjogc3RyaW5nLFxuICBmaWxlTmFtZTogc3RyaW5nLFxuICBkYXRhVXJsOiBzdHJpbmcsXG4gIG1pbWVUeXBlID0gJ2ltYWdlL3BuZycsXG4gIGRlc2NyaXB0aW9uID0gJ0hvbG9BcmNoX0FSX1N0dWRpbyBTY3JlZW5zaG90J1xuKTogUHJvbWlzZTxEcml2ZUZpbGVJdGVtPiB7XG4gIGNvbnN0IGJhc2U2NERhdGEgPSBkYXRhVXJsLmluY2x1ZGVzKCcsJykgPyBkYXRhVXJsLnNwbGl0KCcsJylbMV0gOiBkYXRhVXJsO1xuICBjb25zdCBtZXRhZGF0YSA9IHtcbiAgICBuYW1lOiBmaWxlTmFtZSxcbiAgICBtaW1lVHlwZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgfTtcblxuICBjb25zdCBib3VuZGFyeSA9ICctLS0tLS0tSG9sb0FyY2hEcml2ZUJpbmFyeUJvdW5kYXJ5N01BNFlXeGsnO1xuICBjb25zdCBkZWxpbWl0ZXIgPSBgXFxyXFxuLS0ke2JvdW5kYXJ5fVxcclxcbmA7XG4gIGNvbnN0IGNsb3NlRGVsaW1pdGVyID0gYFxcclxcbi0tJHtib3VuZGFyeX0tLWA7XG5cbiAgY29uc3QgbXVsdGlwYXJ0Qm9keSA9XG4gICAgZGVsaW1pdGVyICtcbiAgICAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XFxyXFxuXFxyXFxuJyArXG4gICAgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpICtcbiAgICBkZWxpbWl0ZXIgK1xuICAgIGBDb250ZW50LVR5cGU6ICR7bWltZVR5cGV9XFxyXFxuYCArXG4gICAgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NFxcclxcblxcclxcbicgK1xuICAgIGJhc2U2NERhdGEgK1xuICAgIGNsb3NlRGVsaW1pdGVyO1xuXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFxuICAgICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS91cGxvYWQvZHJpdmUvdjMvZmlsZXM/dXBsb2FkVHlwZT1tdWx0aXBhcnQmZmllbGRzPWlkLG5hbWUsbWltZVR5cGUsbW9kaWZpZWRUaW1lLHNpemUsd2ViVmlld0xpbmssZGVzY3JpcHRpb24nLFxuICAgIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IGBtdWx0aXBhcnQvcmVsYXRlZDsgYm91bmRhcnk9JHtib3VuZGFyeX1gLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IG11bHRpcGFydEJvZHksXG4gICAgfVxuICApO1xuXG4gIGlmICghcmVzLm9rKSB7XG4gICAgY29uc3QgZXJyVGV4dCA9IGF3YWl0IHJlcy50ZXh0KCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB1cGxvYWQgZmFpbGVkICgke3Jlcy5zdGF0dXN9KTogJHtlcnJUZXh0fWApO1xuICB9XG4gIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlRHJpdmVGaWxlQ29udGVudChcbiAgYWNjZXNzVG9rZW46IHN0cmluZyxcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIGNvbnRlbnQ6IHN0cmluZyxcbiAgbWltZVR5cGUgPSAnYXBwbGljYXRpb24vanNvbidcbik6IFByb21pc2U8RHJpdmVGaWxlSXRlbT4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vdXBsb2FkL2RyaXZlL3YzL2ZpbGVzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgZmlsZUlkXG4gICAgKX0/dXBsb2FkVHlwZT1tZWRpYSZmaWVsZHM9aWQsbmFtZSxtaW1lVHlwZSxtb2RpZmllZFRpbWUsc2l6ZSx3ZWJWaWV3TGlua2AsXG4gICAge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IGAke21pbWVUeXBlfTsgY2hhcnNldD1VVEYtOGAsXG4gICAgICB9LFxuICAgICAgYm9keTogY29udGVudCxcbiAgICB9XG4gICk7XG4gIGlmICghcmVzLm9rKSB7XG4gICAgY29uc3QgZXJyVGV4dCA9IGF3YWl0IHJlcy50ZXh0KCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVcGRhdGUgZmFpbGVkICgke3Jlcy5zdGF0dXN9KTogJHtlcnJUZXh0fWApO1xuICB9XG4gIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG93bmxvYWREcml2ZUZpbGVUZXh0KFxuICBhY2Nlc3NUb2tlbjogc3RyaW5nLFxuICBmaWxlSWQ6IHN0cmluZ1xuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2RyaXZlL3YzL2ZpbGVzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KGZpbGVJZCl9P2FsdD1tZWRpYWAsXG4gICAge1xuICAgICAgaGVhZGVyczogeyBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCB9LFxuICAgIH1cbiAgKTtcbiAgaWYgKCFyZXMub2spIHtcbiAgICBjb25zdCBlcnJUZXh0ID0gYXdhaXQgcmVzLnRleHQoKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYERvd25sb2FkIGZhaWxlZCAoJHtyZXMuc3RhdHVzfSk6ICR7ZXJyVGV4dH1gKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgcmVzLnRleHQoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZURyaXZlRmlsZShhY2Nlc3NUb2tlbjogc3RyaW5nLCBmaWxlSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vZHJpdmUvdjMvZmlsZXMvJHtlbmNvZGVVUklDb21wb25lbnQoZmlsZUlkKX1gLFxuICAgIHtcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gIH0sXG4gICAgfVxuICApO1xuICBpZiAoIXJlcy5vaykge1xuICAgIGNvbnN0IGVyclRleHQgPSBhd2FpdCByZXMudGV4dCgpO1xuICAgIHRocm93IG5ldyBFcnJvcihgRGVsZXRlIGZhaWxlZCAoJHtyZXMuc3RhdHVzfSk6ICR7ZXJyVGV4dH1gKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hEcml2ZUFjdGl2aXRpZXMoXG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmdcbik6IFByb21pc2U8RHJpdmVBY3Rpdml0eUVudHJ5W10+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9kcml2ZWFjdGl2aXR5Lmdvb2dsZWFwaXMuY29tL3YyL2FjdGl2aXR5OnF1ZXJ5Jywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcGFnZVNpemU6IDYgfSksXG4gICAgfSk7XG4gICAgaWYgKCFyZXMub2spIHJldHVybiBbXTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICBjb25zdCBhY3Rpdml0aWVzID0gQXJyYXkuaXNBcnJheShkYXRhLmFjdGl2aXRpZXMpID8gZGF0YS5hY3Rpdml0aWVzIDogW107XG4gICAgcmV0dXJuIGFjdGl2aXRpZXMubWFwKChhY3Q6IFJlY29yZDxzdHJpbmcsIGFueT4sIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBwcmltYXJ5ID0gYWN0LnByaW1hcnlBY3Rpb25EZXRhaWwgfHwge307XG4gICAgICBjb25zdCBhY3Rpb25LZXkgPSBPYmplY3Qua2V5cyhwcmltYXJ5KVswXSB8fCAnZWRpdCc7XG4gICAgICBjb25zdCBhY3Rpb25NYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICAgIGNyZWF0ZTogJ1V0d29yem9ubyBwbGlrJyxcbiAgICAgICAgZWRpdDogJ1pha3R1YWxpem93YW5vIHBsaWsnLFxuICAgICAgICBtb3ZlOiAnUHJ6ZW5pZXNpb25vIHBsaWsnLFxuICAgICAgICByZW5hbWU6ICdabWllbmlvbm8gbmF6d8SZJyxcbiAgICAgICAgZGVsZXRlOiAnVXN1bmnEmXRvIHBsaWsnLFxuICAgICAgICByZXN0b3JlOiAnUHJ6eXdyw7Njb25vIHBsaWsnLFxuICAgICAgICBwZXJtaXNzaW9uQ2hhbmdlOiAnWm1pZW5pb25vIHVwcmF3bmllbmlhJyxcbiAgICAgIH07XG4gICAgICBjb25zdCB0YXJnZXRUaXRsZSA9XG4gICAgICAgIGFjdC50YXJnZXRzPy5bMF0/LmRyaXZlSXRlbT8udGl0bGUgfHwgJ1BsaWsgcHJvamVrdHUgR29vZ2xlIERyaXZlJztcbiAgICAgIGNvbnN0IHRzID0gYWN0LnRpbWVzdGFtcCB8fCBhY3QudGltZVJhbmdlPy5lbmRUaW1lIHx8IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBgJHt0c30tJHtpZHh9YCxcbiAgICAgICAgdGltZXN0YW1wOiB0cyxcbiAgICAgICAgYWN0aW9uTmFtZTogYWN0aW9uTWFwW2FjdGlvbktleV0gfHwgYWN0aW9uS2V5LFxuICAgICAgICB0YXJnZXRUaXRsZSxcbiAgICAgIH07XG4gICAgfSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIl19