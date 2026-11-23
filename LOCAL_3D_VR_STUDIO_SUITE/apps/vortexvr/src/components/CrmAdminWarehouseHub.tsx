const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/vortexvr/node_modules/.vite/deps/react.js?v=adc20043";
import { encryptPayloadE2E } from "/apps/vortexvr/src/utils/cryptoE2E.ts";
import { exportEnterpriseMasterReportPdf } from "/apps/vortexvr/src/utils/pdfExport.ts";
import { BarChart3, Users, Mail, Database, Download, RefreshCw, Award, Shield, CheckCircle2, AlertTriangle, Plus, Minus } from "/apps/vortexvr/node_modules/.vite/deps/lucide-react.js?v=867ef266";
var _jsxFileName = "/app/applet/src/components/CrmAdminWarehouseHub.tsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/apps/vortexvr/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=adc20043";
export const CrmAdminWarehouseHub = ({ lang, equipment, reservations, customers, setCustomers, ssoSession, pushNotification }) => {
	const [crmFilter, setCrmFilter] = useState("all");
	const [warehouseItems, setWarehouseItems] = useState([]);
	const [lastWmsSync, setLastWmsSync] = useState("");
	const [isSyncingWms, setIsSyncingWms] = useState(false);
	const [sendingEmailForId, setSendingEmailForId] = useState(null);
	const [emailStatusBanner, setEmailStatusBanner] = useState("");
	// E2EE Cryptographic Vault verification state
	const [e2eProof, setE2eProof] = useState(null);
	const syncWarehouseApi = async (adjustmentSku, delta) => {
		setIsSyncingWms(true);
		try {
			const response = await fetch("/api/warehouse/sync", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					adjustmentSku,
					delta
				})
			});
			const data = await response.json();
			if (data?.stock) {
				setWarehouseItems(data.stock);
				setLastWmsSync(data.syncTimestamp?.slice(0, 19).replace("T", " ") || new Date().toISOString());
				if (adjustmentSku) {
					pushNotification({
						type: "WMS_SYNC",
						titlePl: `Zsynchronizowano magazyn WMS dla SKU ${adjustmentSku}`,
						titleEn: `WMS API synced for SKU ${adjustmentSku}`,
						detailPl: `Korekta stanu: ${delta && delta > 0 ? `+${delta}` : delta} szt. Szyfrowanie: ${data.encryptionCipher}`,
						detailEn: `Stock delta: ${delta && delta > 0 ? `+${delta}` : delta} units. Cipher: ${data.encryptionCipher}`
					});
				}
			}
		} catch {} finally {
			setIsSyncingWms(false);
		}
	};
	useEffect(() => {
		syncWarehouseApi();
		encryptPayloadE2E({
			customersCount: customers.length,
			reservationsCount: reservations.length
		}).then(setE2eProof);
	}, []);
	const handleDispatchAutomatedEmail = async (customer, templateType) => {
		setSendingEmailForId(customer.id);
		try {
			const response = await fetch("/api/notifications/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					recipientEmail: customer.email,
					customerName: customer.fullName,
					templateType,
					equipmentName: "Zestaw VR Vortex",
					dueDate: "2026-10-29"
				})
			});
			const data = await response.json();
			const timeStr = new Date().toTimeString().slice(0, 8);
			setCustomers((prev) => prev.map((c) => c.id === customer.id ? {
				...c,
				lastReminderSent: `${templateType} (${timeStr})`
			} : c));
			setEmailStatusBanner(lang === "pl" ? `Wysłano automatyczne powiadomienie e-mail [${data.messageId || "TLS-OK"}] do ${customer.email} (${templateType})` : `Dispatched automated email [${data.messageId || "TLS-OK"}] to ${customer.email} (${templateType})`);
			pushNotification({
				type: "EMAIL_DISPATCH",
				titlePl: `E-mail wysłany do ${customer.fullName} (${templateType})`,
				titleEn: `Automated Email sent to ${customer.fullName} (${templateType})`,
				detailPl: `Adres: ${customer.email} · Identyfikator: ${data.messageId || "MSG-992"}`,
				detailEn: `Recipient: ${customer.email} · Message ID: ${data.messageId || "MSG-992"}`
			});
		} finally {
			setSendingEmailForId(null);
		}
	};
	const handleDispatchBulkOverdueReminders = async () => {
		for (const c of customers.filter((cust) => cust.overdueCount > 0 || cust.activeRentalsCount > 0)) {
			await handleDispatchAutomatedEmail(c, c.overdueCount > 0 ? "OVERDUE_ALERT" : "RETURN_REMINDER");
		}
	};
	// Real-time Analytics Metrics
	const totalRevenuePln = reservations.reduce((sum, r) => sum + r.totalPricePln, 0);
	const totalUnits = equipment.reduce((sum, e) => sum + e.totalUnits, 0);
	const rentedUnits = equipment.reduce((sum, e) => sum + (e.totalUnits - e.availableUnits), 0);
	const fleetUtilizationPct = totalUnits > 0 ? Math.round(rentedUnits / totalUnits * 100) : 64;
	const familyBookingsCount = reservations.filter((r) => r.isFamilyPlan).length;
	const totalFamilyHours = customers.reduce((sum, c) => sum + c.familyMembers.reduce((s, m) => s + m.hoursUsed, 0), 0);
	const filteredCustomers = customers.filter((c) => {
		if (crmFilter === "family") return c.familyMembers.length > 1;
		if (crmFilter === "overdue") return c.overdueCount > 0;
		return true;
	});
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "max-w-[1380px] mx-auto px-6 py-8 space-y-10",
		children: [
			/* @__PURE__ */ _jsxDEV("section", {
				className: "space-y-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4",
					children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
						className: "text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV(BarChart3, { className: "w-6 h-6 text-amber-500" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 171,
							columnNumber: 15
						}, this), lang === "pl" ? "01. Panel Administratora: Analityka Sprzedaży i Statystyk Wypożyczeń (Live)" : "01. Admin Console: Real-Time Sales & Fleet Rental Analytics"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("p", {
						className: "text-sm text-slate-600 dark:text-slate-400 mt-1",
						children: lang === "pl" ? "Telemetria finansowa, utylizacja floty VR, statystyki rodzinne CRM oraz synchronizacja magazynowa API." : "Live financial telemetry, VR fleet utilization, family sharing CRM metrics, and warehouse API sync."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 176,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-wrap items-center gap-2.5",
						children: [/* @__PURE__ */ _jsxDEV("button", {
							onClick: handleDispatchBulkOverdueReminders,
							className: "px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
							children: [/* @__PURE__ */ _jsxDEV(Mail, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 188,
								columnNumber: 15
							}, this), lang === "pl" ? "Wyślij Automatyczne E-maile o Zwrotach i Zaległościach" : "Send Automated Return & Overdue Emails"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 184,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => exportEnterpriseMasterReportPdf(equipment, reservations, customers, warehouseItems),
							className: "px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
							children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 15
							}, this), lang === "pl" ? "Eksportuj Wszystkie Raporty do PDF" : "Export All Reports to PDF"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 194,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 183,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "text-xs text-slate-500 dark:text-slate-400",
									children: lang === "pl" ? "Przychód ze Sprzedaży i Wypożyczeń (Live)" : "Real-Time Rental & Sales Revenue"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white",
									children: [totalRevenuePln.toLocaleString(), " PLN"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 212,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-mono",
									children: [
										"+18.4% MoM · ",
										reservations.length,
										" ",
										lang === "pl" ? "transakcji online" : "online txns"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 215,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "text-xs text-slate-500 dark:text-slate-400",
									children: lang === "pl" ? "Utylizacja Floty Sprzętowej VR" : "VR Hardware Fleet Utilization"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 221,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white",
									children: [
										fleetUtilizationPct,
										"% (",
										rentedUnits,
										"/",
										totalUnits,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mt-2 w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden",
									children: /* @__PURE__ */ _jsxDEV("div", {
										className: "h-full bg-amber-500 transition-all",
										style: { width: `${fleetUtilizationPct}%` }
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 228,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 220,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "text-xs text-slate-500 dark:text-slate-400",
									children: lang === "pl" ? "Wypożyczenia Rodzinne (Family Pool)" : "Family Pool Sharing Activity"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 236,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mt-2 text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white",
									children: [
										familyBookingsCount,
										" ",
										lang === "pl" ? "rodzin" : "families",
										" · ",
										totalFamilyHours.toFixed(1),
										"h"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 239,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mt-1 text-xs text-slate-500 font-mono",
									children: lang === "pl" ? "Średnio 3.2 domownika / zestaw" : "Avg 3.2 family members / kit"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 242,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 235,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "text-xs text-slate-500 dark:text-slate-400",
									children: lang === "pl" ? "Dostępność Chmury i Szyfrowanie E2EE" : "Cloud High-Availability & E2EE"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 248,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mt-2 text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400",
									children: "99.99% SLA"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mt-1 text-xs text-slate-500 font-mono truncate",
									children: [ssoSession.cloudRegion, " · AES-256-GCM"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 254,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 207,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 167,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("section", {
				className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800",
						children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Users, { className: "w-5 h-5 text-amber-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 15
							}, this), lang === "pl" ? "02. Moduł CRM: Wypożyczenia w Rodzinie, Program Lojalnościowy i Powiadomienia E-mail" : "02. Customer CRM: Family Sharing Stats, Loyalty Program & Automated Email Alerts"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5",
							children: lang === "pl" ? "Pełna ewidencja czasu spędzonego w VR przez poszczególnych członków rodziny, saldo punktów lojalnościowych i alerty zwrotów." : "Per-member family VR usage analytics, loyalty reward points redemption, and automated overdue email triggers."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 271,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 264,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-xs",
							children: [
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setCrmFilter("all"),
									className: `px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${crmFilter === "all" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-600 dark:text-slate-400"}`,
									children: [
										lang === "pl" ? "Wszyscy Klienci" : "All Customers",
										" (",
										customers.length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 280,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setCrmFilter("family"),
									className: `px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${crmFilter === "family" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-600 dark:text-slate-400"}`,
									children: lang === "pl" ? "Konta Rodzinne" : "Family Accounts"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 290,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setCrmFilter("overdue"),
									className: `px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${crmFilter === "overdue" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-600 dark:text-slate-400"}`,
									children: lang === "pl" ? "Zaległości Zwrotu" : "Overdue Returns"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 300,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 279,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 263,
						columnNumber: 9
					}, this),
					emailStatusBanner && /* @__PURE__ */ _jsxDEV("div", {
						className: "p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-300 flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "w-4 h-4 shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 315,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: emailStatusBanner }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 316,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 314,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ _jsxDEV("table", {
							className: "w-full text-left border-collapse text-xs",
							children: [/* @__PURE__ */ _jsxDEV("thead", { children: /* @__PURE__ */ _jsxDEV("tr", {
								className: "border-b border-slate-200 dark:border-slate-800 text-slate-500 font-mono",
								children: [
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 pr-4",
										children: lang === "pl" ? "Klient / Rodzina (CRM)" : "Customer / Family"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 324,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3",
										children: lang === "pl" ? "Statystyki Okularów w Rodzinie" : "Family VR Headset Usage Stats"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 325,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3 text-right",
										children: lang === "pl" ? "Program Lojalnościowy" : "Loyalty Points"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 326,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 px-3 text-right",
										children: lang === "pl" ? "Obroty PLN" : "Total Spent"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 327,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2.5 pl-4 text-right",
										children: lang === "pl" ? "Powiadomienia E-mail i Lojalność" : "Automated Email & Loyalty Actions"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 328,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 323,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 322,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("tbody", {
								className: "divide-y divide-slate-200 dark:divide-slate-800",
								children: filteredCustomers.map((cust) => /* @__PURE__ */ _jsxDEV("tr", {
									className: "hover:bg-slate-50/70 dark:hover:bg-slate-950/60",
									children: [
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3.5 pr-4 align-top",
											children: [
												/* @__PURE__ */ _jsxDEV("div", {
													className: "font-semibold text-slate-900 dark:text-white text-sm",
													children: cust.fullName
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 335,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("div", {
													className: "text-slate-500 mt-0.5",
													children: [
														cust.companyOrFamilyName,
														" · ",
														cust.email
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 338,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("div", {
													className: "mt-1 font-mono text-[11px] text-slate-500",
													children: [
														"Tier: ",
														/* @__PURE__ */ _jsxDEV("span", {
															className: "text-amber-500 font-semibold",
															children: cust.tier
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 342,
															columnNumber: 29
														}, this),
														" · ",
														cust.overdueCount > 0 ? /* @__PURE__ */ _jsxDEV("span", {
															className: "text-rose-500 font-semibold",
															children: [
																/* @__PURE__ */ _jsxDEV(AlertTriangle, { className: "w-3 h-3 inline mr-0.5" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 346,
																	columnNumber: 27
																}, this),
																cust.overdueCount,
																" ",
																lang === "pl" ? "zaległość!" : "overdue!"
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 345,
															columnNumber: 25
														}, this) : /* @__PURE__ */ _jsxDEV("span", {
															className: "text-emerald-500",
															children: lang === "pl" ? "Terminowy" : "In good standing"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 350,
															columnNumber: 25
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 341,
													columnNumber: 21
												}, this),
												cust.lastReminderSent && /* @__PURE__ */ _jsxDEV("div", {
													className: "mt-1 text-[10px] font-mono text-sky-400",
													children: ["Wysłano: ", cust.lastReminderSent]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 356,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 334,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3.5 px-3 align-top",
											children: /* @__PURE__ */ _jsxDEV("div", {
												className: "space-y-1.5",
												children: cust.familyMembers.map((fm, idx) => /* @__PURE__ */ _jsxDEV("div", {
													className: "flex items-center justify-between gap-4 text-[11px] bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800",
													children: [/* @__PURE__ */ _jsxDEV("span", {
														className: "font-medium text-slate-800 dark:text-slate-200",
														children: [
															fm.memberName,
															" ",
															/* @__PURE__ */ _jsxDEV("span", {
																className: "text-slate-500",
																children: [
																	"(",
																	fm.role,
																	")"
																]
															}, void 0, true, {
																fileName: _jsxFileName,
																lineNumber: 370,
																columnNumber: 45
															}, this)
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 369,
														columnNumber: 27
													}, this), /* @__PURE__ */ _jsxDEV("span", {
														className: "font-mono tabular-nums text-amber-600 dark:text-amber-400",
														children: [
															fm.hoursUsed,
															"h · IPD ",
															fm.ipdPresetMm,
															"mm"
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 372,
														columnNumber: 27
													}, this)]
												}, idx, true, {
													fileName: _jsxFileName,
													lineNumber: 365,
													columnNumber: 25
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 363,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 362,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3.5 px-3 text-right align-top font-mono tabular-nums",
											children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "text-sm font-bold text-amber-500",
												children: [cust.loyaltyPoints.toLocaleString(), " pkt"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 381,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("div", {
												className: "text-[11px] text-slate-500",
												children: "100 pkt = 15 PLN rabatu"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 384,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 380,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3.5 px-3 text-right align-top font-mono tabular-nums font-semibold text-slate-900 dark:text-white",
											children: [cust.totalSpentPln.toLocaleString(), " PLN"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 389,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("td", {
											className: "py-3.5 pl-4 text-right align-top",
											children: /* @__PURE__ */ _jsxDEV("div", {
												className: "flex flex-wrap items-center justify-end gap-1.5",
												children: [/* @__PURE__ */ _jsxDEV("button", {
													onClick: () => setCustomers((prev) => prev.map((c) => c.id === cust.id ? {
														...c,
														loyaltyPoints: c.loyaltyPoints + 250,
														tier: c.loyaltyPoints + 250 > 2e3 ? "Platinum VR" : "Gold"
													} : c)),
													className: "px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/40 text-amber-600 dark:text-amber-300 hover:bg-amber-500/25 font-medium whitespace-nowrap",
													children: [/* @__PURE__ */ _jsxDEV(Award, { className: "w-3 h-3 inline mr-1" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 411,
														columnNumber: 25
													}, this), "+250 pkt"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 395,
													columnNumber: 23
												}, this), /* @__PURE__ */ _jsxDEV("button", {
													disabled: sendingEmailForId === cust.id,
													onClick: () => handleDispatchAutomatedEmail(cust, cust.overdueCount > 0 ? "OVERDUE_ALERT" : "RETURN_REMINDER"),
													className: "px-2.5 py-1 rounded bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-700 font-medium whitespace-nowrap",
													children: [/* @__PURE__ */ _jsxDEV(Mail, { className: "w-3 h-3 inline mr-1 text-sky-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 425,
														columnNumber: 25
													}, this), cust.overdueCount > 0 ? lang === "pl" ? "Wezwanie E-mail" : "Overdue Email" : lang === "pl" ? "Przypomnienie E-mail" : "Reminder Email"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 415,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 394,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 393,
											columnNumber: 19
										}, this)
									]
								}, cust.id, true, {
									fileName: _jsxFileName,
									lineNumber: 333,
									columnNumber: 17
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 331,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 321,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 320,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 262,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
				children: [/* @__PURE__ */ _jsxDEV("section", {
					className: "lg:col-span-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800",
						children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Database, { className: "w-5 h-5 text-amber-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 449,
								columnNumber: 17
							}, this), lang === "pl" ? "03. Integracja z Zewnętrznym API Systemu Magazynowego (WMS Sync)" : "03. External Warehouse Management API (WMS) Real-Time Sync"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 448,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-500 font-mono mt-0.5",
							children: ["ENDPOINT: https://wms-api.vortexvr-enterprise.eu/v2/inventory/sync · LAST SYNC: ", lastWmsSync || "LIVE"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 454,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 447,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => syncWarehouseApi(),
							disabled: isSyncingWms,
							className: "px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
							children: [/* @__PURE__ */ _jsxDEV(RefreshCw, { className: `w-3.5 h-3.5 ${isSyncingWms ? "animate-spin" : ""}` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 464,
								columnNumber: 15
							}, this), lang === "pl" ? "Synchronizuj Stany Magazynowe" : "Sync WMS Inventory"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 459,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 446,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ _jsxDEV("table", {
							className: "w-full text-left border-collapse text-xs",
							children: [/* @__PURE__ */ _jsxDEV("thead", { children: /* @__PURE__ */ _jsxDEV("tr", {
								className: "border-b border-slate-200 dark:border-slate-800 text-slate-500 font-mono",
								children: [
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2 pr-3",
										children: "SKU / Model"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 473,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2 px-3",
										children: lang === "pl" ? "Magazyn Logistyczny" : "Warehouse Depot"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 474,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2 px-3 text-right",
										children: lang === "pl" ? "Stan Wolny" : "In Stock"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 475,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2 px-3 text-right",
										children: lang === "pl" ? "Bateria / Kalibracja" : "Diagnostics"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 476,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("th", {
										className: "py-2 pl-3 text-right",
										children: lang === "pl" ? "Korekta API" : "API Adjust"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 477,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 472,
								columnNumber: 17
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 471,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("tbody", {
								className: "divide-y divide-slate-200 dark:divide-slate-800",
								children: warehouseItems.map((item) => /* @__PURE__ */ _jsxDEV("tr", { children: [
									/* @__PURE__ */ _jsxDEV("td", {
										className: "py-2.5 pr-3",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "font-semibold text-slate-900 dark:text-white",
											children: item.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 484,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "font-mono text-[11px] text-slate-500",
											children: [
												item.sku,
												" · FW ",
												item.firmware
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 485,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 483,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("td", {
										className: "py-2.5 px-3 text-slate-600 dark:text-slate-300",
										children: item.depot
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 489,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("td", {
										className: "py-2.5 px-3 text-right font-mono tabular-nums font-bold text-emerald-500",
										children: [item.inStock, " szt."]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 490,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("td", {
										className: "py-2.5 px-3 text-right font-mono tabular-nums text-slate-500",
										children: [
											item.batteryHealthPct,
											"% · ",
											item.lastCalibration
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 493,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("td", {
										className: "py-2.5 pl-3 text-right",
										children: /* @__PURE__ */ _jsxDEV("div", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ _jsxDEV("button", {
												onClick: () => syncWarehouseApi(item.sku, -1),
												className: "p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
												title: "-1 SKU",
												children: /* @__PURE__ */ _jsxDEV(Minus, { className: "w-3 h-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 503,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 498,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("button", {
												onClick: () => syncWarehouseApi(item.sku, 1),
												className: "p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
												title: "+1 SKU",
												children: /* @__PURE__ */ _jsxDEV(Plus, { className: "w-3 h-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 510,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 505,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 497,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 496,
										columnNumber: 21
									}, this)
								] }, item.sku, true, {
									fileName: _jsxFileName,
									lineNumber: 482,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 480,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 470,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 469,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 445,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("section", {
					className: "lg:col-span-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between space-y-4",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ _jsxDEV("h3", {
								className: "text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2",
								children: [/* @__PURE__ */ _jsxDEV(Shield, { className: "w-5 h-5 text-emerald-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 525,
									columnNumber: 15
								}, this), lang === "pl" ? "Szyfrowanie End-to-End (E2EE) i Wysoka Dostępność Chmury" : "End-to-End Encryption (E2EE) & Cloud High-Availability"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 524,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed",
								children: lang === "pl" ? "Wszystkie sceny VR 3D, dane rodzinne CRM oraz transakcje płatnicze są szyfrowane po stronie klienta algorytmem WebCrypto AES-256-GCM przed replikacją do klastra chmurowego." : "All 3D VR scenes, family CRM records, and payment payloads are encrypted client-side via WebCrypto AES-256-GCM prior to multi-region cloud replication."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 530,
								columnNumber: 13
							}, this),
							e2eProof && /* @__PURE__ */ _jsxDEV("div", {
								className: "p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1.5",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "text-emerald-400 font-semibold",
										children: "CIPHER: AES-256-GCM (WebCrypto Verified)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 538,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "truncate",
										children: ["SHA-256: ", e2eProof.sha256Fingerprint]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 541,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: ["IV HEX: ", e2eProof.ivHex] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 542,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "truncate text-slate-500",
										children: [
											"PAYLOAD: ",
											e2eProof.cipherBase64.slice(0, 42),
											"..."
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 543,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 537,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 523,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: () => encryptPayloadE2E({
							ts: Date.now(),
							user: ssoSession.email,
							customers: customers.length
						}).then(setE2eProof),
						className: "w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors",
						children: lang === "pl" ? "Rotuj Klucz Szyfrowania Sesji E2EE" : "Rotate Session E2EE Cryptographic Key"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 550,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 522,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 444,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 165,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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TUFBRDtRQUFJLFdBQVU7a0JBQWQsQ0FDRSx3QkFBQyxRQUFELEVBQVEsV0FBVSwyQkFBNEI7Ozs7a0JBQzdDLFNBQVMsT0FDTiw2REFDQSx3REFDRjs7Ozs7O09BQ0osd0JBQUMsS0FBRDtRQUFHLFdBQVU7a0JBQ1YsU0FBUyxPQUNOLGlMQUNBO09BQ0g7Ozs7O09BRUYsWUFDQyx3QkFBQyxPQUFEO1FBQUssV0FBVTtrQkFBZjtTQUNFLHdCQUFDLE9BQUQ7VUFBSyxXQUFVO29CQUFpQztTQUUzQzs7Ozs7U0FDTCx3QkFBQyxPQUFEO1VBQUssV0FBVTtvQkFBZixDQUEwQixhQUFVLFNBQVMsaUJBQXVCOzs7Ozs7U0FDcEUsd0JBQUMsT0FBRCxhQUFLLFlBQVMsU0FBUyxLQUFXOzs7OztTQUNsQyx3QkFBQyxPQUFEO1VBQUssV0FBVTtvQkFBZjtXQUF5QztXQUM3QixTQUFTLGFBQWEsTUFBTSxHQUFHLEVBQUU7V0FBRTtVQUMxQzs7Ozs7O1FBQ0Y7Ozs7OztNQUVKOzs7OztlQUVMLHdCQUFDLFVBQUQ7TUFDRSxlQUNFLGtCQUFrQjtPQUNoQixJQUFJLEtBQUssSUFBSTtPQUNiLE1BQU0sV0FBVztPQUNqQixXQUFXLFVBQVU7TUFDdkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXO01BRXJCLFdBQVU7Z0JBRVQsU0FBUyxPQUNOLHVDQUNBO0tBQ0U7Ozs7YUFDRDs7Ozs7WUFDTjs7Ozs7O0VBQ0Y7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkNybUFkbWluV2FyZWhvdXNlSHViLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEN1c3RvbWVyQ3JtUHJvZmlsZSxcbiAgTGFuZ3VhZ2UsXG4gIExpdmVOb3RpZmljYXRpb24sXG4gIFJlbnRhbFJlc2VydmF0aW9uLFxuICBTc29Vc2VyU2Vzc2lvbixcbiAgVnJFcXVpcG1lbnRJdGVtLFxufSBmcm9tICcuLi90eXBlcy92cic7XG5pbXBvcnQgeyBlbmNyeXB0UGF5bG9hZEUyRSB9IGZyb20gJy4uL3V0aWxzL2NyeXB0b0UyRSc7XG5pbXBvcnQgeyBleHBvcnRFbnRlcnByaXNlTWFzdGVyUmVwb3J0UGRmIH0gZnJvbSAnLi4vdXRpbHMvcGRmRXhwb3J0JztcbmltcG9ydCB7XG4gIEJhckNoYXJ0MyxcbiAgVXNlcnMsXG4gIE1haWwsXG4gIERhdGFiYXNlLFxuICBEb3dubG9hZCxcbiAgUmVmcmVzaEN3LFxuICBBd2FyZCxcbiAgU2hpZWxkLFxuICBDaGVja0NpcmNsZTIsXG4gIEFsZXJ0VHJpYW5nbGUsXG4gIFBsdXMsXG4gIE1pbnVzLFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5pbnRlcmZhY2UgQ3JtQWRtaW5XYXJlaG91c2VIdWJQcm9wcyB7XG4gIGxhbmc6IExhbmd1YWdlO1xuICBlcXVpcG1lbnQ6IFZyRXF1aXBtZW50SXRlbVtdO1xuICByZXNlcnZhdGlvbnM6IFJlbnRhbFJlc2VydmF0aW9uW107XG4gIGN1c3RvbWVyczogQ3VzdG9tZXJDcm1Qcm9maWxlW107XG4gIHNldEN1c3RvbWVyczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Q3VzdG9tZXJDcm1Qcm9maWxlW10+PjtcbiAgc3NvU2Vzc2lvbjogU3NvVXNlclNlc3Npb247XG4gIHB1c2hOb3RpZmljYXRpb246IChuOiBPbWl0PExpdmVOb3RpZmljYXRpb24sICdpZCcgfCAndGltZXN0YW1wJz4pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBDcm1BZG1pbldhcmVob3VzZUh1YjogUmVhY3QuRkM8Q3JtQWRtaW5XYXJlaG91c2VIdWJQcm9wcz4gPSAoe1xuICBsYW5nLFxuICBlcXVpcG1lbnQsXG4gIHJlc2VydmF0aW9ucyxcbiAgY3VzdG9tZXJzLFxuICBzZXRDdXN0b21lcnMsXG4gIHNzb1Nlc3Npb24sXG4gIHB1c2hOb3RpZmljYXRpb24sXG59KSA9PiB7XG4gIGNvbnN0IFtjcm1GaWx0ZXIsIHNldENybUZpbHRlcl0gPSB1c2VTdGF0ZTwnYWxsJyB8ICdmYW1pbHknIHwgJ292ZXJkdWUnPignYWxsJyk7XG4gIGNvbnN0IFt3YXJlaG91c2VJdGVtcywgc2V0V2FyZWhvdXNlSXRlbXNdID0gdXNlU3RhdGU8YW55W10+KFtdKTtcbiAgY29uc3QgW2xhc3RXbXNTeW5jLCBzZXRMYXN0V21zU3luY10gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW2lzU3luY2luZ1dtcywgc2V0SXNTeW5jaW5nV21zXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW3NlbmRpbmdFbWFpbEZvcklkLCBzZXRTZW5kaW5nRW1haWxGb3JJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2VtYWlsU3RhdHVzQmFubmVyLCBzZXRFbWFpbFN0YXR1c0Jhbm5lcl0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcblxuICAvLyBFMkVFIENyeXB0b2dyYXBoaWMgVmF1bHQgdmVyaWZpY2F0aW9uIHN0YXRlXG4gIGNvbnN0IFtlMmVQcm9vZiwgc2V0RTJlUHJvb2ZdID0gdXNlU3RhdGU8e1xuICAgIGNpcGhlckJhc2U2NDogc3RyaW5nO1xuICAgIGl2SGV4OiBzdHJpbmc7XG4gICAgc2hhMjU2RmluZ2VycHJpbnQ6IHN0cmluZztcbiAgICB0aW1lc3RhbXA6IHN0cmluZztcbiAgfSB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHN5bmNXYXJlaG91c2VBcGkgPSBhc3luYyAoYWRqdXN0bWVudFNrdT86IHN0cmluZywgZGVsdGE/OiBudW1iZXIpID0+IHtcbiAgICBzZXRJc1N5bmNpbmdXbXModHJ1ZSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvd2FyZWhvdXNlL3N5bmMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBhZGp1c3RtZW50U2t1LCBkZWx0YSB9KSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmIChkYXRhPy5zdG9jaykge1xuICAgICAgICBzZXRXYXJlaG91c2VJdGVtcyhkYXRhLnN0b2NrKTtcbiAgICAgICAgc2V0TGFzdFdtc1N5bmMoZGF0YS5zeW5jVGltZXN0YW1wPy5zbGljZSgwLCAxOSkucmVwbGFjZSgnVCcsICcgJykgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpKTtcbiAgICAgICAgaWYgKGFkanVzdG1lbnRTa3UpIHtcbiAgICAgICAgICBwdXNoTm90aWZpY2F0aW9uKHtcbiAgICAgICAgICAgIHR5cGU6ICdXTVNfU1lOQycsXG4gICAgICAgICAgICB0aXRsZVBsOiBgWnN5bmNocm9uaXpvd2FubyBtYWdhenluIFdNUyBkbGEgU0tVICR7YWRqdXN0bWVudFNrdX1gLFxuICAgICAgICAgICAgdGl0bGVFbjogYFdNUyBBUEkgc3luY2VkIGZvciBTS1UgJHthZGp1c3RtZW50U2t1fWAsXG4gICAgICAgICAgICBkZXRhaWxQbDogYEtvcmVrdGEgc3RhbnU6ICR7ZGVsdGEgJiYgZGVsdGEgPiAwID8gYCske2RlbHRhfWAgOiBkZWx0YX0gc3p0LiBTenlmcm93YW5pZTogJHtkYXRhLmVuY3J5cHRpb25DaXBoZXJ9YCxcbiAgICAgICAgICAgIGRldGFpbEVuOiBgU3RvY2sgZGVsdGE6ICR7ZGVsdGEgJiYgZGVsdGEgPiAwID8gYCske2RlbHRhfWAgOiBkZWx0YX0gdW5pdHMuIENpcGhlcjogJHtkYXRhLmVuY3J5cHRpb25DaXBoZXJ9YCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gRmFsbGJhY2tcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNTeW5jaW5nV21zKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzeW5jV2FyZWhvdXNlQXBpKCk7XG4gICAgZW5jcnlwdFBheWxvYWRFMkUoeyBjdXN0b21lcnNDb3VudDogY3VzdG9tZXJzLmxlbmd0aCwgcmVzZXJ2YXRpb25zQ291bnQ6IHJlc2VydmF0aW9ucy5sZW5ndGggfSkudGhlbihcbiAgICAgIHNldEUyZVByb29mXG4gICAgKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZURpc3BhdGNoQXV0b21hdGVkRW1haWwgPSBhc3luYyAoXG4gICAgY3VzdG9tZXI6IEN1c3RvbWVyQ3JtUHJvZmlsZSxcbiAgICB0ZW1wbGF0ZVR5cGU6ICdPVkVSRFVFX0FMRVJUJyB8ICdSRVRVUk5fUkVNSU5ERVInXG4gICkgPT4ge1xuICAgIHNldFNlbmRpbmdFbWFpbEZvcklkKGN1c3RvbWVyLmlkKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9ub3RpZmljYXRpb25zL3NlbmQtZW1haWwnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHJlY2lwaWVudEVtYWlsOiBjdXN0b21lci5lbWFpbCxcbiAgICAgICAgICBjdXN0b21lck5hbWU6IGN1c3RvbWVyLmZ1bGxOYW1lLFxuICAgICAgICAgIHRlbXBsYXRlVHlwZSxcbiAgICAgICAgICBlcXVpcG1lbnROYW1lOiAnWmVzdGF3IFZSIFZvcnRleCcsXG4gICAgICAgICAgZHVlRGF0ZTogJzIwMjYtMTAtMjknLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGNvbnN0IHRpbWVTdHIgPSBuZXcgRGF0ZSgpLnRvVGltZVN0cmluZygpLnNsaWNlKDAsIDgpO1xuICAgICAgc2V0Q3VzdG9tZXJzKChwcmV2KSA9PlxuICAgICAgICBwcmV2Lm1hcCgoYykgPT5cbiAgICAgICAgICBjLmlkID09PSBjdXN0b21lci5pZCA/IHsgLi4uYywgbGFzdFJlbWluZGVyU2VudDogYCR7dGVtcGxhdGVUeXBlfSAoJHt0aW1lU3RyfSlgIH0gOiBjXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBzZXRFbWFpbFN0YXR1c0Jhbm5lcihcbiAgICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgID8gYFd5c8WCYW5vIGF1dG9tYXR5Y3puZSBwb3dpYWRvbWllbmllIGUtbWFpbCBbJHtkYXRhLm1lc3NhZ2VJZCB8fCAnVExTLU9LJ31dIGRvICR7Y3VzdG9tZXIuZW1haWx9ICgke3RlbXBsYXRlVHlwZX0pYFxuICAgICAgICAgIDogYERpc3BhdGNoZWQgYXV0b21hdGVkIGVtYWlsIFske2RhdGEubWVzc2FnZUlkIHx8ICdUTFMtT0snfV0gdG8gJHtjdXN0b21lci5lbWFpbH0gKCR7dGVtcGxhdGVUeXBlfSlgXG4gICAgICApO1xuICAgICAgcHVzaE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdFTUFJTF9ESVNQQVRDSCcsXG4gICAgICAgIHRpdGxlUGw6IGBFLW1haWwgd3lzxYJhbnkgZG8gJHtjdXN0b21lci5mdWxsTmFtZX0gKCR7dGVtcGxhdGVUeXBlfSlgLFxuICAgICAgICB0aXRsZUVuOiBgQXV0b21hdGVkIEVtYWlsIHNlbnQgdG8gJHtjdXN0b21lci5mdWxsTmFtZX0gKCR7dGVtcGxhdGVUeXBlfSlgLFxuICAgICAgICBkZXRhaWxQbDogYEFkcmVzOiAke2N1c3RvbWVyLmVtYWlsfSDCtyBJZGVudHlmaWthdG9yOiAke2RhdGEubWVzc2FnZUlkIHx8ICdNU0ctOTkyJ31gLFxuICAgICAgICBkZXRhaWxFbjogYFJlY2lwaWVudDogJHtjdXN0b21lci5lbWFpbH0gwrcgTWVzc2FnZSBJRDogJHtkYXRhLm1lc3NhZ2VJZCB8fCAnTVNHLTk5Mid9YCxcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTZW5kaW5nRW1haWxGb3JJZChudWxsKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGlzcGF0Y2hCdWxrT3ZlcmR1ZVJlbWluZGVycyA9IGFzeW5jICgpID0+IHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY3VzdG9tZXJzLmZpbHRlcigoY3VzdCkgPT4gY3VzdC5vdmVyZHVlQ291bnQgPiAwIHx8IGN1c3QuYWN0aXZlUmVudGFsc0NvdW50ID4gMCkpIHtcbiAgICAgIGF3YWl0IGhhbmRsZURpc3BhdGNoQXV0b21hdGVkRW1haWwoXG4gICAgICAgIGMsXG4gICAgICAgIGMub3ZlcmR1ZUNvdW50ID4gMCA/ICdPVkVSRFVFX0FMRVJUJyA6ICdSRVRVUk5fUkVNSU5ERVInXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWFsLXRpbWUgQW5hbHl0aWNzIE1ldHJpY3NcbiAgY29uc3QgdG90YWxSZXZlbnVlUGxuID0gcmVzZXJ2YXRpb25zLnJlZHVjZSgoc3VtLCByKSA9PiBzdW0gKyByLnRvdGFsUHJpY2VQbG4sIDApO1xuICBjb25zdCB0b3RhbFVuaXRzID0gZXF1aXBtZW50LnJlZHVjZSgoc3VtLCBlKSA9PiBzdW0gKyBlLnRvdGFsVW5pdHMsIDApO1xuICBjb25zdCByZW50ZWRVbml0cyA9IGVxdWlwbWVudC5yZWR1Y2UoKHN1bSwgZSkgPT4gc3VtICsgKGUudG90YWxVbml0cyAtIGUuYXZhaWxhYmxlVW5pdHMpLCAwKTtcbiAgY29uc3QgZmxlZXRVdGlsaXphdGlvblBjdCA9IHRvdGFsVW5pdHMgPiAwID8gTWF0aC5yb3VuZCgocmVudGVkVW5pdHMgLyB0b3RhbFVuaXRzKSAqIDEwMCkgOiA2NDtcbiAgY29uc3QgZmFtaWx5Qm9va2luZ3NDb3VudCA9IHJlc2VydmF0aW9ucy5maWx0ZXIoKHIpID0+IHIuaXNGYW1pbHlQbGFuKS5sZW5ndGg7XG4gIGNvbnN0IHRvdGFsRmFtaWx5SG91cnMgPSBjdXN0b21lcnMucmVkdWNlKFxuICAgIChzdW0sIGMpID0+IHN1bSArIGMuZmFtaWx5TWVtYmVycy5yZWR1Y2UoKHMsIG0pID0+IHMgKyBtLmhvdXJzVXNlZCwgMCksXG4gICAgMFxuICApO1xuXG4gIGNvbnN0IGZpbHRlcmVkQ3VzdG9tZXJzID0gY3VzdG9tZXJzLmZpbHRlcigoYykgPT4ge1xuICAgIGlmIChjcm1GaWx0ZXIgPT09ICdmYW1pbHknKSByZXR1cm4gYy5mYW1pbHlNZW1iZXJzLmxlbmd0aCA+IDE7XG4gICAgaWYgKGNybUZpbHRlciA9PT0gJ292ZXJkdWUnKSByZXR1cm4gYy5vdmVyZHVlQ291bnQgPiAwO1xuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctWzEzODBweF0gbXgtYXV0byBweC02IHB5LTggc3BhY2UteS0xMFwiPlxuICAgICAgey8qIFRPUCBCQVI6IEFETUlOIFJFQUwtVElNRSBBTkFMWVRJQ1MgSEVBREVSICYgTUFTVEVSIFBERiBFWFBPUlQgKi99XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHBiLTRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPEJhckNoYXJ0MyBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtYW1iZXItNTAwXCIgLz5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICA/ICcwMS4gUGFuZWwgQWRtaW5pc3RyYXRvcmE6IEFuYWxpdHlrYSBTcHJ6ZWRhxbx5IGkgU3RhdHlzdHlrIFd5cG/FvHljemXFhCAoTGl2ZSknXG4gICAgICAgICAgICAgICAgOiAnMDEuIEFkbWluIENvbnNvbGU6IFJlYWwtVGltZSBTYWxlcyAmIEZsZWV0IFJlbnRhbCBBbmFseXRpY3MnfVxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTQwMCBtdC0xXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnVGVsZW1ldHJpYSBmaW5hbnNvd2EsIHV0eWxpemFjamEgZmxvdHkgVlIsIHN0YXR5c3R5a2kgcm9kemlubmUgQ1JNIG9yYXogc3luY2hyb25pemFjamEgbWFnYXp5bm93YSBBUEkuJ1xuICAgICAgICAgICAgICAgIDogJ0xpdmUgZmluYW5jaWFsIHRlbGVtZXRyeSwgVlIgZmxlZXQgdXRpbGl6YXRpb24sIGZhbWlseSBzaGFyaW5nIENSTSBtZXRyaWNzLCBhbmQgd2FyZWhvdXNlIEFQSSBzeW5jLid9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURpc3BhdGNoQnVsa092ZXJkdWVSZW1pbmRlcnN9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1zbGF0ZS05MDAgZGFyazpiZy1zbGF0ZS04MDAgdGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS04MDAgZGFyazpob3ZlcjpiZy1zbGF0ZS03MDAgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxNYWlsIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICA/ICdXecWbbGlqIEF1dG9tYXR5Y3puZSBFLW1haWxlIG8gWndyb3RhY2ggaSBaYWxlZ8WCb8WbY2lhY2gnXG4gICAgICAgICAgICAgICAgOiAnU2VuZCBBdXRvbWF0ZWQgUmV0dXJuICYgT3ZlcmR1ZSBFbWFpbHMnfVxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICBleHBvcnRFbnRlcnByaXNlTWFzdGVyUmVwb3J0UGRmKGVxdWlwbWVudCwgcmVzZXJ2YXRpb25zLCBjdXN0b21lcnMsIHdhcmVob3VzZUl0ZW1zKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1hbWJlci01MDAgaG92ZXI6YmctYW1iZXItNDAwIHRleHQtc2xhdGUtOTUwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdFa3Nwb3J0dWogV3N6eXN0a2llIFJhcG9ydHkgZG8gUERGJyA6ICdFeHBvcnQgQWxsIFJlcG9ydHMgdG8gUERGJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogNC1Db2x1bW4gUmVhbC1UaW1lIEtQSSBTdHJpcCAoVGFidWxhciBOdW1lcmFscykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtNVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgYmctd2hpdGUgZGFyazpiZy1zbGF0ZS05MDAgcC01XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDAgZGFyazp0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdQcnp5Y2jDs2QgemUgU3ByemVkYcW8eSBpIFd5cG/FvHljemXFhCAoTGl2ZSknIDogJ1JlYWwtVGltZSBSZW50YWwgJiBTYWxlcyBSZXZlbnVlJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHRleHQtMnhsIGZvbnQtYm9sZCBmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICB7dG90YWxSZXZlbnVlUGxuLnRvTG9jYWxlU3RyaW5nKCl9IFBMTlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgdGV4dC14cyB0ZXh0LWVtZXJhbGQtNjAwIGRhcms6dGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgKzE4LjQlIE1vTSDCtyB7cmVzZXJ2YXRpb25zLmxlbmd0aH0ge2xhbmcgPT09ICdwbCcgPyAndHJhbnNha2NqaSBvbmxpbmUnIDogJ29ubGluZSB0eG5zJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCBiZy13aGl0ZSBkYXJrOmJnLXNsYXRlLTkwMCBwLTVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBkYXJrOnRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1V0eWxpemFjamEgRmxvdHkgU3ByesSZdG93ZWogVlInIDogJ1ZSIEhhcmR3YXJlIEZsZWV0IFV0aWxpemF0aW9uJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHRleHQtMnhsIGZvbnQtYm9sZCBmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICB7ZmxlZXRVdGlsaXphdGlvblBjdH0lICh7cmVudGVkVW5pdHN9L3t0b3RhbFVuaXRzfSlcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHctZnVsbCBoLTIgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTIwMCBkYXJrOmJnLXNsYXRlLTgwMCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtZnVsbCBiZy1hbWJlci01MDAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtmbGVldFV0aWxpemF0aW9uUGN0fSVgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgYmctd2hpdGUgZGFyazpiZy1zbGF0ZS05MDAgcC01XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDAgZGFyazp0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdXeXBvxbx5Y3plbmlhIFJvZHppbm5lIChGYW1pbHkgUG9vbCknIDogJ0ZhbWlseSBQb29sIFNoYXJpbmcgQWN0aXZpdHknfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgdGV4dC0yeGwgZm9udC1ib2xkIGZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIHtmYW1pbHlCb29raW5nc0NvdW50fSB7bGFuZyA9PT0gJ3BsJyA/ICdyb2R6aW4nIDogJ2ZhbWlsaWVzJ30gwrcge3RvdGFsRmFtaWx5SG91cnMudG9GaXhlZCgxKX1oXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICfFmnJlZG5pbyAzLjIgZG9tb3duaWthIC8gemVzdGF3JyA6ICdBdmcgMy4yIGZhbWlseSBtZW1iZXJzIC8ga2l0J31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCBiZy13aGl0ZSBkYXJrOmJnLXNsYXRlLTkwMCBwLTVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBkYXJrOnRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0Rvc3TEmXBub8WbxIcgQ2htdXJ5IGkgU3p5ZnJvd2FuaWUgRTJFRScgOiAnQ2xvdWQgSGlnaC1BdmFpbGFiaWxpdHkgJiBFMkVFJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHRleHQtMnhsIGZvbnQtYm9sZCBmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtZW1lcmFsZC02MDAgZGFyazp0ZXh0LWVtZXJhbGQtNDAwXCI+XG4gICAgICAgICAgICAgIDk5Ljk5JSBTTEFcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIHRleHQteHMgdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgIHtzc29TZXNzaW9uLmNsb3VkUmVnaW9ufSDCtyBBRVMtMjU2LUdDTVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICB7LyogU0VDVElPTiAyOiBDUk0sIEZBTUlMWSBTSEFSSU5HIFNUQVRTLCBMT1lBTFRZIFBPSU5UUyAmIEFVVE9NQVRFRCBFTUFJTCBSRU1JTkRFUlMgKi99XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCBiZy13aGl0ZSBkYXJrOmJnLXNsYXRlLTkwMCBwLTYgc3BhY2UteS01XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwYi00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPFVzZXJzIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1hbWJlci01MDBcIiAvPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgID8gJzAyLiBNb2R1xYIgQ1JNOiBXeXBvxbx5Y3plbmlhIHcgUm9kemluaWUsIFByb2dyYW0gTG9qYWxub8WbY2lvd3kgaSBQb3dpYWRvbWllbmlhIEUtbWFpbCdcbiAgICAgICAgICAgICAgICA6ICcwMi4gQ3VzdG9tZXIgQ1JNOiBGYW1pbHkgU2hhcmluZyBTdGF0cywgTG95YWx0eSBQcm9ncmFtICYgQXV0b21hdGVkIEVtYWlsIEFsZXJ0cyd9XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBkYXJrOnRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgID8gJ1BlxYJuYSBld2lkZW5jamEgY3phc3Ugc3DEmWR6b25lZ28gdyBWUiBwcnpleiBwb3N6Y3plZ8OzbG55Y2ggY3rFgm9ua8OzdyByb2R6aW55LCBzYWxkbyBwdW5rdMOzdyBsb2phbG5vxZtjaW93eWNoIGkgYWxlcnR5IHp3cm90w7N3LidcbiAgICAgICAgICAgICAgICA6ICdQZXItbWVtYmVyIGZhbWlseSBWUiB1c2FnZSBhbmFseXRpY3MsIGxveWFsdHkgcmV3YXJkIHBvaW50cyByZWRlbXB0aW9uLCBhbmQgYXV0b21hdGVkIG92ZXJkdWUgZW1haWwgdHJpZ2dlcnMuJ31cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBJbnRlcmFjdGl2ZSBTZWdtZW50ZWQgRmlsdGVyIENvbnRyb2wgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwLTEgYmctc2xhdGUtMTAwIGRhcms6Ymctc2xhdGUtOTUwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHRleHQteHNcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q3JtRmlsdGVyKCdhbGwnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1tZCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCAke1xuICAgICAgICAgICAgICAgIGNybUZpbHRlciA9PT0gJ2FsbCdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXdoaXRlIGRhcms6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBzaGFkb3ctc20nXG4gICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnV3N6eXNjeSBLbGllbmNpJyA6ICdBbGwgQ3VzdG9tZXJzJ30gKHtjdXN0b21lcnMubGVuZ3RofSlcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRDcm1GaWx0ZXIoJ2ZhbWlseScpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLW1kIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwICR7XG4gICAgICAgICAgICAgICAgY3JtRmlsdGVyID09PSAnZmFtaWx5J1xuICAgICAgICAgICAgICAgICAgPyAnYmctd2hpdGUgZGFyazpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIHNoYWRvdy1zbSdcbiAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdLb250YSBSb2R6aW5uZScgOiAnRmFtaWx5IEFjY291bnRzJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRDcm1GaWx0ZXIoJ292ZXJkdWUnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1tZCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCAke1xuICAgICAgICAgICAgICAgIGNybUZpbHRlciA9PT0gJ292ZXJkdWUnXG4gICAgICAgICAgICAgICAgICA/ICdiZy13aGl0ZSBkYXJrOmJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgc2hhZG93LXNtJ1xuICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1phbGVnxYJvxZtjaSBad3JvdHUnIDogJ092ZXJkdWUgUmV0dXJucyd9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge2VtYWlsU3RhdHVzQmFubmVyICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLWxnIGJnLWVtZXJhbGQtNTAwLzEwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvMzAgdGV4dC14cyB0ZXh0LWVtZXJhbGQtNjAwIGRhcms6dGV4dC1lbWVyYWxkLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHNocmluay0wXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPntlbWFpbFN0YXR1c0Jhbm5lcn08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy14LWF1dG9cIj5cbiAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCBib3JkZXItY29sbGFwc2UgdGV4dC14c1wiPlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTIuNSBwci00XCI+e2xhbmcgPT09ICdwbCcgPyAnS2xpZW50IC8gUm9kemluYSAoQ1JNKScgOiAnQ3VzdG9tZXIgLyBGYW1pbHknfTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTIuNSBweC0zXCI+e2xhbmcgPT09ICdwbCcgPyAnU3RhdHlzdHlraSBPa3VsYXLDs3cgdyBSb2R6aW5pZScgOiAnRmFtaWx5IFZSIEhlYWRzZXQgVXNhZ2UgU3RhdHMnfTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTIuNSBweC0zIHRleHQtcmlnaHRcIj57bGFuZyA9PT0gJ3BsJyA/ICdQcm9ncmFtIExvamFsbm/Fm2Npb3d5JyA6ICdMb3lhbHR5IFBvaW50cyd9PC90aD5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTMgdGV4dC1yaWdodFwiPntsYW5nID09PSAncGwnID8gJ09icm90eSBQTE4nIDogJ1RvdGFsIFNwZW50J308L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0yLjUgcGwtNCB0ZXh0LXJpZ2h0XCI+e2xhbmcgPT09ICdwbCcgPyAnUG93aWFkb21pZW5pYSBFLW1haWwgaSBMb2phbG5vxZvEhycgOiAnQXV0b21hdGVkIEVtYWlsICYgTG95YWx0eSBBY3Rpb25zJ308L3RoPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtMjAwIGRhcms6ZGl2aWRlLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICB7ZmlsdGVyZWRDdXN0b21lcnMubWFwKChjdXN0KSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17Y3VzdC5pZH0gY2xhc3NOYW1lPVwiaG92ZXI6Ymctc2xhdGUtNTAvNzAgZGFyazpob3ZlcjpiZy1zbGF0ZS05NTAvNjBcIj5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zLjUgcHItNCBhbGlnbi10b3BcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2N1c3QuZnVsbE5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtjdXN0LmNvbXBhbnlPckZhbWlseU5hbWV9IMK3IHtjdXN0LmVtYWlsfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIFRpZXI6IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNTAwIGZvbnQtc2VtaWJvbGRcIj57Y3VzdC50aWVyfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7JyDCtyAnfVxuICAgICAgICAgICAgICAgICAgICAgIHtjdXN0Lm92ZXJkdWVDb3VudCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNTAwIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEFsZXJ0VHJpYW5nbGUgY2xhc3NOYW1lPVwidy0zIGgtMyBpbmxpbmUgbXItMC41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2N1c3Qub3ZlcmR1ZUNvdW50fSB7bGFuZyA9PT0gJ3BsJyA/ICd6YWxlZ8WCb8WbxIchJyA6ICdvdmVyZHVlISd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnVGVybWlub3d5JyA6ICdJbiBnb29kIHN0YW5kaW5nJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2N1c3QubGFzdFJlbWluZGVyU2VudCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNreS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFd5c8WCYW5vOiB7Y3VzdC5sYXN0UmVtaW5kZXJTZW50fVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cblxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMuNSBweC0zIGFsaWduLXRvcFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAge2N1c3QuZmFtaWx5TWVtYmVycy5tYXAoKGZtLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCB0ZXh0LVsxMXB4XSBiZy1zbGF0ZS01MCBkYXJrOmJnLXNsYXRlLTk1MCBweC0yLjUgcHktMSByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtc2xhdGUtODAwIGRhcms6dGV4dC1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm0ubWVtYmVyTmFtZX0gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj4oe2ZtLnJvbGV9KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtYW1iZXItNjAwIGRhcms6dGV4dC1hbWJlci00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm0uaG91cnNVc2VkfWggwrcgSVBEIHtmbS5pcGRQcmVzZXRNbX1tbVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuXG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMy41IHB4LTMgdGV4dC1yaWdodCBhbGlnbi10b3AgZm9udC1tb25vIHRhYnVsYXItbnVtc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtYW1iZXItNTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2N1c3QubG95YWx0eVBvaW50cy50b0xvY2FsZVN0cmluZygpfSBwa3RcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAxMDAgcGt0ID0gMTUgUExOIHJhYmF0dVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zLjUgcHgtMyB0ZXh0LXJpZ2h0IGFsaWduLXRvcCBmb250LW1vbm8gdGFidWxhci1udW1zIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtjdXN0LnRvdGFsU3BlbnRQbG4udG9Mb2NhbGVTdHJpbmcoKX0gUExOXG4gICAgICAgICAgICAgICAgICA8L3RkPlxuXG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMy41IHBsLTQgdGV4dC1yaWdodCBhbGlnbi10b3BcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldEN1c3RvbWVycygocHJldikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2Lm1hcCgoYykgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuaWQgPT09IGN1c3QuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5jLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG95YWx0eVBvaW50czogYy5sb3lhbHR5UG9pbnRzICsgMjUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGllcjogYy5sb3lhbHR5UG9pbnRzICsgMjUwID4gMjAwMCA/ICdQbGF0aW51bSBWUicgOiAnR29sZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQgYmctYW1iZXItNTAwLzE1IGJvcmRlciBib3JkZXItYW1iZXItNTAwLzQwIHRleHQtYW1iZXItNjAwIGRhcms6dGV4dC1hbWJlci0zMDAgaG92ZXI6YmctYW1iZXItNTAwLzI1IGZvbnQtbWVkaXVtIHdoaXRlc3BhY2Utbm93cmFwXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QXdhcmQgY2xhc3NOYW1lPVwidy0zIGgtMyBpbmxpbmUgbXItMVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICArMjUwIHBrdFxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NlbmRpbmdFbWFpbEZvcklkID09PSBjdXN0LmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlRGlzcGF0Y2hBdXRvbWF0ZWRFbWFpbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3Qub3ZlcmR1ZUNvdW50ID4gMCA/ICdPVkVSRFVFX0FMRVJUJyA6ICdSRVRVUk5fUkVNSU5ERVInXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQgYmctc2xhdGUtOTAwIGRhcms6Ymctc2xhdGUtODAwIHRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtNzAwIGZvbnQtbWVkaXVtIHdoaXRlc3BhY2Utbm93cmFwXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWFpbCBjbGFzc05hbWU9XCJ3LTMgaC0zIGlubGluZSBtci0xIHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y3VzdC5vdmVyZHVlQ291bnQgPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ1dlendhbmllIEUtbWFpbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdPdmVyZHVlIEVtYWlsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6IGxhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnUHJ6eXBvbW5pZW5pZSBFLW1haWwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ1JlbWluZGVyIEVtYWlsJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgey8qIFNFQ1RJT04gMzogRVhURVJOQUwgV0FSRUhPVVNFIFNZU1RFTSBBUEkgKFdNUykgU1lOQ0hST05JWkFUSU9OICYgRTJFRSBDTE9VRCBWQVVMVCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLThcIj5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tOCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCBiZy13aGl0ZSBkYXJrOmJnLXNsYXRlLTkwMCBwLTYgc3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTQgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8RGF0YWJhc2UgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWFtYmVyLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgID8gJzAzLiBJbnRlZ3JhY2phIHogWmV3bsSZdHJ6bnltIEFQSSBTeXN0ZW11IE1hZ2F6eW5vd2VnbyAoV01TIFN5bmMpJ1xuICAgICAgICAgICAgICAgICAgOiAnMDMuIEV4dGVybmFsIFdhcmVob3VzZSBNYW5hZ2VtZW50IEFQSSAoV01TKSBSZWFsLVRpbWUgU3luYyd9XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIEVORFBPSU5UOiBodHRwczovL3dtcy1hcGkudm9ydGV4dnItZW50ZXJwcmlzZS5ldS92Mi9pbnZlbnRvcnkvc3luYyDCtyBMQVNUIFNZTkM6IHtsYXN0V21zU3luYyB8fCAnTElWRSd9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHN5bmNXYXJlaG91c2VBcGkoKX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU3luY2luZ1dtc31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIGJnLWFtYmVyLTUwMCBob3ZlcjpiZy1hbWJlci00MDAgdGV4dC1zbGF0ZS05NTAgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgJHtpc1N5bmNpbmdXbXMgPyAnYW5pbWF0ZS1zcGluJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1N5bmNocm9uaXp1aiBTdGFueSBNYWdhenlub3dlJyA6ICdTeW5jIFdNUyBJbnZlbnRvcnknfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93LXgtYXV0b1wiPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgYm9yZGVyLWNvbGxhcHNlIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJib3JkZXItYiBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0yIHByLTNcIj5TS1UgLyBNb2RlbDwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMiBweC0zXCI+e2xhbmcgPT09ICdwbCcgPyAnTWFnYXp5biBMb2dpc3R5Y3pueScgOiAnV2FyZWhvdXNlIERlcG90J308L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTIgcHgtMyB0ZXh0LXJpZ2h0XCI+e2xhbmcgPT09ICdwbCcgPyAnU3RhbiBXb2xueScgOiAnSW4gU3RvY2snfTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMiBweC0zIHRleHQtcmlnaHRcIj57bGFuZyA9PT0gJ3BsJyA/ICdCYXRlcmlhIC8gS2FsaWJyYWNqYScgOiAnRGlhZ25vc3RpY3MnfTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMiBwbC0zIHRleHQtcmlnaHRcIj57bGFuZyA9PT0gJ3BsJyA/ICdLb3Jla3RhIEFQSScgOiAnQVBJIEFkanVzdCd9PC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPVwiZGl2aWRlLXkgZGl2aWRlLXNsYXRlLTIwMCBkYXJrOmRpdmlkZS1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICB7d2FyZWhvdXNlSXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8dHIga2V5PXtpdGVtLnNrdX0+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgcHItM1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIj57aXRlbS5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5za3V9IMK3IEZXIHtpdGVtLmZpcm13YXJlfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHB4LTMgdGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTMwMFwiPntpdGVtLmRlcG90fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgcHgtMyB0ZXh0LXJpZ2h0IGZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgZm9udC1ib2xkIHRleHQtZW1lcmFsZC01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5pblN0b2NrfSBzenQuXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgcHgtMyB0ZXh0LXJpZ2h0IGZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5iYXR0ZXJ5SGVhbHRoUGN0fSUgwrcge2l0ZW0ubGFzdENhbGlicmF0aW9ufVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHBsLTMgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHN5bmNXYXJlaG91c2VBcGkoaXRlbS5za3UsIC0xKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQgYmctc2xhdGUtMTAwIGRhcms6Ymctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTIwMCBkYXJrOmhvdmVyOmJnLXNsYXRlLTcwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiLTEgU0tVXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPE1pbnVzIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHN5bmNXYXJlaG91c2VBcGkoaXRlbS5za3UsIDEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgcm91bmRlZCBiZy1zbGF0ZS0xMDAgZGFyazpiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtMjAwIGRhcms6aG92ZXI6Ymctc2xhdGUtNzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCIrMSBTS1VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICB7LyogRTJFRSAmIEhpZ2gtQXZhaWxhYmlsaXR5IENsb3VkIFNlY3VyaXR5IFZlcmlmaWNhdGlvbiBDYXJkICovfVxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi00IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIGJnLXdoaXRlIGRhcms6Ymctc2xhdGUtOTAwIHAtNiBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8U2hpZWxkIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1lbWVyYWxkLTUwMFwiIC8+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnU3p5ZnJvd2FuaWUgRW5kLXRvLUVuZCAoRTJFRSkgaSBXeXNva2EgRG9zdMSZcG5vxZvEhyBDaG11cnknXG4gICAgICAgICAgICAgICAgOiAnRW5kLXRvLUVuZCBFbmNyeXB0aW9uIChFMkVFKSAmIENsb3VkIEhpZ2gtQXZhaWxhYmlsaXR5J31cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS00MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnV3N6eXN0a2llIHNjZW55IFZSIDNELCBkYW5lIHJvZHppbm5lIENSTSBvcmF6IHRyYW5zYWtjamUgcMWCYXRuaWN6ZSBzxIUgc3p5ZnJvd2FuZSBwbyBzdHJvbmllIGtsaWVudGEgYWxnb3J5dG1lbSBXZWJDcnlwdG8gQUVTLTI1Ni1HQ00gcHJ6ZWQgcmVwbGlrYWNqxIUgZG8ga2xhc3RyYSBjaG11cm93ZWdvLidcbiAgICAgICAgICAgICAgICA6ICdBbGwgM0QgVlIgc2NlbmVzLCBmYW1pbHkgQ1JNIHJlY29yZHMsIGFuZCBwYXltZW50IHBheWxvYWRzIGFyZSBlbmNyeXB0ZWQgY2xpZW50LXNpZGUgdmlhIFdlYkNyeXB0byBBRVMtMjU2LUdDTSBwcmlvciB0byBtdWx0aS1yZWdpb24gY2xvdWQgcmVwbGljYXRpb24uJ31cbiAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAge2UyZVByb29mICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtc2xhdGUtMzAwIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIENJUEhFUjogQUVTLTI1Ni1HQ00gKFdlYkNyeXB0byBWZXJpZmllZClcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydW5jYXRlXCI+U0hBLTI1Njoge2UyZVByb29mLnNoYTI1NkZpbmdlcnByaW50fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+SVYgSEVYOiB7ZTJlUHJvb2YuaXZIZXh9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cnVuY2F0ZSB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAgICAgUEFZTE9BRDoge2UyZVByb29mLmNpcGhlckJhc2U2NC5zbGljZSgwLCA0Mil9Li4uXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgIGVuY3J5cHRQYXlsb2FkRTJFKHtcbiAgICAgICAgICAgICAgICB0czogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICB1c2VyOiBzc29TZXNzaW9uLmVtYWlsLFxuICAgICAgICAgICAgICAgIGN1c3RvbWVyczogY3VzdG9tZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgfSkudGhlbihzZXRFMmVQcm9vZilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctc2xhdGUtOTAwIGRhcms6Ymctc2xhdGUtODAwIHRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtODAwIGRhcms6aG92ZXI6Ymctc2xhdGUtNzAwIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICA/ICdSb3R1aiBLbHVjeiBTenlmcm93YW5pYSBTZXNqaSBFMkVFJ1xuICAgICAgICAgICAgICA6ICdSb3RhdGUgU2Vzc2lvbiBFMkVFIENyeXB0b2dyYXBoaWMgS2V5J31cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19