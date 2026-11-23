const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/vortexvr/node_modules/.vite/deps/react.js?v=adc20043";
import { Calendar, CreditCard, Users, Bell, CheckCircle2, ShieldCheck, Plus } from "/apps/vortexvr/node_modules/.vite/deps/lucide-react.js?v=867ef266";
var _jsxFileName = "/app/applet/src/components/RentalCalendarAndFleet.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/apps/vortexvr/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=adc20043";
/**
* High-precision studio SVG hardware illustration (Zero-Broken-Image Policy)
*/
function HardwareStudioIllustration({ category }) {
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "w-full h-40 rounded-lg bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden p-4",
		children: [
			category === "headset" && /* @__PURE__ */ _jsxDEV("svg", {
				viewBox: "0 0 240 120",
				className: "w-44 h-28",
				children: [
					/* @__PURE__ */ _jsxDEV("defs", { children: /* @__PURE__ */ _jsxDEV("linearGradient", {
						id: "visorGrad",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "1",
						children: [
							/* @__PURE__ */ _jsxDEV("stop", {
								offset: "0%",
								stopColor: "#38BDF8",
								stopOpacity: "0.35"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 44,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("stop", {
								offset: "50%",
								stopColor: "#0F172A",
								stopOpacity: "0.95"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 45,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("stop", {
								offset: "100%",
								stopColor: "#F59E0B",
								stopOpacity: "0.4"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 46,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 43,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 42,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("path", {
						d: "M35 45 C35 25, 205 25, 205 45 L205 78 C205 95, 145 95, 120 82 C95 95, 35 95, 35 78 Z",
						fill: "url(#visorGrad)",
						stroke: "#94A3B8",
						strokeWidth: "2.5"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 49,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("path", {
						d: "M48 52 C85 42, 155 42, 192 52",
						stroke: "#F59E0B",
						strokeWidth: "2",
						fill: "none"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 50,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("circle", {
						cx: "72",
						cy: "64",
						r: "14",
						stroke: "#38BDF8",
						strokeWidth: "1.5",
						fill: "#090D16"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 51,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("circle", {
						cx: "168",
						cy: "64",
						r: "14",
						stroke: "#38BDF8",
						strokeWidth: "1.5",
						fill: "#090D16"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("path", {
						d: "M20 55 L35 52 M205 52 L220 55",
						stroke: "#64748B",
						strokeWidth: "5",
						strokeLinecap: "round"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 53,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 9
			}, this),
			category === "haptic" && /* @__PURE__ */ _jsxDEV("svg", {
				viewBox: "0 0 240 120",
				className: "w-44 h-28",
				children: [
					/* @__PURE__ */ _jsxDEV("rect", {
						x: "75",
						y: "55",
						width: "90",
						height: "45",
						rx: "10",
						fill: "#1E293B",
						stroke: "#94A3B8",
						strokeWidth: "2"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 58,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("line", {
						x1: "88",
						y1: "55",
						x2: "82",
						y2: "18",
						stroke: "#38BDF8",
						strokeWidth: "6",
						strokeLinecap: "round"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 59,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("line", {
						x1: "108",
						y1: "55",
						x2: "106",
						y2: "14",
						stroke: "#F59E0B",
						strokeWidth: "6",
						strokeLinecap: "round"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 60,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("line", {
						x1: "128",
						y1: "55",
						x2: "130",
						y2: "16",
						stroke: "#38BDF8",
						strokeWidth: "6",
						strokeLinecap: "round"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 61,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("line", {
						x1: "148",
						y1: "55",
						x2: "156",
						y2: "24",
						stroke: "#38BDF8",
						strokeWidth: "6",
						strokeLinecap: "round"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 62,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("circle", {
						cx: "120",
						cy: "77",
						r: "10",
						fill: "#F59E0B"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 63,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 57,
				columnNumber: 9
			}, this),
			category === "treadmill" && /* @__PURE__ */ _jsxDEV("svg", {
				viewBox: "0 0 240 120",
				className: "w-44 h-28",
				children: [
					/* @__PURE__ */ _jsxDEV("ellipse", {
						cx: "120",
						cy: "92",
						rx: "85",
						ry: "18",
						fill: "#0F172A",
						stroke: "#F59E0B",
						strokeWidth: "2.5"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("ellipse", {
						cx: "120",
						cy: "54",
						rx: "68",
						ry: "12",
						fill: "none",
						stroke: "#38BDF8",
						strokeWidth: "2",
						strokeDasharray: "6 4"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 69,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("line", {
						x1: "52",
						y1: "54",
						x2: "42",
						y2: "92",
						stroke: "#64748B",
						strokeWidth: "4"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 70,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("line", {
						x1: "188",
						y1: "54",
						x2: "198",
						y2: "92",
						stroke: "#64748B",
						strokeWidth: "4"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 9
			}, this),
			category === "family_bundle" && /* @__PURE__ */ _jsxDEV("svg", {
				viewBox: "0 0 240 120",
				className: "w-44 h-28",
				children: [
					/* @__PURE__ */ _jsxDEV("rect", {
						x: "28",
						y: "36",
						width: "82",
						height: "44",
						rx: "14",
						fill: "#1E293B",
						stroke: "#F59E0B",
						strokeWidth: "2"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("rect", {
						x: "130",
						y: "42",
						width: "76",
						height: "38",
						rx: "12",
						fill: "#0F172A",
						stroke: "#38BDF8",
						strokeWidth: "2"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("circle", {
						cx: "52",
						cy: "58",
						r: "8",
						fill: "#F59E0B"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("circle", {
						cx: "86",
						cy: "58",
						r: "8",
						fill: "#F59E0B"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("circle", {
						cx: "152",
						cy: "61",
						r: "7",
						fill: "#38BDF8"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 80,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("circle", {
						cx: "182",
						cy: "61",
						r: "7",
						fill: "#38BDF8"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 75,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV("span", {
				className: "absolute bottom-2 right-3 text-[10px] font-mono text-slate-400",
				children: "ISO-VR CALIBRATED"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 39,
		columnNumber: 5
	}, this);
}
export const RentalCalendarAndFleet = ({ lang, equipment, setEquipment, reservations, setReservations, customers, setCustomers, notifications, pushNotification }) => {
	const [selectedEqId, setSelectedEqId] = useState(equipment[0]?.id || "eq-1");
	const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || "cust-1");
	const [startDate, setStartDate] = useState("2026-10-27");
	const [endDate, setEndDate] = useState("2026-10-30");
	const [isFamilyPlan, setIsFamilyPlan] = useState(true);
	const [paymentMethod, setPaymentMethod] = useState("BLIK");
	const [blikCode, setBlikCode] = useState("749 201");
	const [bookingFeedback, setBookingFeedback] = useState("");
	// Custom family member entry for family sharing rentals
	const [newFamMemberName, setNewFamMemberName] = useState("");
	const [newFamMemberRole, setNewFamMemberRole] = useState("Nastolatek");
	const [newFamMemberIpd, setNewFamMemberIpd] = useState(61);
	const selectedEquipment = equipment.find((e) => e.id === selectedEqId) || equipment[0];
	const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];
	const daysCount = Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1e3 * 3600 * 24)));
	const familySurcharge = isFamilyPlan ? 35 : 0;
	const totalPricePln = (selectedEquipment?.dailyRatePln || 120) * daysCount + familySurcharge;
	const handleAddFamilyMemberToCustomer = () => {
		if (!newFamMemberName.trim() || !selectedCustomer) return;
		const newMember = {
			memberName: newFamMemberName.trim(),
			role: newFamMemberRole,
			hoursUsed: 2.5,
			favoriteGenre: "Eksploracja Kosmosu VR",
			ipdPresetMm: newFamMemberIpd
		};
		setCustomers((prev) => prev.map((c) => c.id === selectedCustomer.id ? {
			...c,
			familyMembers: [...c.familyMembers, newMember]
		} : c));
		setNewFamMemberName("");
	};
	const handleCreateReservationAndPay = (e) => {
		e.preventDefault();
		if (!selectedEquipment || !selectedCustomer) return;
		if (selectedEquipment.availableUnits <= 0) {
			setBookingFeedback(lang === "pl" ? "Brak wolnych egzemplarzy tego modelu w wybranym magazynie." : "No available units for this SKU at the moment.");
			return;
		}
		const newRes = {
			id: `RES-${Date.now().toString(36).toUpperCase().slice(-5)}`,
			equipmentId: selectedEquipment.id,
			equipmentName: lang === "pl" ? selectedEquipment.namePl : selectedEquipment.nameEn,
			customerId: selectedCustomer.id,
			customerName: selectedCustomer.fullName,
			startDate,
			endDate,
			isFamilyPlan,
			familyMembers: selectedCustomer.familyMembers,
			totalPricePln,
			paymentMethod,
			paymentStatus: "PAID",
			status: "ACTIVE"
		};
		setReservations((prev) => [newRes, ...prev]);
		// Decrement available stock
		setEquipment((prev) => prev.map((eq) => eq.id === selectedEquipment.id ? {
			...eq,
			availableUnits: Math.max(0, eq.availableUnits - 1)
		} : eq));
		// Update Customer CRM & Loyalty Points
		const earnedPts = selectedEquipment.loyaltyPointsEarned * daysCount + (isFamilyPlan ? 150 : 0);
		setCustomers((prev) => prev.map((c) => c.id === selectedCustomer.id ? {
			...c,
			loyaltyPoints: paymentMethod === "LoyaltyPoints" ? Math.max(0, c.loyaltyPoints - 500 + earnedPts) : c.loyaltyPoints + earnedPts,
			totalSpentPln: c.totalSpentPln + totalPricePln,
			activeRentalsCount: c.activeRentalsCount + 1
		} : c));
		// Emit real-time availability & payment notification
		pushNotification({
			type: "PAYMENT",
			titlePl: `Opłacono rezerwację ${newRes.id} (${paymentMethod})`,
			titleEn: `Reservation ${newRes.id} paid online (${paymentMethod})`,
			detailPl: `${selectedCustomer.fullName} wypożyczył(a) ${selectedEquipment.namePl} (${startDate} → ${endDate}). Naliczono +${earnedPts} pkt lojalnościowych.`,
			detailEn: `${selectedCustomer.fullName} booked ${selectedEquipment.nameEn} (${startDate} → ${endDate}). Awarded +${earnedPts} loyalty pts.`
		});
		setBookingFeedback(lang === "pl" ? `Rezerwacja ${newRes.id} opłacona (${totalPricePln} PLN przez ${paymentMethod}). Naliczono +${earnedPts} pkt lojalnościowych w CRM!` : `Reservation ${newRes.id} confirmed (${totalPricePln} PLN via ${paymentMethod}). +${earnedPts} loyalty points added to CRM!`);
	};
	const handleReturnEquipment = (res) => {
		if (res.status === "RETURNED") return;
		setReservations((prev) => prev.map((r) => r.id === res.id ? {
			...r,
			status: "RETURNED"
		} : r));
		setEquipment((prev) => prev.map((eq) => eq.id === res.equipmentId ? {
			...eq,
			availableUnits: Math.min(eq.totalUnits, eq.availableUnits + 1)
		} : eq));
		pushNotification({
			type: "AVAILABILITY",
			titlePl: `Zwrot sprzętu: ${res.equipmentName} ponownie dostępny!`,
			titleEn: `Hardware Returned: ${res.equipmentName} is back in stock!`,
			detailPl: `Rezerwacja ${res.id} zakończona. Stan magazynowy zaktualizowany w czasie rzeczywistym.`,
			detailEn: `Reservation ${res.id} closed. Real-time inventory availability incremented.`
		});
	};
	// Generate 14 days for the interactive visual reservation calendar matrix
	const calendarDays = Array.from({ length: 14 }, (_, idx) => {
		const d = new Date("2026-10-24T00:00:00");
		d.setDate(d.getDate() + idx);
		return d.toISOString().slice(0, 10);
	});
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "max-w-[1380px] mx-auto px-6 py-8 space-y-10",
		children: [
			/* @__PURE__ */ _jsxDEV("section", {
				className: "space-y-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4",
					children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
						className: "text-2xl font-bold text-slate-900 dark:text-white",
						children: lang === "pl" ? "01. Wypożyczalnia Narzędzi VR do Użytku Własnego i Rodzinnego" : "01. Personal & Family VR Hardware Rental Fleet"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 252,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("p", {
						className: "text-sm text-slate-600 dark:text-slate-400 mt-1",
						children: lang === "pl" ? "Wybierz gogle VR, rękawice haptyczne lub zestaw rodzinny z kalibracją IPD dla każdego domownika." : "Select VR headsets, haptic gloves, or family sharing bundles with per-member IPD profiles."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 257,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 251,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "text-xs font-mono text-slate-500 dark:text-slate-400",
						children: lang === "pl" ? "STATUS DOSTĘPNOŚCI: CZAS RZECZYWISTY" : "AVAILABILITY STATUS: REAL-TIME"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 250,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5",
					children: equipment.map((eq) => {
						const isSelected = eq.id === selectedEqId;
						return /* @__PURE__ */ _jsxDEV("div", {
							onClick: () => setSelectedEqId(eq.id),
							className: `cursor-pointer rounded-xl border p-4 transition-colors flex flex-col justify-between ${isSelected ? "border-amber-500 bg-amber-500/5 dark:bg-slate-900" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-700"}`,
							children: [/* @__PURE__ */ _jsxDEV("div", { children: [
								/* @__PURE__ */ _jsxDEV(HardwareStudioIllustration, { category: eq.category }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 283,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono",
									children: [
										/* @__PURE__ */ _jsxDEV("span", { children: eq.sku }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 287,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("span", {
											"aria-hidden": "true",
											children: "·"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 288,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("span", { children: eq.depotCity }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 289,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("span", {
											"aria-hidden": "true",
											children: "·"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 290,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("span", {
											className: eq.availableUnits > 0 ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-rose-600 dark:text-rose-400 font-semibold",
											children: [
												eq.availableUnits,
												"/",
												eq.totalUnits,
												" ",
												lang === "pl" ? "dostępne" : "avail"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 291,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 286,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("h3", {
									className: "mt-1.5 text-base font-bold text-slate-900 dark:text-white",
									children: lang === "pl" ? eq.namePl : eq.nameEn
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 302,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed",
									children: eq.specs
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 305,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 282,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "text-lg font-bold font-mono tabular-nums text-slate-900 dark:text-white",
									children: [eq.dailyRatePln, " PLN"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 312,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs text-slate-500",
									children: [" / ", lang === "pl" ? "dzień" : "day"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 315,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 311,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "text-xs font-mono text-amber-600 dark:text-amber-400",
									children: [
										"+",
										eq.loyaltyPointsEarned,
										" pkt/d"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 317,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 310,
								columnNumber: 17
							}, this)]
						}, eq.id, true, {
							fileName: _jsxFileName,
							lineNumber: 273,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 269,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 249,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("section", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch",
				children: [/* @__PURE__ */ _jsxDEV("form", {
					onSubmit: handleCreateReservationAndPay,
					className: "lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
								className: "text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2",
								children: [/* @__PURE__ */ _jsxDEV(CreditCard, { className: "w-5 h-5 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 337,
									columnNumber: 17
								}, this), lang === "pl" ? "02. Rezerwacja, Wypożyczenie Rodzinne i Płatność Online" : "02. Online Reservation, Family Pool & Instant Checkout"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 336,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("p", {
								className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5",
								children: lang === "pl" ? "Zintegrowane z kalendarzem rezerwacji, kontem klienta w CRM oraz programem lojalnościowym." : "Integrated with reservation calendar, CRM customer records, and loyalty points."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 342,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 335,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1",
								children: [/* @__PURE__ */ _jsxDEV(ShieldCheck, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 349,
									columnNumber: 15
								}, this), " TLS 1.3 / E2EE"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 348,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 334,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs",
							children: [
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-slate-600 dark:text-slate-400 font-medium mb-1",
									children: lang === "pl" ? "Wybrany Sprzęt VR" : "Selected VR Hardware"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 355,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("select", {
									value: selectedEqId,
									onChange: (e) => setSelectedEqId(e.target.value),
									className: "w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-medium",
									children: equipment.map((eq) => /* @__PURE__ */ _jsxDEV("option", {
										value: eq.id,
										children: [
											lang === "pl" ? eq.namePl : eq.nameEn,
											" (",
											eq.dailyRatePln,
											" PLN/d)"
										]
									}, eq.id, true, {
										fileName: _jsxFileName,
										lineNumber: 364,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 358,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 354,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-slate-600 dark:text-slate-400 font-medium mb-1",
									children: lang === "pl" ? "Klient / Konto Rodzinne w CRM" : "Customer / Family Account (CRM)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 372,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("select", {
									value: selectedCustomerId,
									onChange: (e) => setSelectedCustomerId(e.target.value),
									className: "w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-medium",
									children: customers.map((c) => /* @__PURE__ */ _jsxDEV("option", {
										value: c.id,
										children: [
											c.fullName,
											" — ",
											c.companyOrFamilyName,
											" (",
											c.loyaltyPoints,
											" pkt)"
										]
									}, c.id, true, {
										fileName: _jsxFileName,
										lineNumber: 381,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 375,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 371,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-slate-600 dark:text-slate-400 font-medium mb-1",
									children: lang === "pl" ? "Data Odbioru / Wysyłki Kurierskiej" : "Start Date"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 389,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "date",
									value: startDate,
									onChange: (e) => setStartDate(e.target.value),
									className: "w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 392,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 388,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-slate-600 dark:text-slate-400 font-medium mb-1",
									children: lang === "pl" ? "Data Zwrotu" : "Return Date"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 401,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "date",
									value: endDate,
									min: startDate,
									onChange: (e) => setEndDate(e.target.value),
									className: "w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 404,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 400,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 353,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 space-y-3 text-xs",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "flex items-center gap-2 font-semibold text-slate-900 dark:text-white cursor-pointer",
									children: [
										/* @__PURE__ */ _jsxDEV("input", {
											type: "checkbox",
											checked: isFamilyPlan,
											onChange: (e) => setIsFamilyPlan(e.target.checked),
											className: "accent-amber-500 w-4 h-4"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 418,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV(Users, { className: "w-4 h-4 text-amber-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 424,
											columnNumber: 17
										}, this),
										lang === "pl" ? "Wypożyczenie Okularów w Rodzinie (Współdzielenie Profili IPD + Statystyki CRM)" : "Family Headset Sharing Mode (Multi-User IPD Profiles + CRM Stats)"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 417,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono text-amber-600 dark:text-amber-400",
									children: "+150 pkt bonus"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 429,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 416,
								columnNumber: 13
							}, this), isFamilyPlan && selectedCustomer && /* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-2",
									children: selectedCustomer.familyMembers.map((fm, idx) => /* @__PURE__ */ _jsxDEV("div", {
										className: "p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "font-semibold text-slate-900 dark:text-white",
											children: fm.memberName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 440,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "text-[11px] text-slate-500",
											children: [
												fm.role,
												" · IPD ",
												fm.ipdPresetMm,
												"mm · ",
												fm.hoursUsed,
												"h"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 441,
											columnNumber: 23
										}, this)]
									}, idx, true, {
										fileName: _jsxFileName,
										lineNumber: 436,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 434,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ _jsxDEV("input", {
											type: "text",
											value: newFamMemberName,
											onChange: (e) => setNewFamMemberName(e.target.value),
											placeholder: lang === "pl" ? "Imię członka rodziny..." : "Family member name...",
											className: "flex-1 min-w-[140px] px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 450,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("select", {
											value: newFamMemberRole,
											onChange: (e) => setNewFamMemberRole(e.target.value),
											className: "px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white",
											children: [
												/* @__PURE__ */ _jsxDEV("option", {
													value: "Rodzic / Admin",
													children: "Rodzic / Admin"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 462,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("option", {
													value: "Partner",
													children: "Partner"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 463,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("option", {
													value: "Nastolatek",
													children: "Nastolatek"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 464,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("option", {
													value: "Dziecko (Tryb SafeVR)",
													children: "Dziecko (SafeVR)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 465,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 457,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("input", {
											type: "number",
											min: "52",
											max: "72",
											value: newFamMemberIpd,
											onChange: (e) => setNewFamMemberIpd(Number(e.target.value)),
											className: "w-20 px-2 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 font-mono text-slate-900 dark:text-white",
											title: "IPD (mm)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 467,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: handleAddFamilyMemberToCustomer,
											className: "px-3 py-1.5 rounded bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-700 font-medium flex items-center gap-1 whitespace-nowrap",
											children: [/* @__PURE__ */ _jsxDEV(Plus, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 481,
												columnNumber: 21
											}, this), lang === "pl" ? "Dodaj Domownika" : "Add Member"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 476,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 449,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 433,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 415,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "space-y-3 text-xs",
							children: [
								/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-slate-600 dark:text-slate-400 font-medium",
									children: lang === "pl" ? "Metoda Płatności Online" : "Online Payment Method"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 491,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
									children: [
										{
											id: "BLIK",
											label: "BLIK Instant"
										},
										{
											id: "Card",
											label: "Visa / Mastercard"
										},
										{
											id: "ApplePay",
											label: "Apple / Google Pay"
										},
										{
											id: "LoyaltyPoints",
											label: lang === "pl" ? "Punkty (-500 pkt)" : "Points (-500 pts)"
										}
									].map((pm) => /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => setPaymentMethod(pm.id),
										className: `py-2 px-3 rounded-lg border font-medium transition-colors whitespace-nowrap ${paymentMethod === pm.id ? "bg-amber-500 text-slate-950 border-amber-500 font-semibold" : "bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300"}`,
										children: pm.label
									}, pm.id, false, {
										fileName: _jsxFileName,
										lineNumber: 503,
										columnNumber: 17
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 494,
									columnNumber: 13
								}, this),
								paymentMethod === "BLIK" && /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-3 pt-1",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-slate-500",
										children: lang === "pl" ? "Kod BLIK (6 cyfr):" : "6-digit BLIK Code:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 520,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("input", {
										type: "text",
										maxLength: 7,
										value: blikCode,
										onChange: (e) => setBlikCode(e.target.value),
										className: "w-32 px-3 py-1.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 font-mono text-sm tracking-widest text-center text-slate-900 dark:text-white"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 521,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 519,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 490,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4",
							children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-xs text-slate-500",
								children: [
									daysCount,
									" ",
									lang === "pl" ? "dni wypożyczenia" : "rental days",
									" ·",
									" ",
									isFamilyPlan ? lang === "pl" ? "Pakiet Rodzinny" : "Family Plan" : "Standard"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 535,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white",
								children: [totalPricePln, " PLN"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 539,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 534,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								type: "submit",
								className: "px-6 py-3 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors whitespace-nowrap shrink-0",
								children: lang === "pl" ? "Zarezerwuj w Kalendarzu i Opłać Online" : "Confirm Calendar Booking & Pay Online"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 544,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 533,
							columnNumber: 11
						}, this),
						bookingFeedback && /* @__PURE__ */ _jsxDEV("div", {
							className: "p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-300 flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "w-4 h-4 shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 556,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: bookingFeedback }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 557,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 555,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 330,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between",
					children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800",
						children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Bell, { className: "w-5 h-5 text-amber-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 567,
								columnNumber: 17
							}, this), lang === "pl" ? "Powiadomienia o Dostępności na Żywo" : "Real-Time Availability & System Feed"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 566,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "text-xs font-mono text-slate-500",
							children: "LIVE STREAM"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 572,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 565,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1",
						children: notifications.map((n) => /* @__PURE__ */ _jsxDEV("div", {
							className: "p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between text-[11px] font-mono text-slate-500",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: n.type }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 582,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: n.timestamp }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 583,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 581,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "font-semibold text-slate-900 dark:text-white",
									children: lang === "pl" ? n.titlePl : n.titleEn
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 585,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "text-slate-600 dark:text-slate-400 leading-relaxed",
									children: lang === "pl" ? n.detailPl : n.detailEn
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 588,
									columnNumber: 19
								}, this)
							]
						}, n.id, true, {
							fileName: _jsxFileName,
							lineNumber: 577,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 575,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 564,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between font-mono",
						children: [
							/* @__PURE__ */ _jsxDEV("span", { children: "WEBHOOK: ACTIVE" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 597,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("span", { children: "·" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 598,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("span", { children: "E2E NOTIFICATION BUS" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 599,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 596,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 563,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 328,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("section", {
				className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800",
					children: /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
						className: "text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV(Calendar, { className: "w-5 h-5 text-amber-500" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 609,
							columnNumber: 15
						}, this), lang === "pl" ? "03. Harmonogram Wypożyczeń w Przejrzystym Kalendarzu Rezerwacji" : "03. Hardware Rental Schedule & Interactive Reservation Calendar"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 608,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("p", {
						className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5",
						children: lang === "pl" ? "Zwrócenie sprzętu natychmiast przywraca pulę dostępności i wysyła powiadomienie do oczekujących użytkowników." : "Returning hardware immediately restores inventory availability and notifies waiting users."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 614,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 607,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 606,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ _jsxDEV("table", {
						className: "w-full text-left border-collapse text-xs",
						children: [/* @__PURE__ */ _jsxDEV("thead", { children: /* @__PURE__ */ _jsxDEV("tr", {
							className: "border-b border-slate-200 dark:border-slate-800 text-slate-500 font-mono",
							children: [
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-2.5 pr-4",
									children: lang === "pl" ? "Rezerwacja / Klient" : "Booking / Customer"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 627,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-2.5 px-3",
									children: lang === "pl" ? "Sprzęt VR" : "VR Equipment"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 628,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-2.5 px-3",
									children: lang === "pl" ? "Tryb / Rodzina" : "Sharing Mode"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 629,
									columnNumber: 17
								}, this),
								calendarDays.map((day) => /* @__PURE__ */ _jsxDEV("th", {
									className: "py-2 px-1.5 text-center text-[10px]",
									children: day.slice(5)
								}, day, false, {
									fileName: _jsxFileName,
									lineNumber: 631,
									columnNumber: 19
								}, this)),
								/* @__PURE__ */ _jsxDEV("th", {
									className: "py-2.5 pl-3 text-right",
									children: lang === "pl" ? "Akcja" : "Action"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 635,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 626,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 625,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("tbody", {
							className: "divide-y divide-slate-200 dark:divide-slate-800",
							children: reservations.map((res) => /* @__PURE__ */ _jsxDEV("tr", {
								className: "hover:bg-slate-50/70 dark:hover:bg-slate-950/60",
								children: [
									/* @__PURE__ */ _jsxDEV("td", {
										className: "py-3 pr-4",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "font-semibold text-slate-900 dark:text-white",
											children: res.customerName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 642,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "text-[11px] font-mono text-slate-500",
											children: [
												res.id,
												" · ",
												res.totalPricePln,
												" PLN (",
												res.paymentMethod,
												")"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 643,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 641,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("td", {
										className: "py-3 px-3 font-medium text-slate-800 dark:text-slate-200",
										children: res.equipmentName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 647,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("td", {
										className: "py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400",
										children: [
											res.isFamilyPlan ? `${lang === "pl" ? "Rodzinny" : "Family"} (${res.familyMembers.length} os.)` : lang === "pl" ? "Indywidualny" : "Personal",
											" · ",
											/* @__PURE__ */ _jsxDEV("span", {
												className: res.status === "OVERDUE" ? "text-rose-500 font-semibold" : res.status === "RETURNED" ? "text-slate-400" : "text-emerald-500 font-semibold",
												children: res.status
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 657,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 650,
										columnNumber: 19
									}, this),
									calendarDays.map((day) => {
										const activeInDay = day >= res.startDate && day <= res.endDate;
										return /* @__PURE__ */ _jsxDEV("td", {
											className: "py-3 px-1 text-center",
											children: /* @__PURE__ */ _jsxDEV("div", {
												className: `h-5 rounded-sm ${!activeInDay ? "bg-slate-100 dark:bg-slate-950" : res.status === "OVERDUE" ? "bg-rose-500/80" : res.status === "RETURNED" ? "bg-slate-400/40" : res.isFamilyPlan ? "bg-amber-500" : "bg-sky-500"}`,
												title: `${res.startDate} → ${res.endDate}`
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 673,
												columnNumber: 25
											}, this)
										}, day, false, {
											fileName: _jsxFileName,
											lineNumber: 672,
											columnNumber: 23
										}, this);
									}),
									/* @__PURE__ */ _jsxDEV("td", {
										className: "py-3 pl-3 text-right",
										children: res.status !== "RETURNED" ? /* @__PURE__ */ _jsxDEV("button", {
											onClick: () => handleReturnEquipment(res),
											className: "px-2.5 py-1 rounded text-[11px] font-medium bg-slate-900 dark:bg-slate-800 text-white hover:bg-emerald-600 transition-colors whitespace-nowrap",
											children: lang === "pl" ? "Oznacz Zwrot" : "Mark Returned"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 692,
											columnNumber: 23
										}, this) : /* @__PURE__ */ _jsxDEV("span", {
											className: "text-[11px] font-mono text-slate-400",
											children: lang === "pl" ? "Zwrócono" : "Returned"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 699,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 690,
										columnNumber: 19
									}, this)
								]
							}, res.id, true, {
								fileName: _jsxFileName,
								lineNumber: 640,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 638,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 624,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 623,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 605,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 247,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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STtVQUN2RCxPQUNFLHdCQUFDLE1BQUQ7V0FBYyxXQUFVO3FCQUN0Qix3QkFBQyxPQUFEO1lBQ0UsV0FBVyxrQkFDVCxDQUFDLGNBQ0csbUNBQ0EsSUFBSSxXQUFXLFlBQ2YsbUJBQ0EsSUFBSSxXQUFXLGFBQ2Ysb0JBQ0EsSUFBSSxlQUNKLGlCQUNBO1lBRU4sT0FBTyxHQUFHLElBQUksVUFBVSxLQUFLLElBQUk7V0FDbEM7Ozs7O1VBQ0MsR0FmSzs7OztpQkFlTDtTQUVSLENBQUM7U0FDRCx3QkFBQyxNQUFEO1VBQUksV0FBVTtvQkFDWCxJQUFJLFdBQVcsYUFDZCx3QkFBQyxVQUFEO1dBQ0UsZUFBZSxzQkFBc0IsR0FBRztXQUN4QyxXQUFVO3FCQUVULFNBQVMsT0FBTyxpQkFBaUI7VUFDNUI7Ozs7cUJBRVIsd0JBQUMsUUFBRDtXQUFNLFdBQVU7cUJBQ2IsU0FBUyxPQUFPLGFBQWE7VUFDMUI7Ozs7O1NBRU47Ozs7O1FBQ0Y7VUFoRUssSUFBSTs7OztjQWdFVCxDQUNMO01BQ0k7Ozs7Y0FDRjs7Ozs7O0lBQ0o7Ozs7WUFDRTs7Ozs7O0VBQ047Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIlJlbnRhbENhbGVuZGFyQW5kRmxlZXQudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEN1c3RvbWVyQ3JtUHJvZmlsZSxcbiAgRmFtaWx5TWVtYmVyVXNhZ2UsXG4gIExhbmd1YWdlLFxuICBMaXZlTm90aWZpY2F0aW9uLFxuICBSZW50YWxSZXNlcnZhdGlvbixcbiAgVnJFcXVpcG1lbnRJdGVtLFxufSBmcm9tICcuLi90eXBlcy92cic7XG5pbXBvcnQge1xuICBDYWxlbmRhcixcbiAgQ3JlZGl0Q2FyZCxcbiAgVXNlcnMsXG4gIEJlbGwsXG4gIENoZWNrQ2lyY2xlMixcbiAgU2hpZWxkQ2hlY2ssXG4gIFNwYXJrbGVzLFxuICBQbHVzLFxuICBDbG9jayxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIFJlbnRhbENhbGVuZGFyQW5kRmxlZXRQcm9wcyB7XG4gIGxhbmc6IExhbmd1YWdlO1xuICBlcXVpcG1lbnQ6IFZyRXF1aXBtZW50SXRlbVtdO1xuICBzZXRFcXVpcG1lbnQ6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFZyRXF1aXBtZW50SXRlbVtdPj47XG4gIHJlc2VydmF0aW9uczogUmVudGFsUmVzZXJ2YXRpb25bXTtcbiAgc2V0UmVzZXJ2YXRpb25zOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxSZW50YWxSZXNlcnZhdGlvbltdPj47XG4gIGN1c3RvbWVyczogQ3VzdG9tZXJDcm1Qcm9maWxlW107XG4gIHNldEN1c3RvbWVyczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Q3VzdG9tZXJDcm1Qcm9maWxlW10+PjtcbiAgbm90aWZpY2F0aW9uczogTGl2ZU5vdGlmaWNhdGlvbltdO1xuICBwdXNoTm90aWZpY2F0aW9uOiAobjogT21pdDxMaXZlTm90aWZpY2F0aW9uLCAnaWQnIHwgJ3RpbWVzdGFtcCc+KSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEhpZ2gtcHJlY2lzaW9uIHN0dWRpbyBTVkcgaGFyZHdhcmUgaWxsdXN0cmF0aW9uIChaZXJvLUJyb2tlbi1JbWFnZSBQb2xpY3kpXG4gKi9cbmZ1bmN0aW9uIEhhcmR3YXJlU3R1ZGlvSWxsdXN0cmF0aW9uKHsgY2F0ZWdvcnkgfTogeyBjYXRlZ29yeTogVnJFcXVpcG1lbnRJdGVtWydjYXRlZ29yeSddIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLTQwIHJvdW5kZWQtbGcgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1zbGF0ZS05MDAgdmlhLXNsYXRlLTk1MCB0by1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIHAtNFwiPlxuICAgICAge2NhdGVnb3J5ID09PSAnaGVhZHNldCcgJiYgKFxuICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQwIDEyMFwiIGNsYXNzTmFtZT1cInctNDQgaC0yOFwiPlxuICAgICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwidmlzb3JHcmFkXCIgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPVwiIzM4QkRGOFwiIHN0b3BPcGFjaXR5PVwiMC4zNVwiIC8+XG4gICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjUwJVwiIHN0b3BDb2xvcj1cIiMwRjE3MkFcIiBzdG9wT3BhY2l0eT1cIjAuOTVcIiAvPlxuICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPVwiI0Y1OUUwQlwiIHN0b3BPcGFjaXR5PVwiMC40XCIgLz5cbiAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAgPC9kZWZzPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMzUgNDUgQzM1IDI1LCAyMDUgMjUsIDIwNSA0NSBMMjA1IDc4IEMyMDUgOTUsIDE0NSA5NSwgMTIwIDgyIEM5NSA5NSwgMzUgOTUsIDM1IDc4IFpcIiBmaWxsPVwidXJsKCN2aXNvckdyYWQpXCIgc3Ryb2tlPVwiIzk0QTNCOFwiIHN0cm9rZVdpZHRoPVwiMi41XCIgLz5cbiAgICAgICAgICA8cGF0aCBkPVwiTTQ4IDUyIEM4NSA0MiwgMTU1IDQyLCAxOTIgNTJcIiBzdHJva2U9XCIjRjU5RTBCXCIgc3Ryb2tlV2lkdGg9XCIyXCIgZmlsbD1cIm5vbmVcIiAvPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI3MlwiIGN5PVwiNjRcIiByPVwiMTRcIiBzdHJva2U9XCIjMzhCREY4XCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBmaWxsPVwiIzA5MEQxNlwiIC8+XG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE2OFwiIGN5PVwiNjRcIiByPVwiMTRcIiBzdHJva2U9XCIjMzhCREY4XCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBmaWxsPVwiIzA5MEQxNlwiIC8+XG4gICAgICAgICAgPHBhdGggZD1cIk0yMCA1NSBMMzUgNTIgTTIwNSA1MiBMMjIwIDU1XCIgc3Ryb2tlPVwiIzY0NzQ4QlwiIHN0cm9rZVdpZHRoPVwiNVwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgKX1cbiAgICAgIHtjYXRlZ29yeSA9PT0gJ2hhcHRpYycgJiYgKFxuICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQwIDEyMFwiIGNsYXNzTmFtZT1cInctNDQgaC0yOFwiPlxuICAgICAgICAgIDxyZWN0IHg9XCI3NVwiIHk9XCI1NVwiIHdpZHRoPVwiOTBcIiBoZWlnaHQ9XCI0NVwiIHJ4PVwiMTBcIiBmaWxsPVwiIzFFMjkzQlwiIHN0cm9rZT1cIiM5NEEzQjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICAgIDxsaW5lIHgxPVwiODhcIiB5MT1cIjU1XCIgeDI9XCI4MlwiIHkyPVwiMThcIiBzdHJva2U9XCIjMzhCREY4XCIgc3Ryb2tlV2lkdGg9XCI2XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgLz5cbiAgICAgICAgICA8bGluZSB4MT1cIjEwOFwiIHkxPVwiNTVcIiB4Mj1cIjEwNlwiIHkyPVwiMTRcIiBzdHJva2U9XCIjRjU5RTBCXCIgc3Ryb2tlV2lkdGg9XCI2XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgLz5cbiAgICAgICAgICA8bGluZSB4MT1cIjEyOFwiIHkxPVwiNTVcIiB4Mj1cIjEzMFwiIHkyPVwiMTZcIiBzdHJva2U9XCIjMzhCREY4XCIgc3Ryb2tlV2lkdGg9XCI2XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgLz5cbiAgICAgICAgICA8bGluZSB4MT1cIjE0OFwiIHkxPVwiNTVcIiB4Mj1cIjE1NlwiIHkyPVwiMjRcIiBzdHJva2U9XCIjMzhCREY4XCIgc3Ryb2tlV2lkdGg9XCI2XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgLz5cbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTIwXCIgY3k9XCI3N1wiIHI9XCIxMFwiIGZpbGw9XCIjRjU5RTBCXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICApfVxuICAgICAge2NhdGVnb3J5ID09PSAndHJlYWRtaWxsJyAmJiAoXG4gICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNDAgMTIwXCIgY2xhc3NOYW1lPVwidy00NCBoLTI4XCI+XG4gICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMjBcIiBjeT1cIjkyXCIgcng9XCI4NVwiIHJ5PVwiMThcIiBmaWxsPVwiIzBGMTcyQVwiIHN0cm9rZT1cIiNGNTlFMEJcIiBzdHJva2VXaWR0aD1cIjIuNVwiIC8+XG4gICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMjBcIiBjeT1cIjU0XCIgcng9XCI2OFwiIHJ5PVwiMTJcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiMzOEJERjhcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VEYXNoYXJyYXk9XCI2IDRcIiAvPlxuICAgICAgICAgIDxsaW5lIHgxPVwiNTJcIiB5MT1cIjU0XCIgeDI9XCI0MlwiIHkyPVwiOTJcIiBzdHJva2U9XCIjNjQ3NDhCXCIgc3Ryb2tlV2lkdGg9XCI0XCIgLz5cbiAgICAgICAgICA8bGluZSB4MT1cIjE4OFwiIHkxPVwiNTRcIiB4Mj1cIjE5OFwiIHkyPVwiOTJcIiBzdHJva2U9XCIjNjQ3NDhCXCIgc3Ryb2tlV2lkdGg9XCI0XCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICApfVxuICAgICAge2NhdGVnb3J5ID09PSAnZmFtaWx5X2J1bmRsZScgJiYgKFxuICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQwIDEyMFwiIGNsYXNzTmFtZT1cInctNDQgaC0yOFwiPlxuICAgICAgICAgIDxyZWN0IHg9XCIyOFwiIHk9XCIzNlwiIHdpZHRoPVwiODJcIiBoZWlnaHQ9XCI0NFwiIHJ4PVwiMTRcIiBmaWxsPVwiIzFFMjkzQlwiIHN0cm9rZT1cIiNGNTlFMEJcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICAgIDxyZWN0IHg9XCIxMzBcIiB5PVwiNDJcIiB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzhcIiByeD1cIjEyXCIgZmlsbD1cIiMwRjE3MkFcIiBzdHJva2U9XCIjMzhCREY4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNTJcIiBjeT1cIjU4XCIgcj1cIjhcIiBmaWxsPVwiI0Y1OUUwQlwiIC8+XG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjg2XCIgY3k9XCI1OFwiIHI9XCI4XCIgZmlsbD1cIiNGNTlFMEJcIiAvPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTJcIiBjeT1cIjYxXCIgcj1cIjdcIiBmaWxsPVwiIzM4QkRGOFwiIC8+XG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjE4MlwiIGN5PVwiNjFcIiByPVwiN1wiIGZpbGw9XCIjMzhCREY4XCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICApfVxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTIgcmlnaHQtMyB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgSVNPLVZSIENBTElCUkFURURcbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IFJlbnRhbENhbGVuZGFyQW5kRmxlZXQ6IFJlYWN0LkZDPFJlbnRhbENhbGVuZGFyQW5kRmxlZXRQcm9wcz4gPSAoe1xuICBsYW5nLFxuICBlcXVpcG1lbnQsXG4gIHNldEVxdWlwbWVudCxcbiAgcmVzZXJ2YXRpb25zLFxuICBzZXRSZXNlcnZhdGlvbnMsXG4gIGN1c3RvbWVycyxcbiAgc2V0Q3VzdG9tZXJzLFxuICBub3RpZmljYXRpb25zLFxuICBwdXNoTm90aWZpY2F0aW9uLFxufSkgPT4ge1xuICBjb25zdCBbc2VsZWN0ZWRFcUlkLCBzZXRTZWxlY3RlZEVxSWRdID0gdXNlU3RhdGU8c3RyaW5nPihlcXVpcG1lbnRbMF0/LmlkIHx8ICdlcS0xJyk7XG4gIGNvbnN0IFtzZWxlY3RlZEN1c3RvbWVySWQsIHNldFNlbGVjdGVkQ3VzdG9tZXJJZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KGN1c3RvbWVyc1swXT8uaWQgfHwgJ2N1c3QtMScpO1xuICBjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGU8c3RyaW5nPignMjAyNi0xMC0yNycpO1xuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcyMDI2LTEwLTMwJyk7XG4gIGNvbnN0IFtpc0ZhbWlseVBsYW4sIHNldElzRmFtaWx5UGxhbl0gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcbiAgY29uc3QgW3BheW1lbnRNZXRob2QsIHNldFBheW1lbnRNZXRob2RdID0gdXNlU3RhdGU8J0JMSUsnIHwgJ0NhcmQnIHwgJ0FwcGxlUGF5JyB8ICdMb3lhbHR5UG9pbnRzJz4oJ0JMSUsnKTtcbiAgY29uc3QgW2JsaWtDb2RlLCBzZXRCbGlrQ29kZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCc3NDkgMjAxJyk7XG4gIGNvbnN0IFtib29raW5nRmVlZGJhY2ssIHNldEJvb2tpbmdGZWVkYmFja10gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcblxuICAvLyBDdXN0b20gZmFtaWx5IG1lbWJlciBlbnRyeSBmb3IgZmFtaWx5IHNoYXJpbmcgcmVudGFsc1xuICBjb25zdCBbbmV3RmFtTWVtYmVyTmFtZSwgc2V0TmV3RmFtTWVtYmVyTmFtZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW25ld0ZhbU1lbWJlclJvbGUsIHNldE5ld0ZhbU1lbWJlclJvbGVdID0gdXNlU3RhdGU8RmFtaWx5TWVtYmVyVXNhZ2VbJ3JvbGUnXT4oJ05hc3RvbGF0ZWsnKTtcbiAgY29uc3QgW25ld0ZhbU1lbWJlcklwZCwgc2V0TmV3RmFtTWVtYmVySXBkXSA9IHVzZVN0YXRlPG51bWJlcj4oNjEpO1xuXG4gIGNvbnN0IHNlbGVjdGVkRXF1aXBtZW50ID0gZXF1aXBtZW50LmZpbmQoKGUpID0+IGUuaWQgPT09IHNlbGVjdGVkRXFJZCkgfHwgZXF1aXBtZW50WzBdO1xuICBjb25zdCBzZWxlY3RlZEN1c3RvbWVyID0gY3VzdG9tZXJzLmZpbmQoKGMpID0+IGMuaWQgPT09IHNlbGVjdGVkQ3VzdG9tZXJJZCkgfHwgY3VzdG9tZXJzWzBdO1xuXG4gIGNvbnN0IGRheXNDb3VudCA9IE1hdGgubWF4KFxuICAgIDEsXG4gICAgTWF0aC5jZWlsKChuZXcgRGF0ZShlbmREYXRlKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShzdGFydERhdGUpLmdldFRpbWUoKSkgLyAoMTAwMCAqIDM2MDAgKiAyNCkpXG4gICk7XG4gIGNvbnN0IGZhbWlseVN1cmNoYXJnZSA9IGlzRmFtaWx5UGxhbiA/IDM1IDogMDtcbiAgY29uc3QgdG90YWxQcmljZVBsbiA9IChzZWxlY3RlZEVxdWlwbWVudD8uZGFpbHlSYXRlUGxuIHx8IDEyMCkgKiBkYXlzQ291bnQgKyBmYW1pbHlTdXJjaGFyZ2U7XG5cbiAgY29uc3QgaGFuZGxlQWRkRmFtaWx5TWVtYmVyVG9DdXN0b21lciA9ICgpID0+IHtcbiAgICBpZiAoIW5ld0ZhbU1lbWJlck5hbWUudHJpbSgpIHx8ICFzZWxlY3RlZEN1c3RvbWVyKSByZXR1cm47XG4gICAgY29uc3QgbmV3TWVtYmVyOiBGYW1pbHlNZW1iZXJVc2FnZSA9IHtcbiAgICAgIG1lbWJlck5hbWU6IG5ld0ZhbU1lbWJlck5hbWUudHJpbSgpLFxuICAgICAgcm9sZTogbmV3RmFtTWVtYmVyUm9sZSxcbiAgICAgIGhvdXJzVXNlZDogMi41LFxuICAgICAgZmF2b3JpdGVHZW5yZTogJ0Vrc3Bsb3JhY2phIEtvc21vc3UgVlInLFxuICAgICAgaXBkUHJlc2V0TW06IG5ld0ZhbU1lbWJlcklwZCxcbiAgICB9O1xuICAgIHNldEN1c3RvbWVycygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChjKSA9PlxuICAgICAgICBjLmlkID09PSBzZWxlY3RlZEN1c3RvbWVyLmlkXG4gICAgICAgICAgPyB7IC4uLmMsIGZhbWlseU1lbWJlcnM6IFsuLi5jLmZhbWlseU1lbWJlcnMsIG5ld01lbWJlcl0gfVxuICAgICAgICAgIDogY1xuICAgICAgKVxuICAgICk7XG4gICAgc2V0TmV3RmFtTWVtYmVyTmFtZSgnJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ3JlYXRlUmVzZXJ2YXRpb25BbmRQYXkgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghc2VsZWN0ZWRFcXVpcG1lbnQgfHwgIXNlbGVjdGVkQ3VzdG9tZXIpIHJldHVybjtcbiAgICBpZiAoc2VsZWN0ZWRFcXVpcG1lbnQuYXZhaWxhYmxlVW5pdHMgPD0gMCkge1xuICAgICAgc2V0Qm9va2luZ0ZlZWRiYWNrKFxuICAgICAgICBsYW5nID09PSAncGwnXG4gICAgICAgICAgPyAnQnJhayB3b2xueWNoIGVnemVtcGxhcnp5IHRlZ28gbW9kZWx1IHcgd3licmFueW0gbWFnYXp5bmllLidcbiAgICAgICAgICA6ICdObyBhdmFpbGFibGUgdW5pdHMgZm9yIHRoaXMgU0tVIGF0IHRoZSBtb21lbnQuJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdSZXM6IFJlbnRhbFJlc2VydmF0aW9uID0ge1xuICAgICAgaWQ6IGBSRVMtJHtEYXRlLm5vdygpLnRvU3RyaW5nKDM2KS50b1VwcGVyQ2FzZSgpLnNsaWNlKC01KX1gLFxuICAgICAgZXF1aXBtZW50SWQ6IHNlbGVjdGVkRXF1aXBtZW50LmlkLFxuICAgICAgZXF1aXBtZW50TmFtZTogbGFuZyA9PT0gJ3BsJyA/IHNlbGVjdGVkRXF1aXBtZW50Lm5hbWVQbCA6IHNlbGVjdGVkRXF1aXBtZW50Lm5hbWVFbixcbiAgICAgIGN1c3RvbWVySWQ6IHNlbGVjdGVkQ3VzdG9tZXIuaWQsXG4gICAgICBjdXN0b21lck5hbWU6IHNlbGVjdGVkQ3VzdG9tZXIuZnVsbE5hbWUsXG4gICAgICBzdGFydERhdGUsXG4gICAgICBlbmREYXRlLFxuICAgICAgaXNGYW1pbHlQbGFuLFxuICAgICAgZmFtaWx5TWVtYmVyczogc2VsZWN0ZWRDdXN0b21lci5mYW1pbHlNZW1iZXJzLFxuICAgICAgdG90YWxQcmljZVBsbixcbiAgICAgIHBheW1lbnRNZXRob2QsXG4gICAgICBwYXltZW50U3RhdHVzOiAnUEFJRCcsXG4gICAgICBzdGF0dXM6ICdBQ1RJVkUnLFxuICAgIH07XG5cbiAgICBzZXRSZXNlcnZhdGlvbnMoKHByZXYpID0+IFtuZXdSZXMsIC4uLnByZXZdKTtcblxuICAgIC8vIERlY3JlbWVudCBhdmFpbGFibGUgc3RvY2tcbiAgICBzZXRFcXVpcG1lbnQoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgoZXEpID0+XG4gICAgICAgIGVxLmlkID09PSBzZWxlY3RlZEVxdWlwbWVudC5pZFxuICAgICAgICAgID8geyAuLi5lcSwgYXZhaWxhYmxlVW5pdHM6IE1hdGgubWF4KDAsIGVxLmF2YWlsYWJsZVVuaXRzIC0gMSkgfVxuICAgICAgICAgIDogZXFcbiAgICAgIClcbiAgICApO1xuXG4gICAgLy8gVXBkYXRlIEN1c3RvbWVyIENSTSAmIExveWFsdHkgUG9pbnRzXG4gICAgY29uc3QgZWFybmVkUHRzID0gc2VsZWN0ZWRFcXVpcG1lbnQubG95YWx0eVBvaW50c0Vhcm5lZCAqIGRheXNDb3VudCArIChpc0ZhbWlseVBsYW4gPyAxNTAgOiAwKTtcbiAgICBzZXRDdXN0b21lcnMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgoYykgPT5cbiAgICAgICAgYy5pZCA9PT0gc2VsZWN0ZWRDdXN0b21lci5pZFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAuLi5jLFxuICAgICAgICAgICAgICBsb3lhbHR5UG9pbnRzOlxuICAgICAgICAgICAgICAgIHBheW1lbnRNZXRob2QgPT09ICdMb3lhbHR5UG9pbnRzJ1xuICAgICAgICAgICAgICAgICAgPyBNYXRoLm1heCgwLCBjLmxveWFsdHlQb2ludHMgLSA1MDAgKyBlYXJuZWRQdHMpXG4gICAgICAgICAgICAgICAgICA6IGMubG95YWx0eVBvaW50cyArIGVhcm5lZFB0cyxcbiAgICAgICAgICAgICAgdG90YWxTcGVudFBsbjogYy50b3RhbFNwZW50UGxuICsgdG90YWxQcmljZVBsbixcbiAgICAgICAgICAgICAgYWN0aXZlUmVudGFsc0NvdW50OiBjLmFjdGl2ZVJlbnRhbHNDb3VudCArIDEsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiBjXG4gICAgICApXG4gICAgKTtcblxuICAgIC8vIEVtaXQgcmVhbC10aW1lIGF2YWlsYWJpbGl0eSAmIHBheW1lbnQgbm90aWZpY2F0aW9uXG4gICAgcHVzaE5vdGlmaWNhdGlvbih7XG4gICAgICB0eXBlOiAnUEFZTUVOVCcsXG4gICAgICB0aXRsZVBsOiBgT3DFgmFjb25vIHJlemVyd2FjasSZICR7bmV3UmVzLmlkfSAoJHtwYXltZW50TWV0aG9kfSlgLFxuICAgICAgdGl0bGVFbjogYFJlc2VydmF0aW9uICR7bmV3UmVzLmlkfSBwYWlkIG9ubGluZSAoJHtwYXltZW50TWV0aG9kfSlgLFxuICAgICAgZGV0YWlsUGw6IGAke3NlbGVjdGVkQ3VzdG9tZXIuZnVsbE5hbWV9IHd5cG/FvHljennFgihhKSAke3NlbGVjdGVkRXF1aXBtZW50Lm5hbWVQbH0gKCR7c3RhcnREYXRlfSDihpIgJHtlbmREYXRlfSkuIE5hbGljem9ubyArJHtlYXJuZWRQdHN9IHBrdCBsb2phbG5vxZtjaW93eWNoLmAsXG4gICAgICBkZXRhaWxFbjogYCR7c2VsZWN0ZWRDdXN0b21lci5mdWxsTmFtZX0gYm9va2VkICR7c2VsZWN0ZWRFcXVpcG1lbnQubmFtZUVufSAoJHtzdGFydERhdGV9IOKGkiAke2VuZERhdGV9KS4gQXdhcmRlZCArJHtlYXJuZWRQdHN9IGxveWFsdHkgcHRzLmAsXG4gICAgfSk7XG5cbiAgICBzZXRCb29raW5nRmVlZGJhY2soXG4gICAgICBsYW5nID09PSAncGwnXG4gICAgICAgID8gYFJlemVyd2FjamEgJHtuZXdSZXMuaWR9IG9wxYJhY29uYSAoJHt0b3RhbFByaWNlUGxufSBQTE4gcHJ6ZXogJHtwYXltZW50TWV0aG9kfSkuIE5hbGljem9ubyArJHtlYXJuZWRQdHN9IHBrdCBsb2phbG5vxZtjaW93eWNoIHcgQ1JNIWBcbiAgICAgICAgOiBgUmVzZXJ2YXRpb24gJHtuZXdSZXMuaWR9IGNvbmZpcm1lZCAoJHt0b3RhbFByaWNlUGxufSBQTE4gdmlhICR7cGF5bWVudE1ldGhvZH0pLiArJHtlYXJuZWRQdHN9IGxveWFsdHkgcG9pbnRzIGFkZGVkIHRvIENSTSFgXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXR1cm5FcXVpcG1lbnQgPSAocmVzOiBSZW50YWxSZXNlcnZhdGlvbikgPT4ge1xuICAgIGlmIChyZXMuc3RhdHVzID09PSAnUkVUVVJORUQnKSByZXR1cm47XG4gICAgc2V0UmVzZXJ2YXRpb25zKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHIpID0+IChyLmlkID09PSByZXMuaWQgPyB7IC4uLnIsIHN0YXR1czogJ1JFVFVSTkVEJyB9IDogcikpXG4gICAgKTtcbiAgICBzZXRFcXVpcG1lbnQoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgoZXEpID0+XG4gICAgICAgIGVxLmlkID09PSByZXMuZXF1aXBtZW50SWRcbiAgICAgICAgICA/IHsgLi4uZXEsIGF2YWlsYWJsZVVuaXRzOiBNYXRoLm1pbihlcS50b3RhbFVuaXRzLCBlcS5hdmFpbGFibGVVbml0cyArIDEpIH1cbiAgICAgICAgICA6IGVxXG4gICAgICApXG4gICAgKTtcbiAgICBwdXNoTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICdBVkFJTEFCSUxJVFknLFxuICAgICAgdGl0bGVQbDogYFp3cm90IHNwcnrEmXR1OiAke3Jlcy5lcXVpcG1lbnROYW1lfSBwb25vd25pZSBkb3N0xJlwbnkhYCxcbiAgICAgIHRpdGxlRW46IGBIYXJkd2FyZSBSZXR1cm5lZDogJHtyZXMuZXF1aXBtZW50TmFtZX0gaXMgYmFjayBpbiBzdG9jayFgLFxuICAgICAgZGV0YWlsUGw6IGBSZXplcndhY2phICR7cmVzLmlkfSB6YWtvxYRjem9uYS4gU3RhbiBtYWdhenlub3d5IHpha3R1YWxpem93YW55IHcgY3phc2llIHJ6ZWN6eXdpc3R5bS5gLFxuICAgICAgZGV0YWlsRW46IGBSZXNlcnZhdGlvbiAke3Jlcy5pZH0gY2xvc2VkLiBSZWFsLXRpbWUgaW52ZW50b3J5IGF2YWlsYWJpbGl0eSBpbmNyZW1lbnRlZC5gLFxuICAgIH0pO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIDE0IGRheXMgZm9yIHRoZSBpbnRlcmFjdGl2ZSB2aXN1YWwgcmVzZXJ2YXRpb24gY2FsZW5kYXIgbWF0cml4XG4gIGNvbnN0IGNhbGVuZGFyRGF5cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDE0IH0sIChfLCBpZHgpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoJzIwMjYtMTAtMjRUMDA6MDA6MDAnKTtcbiAgICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyBpZHgpO1xuICAgIHJldHVybiBkLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctWzEzODBweF0gbXgtYXV0byBweC02IHB5LTggc3BhY2UteS0xMFwiPlxuICAgICAgey8qIFNFQ1RJT04gMTogVlIgSEFSRFdBUkUgRkxFRVQgQ0FUQUxPRyAmIFJFQUwtVElNRSBBVkFJTEFCSUxJVFkgKi99XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1lbmQganVzdGlmeS1iZXR3ZWVuIGdhcC00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHBiLTRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICA/ICcwMS4gV3lwb8W8eWN6YWxuaWEgTmFyesSZZHppIFZSIGRvIFXFvHl0a3UgV8WCYXNuZWdvIGkgUm9kemlubmVnbydcbiAgICAgICAgICAgICAgICA6ICcwMS4gUGVyc29uYWwgJiBGYW1pbHkgVlIgSGFyZHdhcmUgUmVudGFsIEZsZWV0J31cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS00MDAgbXQtMVwiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgID8gJ1d5YmllcnogZ29nbGUgVlIsIHLEmWthd2ljZSBoYXB0eWN6bmUgbHViIHplc3RhdyByb2R6aW5ueSB6IGthbGlicmFjasSFIElQRCBkbGEga2HFvGRlZ28gZG9tb3duaWthLidcbiAgICAgICAgICAgICAgICA6ICdTZWxlY3QgVlIgaGVhZHNldHMsIGhhcHRpYyBnbG92ZXMsIG9yIGZhbWlseSBzaGFyaW5nIGJ1bmRsZXMgd2l0aCBwZXItbWVtYmVyIElQRCBwcm9maWxlcy4nfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTUwMCBkYXJrOnRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdTVEFUVVMgRE9TVMSYUE5PxZpDSTogQ1pBUyBSWkVDWllXSVNUWScgOiAnQVZBSUxBQklMSVRZIFNUQVRVUzogUkVBTC1USU1FJ31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC01XCI+XG4gICAgICAgICAge2VxdWlwbWVudC5tYXAoKGVxKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gZXEuaWQgPT09IHNlbGVjdGVkRXFJZDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2VxLmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkRXFJZChlcS5pZCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgY3Vyc29yLXBvaW50ZXIgcm91bmRlZC14bCBib3JkZXIgcC00IHRyYW5zaXRpb24tY29sb3JzIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuICR7XG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1hbWJlci01MDAgYmctYW1iZXItNTAwLzUgZGFyazpiZy1zbGF0ZS05MDAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIGJnLXdoaXRlIGRhcms6Ymctc2xhdGUtOTAwIGhvdmVyOmJvcmRlci1zbGF0ZS00MDAgZGFyazpob3Zlcjpib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxIYXJkd2FyZVN0dWRpb0lsbHVzdHJhdGlvbiBjYXRlZ29yeT17ZXEuY2F0ZWdvcnl9IC8+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBVbmJveGVkIGNsZWFuIG1ldGFkYXRhIHdpdGggdHlwb2dyYXBoaWMgc2VwYXJhdG9ycyAoWmVyby1QaWxsIERpc2NpcGxpbmUpICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgdGV4dC1zbGF0ZS01MDAgZGFyazp0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2VxLnNrdX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsK3PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZXEuZGVwb3RDaXR5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+wrc8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVxLmF2YWlsYWJsZVVuaXRzID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LWVtZXJhbGQtNjAwIGRhcms6dGV4dC1lbWVyYWxkLTQwMCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXJvc2UtNjAwIGRhcms6dGV4dC1yb3NlLTQwMCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtlcS5hdmFpbGFibGVVbml0c30ve2VxLnRvdGFsVW5pdHN9IHtsYW5nID09PSAncGwnID8gJ2Rvc3TEmXBuZScgOiAnYXZhaWwnfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cIm10LTEuNSB0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/IGVxLm5hbWVQbCA6IGVxLm5hbWVFbn1cbiAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQteHMgdGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTQwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAge2VxLnNwZWNzfVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHB0LTMgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCBmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtlcS5kYWlseVJhdGVQbG59IFBMTlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj4gLyB7bGFuZyA9PT0gJ3BsJyA/ICdkemllxYQnIDogJ2RheSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtYW1iZXItNjAwIGRhcms6dGV4dC1hbWJlci00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgK3tlcS5sb3lhbHR5UG9pbnRzRWFybmVkfSBwa3QvZFxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIHsvKiBTRUNUSU9OIDI6IE9OTElORSBCT09LSU5HLCBGQU1JTFkgU0hBUklORyBDT05GSUdVUkFUT1IgJiBMSVZFIEFWQUlMQUJJTElUWSBOT1RJRklDQVRJT05TICovfVxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTggaXRlbXMtc3RyZXRjaFwiPlxuICAgICAgICB7LyogTGVmdCA3IENvbHM6IEJvb2tpbmcgRm9ybSArIEZhbWlseSBTaGFyaW5nIFBvb2wgKyBPbmxpbmUgUGF5bWVudHMgKi99XG4gICAgICAgIDxmb3JtXG4gICAgICAgICAgb25TdWJtaXQ9e2hhbmRsZUNyZWF0ZVJlc2VydmF0aW9uQW5kUGF5fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgYmctd2hpdGUgZGFyazpiZy1zbGF0ZS05MDAgcC02IHNwYWNlLXktNVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHBiLTQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPENyZWRpdENhcmQgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWFtYmVyLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgID8gJzAyLiBSZXplcndhY2phLCBXeXBvxbx5Y3plbmllIFJvZHppbm5lIGkgUMWCYXRub8WbxIcgT25saW5lJ1xuICAgICAgICAgICAgICAgICAgOiAnMDIuIE9ubGluZSBSZXNlcnZhdGlvbiwgRmFtaWx5IFBvb2wgJiBJbnN0YW50IENoZWNrb3V0J31cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBkYXJrOnRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICA/ICdaaW50ZWdyb3dhbmUgeiBrYWxlbmRhcnplbSByZXplcndhY2ppLCBrb250ZW0ga2xpZW50YSB3IENSTSBvcmF6IHByb2dyYW1lbSBsb2phbG5vxZtjaW93eW0uJ1xuICAgICAgICAgICAgICAgICAgOiAnSW50ZWdyYXRlZCB3aXRoIHJlc2VydmF0aW9uIGNhbGVuZGFyLCBDUk0gY3VzdG9tZXIgcmVjb3JkcywgYW5kIGxveWFsdHkgcG9pbnRzLid9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1lbWVyYWxkLTYwMCBkYXJrOnRleHQtZW1lcmFsZC00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiBUTFMgMS4zIC8gRTJFRVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC00IHRleHQteHNcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwIGZvbnQtbWVkaXVtIG1iLTFcIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdXeWJyYW55IFNwcnrEmXQgVlInIDogJ1NlbGVjdGVkIFZSIEhhcmR3YXJlJ31cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZEVxSWR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWxlY3RlZEVxSWQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC1sZyBiZy1zbGF0ZS01MCBkYXJrOmJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIGZvbnQtbWVkaXVtXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtlcXVpcG1lbnQubWFwKChlcSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2VxLmlkfSB2YWx1ZT17ZXEuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/IGVxLm5hbWVQbCA6IGVxLm5hbWVFbn0gKHtlcS5kYWlseVJhdGVQbG59IFBMTi9kKVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwIGZvbnQtbWVkaXVtIG1iLTFcIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdLbGllbnQgLyBLb250byBSb2R6aW5uZSB3IENSTScgOiAnQ3VzdG9tZXIgLyBGYW1pbHkgQWNjb3VudCAoQ1JNKSd9XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDdXN0b21lcklkfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWRDdXN0b21lcklkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQtbGcgYmctc2xhdGUtNTAgZGFyazpiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBmb250LW1lZGl1bVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y3VzdG9tZXJzLm1hcCgoYykgPT4gKFxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2MuaWR9IHZhbHVlPXtjLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge2MuZnVsbE5hbWV9IOKAlCB7Yy5jb21wYW55T3JGYW1pbHlOYW1lfSAoe2MubG95YWx0eVBvaW50c30gcGt0KVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwIGZvbnQtbWVkaXVtIG1iLTFcIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdEYXRhIE9kYmlvcnUgLyBXeXN5xYJraSBLdXJpZXJza2llaicgOiAnU3RhcnQgRGF0ZSd9XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17c3RhcnREYXRlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U3RhcnREYXRlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQtbGcgYmctc2xhdGUtNTAgZGFyazpiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwIGZvbnQtbWVkaXVtIG1iLTFcIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdEYXRhIFp3cm90dScgOiAnUmV0dXJuIERhdGUnfVxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2VuZERhdGV9XG4gICAgICAgICAgICAgICAgbWluPXtzdGFydERhdGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbmREYXRlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQtbGcgYmctc2xhdGUtNTAgZGFyazpiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogRmFtaWx5IFNoYXJpbmcgQ29uZmlndXJhdG9yIChcInd5cG/FvHljemFuaWUgb2t1bGFyw7N3IHcgcm9kemluaWUgemUgc3RhdHlzdHlrYW1pIENSTVwiKSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtbGcgYmctc2xhdGUtNTAgZGFyazpiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHAtNCBzcGFjZS15LTMgdGV4dC14c1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17aXNGYW1pbHlQbGFufVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRJc0ZhbWlseVBsYW4oZS50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhY2NlbnQtYW1iZXItNTAwIHctNCBoLTRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFVzZXJzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci01MDBcIiAvPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICA/ICdXeXBvxbx5Y3plbmllIE9rdWxhcsOzdyB3IFJvZHppbmllIChXc3DDs8WCZHppZWxlbmllIFByb2ZpbGkgSVBEICsgU3RhdHlzdHlraSBDUk0pJ1xuICAgICAgICAgICAgICAgICAgOiAnRmFtaWx5IEhlYWRzZXQgU2hhcmluZyBNb2RlIChNdWx0aS1Vc2VyIElQRCBQcm9maWxlcyArIENSTSBTdGF0cyknfVxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1hbWJlci02MDAgZGFyazp0ZXh0LWFtYmVyLTQwMFwiPisxNTAgcGt0IGJvbnVzPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtpc0ZhbWlseVBsYW4gJiYgc2VsZWN0ZWRDdXN0b21lciAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTMgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZEN1c3RvbWVyLmZhbWlseU1lbWJlcnMubWFwKChmbSwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkIGJnLXdoaXRlIGRhcms6Ymctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+e2ZtLm1lbWJlck5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2ZtLnJvbGV9IMK3IElQRCB7Zm0uaXBkUHJlc2V0TW19bW0gwrcge2ZtLmhvdXJzVXNlZH1oXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogQWRkIEZhbWlseSBNZW1iZXIgaW5saW5lICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3RmFtTWVtYmVyTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdGYW1NZW1iZXJOYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhbmcgPT09ICdwbCcgPyAnSW1pxJkgY3rFgm9ua2Egcm9kemlueS4uLicgOiAnRmFtaWx5IG1lbWJlciBuYW1lLi4uJ31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LVsxNDBweF0gcHgtMi41IHB5LTEuNSByb3VuZGVkIGJnLXdoaXRlIGRhcms6Ymctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld0ZhbU1lbWJlclJvbGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3RmFtTWVtYmVyUm9sZShlLnRhcmdldC52YWx1ZSBhcyBhbnkpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMS41IHJvdW5kZWQgYmctd2hpdGUgZGFyazpiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJSb2R6aWMgLyBBZG1pblwiPlJvZHppYyAvIEFkbWluPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQYXJ0bmVyXCI+UGFydG5lcjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTmFzdG9sYXRla1wiPk5hc3RvbGF0ZWs8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkR6aWVja28gKFRyeWIgU2FmZVZSKVwiPkR6aWVja28gKFNhZmVWUik8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICBtaW49XCI1MlwiXG4gICAgICAgICAgICAgICAgICAgIG1heD1cIjcyXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld0ZhbU1lbWJlcklwZH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdGYW1NZW1iZXJJcGQoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMjAgcHgtMiBweS0xLjUgcm91bmRlZCBiZy13aGl0ZSBkYXJrOmJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgZm9udC1tb25vIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiSVBEIChtbSlcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUFkZEZhbWlseU1lbWJlclRvQ3VzdG9tZXJ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQgYmctc2xhdGUtOTAwIGRhcms6Ymctc2xhdGUtODAwIHRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtNzAwIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHdoaXRlc3BhY2Utbm93cmFwXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFBsdXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdEb2RhaiBEb21vd25pa2EnIDogJ0FkZCBNZW1iZXInfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBPbmxpbmUgUGF5bWVudCBNZXRob2QgU2VsZWN0b3IgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgdGV4dC14c1wiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS00MDAgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnTWV0b2RhIFDFgmF0bm/Fm2NpIE9ubGluZScgOiAnT25saW5lIFBheW1lbnQgTWV0aG9kJ31cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgeyhcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnQkxJSycsIGxhYmVsOiAnQkxJSyBJbnN0YW50JyB9LFxuICAgICAgICAgICAgICAgICAgeyBpZDogJ0NhcmQnLCBsYWJlbDogJ1Zpc2EgLyBNYXN0ZXJjYXJkJyB9LFxuICAgICAgICAgICAgICAgICAgeyBpZDogJ0FwcGxlUGF5JywgbGFiZWw6ICdBcHBsZSAvIEdvb2dsZSBQYXknIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnTG95YWx0eVBvaW50cycsIGxhYmVsOiBsYW5nID09PSAncGwnID8gJ1B1bmt0eSAoLTUwMCBwa3QpJyA6ICdQb2ludHMgKC01MDAgcHRzKScgfSxcbiAgICAgICAgICAgICAgICBdIGFzIGNvbnN0XG4gICAgICAgICAgICAgICkubWFwKChwbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17cG0uaWR9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBheW1lbnRNZXRob2QocG0uaWQpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHktMiBweC0zIHJvdW5kZWQtbGcgYm9yZGVyIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwICR7XG4gICAgICAgICAgICAgICAgICAgIHBheW1lbnRNZXRob2QgPT09IHBtLmlkXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNTAwIHRleHQtc2xhdGUtOTUwIGJvcmRlci1hbWJlci01MDAgZm9udC1zZW1pYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS01MCBkYXJrOmJnLXNsYXRlLTk1MCBib3JkZXItc2xhdGUtMzAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTcwMCBkYXJrOnRleHQtc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3BtLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7cGF5bWVudE1ldGhvZCA9PT0gJ0JMSUsnICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBwdC0xXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj57bGFuZyA9PT0gJ3BsJyA/ICdLb2QgQkxJSyAoNiBjeWZyKTonIDogJzYtZGlnaXQgQkxJSyBDb2RlOid9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXs3fVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2JsaWtDb2RlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCbGlrQ29kZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTMyIHB4LTMgcHktMS41IHJvdW5kZWQgYmctc2xhdGUtNTAgZGFyazpiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgZGFyazpib3JkZXItc2xhdGUtODAwIGZvbnQtbW9ubyB0ZXh0LXNtIHRyYWNraW5nLXdpZGVzdCB0ZXh0LWNlbnRlciB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBTdW1tYXJ5ICYgU3VibWl0IENUQSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTQgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAge2RheXNDb3VudH0ge2xhbmcgPT09ICdwbCcgPyAnZG5pIHd5cG/FvHljemVuaWEnIDogJ3JlbnRhbCBkYXlzJ30gwrd7JyAnfVxuICAgICAgICAgICAgICAgIHtpc0ZhbWlseVBsYW4gPyAobGFuZyA9PT0gJ3BsJyA/ICdQYWtpZXQgUm9kemlubnknIDogJ0ZhbWlseSBQbGFuJykgOiAnU3RhbmRhcmQnfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICB7dG90YWxQcmljZVBsbn0gUExOXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTYgcHktMyByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1hbWJlci01MDAgaG92ZXI6YmctYW1iZXItNDAwIHRleHQtc2xhdGUtOTUwIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICA/ICdaYXJlemVyd3VqIHcgS2FsZW5kYXJ6dSBpIE9wxYJhxIcgT25saW5lJ1xuICAgICAgICAgICAgICAgIDogJ0NvbmZpcm0gQ2FsZW5kYXIgQm9va2luZyAmIFBheSBPbmxpbmUnfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7Ym9va2luZ0ZlZWRiYWNrICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtbGcgYmctZW1lcmFsZC01MDAvMTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC8zMCB0ZXh0LXhzIHRleHQtZW1lcmFsZC02MDAgZGFyazp0ZXh0LWVtZXJhbGQtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy00IGgtNCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPntib29raW5nRmVlZGJhY2t9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9mb3JtPlxuXG4gICAgICAgIHsvKiBSaWdodCA1IENvbHM6IFJlYWwtVGltZSBFcXVpcG1lbnQgQXZhaWxhYmlsaXR5IE5vdGlmaWNhdGlvbiBTdHJlYW0gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCBiZy13aGl0ZSBkYXJrOmJnLXNsYXRlLTkwMCBwLTYgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItNCBib3JkZXItYiBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPEJlbGwgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWFtYmVyLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgID8gJ1Bvd2lhZG9taWVuaWEgbyBEb3N0xJlwbm/Fm2NpIG5hIMW7eXdvJ1xuICAgICAgICAgICAgICAgICAgOiAnUmVhbC1UaW1lIEF2YWlsYWJpbGl0eSAmIFN5c3RlbSBGZWVkJ31cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS01MDBcIj5MSVZFIFNUUkVBTTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgc3BhY2UteS0zIG1heC1oLVszODBweF0gb3ZlcmZsb3cteS1hdXRvIHByLTFcIj5cbiAgICAgICAgICAgICAge25vdGlmaWNhdGlvbnMubWFwKChuKSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAga2V5PXtuLmlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtbGcgYmctc2xhdGUtNTAgZGFyazpiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHRleHQteHMgc3BhY2UteS0xXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e24udHlwZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntuLnRpbWVzdGFtcH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyBuLnRpdGxlUGwgOiBuLnRpdGxlRW59XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTQwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyBuLmRldGFpbFBsIDogbi5kZXRhaWxFbn1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHB0LTMgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgPHNwYW4+V0VCSE9PSzogQUNUSVZFPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+wrc8L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5FMkUgTk9USUZJQ0FUSU9OIEJVUzwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIHsvKiBTRUNUSU9OIDM6IFZJU1VBTCBSRVNFUlZBVElPTiBDQUxFTkRBUiAmIFNDSEVEVUxFIE1BVFJJWCAqL31cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIGJnLXdoaXRlIGRhcms6Ymctc2xhdGUtOTAwIHAtNiBzcGFjZS15LTVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTQgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWFtYmVyLTUwMFwiIC8+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnMDMuIEhhcm1vbm9ncmFtIFd5cG/FvHljemXFhCB3IFByemVqcnp5c3R5bSBLYWxlbmRhcnp1IFJlemVyd2FjamknXG4gICAgICAgICAgICAgICAgOiAnMDMuIEhhcmR3YXJlIFJlbnRhbCBTY2hlZHVsZSAmIEludGVyYWN0aXZlIFJlc2VydmF0aW9uIENhbGVuZGFyJ31cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIGRhcms6dGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnWndyw7NjZW5pZSBzcHJ6xJl0dSBuYXR5Y2htaWFzdCBwcnp5d3JhY2EgcHVsxJkgZG9zdMSZcG5vxZtjaSBpIHd5c3nFgmEgcG93aWFkb21pZW5pZSBkbyBvY3pla3VqxIVjeWNoIHXFvHl0a293bmlrw7N3LidcbiAgICAgICAgICAgICAgICA6ICdSZXR1cm5pbmcgaGFyZHdhcmUgaW1tZWRpYXRlbHkgcmVzdG9yZXMgaW52ZW50b3J5IGF2YWlsYWJpbGl0eSBhbmQgbm90aWZpZXMgd2FpdGluZyB1c2Vycy4nfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogMTQtRGF5IFZpc3VhbCBUaW1lbGluZSBNYXRyaXggKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgYm9yZGVyLWNvbGxhcHNlIHRleHQteHNcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0yLjUgcHItNFwiPntsYW5nID09PSAncGwnID8gJ1JlemVyd2FjamEgLyBLbGllbnQnIDogJ0Jvb2tpbmcgLyBDdXN0b21lcid9PC90aD5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTNcIj57bGFuZyA9PT0gJ3BsJyA/ICdTcHJ6xJl0IFZSJyA6ICdWUiBFcXVpcG1lbnQnfTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTIuNSBweC0zXCI+e2xhbmcgPT09ICdwbCcgPyAnVHJ5YiAvIFJvZHppbmEnIDogJ1NoYXJpbmcgTW9kZSd9PC90aD5cbiAgICAgICAgICAgICAgICB7Y2FsZW5kYXJEYXlzLm1hcCgoZGF5KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8dGgga2V5PXtkYXl9IGNsYXNzTmFtZT1cInB5LTIgcHgtMS41IHRleHQtY2VudGVyIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgIHtkYXkuc2xpY2UoNSl9XG4gICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0yLjUgcGwtMyB0ZXh0LXJpZ2h0XCI+e2xhbmcgPT09ICdwbCcgPyAnQWtjamEnIDogJ0FjdGlvbid9PC90aD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPVwiZGl2aWRlLXkgZGl2aWRlLXNsYXRlLTIwMCBkYXJrOmRpdmlkZS1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAge3Jlc2VydmF0aW9ucy5tYXAoKHJlcykgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3Jlcy5pZH0gY2xhc3NOYW1lPVwiaG92ZXI6Ymctc2xhdGUtNTAvNzAgZGFyazpob3ZlcjpiZy1zbGF0ZS05NTAvNjBcIj5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHByLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiPntyZXMuY3VzdG9tZXJOYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtyZXMuaWR9IMK3IHtyZXMudG90YWxQcmljZVBsbn0gUExOICh7cmVzLnBheW1lbnRNZXRob2R9KVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC0zIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtODAwIGRhcms6dGV4dC1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAge3Jlcy5lcXVpcG1lbnROYW1lfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTMgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDAgZGFyazp0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7cmVzLmlzRmFtaWx5UGxhblxuICAgICAgICAgICAgICAgICAgICAgID8gYCR7bGFuZyA9PT0gJ3BsJyA/ICdSb2R6aW5ueScgOiAnRmFtaWx5J30gKCR7cmVzLmZhbWlseU1lbWJlcnMubGVuZ3RofSBvcy4pYFxuICAgICAgICAgICAgICAgICAgICAgIDogbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ0luZHl3aWR1YWxueSdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdQZXJzb25hbCd9XG4gICAgICAgICAgICAgICAgICAgIHsnIMK3ICd9XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMgPT09ICdPVkVSRFVFJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LXJvc2UtNTAwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogcmVzLnN0YXR1cyA9PT0gJ1JFVFVSTkVEJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1lbWVyYWxkLTUwMCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtyZXMuc3RhdHVzfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAge2NhbGVuZGFyRGF5cy5tYXAoKGRheSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVJbkRheSA9IGRheSA+PSByZXMuc3RhcnREYXRlICYmIGRheSA8PSByZXMuZW5kRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXtkYXl9IGNsYXNzTmFtZT1cInB5LTMgcHgtMSB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BoLTUgcm91bmRlZC1zbSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFhY3RpdmVJbkRheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtMTAwIGRhcms6Ymctc2xhdGUtOTUwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiByZXMuc3RhdHVzID09PSAnT1ZFUkRVRSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJvc2UtNTAwLzgwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiByZXMuc3RhdHVzID09PSAnUkVUVVJORUQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS00MDAvNDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHJlcy5pc0ZhbWlseVBsYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTUwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNreS01MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17YCR7cmVzLnN0YXJ0RGF0ZX0g4oaSICR7cmVzLmVuZERhdGV9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcGwtMyB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIHtyZXMuc3RhdHVzICE9PSAnUkVUVVJORUQnID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJldHVybkVxdWlwbWVudChyZXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZCB0ZXh0LVsxMXB4XSBmb250LW1lZGl1bSBiZy1zbGF0ZS05MDAgZGFyazpiZy1zbGF0ZS04MDAgdGV4dC13aGl0ZSBob3ZlcjpiZy1lbWVyYWxkLTYwMCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcFwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnT3puYWN6IFp3cm90JyA6ICdNYXJrIFJldHVybmVkJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1p3csOzY29ubycgOiAnUmV0dXJuZWQnfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==