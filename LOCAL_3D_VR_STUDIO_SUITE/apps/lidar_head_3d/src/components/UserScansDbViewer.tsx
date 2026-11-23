import __vite__cjsImport0_react_jsxDevRuntime from "/apps/lidar_head_3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=04dca6e3"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/apps/lidar_head_3d/node_modules/.vite/deps/react.js?v=04dca6e3"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react; const useState = __vite__cjsImport1_react["useState"];
import { Database, FileCode, CheckCircle, Clock, Link2, ChevronDown, ChevronUp, Layers, HelpCircle } from "/apps/lidar_head_3d/node_modules/.vite/deps/lucide-react.js?v=47b0976a";
export const UserScansDbViewer = ({ scans }) => {
  const [showSqlSchema, setShowSqlSchema] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const toggleRow = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };
  const sqlSchemaDef = `CREATE TABLE user_scans_raw (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES profiles(id),
    scan_type VARCHAR,        -- np. 'chomiki_twarz', 'oponka_brzuch'
    timestamp TIMESTAMPTZ,
    raw_images_url TEXT[],    -- Tablica linków do zdjęć z sesji
    lidar_data_url TEXT,      -- Link do surowego pliku chmury punktów (.ply lub .obj)
    is_processed BOOLEAN,     -- Czy analiza została wykonana
    metadata JSONB            -- Zapisane parametry: kąty (yaw, pitch, roll), luma, itp.
);`;
  return /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-900 rounded-xl overflow-hidden bg-slate-950", id: "db_viewer_root", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 border-b border-slate-900 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2", id: "db_viewer_header", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(Database, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 43,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-mono text-xs font-bold tracking-wider text-slate-200", children: "ACTIVE PERSISTENCE: 'user_scans_raw' POSTGRESQL TABLE" }, void 0, false, {
            fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
            lineNumber: 45,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-slate-500 font-mono", children: "Live representation of normalized 3D dataset records in cloud storage" }, void 0, false, {
            fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
            lineNumber: 48,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 44,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "button",
          onClick: () => setShowSqlSchema(!showSqlSchema),
          className: `font-mono text-[9px] px-2.5 py-1 rounded transition-all flex items-center gap-1.5 border ${showSqlSchema ? "bg-emerald-950/40 border-emerald-800 text-emerald-400" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300"}`,
          id: "toggle_sql_schema_btn",
          children: [
            /* @__PURE__ */ jsxDEV(FileCode, { className: "w-3 h-3" }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 64,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: showSqlSchema ? "HIDE DDL SCHEMA" : "SHOW DDL SCHEMA" }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 65,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 54,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this),
    showSqlSchema && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-4 border-b border-slate-900 font-mono text-[9px] text-emerald-500/90 leading-relaxed overflow-x-auto relative", id: "ddl_schema_block", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 right-2 text-[7px] font-bold text-emerald-600 bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900", children: "POSTGRESQL 16 DDL" }, void 0, false, {
        fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
        lineNumber: 72,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("pre", { children: sqlSchemaDef }, void 0, false, {
        fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
        lineNumber: 75,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
      lineNumber: 71,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", id: "db_table_container", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left font-mono text-[10px] text-slate-300 border-collapse", children: [
      /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "bg-slate-900/40 border-b border-slate-900 text-slate-500 text-[8px] uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-4 font-semibold", children: "id (UUID)" }, void 0, false, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 84,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-4 font-semibold", children: "scan_type" }, void 0, false, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 85,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-4 font-semibold", children: "timestamp" }, void 0, false, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 86,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-4 font-semibold", children: "raw_images_url" }, void 0, false, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 87,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-4 font-semibold", children: "lidar_data_url" }, void 0, false, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 88,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-4 font-semibold", children: "is_processed" }, void 0, false, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 89,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-4 font-semibold", children: "metadata (JSONB)" }, void 0, false, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 90,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-4 text-right", children: "actions" }, void 0, false, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 91,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
        lineNumber: 83,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
        lineNumber: 82,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-900/60", children: scans.length === 0 ? /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: 8, className: "py-8 text-center text-slate-500 font-mono text-[9px]", children: '-- NO ACTIVE ROW PERSISTED YET. TRIGGER "NORMALIZE & INGEST" TO POPULATE --' }, void 0, false, {
        fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
        lineNumber: 97,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
        lineNumber: 96,
        columnNumber: 15
      }, this) : scans.map((scan) => {
        const isExpanded = expandedRow === scan.id;
        return /* @__PURE__ */ jsxDEV(React.Fragment, { children: [
          /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-slate-900/20 transition-colors", children: [
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-4 font-semibold text-sky-400 select-all truncate max-w-[120px]", title: scan.id, children: scan.id }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 108,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide ${scan.scan_type === "oponka_brzuch" ? "bg-amber-950/60 border border-amber-900 text-amber-400" : "bg-emerald-950/60 border border-emerald-900 text-emerald-400"}`, children: scan.scan_type }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 114,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 113,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-4 text-slate-400", children: new Date(scan.timestamp).toLocaleString("en-GB", { hour12: false }) }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 124,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-4 max-w-[140px]", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: scan.raw_images_url && scan.raw_images_url[0] ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(
                "img",
                {
                  src: scan.raw_images_url[0],
                  alt: "scan thumbnail",
                  className: "w-5 h-5 rounded border border-slate-800 object-cover bg-slate-900",
                  referrerPolicy: "no-referrer"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                  lineNumber: 133,
                  columnNumber: 31
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[8px] truncate", children: "[1 Image Link]" }, void 0, false, {
                fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                lineNumber: 139,
                columnNumber: 31
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 132,
              columnNumber: 29
            }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-slate-600", children: "{}" }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 144,
              columnNumber: 29
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 130,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 129,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-4 max-w-[150px] truncate", title: scan.lidar_data_url, children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-slate-400 hover:text-sky-400 transition-colors", children: [
              /* @__PURE__ */ jsxDEV(Link2, { className: "w-2.5 h-2.5 text-sky-400 shrink-0" }, void 0, false, {
                fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                lineNumber: 152,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "truncate select-all text-[9px] font-mono", children: scan.lidar_data_url.split("/").pop() }, void 0, false, {
                fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                lineNumber: 153,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 151,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 150,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-4", children: scan.is_processed ? /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 text-emerald-400 text-[9px] font-bold", children: [
              /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                lineNumber: 161,
                columnNumber: 29
              }, this),
              "TRUE"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 160,
              columnNumber: 27
            }, this) : /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 text-amber-500 text-[9px] font-bold animate-pulse", children: [
              /* @__PURE__ */ jsxDEV(Clock, { className: "w-3 h-3 text-amber-500" }, void 0, false, {
                fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                lineNumber: 166,
                columnNumber: 29
              }, this),
              "FALSE"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 165,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 158,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-4 text-[9px] text-slate-400 max-w-[160px] truncate", children: [
              "Yaw:",
              scan.metadata.yaw.toFixed(0),
              "° | Luma:",
              scan.metadata.luma,
              " | Tris:",
              scan.metadata.triangleCount
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 173,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-4 text-right", children: /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => toggleRow(scan.id),
                className: "font-mono text-[8px] px-2 py-1 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-sky-300 rounded text-slate-400 transition-all inline-flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "JSONB" }, void 0, false, {
                    fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                    lineNumber: 184,
                    columnNumber: 27
                  }, this),
                  isExpanded ? /* @__PURE__ */ jsxDEV(ChevronUp, { className: "w-2.5 h-2.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                    lineNumber: 185,
                    columnNumber: 41
                  }, this) : /* @__PURE__ */ jsxDEV(ChevronDown, { className: "w-2.5 h-2.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                    lineNumber: 185,
                    columnNumber: 81
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                lineNumber: 179,
                columnNumber: 25
              },
              this
            ) }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 178,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
            lineNumber: 106,
            columnNumber: 21
          }, this),
          isExpanded && /* @__PURE__ */ jsxDEV("tr", { className: "bg-slate-950/65", children: /* @__PURE__ */ jsxDEV("td", { colSpan: 8, className: "py-3 px-6 border-b border-slate-900/60", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2.5 bg-slate-950 p-3 rounded-lg border border-slate-900", id: `json_detail_${scan.id}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-900 pb-1.5", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1", children: [
                /* @__PURE__ */ jsxDEV(Layers, { className: "w-3 h-3 text-sky-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                  lineNumber: 197,
                  columnNumber: 33
                }, this),
                "Row JSONB Metadata Document"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                lineNumber: 196,
                columnNumber: 31
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[7px] text-sky-400 font-mono uppercase bg-sky-950/30 border border-sky-900 px-1.5 py-0.5 rounded", children: "binary json format" }, void 0, false, {
                fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
                lineNumber: 200,
                columnNumber: 31
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 195,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ jsxDEV("pre", { className: "text-[8px] text-sky-300/90 leading-relaxed overflow-x-auto bg-slate-950/90 p-2.5 rounded font-mono", children: JSON.stringify(scan, null, 2) }, void 0, false, {
              fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
              lineNumber: 204,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
            lineNumber: 194,
            columnNumber: 27
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
            lineNumber: 193,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
            lineNumber: 192,
            columnNumber: 23
          }, this)
        ] }, scan.id, true, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 105,
          columnNumber: 19
        }, this);
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
        lineNumber: 94,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
      lineNumber: 81,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
      lineNumber: 80,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/40 border-t border-slate-900/60 px-4 py-2 flex items-center justify-between text-[8px] text-slate-500 font-mono", id: "db_viewer_footer", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxDEV(HelpCircle, { className: "w-3 h-3 text-slate-600" }, void 0, false, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 222,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Referential integrity matched to user profiles system table" }, void 0, false, {
          fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
          lineNumber: 223,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
        lineNumber: 221,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("span", { children: [
        "LIDAR PROJECTED POINTCLOUD DEVIATIONS CHECKPASS: ",
        scans.filter((s) => s.is_processed).length,
        " / ",
        scans.length
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
        lineNumber: 225,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
      lineNumber: 220,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/UserScansDbViewer.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVzZXJTY2Fuc0RiVmlld2VyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFVzZXJTY2FuUmF3IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRGF0YWJhc2UsIEZpbGVDb2RlLCBDaGVja0NpcmNsZSwgQ2xvY2ssIExpbmsyLCBDaGV2cm9uRG93biwgQ2hldnJvblVwLCBMYXllcnMsIEhlbHBDaXJjbGUgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5pbnRlcmZhY2UgVXNlclNjYW5zRGJWaWV3ZXJQcm9wcyB7XG4gIHNjYW5zOiBVc2VyU2NhblJhd1tdO1xufVxuXG5leHBvcnQgY29uc3QgVXNlclNjYW5zRGJWaWV3ZXI6IFJlYWN0LkZDPFVzZXJTY2Fuc0RiVmlld2VyUHJvcHM+ID0gKHsgc2NhbnMgfSkgPT4ge1xuICBjb25zdCBbc2hvd1NxbFNjaGVtYSwgc2V0U2hvd1NxbFNjaGVtYV0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtleHBhbmRlZFJvdywgc2V0RXhwYW5kZWRSb3ddID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgdG9nZ2xlUm93ID0gKGlkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoZXhwYW5kZWRSb3cgPT09IGlkKSB7XG4gICAgICBzZXRFeHBhbmRlZFJvdyhudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0RXhwYW5kZWRSb3coaWQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzcWxTY2hlbWFEZWYgPSBgQ1JFQVRFIFRBQkxFIHVzZXJfc2NhbnNfcmF3IChcbiAgICBpZCBVVUlEIFBSSU1BUlkgS0VZLFxuICAgIHVzZXJfaWQgVVVJRCBSRUZFUkVOQ0VTIHByb2ZpbGVzKGlkKSxcbiAgICBzY2FuX3R5cGUgVkFSQ0hBUiwgICAgICAgIC0tIG5wLiAnY2hvbWlraV90d2FyeicsICdvcG9ua2FfYnJ6dWNoJ1xuICAgIHRpbWVzdGFtcCBUSU1FU1RBTVBUWixcbiAgICByYXdfaW1hZ2VzX3VybCBURVhUW10sICAgIC0tIFRhYmxpY2EgbGlua8OzdyBkbyB6ZGrEmcSHIHogc2VzamlcbiAgICBsaWRhcl9kYXRhX3VybCBURVhULCAgICAgIC0tIExpbmsgZG8gc3Vyb3dlZ28gcGxpa3UgY2htdXJ5IHB1bmt0w7N3ICgucGx5IGx1YiAub2JqKVxuICAgIGlzX3Byb2Nlc3NlZCBCT09MRUFOLCAgICAgLS0gQ3p5IGFuYWxpemEgem9zdGHFgmEgd3lrb25hbmFcbiAgICBtZXRhZGF0YSBKU09OQiAgICAgICAgICAgIC0tIFphcGlzYW5lIHBhcmFtZXRyeToga8SFdHkgKHlhdywgcGl0Y2gsIHJvbGwpLCBsdW1hLCBpdHAuXG4pO2A7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItc2xhdGUtOTAwIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGJnLXNsYXRlLTk1MFwiIGlkPVwiZGJfdmlld2VyX3Jvb3RcIj5cbiAgICAgIFxuICAgICAgey8qIERhdGFiYXNlIENvbnNvbGUgSGVhZGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNjAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMCBweC00IHB5LTMgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCIgaWQ9XCJkYl92aWV3ZXJfaGVhZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICA8RGF0YWJhc2UgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciB0ZXh0LXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICBBQ1RJVkUgUEVSU0lTVEVOQ0U6ICd1c2VyX3NjYW5zX3JhdycgUE9TVEdSRVNRTCBUQUJMRVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgIExpdmUgcmVwcmVzZW50YXRpb24gb2Ygbm9ybWFsaXplZCAzRCBkYXRhc2V0IHJlY29yZHMgaW4gY2xvdWQgc3RvcmFnZVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1NxbFNjaGVtYSghc2hvd1NxbFNjaGVtYSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1tb25vIHRleHQtWzlweF0gcHgtMi41IHB5LTEgcm91bmRlZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGJvcmRlciAke1xuICAgICAgICAgICAgc2hvd1NxbFNjaGVtYVxuICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC80MCBib3JkZXItZW1lcmFsZC04MDAgdGV4dC1lbWVyYWxkLTQwMCdcbiAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0zMDAnXG4gICAgICAgICAgfWB9XG4gICAgICAgICAgaWQ9XCJ0b2dnbGVfc3FsX3NjaGVtYV9idG5cIlxuICAgICAgICA+XG4gICAgICAgICAgPEZpbGVDb2RlIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgIDxzcGFuPntzaG93U3FsU2NoZW1hID8gJ0hJREUgRERMIFNDSEVNQScgOiAnU0hPVyBEREwgU0NIRU1BJ308L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBTUUwgRERMIERlZmluaXRpb24gQmxvY2sgKi99XG4gICAgICB7c2hvd1NxbFNjaGVtYSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtNCBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRleHQtZW1lcmFsZC01MDAvOTAgbGVhZGluZy1yZWxheGVkIG92ZXJmbG93LXgtYXV0byByZWxhdGl2ZVwiIGlkPVwiZGRsX3NjaGVtYV9ibG9ja1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgcmlnaHQtMiB0ZXh0LVs3cHhdIGZvbnQtYm9sZCB0ZXh0LWVtZXJhbGQtNjAwIGJnLWVtZXJhbGQtOTUwLzMwIHB4LTEuNSBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtOTAwXCI+XG4gICAgICAgICAgICBQT1NUR1JFU1FMIDE2IERETFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxwcmU+e3NxbFNjaGVtYURlZn08L3ByZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogRGF0YWJhc2UgVGFibGUgdmlldyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvXCIgaWQ9XCJkYl90YWJsZV9jb250YWluZXJcIj5cbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgZm9udC1tb25vIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtMzAwIGJvcmRlci1jb2xsYXBzZVwiPlxuICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNDAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTUwMCB0ZXh0LVs4cHhdIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTQgZm9udC1zZW1pYm9sZFwiPmlkIChVVUlEKTwvdGg+XG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0yLjUgcHgtNCBmb250LXNlbWlib2xkXCI+c2Nhbl90eXBlPC90aD5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTIuNSBweC00IGZvbnQtc2VtaWJvbGRcIj50aW1lc3RhbXA8L3RoPlxuICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTQgZm9udC1zZW1pYm9sZFwiPnJhd19pbWFnZXNfdXJsPC90aD5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTIuNSBweC00IGZvbnQtc2VtaWJvbGRcIj5saWRhcl9kYXRhX3VybDwvdGg+XG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0yLjUgcHgtNCBmb250LXNlbWlib2xkXCI+aXNfcHJvY2Vzc2VkPC90aD5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTIuNSBweC00IGZvbnQtc2VtaWJvbGRcIj5tZXRhZGF0YSAoSlNPTkIpPC90aD5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTIuNSBweC00IHRleHQtcmlnaHRcIj5hY3Rpb25zPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPVwiZGl2aWRlLXkgZGl2aWRlLXNsYXRlLTkwMC82MFwiPlxuICAgICAgICAgICAge3NjYW5zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXs4fSBjbGFzc05hbWU9XCJweS04IHRleHQtY2VudGVyIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ubyB0ZXh0LVs5cHhdXCI+XG4gICAgICAgICAgICAgICAgICAtLSBOTyBBQ1RJVkUgUk9XIFBFUlNJU1RFRCBZRVQuIFRSSUdHRVIgXCJOT1JNQUxJWkUgJiBJTkdFU1RcIiBUTyBQT1BVTEFURSAtLVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICBzY2Fucy5tYXAoKHNjYW4pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0V4cGFuZGVkID0gZXhwYW5kZWRSb3cgPT09IHNjYW4uaWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e3NjYW4uaWR9PlxuICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiaG92ZXI6Ymctc2xhdGUtOTAwLzIwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgey8qIFVVSUQgaWQgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtNCBmb250LXNlbWlib2xkIHRleHQtc2t5LTQwMCBzZWxlY3QtYWxsIHRydW5jYXRlIG1heC13LVsxMjBweF1cIiB0aXRsZT17c2Nhbi5pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2Nhbi5pZH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBzY2FuX3R5cGUgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMiBweS0wLjUgcm91bmRlZCB0ZXh0LVs4cHhdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuLnNjYW5fdHlwZSA9PT0gJ29wb25rYV9icnp1Y2gnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItOTUwLzYwIGJvcmRlciBib3JkZXItYW1iZXItOTAwIHRleHQtYW1iZXItNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWVtZXJhbGQtOTUwLzYwIGJvcmRlciBib3JkZXItZW1lcmFsZC05MDAgdGV4dC1lbWVyYWxkLTQwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3NjYW4uc2Nhbl90eXBlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogdGltZXN0YW1wICovfVxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTQgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtuZXcgRGF0ZShzY2FuLnRpbWVzdGFtcCkudG9Mb2NhbGVTdHJpbmcoJ2VuLUdCJywgeyBob3VyMTI6IGZhbHNlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogcmF3X2ltYWdlc191cmwgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtNCBtYXgtdy1bMTQwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3NjYW4ucmF3X2ltYWdlc191cmwgJiYgc2Nhbi5yYXdfaW1hZ2VzX3VybFswXSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e3NjYW4ucmF3X2ltYWdlc191cmxbMF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cInNjYW4gdGh1bWJuYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy01IGgtNSByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtODAwIG9iamVjdC1jb3ZlciBiZy1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVs4cHhdIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsxIEltYWdlIExpbmtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDBcIj57XCJ7fVwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogbGlkYXJfZGF0YV91cmwgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtNCBtYXgtdy1bMTUwcHhdIHRydW5jYXRlXCIgdGl0bGU9e3NjYW4ubGlkYXJfZGF0YV91cmx9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNreS00MDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsyIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHRleHQtc2t5LTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlIHNlbGVjdC1hbGwgdGV4dC1bOXB4XSBmb250LW1vbm9cIj57c2Nhbi5saWRhcl9kYXRhX3VybC5zcGxpdCgnLycpLnBvcCgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogaXNfcHJvY2Vzc2VkICovfVxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzY2FuLmlzX3Byb2Nlc3NlZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1lbWVyYWxkLTQwMCB0ZXh0LVs5cHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZSBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRSVUVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1hbWJlci01MDAgdGV4dC1bOXB4XSBmb250LWJvbGQgYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDbG9jayBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtYW1iZXItNTAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGQUxTRVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogbWV0YWRhdGEgcHJldmlldyBzdW1tYXJ5ICovfVxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTQgdGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTQwMCBtYXgtdy1bMTYwcHhdIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBZYXc6e3NjYW4ubWV0YWRhdGEueWF3LnRvRml4ZWQoMCl9wrAgfCBMdW1hOntzY2FuLm1ldGFkYXRhLmx1bWF9IHwgVHJpczp7c2Nhbi5tZXRhZGF0YS50cmlhbmdsZUNvdW50fVxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogYWN0aW9ucyAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC00IHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRvZ2dsZVJvdyhzY2FuLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gcHgtMiBweS0xIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS04NTAgaG92ZXI6dGV4dC1za3ktMzAwIHJvdW5kZWQgdGV4dC1zbGF0ZS00MDAgdHJhbnNpdGlvbi1hbGwgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SlNPTkI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0V4cGFuZGVkID8gPENoZXZyb25VcCBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+IDogPENoZXZyb25Eb3duIGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBDb2xsYXBzaWJsZSBKU09OQiBkZXRhaWwgcm93ICovfVxuICAgICAgICAgICAgICAgICAgICB7aXNFeHBhbmRlZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MC82NVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezh9IGNsYXNzTmFtZT1cInB5LTMgcHgtNiBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwLzYwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMi41IGJnLXNsYXRlLTk1MCBwLTMgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMFwiIGlkPXtganNvbl9kZXRhaWxfJHtzY2FuLmlkfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgcGItMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTUwMCB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExheWVycyBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJvdyBKU09OQiBNZXRhZGF0YSBEb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bN3B4XSB0ZXh0LXNreS00MDAgZm9udC1tb25vIHVwcGVyY2FzZSBiZy1za3ktOTUwLzMwIGJvcmRlciBib3JkZXItc2t5LTkwMCBweC0xLjUgcHktMC41IHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5IGpzb24gZm9ybWF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIHRleHQtc2t5LTMwMC85MCBsZWFkaW5nLXJlbGF4ZWQgb3ZlcmZsb3cteC1hdXRvIGJnLXNsYXRlLTk1MC85MCBwLTIuNSByb3VuZGVkIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge0pTT04uc3RyaW5naWZ5KHNjYW4sIG51bGwsIDIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSW5mb3JtYXRpdmUgVGFibGUgRm9vdGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvNDAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMC82MCBweC00IHB5LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzhweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vXCIgaWQ9XCJkYl92aWV3ZXJfZm9vdGVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgPEhlbHBDaXJjbGUgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXNsYXRlLTYwMFwiIC8+XG4gICAgICAgICAgPHNwYW4+UmVmZXJlbnRpYWwgaW50ZWdyaXR5IG1hdGNoZWQgdG8gdXNlciBwcm9maWxlcyBzeXN0ZW0gdGFibGU8L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgTElEQVIgUFJPSkVDVEVEIFBPSU5UQ0xPVUQgREVWSUFUSU9OUyBDSEVDS1BBU1M6IHtzY2Fucy5maWx0ZXIocyA9PiBzLmlzX3Byb2Nlc3NlZCkubGVuZ3RofSAvIHtzY2Fucy5sZW5ndGh9XG4gICAgICAgIDwvc3Bhbj5c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