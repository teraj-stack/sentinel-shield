export const DEPARTMENTS = [
  {
    id: "proctology",
    name: "Proctology",
    namePl: "Proktologia",
    subtitle: "Advanced Colorectal & Laser Diagnostics",
    shortDesc: "Painless laser procedures, high-definition anoscopy, and minimally invasive treatments.",
    fullDesc: "Our Proctology unit provides state-of-the-art diagnostic and surgical solutions in a dignified, stress-free environment. Utilizing modern laser technology (HeLPS, LHP) and high-resolution ultrasonic imaging.",
    iconName: "Activity",
    accentColor: "from-sky-400 to-indigo-500",
    badge: "Laser Precision",
    pedestalPosition: { x: 18, y: 65 },
    features: [
      "LHP® Laser Hemorrhoidoplasty",
      "Endosonography 3D ultrasound",
      "Painless outpatient diagnostics",
      "Fast 24h recovery protocol"
    ],
    doctors: [
      {
        id: "doc-1",
        name: "Dr. hab. n. med. Marek Wisniewski",
        title: "Senior Proctology Consultant",
        specialty: "Laser Colorectal Surgery",
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80",
        experienceYears: 18
      },
      {
        id: "doc-2",
        name: "Dr n. med. Anna Kowalska-Kruk",
        title: "Specialist Surgeon",
        specialty: "Diagnostic Anoscopy & Pelvic Health",
        avatar: "https://images.unsplash.com/photo-1594824813566-789552791ba3?w=300&auto=format&fit=crop&q=80",
        experienceYears: 12
      }
    ],
    treatments: [
      {
        id: "p-1",
        title: "LHP® Laser Hemorrhoid Treatment",
        description: "Minimally invasive laser coagulation under local anesthesia with minimal discomfort.",
        durationMinutes: 45,
        pricePln: 3800,
        category: "Laser Surgery",
        isPopular: true
      },
      {
        id: "p-2",
        title: "High-Definition Video Anoscopy",
        description: "Comprehensive digital optical evaluation with immediate high-res report.",
        durationMinutes: 30,
        pricePln: 350,
        category: "Diagnostics"
      },
      {
        id: "p-3",
        title: "Fissure Laser Vaporization",
        description: "Precision diode laser treatment promoting rapid tissue epithelialization.",
        durationMinutes: 40,
        pricePln: 2900,
        category: "Laser Surgery"
      }
    ]
  },
  {
    id: "surgery",
    name: "General & Plastic Surgery",
    namePl: "Chirurgia Ogólna i Estetyczna",
    subtitle: "Ultra-precision Surgical Suites & Rapid Recovery",
    shortDesc: "Endoscopic hernioplasty, soft tissue reconstruction, and outpatient minor surgery.",
    fullDesc: "Equipped with ultra-clean ISO Class 5 laminar flow operating rooms. We combine micro-incision technology with biological mesh integrations for superior long-term surgical outcomes.",
    iconName: "ShieldAlert",
    accentColor: "from-teal-400 to-emerald-600",
    badge: "ISO Class 5 OR",
    pedestalPosition: { x: 38, y: 62 },
    features: [
      "Laparoscopic 4K 3D vision systems",
      "Day-surgery outpatient protocols",
      "Biological tissue-reinforcing meshes",
      "Dedicated private recovery pods"
    ],
    doctors: [
      {
        id: "doc-3",
        name: "Prof. dr hab. Piotr Zieliński",
        title: "Head of Surgical Innovations",
        specialty: "Laparoscopic & Hernia Surgery",
        avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80",
        experienceYears: 24
      }
    ],
    treatments: [
      {
        id: "s-1",
        title: "3D Mesh Laparoscopic Hernioplasty",
        description: "TAPP/TEP endoscopic repair allowing return to full physical activity within 7 days.",
        durationMinutes: 75,
        pricePln: 6500,
        category: "Laparoscopy",
        isPopular: true
      },
      {
        id: "s-2",
        title: "Radiofrequency Tissue Resection",
        description: "Scarless radiofrequency removal of cutaneous & subcutaneous lesions.",
        durationMinutes: 30,
        pricePln: 800,
        category: "Outpatient"
      },
      {
        id: "s-3",
        title: "Diagnostic Ultrasound Guided Biopsy",
        description: "Real-time ultrasound micro-needle tissue sampling with accelerated lab results.",
        durationMinutes: 25,
        pricePln: 600,
        category: "Diagnostics"
      }
    ]
  },
  {
    id: "phlebology",
    name: "Phlebology",
    namePl: "Flebologia",
    subtitle: "Vascular Medicine & Laser Vein Therapy",
    shortDesc: "Doppler ultrasound hemodynamics, EVLT endovenous laser, and foam sclerotherapy.",
    fullDesc: "Comprehensive vascular diagnostic center specializing in varicose veins, venous insufficiency, and spider vein aesthetics. Modern dual-wavelength 1470nm laser systems ensure maximal patient comfort.",
    iconName: "Zap",
    accentColor: "from-cyan-400 to-blue-600",
    badge: "Dual-Wave 1470nm",
    pedestalPosition: { x: 62, y: 64 },
    features: [
      "Color Doppler Ultrasound Hemodynamics",
      "EVLT® 1470nm Radial Laser Ablation",
      "CLaCS (Cryo-Laser & Cryo-Sclerotherapy)",
      "Customized compression therapy fitting"
    ],
    doctors: [
      {
        id: "doc-4",
        name: "Dr n. med. Ewa Majewska",
        title: "Consultant Vascular Surgeon",
        specialty: "Endovenous Laser & Hemodynamics",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80",
        experienceYears: 15
      }
    ],
    treatments: [
      {
        id: "f-1",
        title: "EVLT® Radial Laser Vein Ablation",
        description: "Endovenous laser closure of saphenous veins with ultrasound guidance under local tumescent anesthesia.",
        durationMinutes: 60,
        pricePln: 4200,
        category: "Endovenous Laser",
        isPopular: true
      },
      {
        id: "f-2",
        title: "Echo-Guided Foam Sclerotherapy",
        description: "Targeted micro-foam injection for medium and reticular varicose veins.",
        durationMinutes: 35,
        pricePln: 950,
        category: "Sclerotherapy"
      },
      {
        id: "f-3",
        title: "Duplex Doppler Vascular Mapping",
        description: "Complete 3D mapping of superficial and deep venous reflux.",
        durationMinutes: 40,
        pricePln: 380,
        category: "Diagnostics"
      }
    ]
  },
  {
    id: "shop",
    name: "Clinic Shop & Pharmacy",
    namePl: "Sklep Medyczny i Apteka",
    subtitle: "Post-treatment Care, Compression & Supplements",
    shortDesc: "Certified medical compression wear, dermatological wound care, and recovery formulas.",
    fullDesc: "Direct access to doctor-curated medical products, medical-grade compression stockings, post-operative specialized dressings, and bio-available micro-nutrient formulas.",
    iconName: "ShoppingBag",
    accentColor: "from-amber-400 to-rose-500",
    badge: "Certified Medical Grade",
    pedestalPosition: { x: 82, y: 66 },
    features: [
      "Graduated CCL1 & CCL2 compression garments",
      "Sterile hydrocolloid & silicone scar sheets",
      "Clinical vascular & collagen supplements",
      "Fast direct delivery & click-and-collect"
    ],
    doctors: [],
    treatments: []
  }
];
export const PRODUCTS = [
  {
    id: "prod-1",
    name: "Venoflow® Class 2 Compression Stockings",
    category: "vascular",
    price: 240,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
    description: "Swiss-designed graduated pressure compression (23-32 mmHg) for varicose prevention and post-EVLT recovery.",
    inStock: true,
    badge: "Doctor Recommended"
  },
  {
    id: "prod-2",
    name: "Cicatrizel® Silicone Scar Gel 50g",
    category: "post-op",
    price: 135,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1608248597261-e4d0947c8b8b?w=400&auto=format&fit=crop&q=80",
    description: "Medical grade silicone gel for hyperpigmentation reduction and rapid post-surgical tissue smoothing.",
    inStock: true,
    badge: "Bestseller"
  },
  {
    id: "prod-3",
    name: "ProctoShield® Bio-Repair Ointment",
    category: "post-op",
    price: 89,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80",
    description: "Natural hyaluronic acid and Calendula extract barrier balm for tissue regeneration.",
    inStock: true
  },
  {
    id: "prod-4",
    name: "VascularComplex Dual Diosmin 1000mg",
    category: "supplements",
    price: 110,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&auto=format&fit=crop&q=80",
    description: "Micronized flavonoid fraction (900mg diosmin + 100mg hesperidin) supporting venous wall elasticity.",
    inStock: true,
    badge: "High Potency"
  },
  {
    id: "prod-5",
    name: "HydroClear® Sterile Post-Op Dressings (Pack of 10)",
    category: "post-op",
    price: 65,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&auto=format&fit=crop&q=80",
    description: "Waterproof breathable barrier film with pad for surgical incision protection during showering.",
    inStock: true
  },
  {
    id: "prod-6",
    name: "PureDerm® Soothing Cleansing Foam",
    category: "dermo",
    price: 78,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556228722-d119f010375f?w=400&auto=format&fit=crop&q=80",
    description: "Hypoallergenic physiological pH 5.5 cleanser without harsh sulfates for sensitive surgical areas.",
    inStock: true
  }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaW5pY0RhdGEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVwYXJ0bWVudCwgUHJvZHVjdCB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IERFUEFSVE1FTlRTOiBEZXBhcnRtZW50W10gPSBbXG4gIHtcbiAgICBpZDogJ3Byb2N0b2xvZ3knLFxuICAgIG5hbWU6ICdQcm9jdG9sb2d5JyxcbiAgICBuYW1lUGw6ICdQcm9rdG9sb2dpYScsXG4gICAgc3VidGl0bGU6ICdBZHZhbmNlZCBDb2xvcmVjdGFsICYgTGFzZXIgRGlhZ25vc3RpY3MnLFxuICAgIHNob3J0RGVzYzogJ1BhaW5sZXNzIGxhc2VyIHByb2NlZHVyZXMsIGhpZ2gtZGVmaW5pdGlvbiBhbm9zY29weSwgYW5kIG1pbmltYWxseSBpbnZhc2l2ZSB0cmVhdG1lbnRzLicsXG4gICAgZnVsbERlc2M6ICdPdXIgUHJvY3RvbG9neSB1bml0IHByb3ZpZGVzIHN0YXRlLW9mLXRoZS1hcnQgZGlhZ25vc3RpYyBhbmQgc3VyZ2ljYWwgc29sdXRpb25zIGluIGEgZGlnbmlmaWVkLCBzdHJlc3MtZnJlZSBlbnZpcm9ubWVudC4gVXRpbGl6aW5nIG1vZGVybiBsYXNlciB0ZWNobm9sb2d5IChIZUxQUywgTEhQKSBhbmQgaGlnaC1yZXNvbHV0aW9uIHVsdHJhc29uaWMgaW1hZ2luZy4nLFxuICAgIGljb25OYW1lOiAnQWN0aXZpdHknLFxuICAgIGFjY2VudENvbG9yOiAnZnJvbS1za3ktNDAwIHRvLWluZGlnby01MDAnLFxuICAgIGJhZGdlOiAnTGFzZXIgUHJlY2lzaW9uJyxcbiAgICBwZWRlc3RhbFBvc2l0aW9uOiB7IHg6IDE4LCB5OiA2NSB9LFxuICAgIGZlYXR1cmVzOiBbXG4gICAgICAnTEhQwq4gTGFzZXIgSGVtb3JyaG9pZG9wbGFzdHknLFxuICAgICAgJ0VuZG9zb25vZ3JhcGh5IDNEIHVsdHJhc291bmQnLFxuICAgICAgJ1BhaW5sZXNzIG91dHBhdGllbnQgZGlhZ25vc3RpY3MnLFxuICAgICAgJ0Zhc3QgMjRoIHJlY292ZXJ5IHByb3RvY29sJ1xuICAgIF0sXG4gICAgZG9jdG9yczogW1xuICAgICAge1xuICAgICAgICBpZDogJ2RvYy0xJyxcbiAgICAgICAgbmFtZTogJ0RyLiBoYWIuIG4uIG1lZC4gTWFyZWsgV2lzbmlld3NraScsXG4gICAgICAgIHRpdGxlOiAnU2VuaW9yIFByb2N0b2xvZ3kgQ29uc3VsdGFudCcsXG4gICAgICAgIHNwZWNpYWx0eTogJ0xhc2VyIENvbG9yZWN0YWwgU3VyZ2VyeScsXG4gICAgICAgIGF2YXRhcjogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjIyMjUzNjkyMDEwLTMzM2YyZGE2MDMxZD93PTMwMCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZxPTgwJyxcbiAgICAgICAgZXhwZXJpZW5jZVllYXJzOiAxOFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdkb2MtMicsXG4gICAgICAgIG5hbWU6ICdEciBuLiBtZWQuIEFubmEgS293YWxza2EtS3J1aycsXG4gICAgICAgIHRpdGxlOiAnU3BlY2lhbGlzdCBTdXJnZW9uJyxcbiAgICAgICAgc3BlY2lhbHR5OiAnRGlhZ25vc3RpYyBBbm9zY29weSAmIFBlbHZpYyBIZWFsdGgnLFxuICAgICAgICBhdmF0YXI6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5NDgyNDgxMzU2Ni03ODk1NTI3OTFiYTM/dz0zMDAmYXV0bz1mb3JtYXQmZml0PWNyb3AmcT04MCcsXG4gICAgICAgIGV4cGVyaWVuY2VZZWFyczogMTJcbiAgICAgIH1cbiAgICBdLFxuICAgIHRyZWF0bWVudHM6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdwLTEnLFxuICAgICAgICB0aXRsZTogJ0xIUMKuIExhc2VyIEhlbW9ycmhvaWQgVHJlYXRtZW50JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdNaW5pbWFsbHkgaW52YXNpdmUgbGFzZXIgY29hZ3VsYXRpb24gdW5kZXIgbG9jYWwgYW5lc3RoZXNpYSB3aXRoIG1pbmltYWwgZGlzY29tZm9ydC4nLFxuICAgICAgICBkdXJhdGlvbk1pbnV0ZXM6IDQ1LFxuICAgICAgICBwcmljZVBsbjogMzgwMCxcbiAgICAgICAgY2F0ZWdvcnk6ICdMYXNlciBTdXJnZXJ5JyxcbiAgICAgICAgaXNQb3B1bGFyOiB0cnVlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ3AtMicsXG4gICAgICAgIHRpdGxlOiAnSGlnaC1EZWZpbml0aW9uIFZpZGVvIEFub3Njb3B5JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdDb21wcmVoZW5zaXZlIGRpZ2l0YWwgb3B0aWNhbCBldmFsdWF0aW9uIHdpdGggaW1tZWRpYXRlIGhpZ2gtcmVzIHJlcG9ydC4nLFxuICAgICAgICBkdXJhdGlvbk1pbnV0ZXM6IDMwLFxuICAgICAgICBwcmljZVBsbjogMzUwLFxuICAgICAgICBjYXRlZ29yeTogJ0RpYWdub3N0aWNzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdwLTMnLFxuICAgICAgICB0aXRsZTogJ0Zpc3N1cmUgTGFzZXIgVmFwb3JpemF0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdQcmVjaXNpb24gZGlvZGUgbGFzZXIgdHJlYXRtZW50IHByb21vdGluZyByYXBpZCB0aXNzdWUgZXBpdGhlbGlhbGl6YXRpb24uJyxcbiAgICAgICAgZHVyYXRpb25NaW51dGVzOiA0MCxcbiAgICAgICAgcHJpY2VQbG46IDI5MDAsXG4gICAgICAgIGNhdGVnb3J5OiAnTGFzZXIgU3VyZ2VyeSdcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBpZDogJ3N1cmdlcnknLFxuICAgIG5hbWU6ICdHZW5lcmFsICYgUGxhc3RpYyBTdXJnZXJ5JyxcbiAgICBuYW1lUGw6ICdDaGlydXJnaWEgT2fDs2xuYSBpIEVzdGV0eWN6bmEnLFxuICAgIHN1YnRpdGxlOiAnVWx0cmEtcHJlY2lzaW9uIFN1cmdpY2FsIFN1aXRlcyAmIFJhcGlkIFJlY292ZXJ5JyxcbiAgICBzaG9ydERlc2M6ICdFbmRvc2NvcGljIGhlcm5pb3BsYXN0eSwgc29mdCB0aXNzdWUgcmVjb25zdHJ1Y3Rpb24sIGFuZCBvdXRwYXRpZW50IG1pbm9yIHN1cmdlcnkuJyxcbiAgICBmdWxsRGVzYzogJ0VxdWlwcGVkIHdpdGggdWx0cmEtY2xlYW4gSVNPIENsYXNzIDUgbGFtaW5hciBmbG93IG9wZXJhdGluZyByb29tcy4gV2UgY29tYmluZSBtaWNyby1pbmNpc2lvbiB0ZWNobm9sb2d5IHdpdGggYmlvbG9naWNhbCBtZXNoIGludGVncmF0aW9ucyBmb3Igc3VwZXJpb3IgbG9uZy10ZXJtIHN1cmdpY2FsIG91dGNvbWVzLicsXG4gICAgaWNvbk5hbWU6ICdTaGllbGRBbGVydCcsXG4gICAgYWNjZW50Q29sb3I6ICdmcm9tLXRlYWwtNDAwIHRvLWVtZXJhbGQtNjAwJyxcbiAgICBiYWRnZTogJ0lTTyBDbGFzcyA1IE9SJyxcbiAgICBwZWRlc3RhbFBvc2l0aW9uOiB7IHg6IDM4LCB5OiA2MiB9LFxuICAgIGZlYXR1cmVzOiBbXG4gICAgICAnTGFwYXJvc2NvcGljIDRLIDNEIHZpc2lvbiBzeXN0ZW1zJyxcbiAgICAgICdEYXktc3VyZ2VyeSBvdXRwYXRpZW50IHByb3RvY29scycsXG4gICAgICAnQmlvbG9naWNhbCB0aXNzdWUtcmVpbmZvcmNpbmcgbWVzaGVzJyxcbiAgICAgICdEZWRpY2F0ZWQgcHJpdmF0ZSByZWNvdmVyeSBwb2RzJ1xuICAgIF0sXG4gICAgZG9jdG9yczogW1xuICAgICAge1xuICAgICAgICBpZDogJ2RvYy0zJyxcbiAgICAgICAgbmFtZTogJ1Byb2YuIGRyIGhhYi4gUGlvdHIgWmllbGnFhHNraScsXG4gICAgICAgIHRpdGxlOiAnSGVhZCBvZiBTdXJnaWNhbCBJbm5vdmF0aW9ucycsXG4gICAgICAgIHNwZWNpYWx0eTogJ0xhcGFyb3Njb3BpYyAmIEhlcm5pYSBTdXJnZXJ5JyxcbiAgICAgICAgYXZhdGFyOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzczNjg5MTAwMjUtNzAwMzUwZmU0NmM3P3c9MzAwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAnLFxuICAgICAgICBleHBlcmllbmNlWWVhcnM6IDI0XG4gICAgICB9XG4gICAgXSxcbiAgICB0cmVhdG1lbnRzOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAncy0xJyxcbiAgICAgICAgdGl0bGU6ICczRCBNZXNoIExhcGFyb3Njb3BpYyBIZXJuaW9wbGFzdHknLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RBUFAvVEVQIGVuZG9zY29waWMgcmVwYWlyIGFsbG93aW5nIHJldHVybiB0byBmdWxsIHBoeXNpY2FsIGFjdGl2aXR5IHdpdGhpbiA3IGRheXMuJyxcbiAgICAgICAgZHVyYXRpb25NaW51dGVzOiA3NSxcbiAgICAgICAgcHJpY2VQbG46IDY1MDAsXG4gICAgICAgIGNhdGVnb3J5OiAnTGFwYXJvc2NvcHknLFxuICAgICAgICBpc1BvcHVsYXI6IHRydWVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAncy0yJyxcbiAgICAgICAgdGl0bGU6ICdSYWRpb2ZyZXF1ZW5jeSBUaXNzdWUgUmVzZWN0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTY2FybGVzcyByYWRpb2ZyZXF1ZW5jeSByZW1vdmFsIG9mIGN1dGFuZW91cyAmIHN1YmN1dGFuZW91cyBsZXNpb25zLicsXG4gICAgICAgIGR1cmF0aW9uTWludXRlczogMzAsXG4gICAgICAgIHByaWNlUGxuOiA4MDAsXG4gICAgICAgIGNhdGVnb3J5OiAnT3V0cGF0aWVudCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAncy0zJyxcbiAgICAgICAgdGl0bGU6ICdEaWFnbm9zdGljIFVsdHJhc291bmQgR3VpZGVkIEJpb3BzeScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnUmVhbC10aW1lIHVsdHJhc291bmQgbWljcm8tbmVlZGxlIHRpc3N1ZSBzYW1wbGluZyB3aXRoIGFjY2VsZXJhdGVkIGxhYiByZXN1bHRzLicsXG4gICAgICAgIGR1cmF0aW9uTWludXRlczogMjUsXG4gICAgICAgIHByaWNlUGxuOiA2MDAsXG4gICAgICAgIGNhdGVnb3J5OiAnRGlhZ25vc3RpY3MnXG4gICAgICB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdwaGxlYm9sb2d5JyxcbiAgICBuYW1lOiAnUGhsZWJvbG9neScsXG4gICAgbmFtZVBsOiAnRmxlYm9sb2dpYScsXG4gICAgc3VidGl0bGU6ICdWYXNjdWxhciBNZWRpY2luZSAmIExhc2VyIFZlaW4gVGhlcmFweScsXG4gICAgc2hvcnREZXNjOiAnRG9wcGxlciB1bHRyYXNvdW5kIGhlbW9keW5hbWljcywgRVZMVCBlbmRvdmVub3VzIGxhc2VyLCBhbmQgZm9hbSBzY2xlcm90aGVyYXB5LicsXG4gICAgZnVsbERlc2M6ICdDb21wcmVoZW5zaXZlIHZhc2N1bGFyIGRpYWdub3N0aWMgY2VudGVyIHNwZWNpYWxpemluZyBpbiB2YXJpY29zZSB2ZWlucywgdmVub3VzIGluc3VmZmljaWVuY3ksIGFuZCBzcGlkZXIgdmVpbiBhZXN0aGV0aWNzLiBNb2Rlcm4gZHVhbC13YXZlbGVuZ3RoIDE0NzBubSBsYXNlciBzeXN0ZW1zIGVuc3VyZSBtYXhpbWFsIHBhdGllbnQgY29tZm9ydC4nLFxuICAgIGljb25OYW1lOiAnWmFwJyxcbiAgICBhY2NlbnRDb2xvcjogJ2Zyb20tY3lhbi00MDAgdG8tYmx1ZS02MDAnLFxuICAgIGJhZGdlOiAnRHVhbC1XYXZlIDE0NzBubScsXG4gICAgcGVkZXN0YWxQb3NpdGlvbjogeyB4OiA2MiwgeTogNjQgfSxcbiAgICBmZWF0dXJlczogW1xuICAgICAgJ0NvbG9yIERvcHBsZXIgVWx0cmFzb3VuZCBIZW1vZHluYW1pY3MnLFxuICAgICAgJ0VWTFTCriAxNDcwbm0gUmFkaWFsIExhc2VyIEFibGF0aW9uJyxcbiAgICAgICdDTGFDUyAoQ3J5by1MYXNlciAmIENyeW8tU2NsZXJvdGhlcmFweSknLFxuICAgICAgJ0N1c3RvbWl6ZWQgY29tcHJlc3Npb24gdGhlcmFweSBmaXR0aW5nJ1xuICAgIF0sXG4gICAgZG9jdG9yczogW1xuICAgICAge1xuICAgICAgICBpZDogJ2RvYy00JyxcbiAgICAgICAgbmFtZTogJ0RyIG4uIG1lZC4gRXdhIE1hamV3c2thJyxcbiAgICAgICAgdGl0bGU6ICdDb25zdWx0YW50IFZhc2N1bGFyIFN1cmdlb24nLFxuICAgICAgICBzcGVjaWFsdHk6ICdFbmRvdmVub3VzIExhc2VyICYgSGVtb2R5bmFtaWNzJyxcbiAgICAgICAgYXZhdGFyOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTk4Mzk3MzQtMmI3MWVhMTk3ZWMyP3c9MzAwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAnLFxuICAgICAgICBleHBlcmllbmNlWWVhcnM6IDE1XG4gICAgICB9XG4gICAgXSxcbiAgICB0cmVhdG1lbnRzOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnZi0xJyxcbiAgICAgICAgdGl0bGU6ICdFVkxUwq4gUmFkaWFsIExhc2VyIFZlaW4gQWJsYXRpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0VuZG92ZW5vdXMgbGFzZXIgY2xvc3VyZSBvZiBzYXBoZW5vdXMgdmVpbnMgd2l0aCB1bHRyYXNvdW5kIGd1aWRhbmNlIHVuZGVyIGxvY2FsIHR1bWVzY2VudCBhbmVzdGhlc2lhLicsXG4gICAgICAgIGR1cmF0aW9uTWludXRlczogNjAsXG4gICAgICAgIHByaWNlUGxuOiA0MjAwLFxuICAgICAgICBjYXRlZ29yeTogJ0VuZG92ZW5vdXMgTGFzZXInLFxuICAgICAgICBpc1BvcHVsYXI6IHRydWVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnZi0yJyxcbiAgICAgICAgdGl0bGU6ICdFY2hvLUd1aWRlZCBGb2FtIFNjbGVyb3RoZXJhcHknLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RhcmdldGVkIG1pY3JvLWZvYW0gaW5qZWN0aW9uIGZvciBtZWRpdW0gYW5kIHJldGljdWxhciB2YXJpY29zZSB2ZWlucy4nLFxuICAgICAgICBkdXJhdGlvbk1pbnV0ZXM6IDM1LFxuICAgICAgICBwcmljZVBsbjogOTUwLFxuICAgICAgICBjYXRlZ29yeTogJ1NjbGVyb3RoZXJhcHknXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2YtMycsXG4gICAgICAgIHRpdGxlOiAnRHVwbGV4IERvcHBsZXIgVmFzY3VsYXIgTWFwcGluZycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQ29tcGxldGUgM0QgbWFwcGluZyBvZiBzdXBlcmZpY2lhbCBhbmQgZGVlcCB2ZW5vdXMgcmVmbHV4LicsXG4gICAgICAgIGR1cmF0aW9uTWludXRlczogNDAsXG4gICAgICAgIHByaWNlUGxuOiAzODAsXG4gICAgICAgIGNhdGVnb3J5OiAnRGlhZ25vc3RpY3MnXG4gICAgICB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdzaG9wJyxcbiAgICBuYW1lOiAnQ2xpbmljIFNob3AgJiBQaGFybWFjeScsXG4gICAgbmFtZVBsOiAnU2tsZXAgTWVkeWN6bnkgaSBBcHRla2EnLFxuICAgIHN1YnRpdGxlOiAnUG9zdC10cmVhdG1lbnQgQ2FyZSwgQ29tcHJlc3Npb24gJiBTdXBwbGVtZW50cycsXG4gICAgc2hvcnREZXNjOiAnQ2VydGlmaWVkIG1lZGljYWwgY29tcHJlc3Npb24gd2VhciwgZGVybWF0b2xvZ2ljYWwgd291bmQgY2FyZSwgYW5kIHJlY292ZXJ5IGZvcm11bGFzLicsXG4gICAgZnVsbERlc2M6ICdEaXJlY3QgYWNjZXNzIHRvIGRvY3Rvci1jdXJhdGVkIG1lZGljYWwgcHJvZHVjdHMsIG1lZGljYWwtZ3JhZGUgY29tcHJlc3Npb24gc3RvY2tpbmdzLCBwb3N0LW9wZXJhdGl2ZSBzcGVjaWFsaXplZCBkcmVzc2luZ3MsIGFuZCBiaW8tYXZhaWxhYmxlIG1pY3JvLW51dHJpZW50IGZvcm11bGFzLicsXG4gICAgaWNvbk5hbWU6ICdTaG9wcGluZ0JhZycsXG4gICAgYWNjZW50Q29sb3I6ICdmcm9tLWFtYmVyLTQwMCB0by1yb3NlLTUwMCcsXG4gICAgYmFkZ2U6ICdDZXJ0aWZpZWQgTWVkaWNhbCBHcmFkZScsXG4gICAgcGVkZXN0YWxQb3NpdGlvbjogeyB4OiA4MiwgeTogNjYgfSxcbiAgICBmZWF0dXJlczogW1xuICAgICAgJ0dyYWR1YXRlZCBDQ0wxICYgQ0NMMiBjb21wcmVzc2lvbiBnYXJtZW50cycsXG4gICAgICAnU3RlcmlsZSBoeWRyb2NvbGxvaWQgJiBzaWxpY29uZSBzY2FyIHNoZWV0cycsXG4gICAgICAnQ2xpbmljYWwgdmFzY3VsYXIgJiBjb2xsYWdlbiBzdXBwbGVtZW50cycsXG4gICAgICAnRmFzdCBkaXJlY3QgZGVsaXZlcnkgJiBjbGljay1hbmQtY29sbGVjdCdcbiAgICBdLFxuICAgIGRvY3RvcnM6IFtdLFxuICAgIHRyZWF0bWVudHM6IFtdXG4gIH1cbl07XG5cbmV4cG9ydCBjb25zdCBQUk9EVUNUUzogUHJvZHVjdFtdID0gW1xuICB7XG4gICAgaWQ6ICdwcm9kLTEnLFxuICAgIG5hbWU6ICdWZW5vZmxvd8KuIENsYXNzIDIgQ29tcHJlc3Npb24gU3RvY2tpbmdzJyxcbiAgICBjYXRlZ29yeTogJ3Zhc2N1bGFyJyxcbiAgICBwcmljZTogMjQwLFxuICAgIHJhdGluZzogNC45LFxuICAgIGltYWdlOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1ODQzMDg2NjY3NDQtMjRkNWM0NzRmMmFlP3c9NDAwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAnLFxuICAgIGRlc2NyaXB0aW9uOiAnU3dpc3MtZGVzaWduZWQgZ3JhZHVhdGVkIHByZXNzdXJlIGNvbXByZXNzaW9uICgyMy0zMiBtbUhnKSBmb3IgdmFyaWNvc2UgcHJldmVudGlvbiBhbmQgcG9zdC1FVkxUIHJlY292ZXJ5LicsXG4gICAgaW5TdG9jazogdHJ1ZSxcbiAgICBiYWRnZTogJ0RvY3RvciBSZWNvbW1lbmRlZCdcbiAgfSxcbiAge1xuICAgIGlkOiAncHJvZC0yJyxcbiAgICBuYW1lOiAnQ2ljYXRyaXplbMKuIFNpbGljb25lIFNjYXIgR2VsIDUwZycsXG4gICAgY2F0ZWdvcnk6ICdwb3N0LW9wJyxcbiAgICBwcmljZTogMTM1LFxuICAgIHJhdGluZzogNC44LFxuICAgIGltYWdlOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MDgyNDg1OTcyNjEtZTRkMDk0N2M4YjhiP3c9NDAwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAnLFxuICAgIGRlc2NyaXB0aW9uOiAnTWVkaWNhbCBncmFkZSBzaWxpY29uZSBnZWwgZm9yIGh5cGVycGlnbWVudGF0aW9uIHJlZHVjdGlvbiBhbmQgcmFwaWQgcG9zdC1zdXJnaWNhbCB0aXNzdWUgc21vb3RoaW5nLicsXG4gICAgaW5TdG9jazogdHJ1ZSxcbiAgICBiYWRnZTogJ0Jlc3RzZWxsZXInXG4gIH0sXG4gIHtcbiAgICBpZDogJ3Byb2QtMycsXG4gICAgbmFtZTogJ1Byb2N0b1NoaWVsZMKuIEJpby1SZXBhaXIgT2ludG1lbnQnLFxuICAgIGNhdGVnb3J5OiAncG9zdC1vcCcsXG4gICAgcHJpY2U6IDg5LFxuICAgIHJhdGluZzogNC45LFxuICAgIGltYWdlOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTYyMjg3MjAtMTk1YTY3MmU4YTAzP3c9NDAwJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAnLFxuICAgIGRlc2NyaXB0aW9uOiAnTmF0dXJhbCBoeWFsdXJvbmljIGFjaWQgYW5kIENhbGVuZHVsYSBleHRyYWN0IGJhcnJpZXIgYmFsbSBmb3IgdGlzc3VlIHJlZ2VuZXJhdGlvbi4nLFxuICAgIGluU3RvY2s6IHRydWVcbiAgfSxcbiAge1xuICAgIGlkOiAncHJvZC00JyxcbiAgICBuYW1lOiAnVmFzY3VsYXJDb21wbGV4IER1YWwgRGlvc21pbiAxMDAwbWcnLFxuICAgIGNhdGVnb3J5OiAnc3VwcGxlbWVudHMnLFxuICAgIHByaWNlOiAxMTAsXG4gICAgcmF0aW5nOiA0LjcsXG4gICAgaW1hZ2U6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ3MTg2NDE5MDI4MS1hOTNhMzA3MGI2ZGU/dz00MDAmYXV0bz1mb3JtYXQmZml0PWNyb3AmcT04MCcsXG4gICAgZGVzY3JpcHRpb246ICdNaWNyb25pemVkIGZsYXZvbm9pZCBmcmFjdGlvbiAoOTAwbWcgZGlvc21pbiArIDEwMG1nIGhlc3BlcmlkaW4pIHN1cHBvcnRpbmcgdmVub3VzIHdhbGwgZWxhc3RpY2l0eS4nLFxuICAgIGluU3RvY2s6IHRydWUsXG4gICAgYmFkZ2U6ICdIaWdoIFBvdGVuY3knXG4gIH0sXG4gIHtcbiAgICBpZDogJ3Byb2QtNScsXG4gICAgbmFtZTogJ0h5ZHJvQ2xlYXLCriBTdGVyaWxlIFBvc3QtT3AgRHJlc3NpbmdzIChQYWNrIG9mIDEwKScsXG4gICAgY2F0ZWdvcnk6ICdwb3N0LW9wJyxcbiAgICBwcmljZTogNjUsXG4gICAgcmF0aW5nOiA0LjksXG4gICAgaW1hZ2U6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU4Mzk0NzIxNTI1OS0zOGUzMWJlODc1MWY/dz00MDAmYXV0bz1mb3JtYXQmZml0PWNyb3AmcT04MCcsXG4gICAgZGVzY3JpcHRpb246ICdXYXRlcnByb29mIGJyZWF0aGFibGUgYmFycmllciBmaWxtIHdpdGggcGFkIGZvciBzdXJnaWNhbCBpbmNpc2lvbiBwcm90ZWN0aW9uIGR1cmluZyBzaG93ZXJpbmcuJyxcbiAgICBpblN0b2NrOiB0cnVlXG4gIH0sXG4gIHtcbiAgICBpZDogJ3Byb2QtNicsXG4gICAgbmFtZTogJ1B1cmVEZXJtwq4gU29vdGhpbmcgQ2xlYW5zaW5nIEZvYW0nLFxuICAgIGNhdGVnb3J5OiAnZGVybW8nLFxuICAgIHByaWNlOiA3OCxcbiAgICByYXRpbmc6IDQuOCxcbiAgICBpbWFnZTogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTU2MjI4NzIyLWQxMTlmMDEwMzc1Zj93PTQwMCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZxPTgwJyxcbiAgICBkZXNjcmlwdGlvbjogJ0h5cG9hbGxlcmdlbmljIHBoeXNpb2xvZ2ljYWwgcEggNS41IGNsZWFuc2VyIHdpdGhvdXQgaGFyc2ggc3VsZmF0ZXMgZm9yIHNlbnNpdGl2ZSBzdXJnaWNhbCBhcmVhcy4nLFxuICAgIGluU3RvY2s6IHRydWVcbiAgfVxuXTtcbiJdLCJtYXBwaW5ncyI6IkFBRU8sYUFBTSxjQUE0QjtBQUFBLEVBQ3ZDO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsSUFDWCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixhQUFhO0FBQUEsSUFDYixPQUFPO0FBQUEsSUFDUCxrQkFBa0IsRUFBRSxHQUFHLElBQUksR0FBRyxHQUFHO0FBQUEsSUFDakMsVUFBVTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLFFBQ1gsUUFBUTtBQUFBLFFBQ1IsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxNQUNBO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCxRQUFRO0FBQUEsUUFDUixpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFlBQVk7QUFBQSxNQUNWO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixpQkFBaUI7QUFBQSxRQUNqQixVQUFVO0FBQUEsUUFDVixVQUFVO0FBQUEsUUFDVixXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLGlCQUFpQjtBQUFBLFFBQ2pCLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxNQUNaO0FBQUEsTUFDQTtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsaUJBQWlCO0FBQUEsUUFDakIsVUFBVTtBQUFBLFFBQ1YsVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLGFBQWE7QUFBQSxJQUNiLE9BQU87QUFBQSxJQUNQLGtCQUFrQixFQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUc7QUFBQSxJQUNqQyxVQUFVO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCxRQUFRO0FBQUEsUUFDUixpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFlBQVk7QUFBQSxNQUNWO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixpQkFBaUI7QUFBQSxRQUNqQixVQUFVO0FBQUEsUUFDVixVQUFVO0FBQUEsUUFDVixXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLGlCQUFpQjtBQUFBLFFBQ2pCLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxNQUNaO0FBQUEsTUFDQTtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsaUJBQWlCO0FBQUEsUUFDakIsVUFBVTtBQUFBLFFBQ1YsVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLGFBQWE7QUFBQSxJQUNiLE9BQU87QUFBQSxJQUNQLGtCQUFrQixFQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUc7QUFBQSxJQUNqQyxVQUFVO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCxRQUFRO0FBQUEsUUFDUixpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFlBQVk7QUFBQSxNQUNWO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixpQkFBaUI7QUFBQSxRQUNqQixVQUFVO0FBQUEsUUFDVixVQUFVO0FBQUEsUUFDVixXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLGlCQUFpQjtBQUFBLFFBQ2pCLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxNQUNaO0FBQUEsTUFDQTtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsaUJBQWlCO0FBQUEsUUFDakIsVUFBVTtBQUFBLFFBQ1YsVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLGFBQWE7QUFBQSxJQUNiLE9BQU87QUFBQSxJQUNQLGtCQUFrQixFQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUc7QUFBQSxJQUNqQyxVQUFVO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsQ0FBQztBQUFBLElBQ1YsWUFBWSxDQUFDO0FBQUEsRUFDZjtBQUNGO0FBRU8sYUFBTSxXQUFzQjtBQUFBLEVBQ2pDO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixPQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixPQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLEVBQ1g7QUFDRjsiLCJuYW1lcyI6W119