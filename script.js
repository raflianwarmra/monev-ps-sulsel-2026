/* =========================================================
   Buku Saku — Monev PS Sulsel 2026
   Vanilla JS port of the Claude Design pocket-book.
   ========================================================= */

// ---- ICONS (inline SVG strings) ----
const I = {
  sun:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  pin:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  car:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l2-5h14l2 5M5 17h14M5 17v2M19 17v2"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/></svg>',
  rest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11V8h14v3M5 11v8M19 11v8M5 14h14"/></svg>',
  ext:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 13v6H5V5h6"/></svg>',
  wa:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 .9-1 2.3 0 1.3 1 2.6 1.1 2.8.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.5.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2"/></svg>',
  compass:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6 6-2z"/></svg>',
  cal:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  build:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V8l8-5 8 5v13M4 21h16M9 21v-6h6v6M8 11h.01M12 11h.01M16 11h.01"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>',
};

// ---- DATA ----
const TRIP = {
  dates: "11 – 13 Mei 2026",
  region: "Kota Makassar · Kab. Maros · Kab. Takalar",
  stats: [
    { v:"3", l:"Hari" },{ v:"3", l:"Kab/Kota" },
    { v:"6", l:"Lokasi" },{ v:"4", l:"Program" },
  ],
};

const AGENDA = [
  { day:1, date:"Senin, 11 Mei 2026", short:"Senin", items:[
    { t:"06.30 – 09.30", a:"Perjalanan menuju Kota Makassar", l:"Dari Jakarta", k:"transit" },
    { t:"09.30 – 10.00", a:"Perjalanan ke lokasi pembangunan", l:"Jl. Pajjaiang No. 73, Sudiang Raya, Biringkanaya, Makassar", k:"transit" },
    { t:"10.00 – 12.30", a:"Kunjungan Sekolah Rakyat Tahap 2 & Stadion Sudiang", l:"Kota Makassar", k:"site", proyek:["sr-makassar","stadion"] },
    { t:"12.30 – 13.30", a:"ISHOMA", l:"—", k:"rest" },
    { t:"13.30 – 14.30", a:"Perjalanan ke Revitalisasi Madrasah Maros", l:"MTsS Darul Muttaqin, Jl. Garuda Maccopa, Lau, Maros", k:"transit" },
    { t:"14.30 – 16.00", a:"Kunjungan Revitalisasi Madrasah TA 2025", l:"Kab. Maros", k:"site", proyek:["phtc-maros"] },
    { t:"16.00 – 17.00", a:"Perjalanan menuju Hotel", l:"—", k:"transit" },
    { t:"17.00", a:"Check in Hotel", l:"—", k:"rest" },
  ]},
  { day:2, date:"Selasa, 12 Mei 2026", short:"Selasa", items:[
    { t:"08.00 – 10.00", a:"Perjalanan ke Sekolah Rakyat Takalar", l:"Desa Pa'rappunganta, Polombangkeng Utara, Takalar", k:"transit" },
    { t:"10.00 – 12.00", a:"Kunjungan Sekolah Rakyat Tahap 2", l:"Kab. Takalar", k:"site", proyek:["sr-takalar"] },
    { t:"12.00 – 13.00", a:"ISHOMA", l:"—", k:"rest" },
    { t:"13.00 – 14.00", a:"Perjalanan ke SPPG Takalar", l:"Kel. Bajeng, Pattalassang, Takalar", k:"transit" },
    { t:"14.00 – 15.30", a:"Kunjungan Satuan Pelayanan Pemenuhan Gizi", l:"Kab. Takalar", k:"site", proyek:["sppg-takalar"] },
    { t:"15.30 – 17.30", a:"Perjalanan menuju Hotel", l:"—", k:"transit" },
    { t:"17.30", a:"Istirahat", l:"—", k:"rest" },
  ]},
  { day:3, date:"Rabu, 13 Mei 2026", short:"Rabu", items:[
    { t:"08.30 – 09.00", a:"Perjalanan ke Revitalisasi Madrasah Makassar", l:"MIS & MAS Ulul Albab, Jl. Dg. Ramang, Sudiang Raya, Biringkanaya, Makassar", k:"transit" },
    { t:"09.00 – 10.30", a:"Kunjungan Revitalisasi Madrasah TA 2025", l:"Kota Makassar", k:"site", proyek:["phtc-makassar"] },
    { t:"10.30 – Selesai", a:"Perjalanan kembali ke Jakarta", l:"Menuju Jakarta", k:"transit" },
  ]},
];

const PROYEK = [
  { id:"sr-makassar", kategori:"SR", kategoriLabel:"Sekolah Rakyat", emoji:"🏫",
    nama:"Sekolah Rakyat Tahap 2", kota:"Kota Makassar",
    alamat:"Kec. Biringkanaya (GOR Sudiang)", hari:1,
    progres:59.12, rencana:66.45,
    lat:-5.105, lng:119.5281,
    gmaps:"https://maps.app.goo.gl/eTJrzjBFGmghBjK96",
    facts:[
      ["Nilai Kontrak","Rp 219,64 M"],
      ["Penyedia Jasa","NINDYA – BPS, KSO"],
      ["Manajemen Konstruksi","PT Elsadai Servo Cons – PT Pola Teknik Konsultan, KSO"],
      ["Luas Lahan","7,6 Ha"],
      ["Luas Bangunan","35.400 m²"],
      ["Target Selesai","20 Juni 2026"],
    ],
    lingkup:"3 zona — Zona 1 (gedung SD/SMP/SMA, masjid, lapangan upacara, gedung serbaguna, gardu PLN, rumah pompa & genset, gerbang, kolam retensi); Zona 2 (rusun guru, guest house, dapur, lapangan mini soccer, basket/voli, bangunan pelimpah); Zona 3 (asrama putra/putri SD/SMP/SMA, kantin SD/SMP/SMA, TPS).",
    ringkasan:"Sekolah gratis berkualitas untuk anak dari keluarga miskin. Bagian dari 100 SR/tahun nasional.",
    foto:[
      { src:"assets/proyek/sr-makassar/01.jpg", cap:"Overview kawasan SR Makassar" },
      { src:"assets/proyek/sr-makassar/02.jpg", cap:"Dokumentasi masa bangunan — Zona 1" },
      { src:"assets/proyek/sr-makassar/03.jpg", cap:"Dokumentasi masa bangunan — Zona 2" },
      { src:"assets/proyek/sr-makassar/04.jpg", cap:"Dokumentasi masa bangunan — Zona 3" },
    ],
  },
  { id:"stadion", kategori:"STD", kategoriLabel:"Stadion", emoji:"🏟️",
    nama:"Stadion Sudiang", kota:"Kota Makassar",
    alamat:"Jl. Pajjaiang No. 73, Pai, Biringkanaya", hari:1,
    progres:8.51, rencana:8.16,
    lat:-5.10983, lng:119.52960,
    gmaps:"https://maps.app.goo.gl/Ypr2LfL1HSkw32fs5",
    facts:[
      ["Nilai Kontrak","Rp 637,16 M (inc PPN)"],
      ["Sumber Dana","APBN TA 2025–2027"],
      ["Kontraktor","WASKITA – ADHI, KSO"],
      ["Konsultan Pengawas","PT Kogas Driyap KSO PT Agrinas Pangan Nusantara II Makassar & PT Marina Widya Karsa"],
      ["Mulai – Selesai","30 Des 2025 – 22 Jun 2027"],
      ["Progres Keuangan","15,00%"],
    ],
    lingkup:"Stadion sepak bola 5 lantai + tribun. Kapasitas 27.112 seat; lahan 66.161 m²; total lantai 35.839 m². FoP 9.000 m² (rumput Zoysia matrella, penerangan 1.500 lux Grade FIFA B). Atap space frame metal zincalume standing seam. LED scoring board ≥ 70 m². Tata suara ≤ 115 dB. Ruang VAR & CCTV.",
    ringkasan:"Venue olahraga skala internasional standar FIFA B, kapasitas 27 ribu kursi.",
    spesial:[ ["27.112","Kapasitas Kursi"], ["9.000 m²","Field of Play"], ["1.500 lux","FIFA Grade B"], ["≥ 70 m²","LED Scoring"] ],
    foto:[
      { src:"assets/proyek/stadion/01.jpg", cap:"Gambar 3D perencanaan" },
      { src:"assets/proyek/stadion/02.jpg", cap:"Gambar 3D perencanaan" },
      { src:"assets/proyek/stadion/03.jpg", cap:"Pemasangan PC Strand Ground Anchor" },
      { src:"assets/proyek/stadion/04.jpg", cap:"Dokumentasi pekerjaan kawasan" },
    ],
  },
  { id:"phtc-maros", kategori:"PHTC", kategoriLabel:"PHTC Madrasah", emoji:"🕌",
    nama:"MTsS Darul Muttaqin — PHTC Sulsel 2", kota:"Kab. Maros",
    alamat:"Jl. Garuda Maccopa, Maccini Baji, Kec. Lau", hari:1,
    progres:100, rencana:100,
    lat:-5.04143, lng:119.57415,
    gmaps:"https://maps.app.goo.gl/cRpKG4iGDQ4mvAhN7",
    facts:[
      ["Paket","PHTC Sulsel 2 (Maros, Sinjai, Bone)"],
      ["Nilai Kontrak","Rp 14,02 M"],
      ["Sumber Dana","APBN TA 2025"],
      ["Kontraktor","PT Arus Jaya"],
      ["Konsultan MK","PT Mekaro Daya Mandiri KSO PT Alocita Mandiri"],
      ["Mulai – Selesai","29 Agu – 31 Des 2025"],
    ],
    lingkup:"Lingkup di MTsS Darul Muttaqin: Gedung A (Kantor), B (Asrama Putra), C (Kantin), D & E (Toilet), serta fasilitas penunjang.",
    ringkasan:"Rehabilitasi & renovasi madrasah — bagian dari Inpres 7/2025 percepatan revitalisasi pendidikan.",
    cakupan:["MTsS Darul Muttaqin (Maros)","MIS Amir Al-Jannah Tippulue (Bone)","MTsS Pattuku (Bone)","MTsS Al-Faaizun (Bone)","MAN 4 Bone","RA Perwanida Tokka (Sinjai)","MTsS Nurul Abyad Barang (Sinjai)"],
    foto:[
      { src:"assets/proyek/phtc-maros/01.jpg", cap:"Fasilitas penunjang MTsS Darul Muttaqin" },
      { src:"assets/proyek/phtc-maros/02.jpg", cap:"Fasilitas penunjang MTsS Darul Muttaqin" },
      { src:"assets/proyek/phtc-maros/03.jpg", cap:"Fasilitas penunjang MTsS Darul Muttaqin" },
      { src:"assets/proyek/phtc-maros/04.jpg", cap:"Fasilitas penunjang MTsS Darul Muttaqin" },
    ],
  },
  { id:"sr-takalar", kategori:"SR", kategoriLabel:"Sekolah Rakyat", emoji:"🏫",
    nama:"Sekolah Rakyat Tahap 2", kota:"Kab. Takalar",
    alamat:"Desa Pa'rappunganta, Polombangkeng Utara", hari:2,
    progres:59.08, rencana:73.14,
    lat:-5.3544, lng:119.4714,
    gmaps:"https://maps.app.goo.gl/ZxpUhP6VNbecbjn4A",
    facts:[
      ["Penyedia Jasa","NINDYA – BPS, KSO"],
      ["Manajemen Konstruksi","PT Elsadai Servo Cons – PT Pola Teknik Konsultan, KSO"],
      ["Luas Lahan","5,6 Ha"],
      ["Luas Bangunan","35.400 m²"],
      ["Target Selesai","20 Juni 2026"],
      ["Deviasi Progres","−8,92%"],
    ],
    lingkup:"3 zona — Zona 1 (gedung SMA/SMP, asrama putra/putri SMP & SMA, kantin, rusun guru 2, dapur & gudang, rumah ibadah, pompa, genset); Zona 2 (gedung SD, asrama putra/putri SD 1 & 2, kantin SD); Zona 3 (gedung serbaguna, masjid, rusun guru 1, guest house, infrastruktur, furniture, PLN, lapangan mini soccer, basket/voli, pos keamanan & gapura, pagar keliling, kolam retensi).",
    ringkasan:"Lokasi SR kedua di Sulsel, kapasitas serupa Makassar.",
    foto:[
      { src:"assets/proyek/sr-takalar/01.jpg", cap:"Dokumentasi kawasan SR Takalar" },
      { src:"assets/proyek/sr-takalar/02.jpg", cap:"Pekerjaan Zona 1" },
      { src:"assets/proyek/sr-takalar/03.jpg", cap:"Pekerjaan Zona 2" },
      { src:"assets/proyek/sr-takalar/04.jpg", cap:"Pekerjaan Zona 3" },
    ],
  },
  { id:"sppg-takalar", kategori:"SPPG", kategoriLabel:"SPPG", emoji:"🍱",
    nama:"SPPG Takalar", kota:"Kab. Takalar",
    alamat:"Biringbalang, Bajeng, Polombangkeng Utara · Pekerjaan: Kel. Bajeng, Pattalassang", hari:2,
    progres:100, rencana:100,
    lat:-5.40008, lng:119.44812,
    gmaps:"https://maps.app.goo.gl/KNqZU15LPFPNYZoEA",
    facts:[ ["Tipe Dapur","20 × 20"], ["Luas Bangunan","400 m²"], ["Realisasi","100% (deviasi 0%)"] ],
    lingkup:"Komponen ruang: Tampak Depan, Area Pemorsian, Ruang Penyiapan Bahan, Area Distribusi, Gudang Basah, Ruang Masak.",
    ringkasan:"Dapur gizi pendukung program Makan Bergizi Gratis (MBG) Presiden.",
    foto:[
      { src:"assets/proyek/sppg-takalar/01.jpg", cap:"Tampak depan / Area Pemorsian" },
      { src:"assets/proyek/sppg-takalar/02.jpg", cap:"Ruang Penyiapan Bahan" },
      { src:"assets/proyek/sppg-takalar/03.jpg", cap:"Area Distribusi" },
      { src:"assets/proyek/sppg-takalar/04.jpg", cap:"Gudang Basah / Ruang Masak" },
    ],
  },
  { id:"phtc-makassar", kategori:"PHTC", kategoriLabel:"PHTC Madrasah", emoji:"🕌",
    nama:"MIS & MAS Ulul Albab — PHTC Sulsel 1", kota:"Kota Makassar",
    alamat:"Jl. Dg. Ramang, Sudiang Raya, Biringkanaya", hari:3,
    progres:100, rencana:100,
    lat:-5.09870, lng:119.52249,
    gmaps:"https://maps.app.goo.gl/aZtazCmwo9WRrEbs6",
    facts:[
      ["Paket","PHTC Sulsel 1 (Makassar, Gowa, Pangkep)"],
      ["Nilai Kontrak","Rp 16,34 M"],
      ["Sumber Dana","APBN TA 2025"],
      ["Kontraktor","PT Era Bangun Sarana"],
      ["Konsultan MK","PT Darmasraya Mitra Amerta"],
      ["Mulai – Selesai","29 Agu – 31 Des 2025"],
    ],
    lingkup:"Rehabilitasi & renovasi gedung pembelajaran, asrama, kantin, MCK, dan sarana penunjang.",
    ringkasan:"Bagian akhir kunjungan — paket PHTC pertama Sulsel, telah selesai 100%.",
    cakupan:["MIS Ulul Albab (Makassar)","MAS Ulul Albab (Makassar)","MIS Ma'arif Silanggayya (Gowa)","MAS Muhammadiyah Limbung (Gowa)","MAS Arrahman Arrahim (Gowa)","MAS DDI Baru-Baru Tangnga (Pangkep)","MAS Anrong Appaka (Pangkep)"],
    foto:[
      { src:"assets/proyek/phtc-makassar/01.jpg", cap:"MIS Ulul Albab — dokumentasi M18" },
      { src:"assets/proyek/phtc-makassar/02.jpg", cap:"MIS Ulul Albab — dokumentasi M18" },
      { src:"assets/proyek/phtc-makassar/03.jpg", cap:"MAS Ulul Albab — dokumentasi M18" },
      { src:"assets/proyek/phtc-makassar/04.jpg", cap:"MAS Ulul Albab — dokumentasi M18" },
    ],
  },
];

const PROGRAM = [
  { sub:"Memutus mata rantai kemiskinan", label:"Sekolah Rakyat",
    desc:"Pendidikan gratis & berkualitas bagi anak dari keluarga miskin & miskin ekstrem. Program prioritas Presiden Prabowo.",
    bullets:["Target 100 SR/tahun, kapasitas 75–150 siswa per sekolah","Capaian Tahap I: 165 SR (IA: 63 · IB: 37 · IC: 65)","Peran PU: renovasi & pembangunan baru pada Tahap II","Kolaborasi: Kemensos, Kemendikdasmen, Kemenag, Kemenkeu"] },
  { sub:"Inpres No. 7 Tahun 2025", label:"Revitalisasi Madrasah (PHTC)",
    desc:"Program Hasil Terbaik Cepat untuk merevitalisasi madrasah, percepatan pembangunan PAUD, dasar, & menengah.",
    bullets:["Target: 2.120 madrasah di 33 provinsi","Hasil verifikasi: 1.411 madrasah memenuhi kriteria","Single Year Contract: 556 madrasah (Jun–Des 2025)","Multi Years Contract: 855 madrasah (Okt 2025 – Jul 2026)"] },
  { sub:"Makan Bergizi Gratis", label:"SPPG (MBG)",
    desc:"Dapur gizi pendukung MBG. MoU & PKS PU–BGN ditandatangani 5 Agustus 2025.",
    bullets:["Target nasional BGN: ±31.000 SPPG","25.000 di kawasan aglomerasi + 6.000 di wilayah 3T","Lingkup PU 2025: dukungan pembangunan dapur MBG, fokus 3T","Mengacu desain prototipe Kepmen PU No. 628/KPTS/M/2025"] },
];

const PIC = [
  { nama:"Rafli", peran:"PIC Kunjungan Lapangan", wa:"+62 812-4242-4316", waLink:"https://wa.me/6281242424316", inisial:"R" },
  { nama:"Hazim", peran:"PIC Kunjungan Lapangan", wa:"+62 858-9035-2487", waLink:"https://wa.me/6285890352487", inisial:"H" },
];

// =========================================================
// STATE & helpers
// =========================================================
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const TABS = [
  { id:"beranda", label:"Beranda", icon:I.compass },
  { id:"agenda",  label:"Agenda",  icon:I.cal },
  { id:"proyek",  label:"Proyek",  icon:I.build },
  { id:"info",    label:"Info",    icon:I.info },
];

let activeTab = "beranda";
let agendaDay = 1;
let proyekFilter = "all";
let infoTab = "peta";
let leafletMap = null;

// =========================================================
// THEME
// =========================================================
function applyTheme(theme){
  document.body.classList.toggle("theme-dark", theme === "dark");
  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "dark" ? "#0b141d" : "#faf6ed");
  $$(".theme-btn, #theme-toggle").forEach(b => { b.innerHTML = theme === "dark" ? I.sun : I.moon; });
  try{ localStorage.setItem("bs_theme", theme); }catch{}
}
function getTheme(){
  try{ return localStorage.getItem("bs_theme") || "light"; }catch{ return "light"; }
}
function toggleTheme(){
  applyTheme(getTheme() === "light" ? "dark" : "light");
}

// =========================================================
// RENDER: BERANDA
// =========================================================
function renderBeranda(){
  $("#hero-sub").textContent = `${TRIP.dates} · ${TRIP.region}`;

  $("#stat-row").innerHTML = TRIP.stats.map(s => `
    <div class="stat"><div class="stat-v">${esc(s.v)}</div><div class="stat-l">${esc(s.l)}</div></div>
  `).join("");

  $("#day-list").innerHTML = AGENDA.map(d => {
    const visits = d.items.filter(i => i.k === "site").length;
    return `<button class="day-card" data-day="${d.day}">
      <div class="day-card-left">
        <div class="day-num">Hari ${d.day}</div>
        <div class="day-date">${esc(d.date)}</div>
      </div>
      <div class="day-card-right">
        <div class="day-count">${visits} kunjungan</div>
        <div class="day-arrow">${I.arrow}</div>
      </div>
    </button>`;
  }).join("");

  $$(".day-card").forEach(b => b.addEventListener("click", () => {
    agendaDay = parseInt(b.dataset.day, 10);
    setTab("agenda");
  }));

  $("#proyek-grid").innerHTML = PROYEK.map(p => `
    <button class="p-card-mini" data-id="${p.id}">
      <div class="p-card-art tag-${p.kategori}"><span class="ill-emoji">${p.emoji}</span></div>
      <div class="p-card-meta">
        <div class="p-card-tag">${esc(p.kategoriLabel)}</div>
        <div class="p-card-name">${esc(p.nama)}</div>
        <div class="p-card-loc">${esc(p.kota)}</div>
      </div>
    </button>
  `).join("");
  $$(".p-card-mini").forEach(b => b.addEventListener("click", () => openDrawer(b.dataset.id)));
}

// =========================================================
// RENDER: AGENDA
// =========================================================
function renderAgenda(){
  $("#day-tabs").innerHTML = AGENDA.map(a => `
    <button class="day-tab ${a.day === agendaDay ? "active" : ""}" data-day="${a.day}">
      <div class="day-tab-num">Hari ${a.day}</div>
      <div class="day-tab-short">${esc(a.short)}</div>
    </button>
  `).join("");
  $$("#day-tabs .day-tab").forEach(b => b.addEventListener("click", () => {
    agendaDay = parseInt(b.dataset.day, 10);
    renderAgenda();
  }));

  const d = AGENDA.find(a => a.day === agendaDay);
  $("#day-head-date").textContent = d.date;

  const kIcon = { transit:I.car, site:I.pin, rest:I.rest };
  $("#timeline").innerHTML = d.items.map((it, i, arr) => {
    const chips = (it.proyek || []).map(pid => {
      const p = PROYEK.find(x => x.id === pid);
      return p ? `<button class="tl-chip" data-id="${p.id}">${esc(p.nama)} ${I.arrow}</button>` : "";
    }).join("");
    return `<li class="tl-item k-${it.k}">
      <div class="tl-time">${esc(it.t)}</div>
      <div class="tl-rail">
        <div class="tl-dot">${kIcon[it.k] || ""}</div>
        ${i < arr.length - 1 ? '<div class="tl-line"></div>' : ""}
      </div>
      <div class="tl-body">
        <div class="tl-act">${esc(it.a)}</div>
        ${it.l && it.l !== "—" ? `<div class="tl-loc">${esc(it.l)}</div>` : ""}
        ${chips ? `<div class="tl-chips">${chips}</div>` : ""}
      </div>
    </li>`;
  }).join("");
  $$(".tl-chip").forEach(b => b.addEventListener("click", () => openDrawer(b.dataset.id)));
}

// =========================================================
// RENDER: PROYEK
// =========================================================
const FILTERS = [
  { id:"all",          label:"Semua" },
  { id:"Kota Makassar",label:"Kota Makassar" },
  { id:"Kab. Maros",   label:"Kab. Maros" },
  { id:"Kab. Takalar", label:"Kab. Takalar" },
];
function renderProyek(){
  const counts = { all:PROYEK.length };
  for (const p of PROYEK) counts[p.kota] = (counts[p.kota] || 0) + 1;

  $("#filter-row").innerHTML = FILTERS.map(f => `
    <button class="chip ${f.id === proyekFilter ? "active" : ""}" data-f="${esc(f.id)}">
      ${esc(f.label)} <span class="chip-count">${counts[f.id] || 0}</span>
    </button>
  `).join("");
  $$("#filter-row .chip").forEach(b => b.addEventListener("click", () => {
    proyekFilter = b.dataset.f; renderProyek();
  }));

  const list = proyekFilter === "all" ? PROYEK : PROYEK.filter(p => p.kota === proyekFilter);
  $("#proyek-list").innerHTML = list.map((p, i) => {
    const dev = (p.progres - p.rencana).toFixed(2);
    const devClass = p.progres >= p.rencana ? "pos" : "neg";
    const devSign = parseFloat(dev) > 0 ? "+" : "";
    return `<button class="p-card-full" data-id="${p.id}">
      <div class="p-card-art-full tag-${p.kategori}">
        <span class="ill-emoji">${p.emoji}</span>
        <div class="p-card-no">No. ${String(i + 1).padStart(2, "0")}</div>
        <div class="p-card-cat">${esc(p.kategoriLabel)}</div>
      </div>
      <div class="p-card-content">
        <h3 class="p-card-h">${esc(p.nama)}</h3>
        <div class="p-card-loc-row">${I.pin}<span>${esc(p.kota)} · ${esc(p.alamat)}</span></div>
        <p class="p-card-summary">${esc(p.ringkasan)}</p>
        <div class="p-progress">
          <div class="p-progress-row">
            <span class="p-progress-l">Progres fisik</span>
            <span class="p-progress-v">${p.progres.toFixed(2)}%</span>
          </div>
          <div class="p-progress-bar">
            <div class="p-progress-fill" style="width:${Math.min(p.progres,100)}%"></div>
            <div class="p-progress-plan" style="left:${Math.min(p.rencana,100)}%" title="Rencana ${p.rencana}%"></div>
          </div>
          <div class="p-progress-foot">
            <span>Rencana ${p.rencana.toFixed(2)}%</span>
            <span class="dev ${devClass}">${devSign}${dev}%</span>
          </div>
        </div>
        <div class="p-card-cta">Lihat detail ${I.arrow}</div>
      </div>
    </button>`;
  }).join("");
  $$("#proyek-list .p-card-full").forEach(b => b.addEventListener("click", () => openDrawer(b.dataset.id)));
}

// =========================================================
// RENDER: INFO
// =========================================================
function renderInfo(){
  const tabs = [
    { id:"peta",    label:"Peta" },
    { id:"ditjen",  label:"Ditjen PS" },
    { id:"program", label:"Program" },
    { id:"pic",     label:"Kontak" },
  ];
  $("#info-tabs").innerHTML = tabs.map(t => `
    <button class="info-tab ${t.id === infoTab ? "active" : ""}" data-t="${t.id}">${esc(t.label)}</button>
  `).join("");
  $$("#info-tabs .info-tab").forEach(b => b.addEventListener("click", () => {
    infoTab = b.dataset.t; renderInfo();
  }));

  const c = $("#info-content");
  if (infoTab === "peta") {
    c.innerHTML = `
      <div class="info-block">
        <p class="lede">Pin diurutkan sesuai agenda. Ketuk untuk membuka detail proyek.</p>
        <div class="map-wrap"><div id="leaflet-map"></div></div>
        <ol class="loc-list">
          ${PROYEK.map((p, i) => `
            <li><button class="loc-row" data-id="${p.id}">
              <span class="loc-no">${String(i+1).padStart(2,"0")}</span>
              <span class="loc-text">
                <span class="loc-name">${esc(p.nama)}</span>
                <span class="loc-sub">${esc(p.kota)} · Hari ${p.hari}</span>
              </span>
              <span class="loc-arr">${I.arrow}</span>
            </button></li>
          `).join("")}
        </ol>
      </div>`;
    $$(".loc-row").forEach(b => b.addEventListener("click", () => openDrawer(b.dataset.id)));
    initMap();
  } else if (infoTab === "ditjen") {
    c.innerHTML = `
      <div class="info-block">
        <h3 class="info-h">Direktorat Jenderal<br/><span class="serif-italic">Prasarana Strategis</span></h3>
        <p class="info-p">Ditjen PS adalah unit kerja baru di <strong>Kementerian Pekerjaan Umum</strong> yang dibentuk untuk merumuskan dan melaksanakan kebijakan di bidang prasarana strategis dukungan perekonomian, pendidikan, peribadatan, olahraga, sosial-budaya, dan kesehatan.</p>
        <h4 class="info-sub">Tugas</h4>
        <p class="info-p">Menyelenggarakan perumusan dan pelaksanaan kebijakan di bidang prasarana strategis sesuai dengan ketentuan peraturan perundang-undangan.</p>
        <h4 class="info-sub">Fungsi</h4>
        <ul class="bullet-list">
          <li>Perumusan kebijakan pembinaan, pengembangan, dan pengendalian sarana prasarana strategis</li>
          <li>Pelaksanaan kebijakan pembinaan, pengembangan, dan pengendalian sarana prasarana strategis</li>
          <li>Fasilitasi pengembangan jejaring kemitraan</li>
          <li>Penyusunan norma, standar, prosedur, dan kriteria</li>
        </ul>
        <div class="src-row">
          <a class="src-link" href="https://djps.pu.go.id/" target="_blank" rel="noopener">djps.pu.go.id ${I.ext}</a>
          <a class="src-link" href="https://pu.go.id/struktur-organisasi/direktorat-jenderal-prasarana-strategis" target="_blank" rel="noopener">pu.go.id ${I.ext}</a>
        </div>
      </div>`;
  } else if (infoTab === "program") {
    c.innerHTML = `
      <div class="info-block">
        <p class="lede">Tiga prioritas Presiden yang menjadi fokus pembangunan Ditjen Prasarana Strategis.</p>
        ${PROGRAM.map((p, i) => `
          <div class="program-card">
            <div class="program-num">${String(i+1).padStart(2,"0")}</div>
            <div class="program-body">
              <div class="program-sub">${esc(p.sub)}</div>
              <h3 class="program-h">${esc(p.label)}</h3>
              <p class="program-desc">${esc(p.desc)}</p>
              <ul class="bullet-list small">
                ${p.bullets.map(b => `<li>${esc(b)}</li>`).join("")}
              </ul>
            </div>
          </div>
        `).join("")}
      </div>`;
  } else if (infoTab === "pic") {
    c.innerHTML = `
      <div class="info-block">
        <p class="lede">Hubungi PIC berikut untuk informasi logistik dan teknis selama kunjungan.</p>
        ${PIC.map(p => `
          <a class="pic-card" href="${esc(p.waLink)}" target="_blank" rel="noopener">
            <div class="pic-avatar">${esc(p.inisial)}</div>
            <div class="pic-body">
              <div class="pic-nama">${esc(p.nama)}</div>
              <div class="pic-peran">${esc(p.peran)}</div>
              <div class="pic-wa">${I.wa}<span>${esc(p.wa)}</span></div>
            </div>
            <div class="pic-arr">${I.arrow}</div>
          </a>
        `).join("")}
        <div class="footer-note">Buku Saku · Monev Prasarana Strategis Sulawesi Selatan · 11 – 13 Mei 2026</div>
      </div>`;
  }
}

// =========================================================
// MAP (Leaflet)
// =========================================================
function initMap(){
  const el = document.getElementById("leaflet-map");
  if (!el || !window.L) return;
  if (leafletMap) { leafletMap.remove(); leafletMap = null; }
  leafletMap = L.map(el, { scrollWheelZoom:false }).setView([-5.20, 119.50], 9);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:19, attribution:'&copy; OpenStreetMap'
  }).addTo(leafletMap);

  const colors = { SR:"#0a8a5e", STD:"#c0561d", PHTC:"#0a8a5e", SPPG:"#c8932e" };
  const bounds = [];
  PROYEK.forEach((p, i) => {
    const icon = L.divIcon({
      className:"pin",
      html:`<div style="background:${colors[p.kategori]||'#0a8a5e'};color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;border:3px solid #fff;box-shadow:0 4px 10px rgba(0,0,0,.3);font-family:'JetBrains Mono',monospace">${i+1}</div>`,
      iconSize:[30,30], iconAnchor:[15,15],
    });
    const m = L.marker([p.lat, p.lng], { icon }).addTo(leafletMap);
    m.bindPopup(`<strong>${esc(p.nama)}</strong><br/>${esc(p.kota)}<br/><a href="#" onclick="event.preventDefault();window.__openDrawer('${p.id}');return false;">Lihat detail →</a>`);
    bounds.push([p.lat, p.lng]);
  });
  if (bounds.length) leafletMap.fitBounds(bounds, { padding:[40,40] });
  setTimeout(() => leafletMap.invalidateSize(), 100);
}

// =========================================================
// DRAWER
// =========================================================
function openDrawer(id){
  const p = PROYEK.find(x => x.id === id);
  if (!p) return;
  const dev = (p.progres - p.rencana).toFixed(2);
  const devClass = p.progres >= p.rencana ? "pos" : "neg";
  const devSign = parseFloat(dev) > 0 ? "+" : "";

  const specHtml = p.spesial ? `
    <div class="spec-grid">
      ${p.spesial.map(([v,l]) => `<div class="spec"><div class="spec-v">${esc(v)}</div><div class="spec-l">${esc(l)}</div></div>`).join("")}
    </div>` : "";

  const cakupanHtml = p.cakupan ? `
    <h3 class="detail-sub">Cakupan paket</h3>
    <ul class="bullet-list">${p.cakupan.map(c => `<li>${esc(c)}</li>`).join("")}</ul>` : "";

  const fotoHtml = p.foto && p.foto.length ? `
    <h3 class="detail-sub">Dokumentasi</h3>
    <div class="gallery">
      ${p.foto.map((f, i) => `
        <button class="gal-item" data-pid="${p.id}" data-idx="${i}" aria-label="${esc(f.cap)}">
          <img src="${esc(f.src)}" alt="${esc(f.cap)}" loading="lazy" />
          <span class="gal-cap">${esc(f.cap)}</span>
        </button>
      `).join("")}
    </div>` : "";

  $("#drawer-inner").innerHTML = `
    <div class="detail-hero tag-${p.kategori}">
      <button class="detail-back" id="drawer-close">${I.back}<span>Kembali</span></button>
      <div class="detail-hero-body">
        <div class="detail-cat">${esc(p.kategoriLabel)}</div>
        <h1 class="detail-h">${esc(p.nama)}</h1>
        <div class="detail-loc">${I.pin}<span>${esc(p.kota)} · ${esc(p.alamat)}</span></div>
      </div>
    </div>
    <div class="detail-body">
      <p class="detail-lede">${esc(p.ringkasan)}</p>

      <div class="detail-progress">
        <div class="dp-top">
          <div>
            <div class="dp-l">Progres fisik</div>
            <div class="dp-v">${p.progres.toFixed(2)}<span class="dp-pct">%</span></div>
          </div>
          <div class="dp-side">
            <div><span class="dp-side-l">Rencana</span><span class="dp-side-v">${p.rencana.toFixed(2)}%</span></div>
            <div><span class="dp-side-l">Deviasi</span><span class="dp-side-v dev ${devClass}">${devSign}${dev}%</span></div>
          </div>
        </div>
        <div class="p-progress-bar big">
          <div class="p-progress-fill" style="width:${Math.min(p.progres,100)}%"></div>
          <div class="p-progress-plan" style="left:${Math.min(p.rencana,100)}%"></div>
        </div>
      </div>

      ${specHtml}

      <h3 class="detail-sub">Fakta kunci</h3>
      <dl class="fact-list">
        ${p.facts.map(([l,v]) => `<div class="fact-row"><dt>${esc(l)}</dt><dd>${esc(v)}</dd></div>`).join("")}
      </dl>

      <h3 class="detail-sub">Lingkup pekerjaan</h3>
      <p class="detail-text">${esc(p.lingkup)}</p>

      ${fotoHtml}

      ${cakupanHtml}

      <a class="maps-btn" href="${esc(p.gmaps)}" target="_blank" rel="noopener">
        Buka di Google Maps ${I.ext}
      </a>
    </div>
  `;
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
  $("#drawer-close").addEventListener("click", closeDrawer);
  $$("#drawer .gal-item").forEach(b => b.addEventListener("click", () => {
    openLightbox(p.foto, parseInt(b.dataset.idx, 10));
  }));
  $("#drawer").scrollTop = 0;
}

// ---- Lightbox ----
function openLightbox(photos, startIdx){
  let idx = startIdx;
  let lb = document.getElementById("lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "lightbox";
    lb.className = "lightbox";
    lb.innerHTML = `
      <button class="lb-close" aria-label="Tutup">×</button>
      <button class="lb-prev" aria-label="Sebelumnya">‹</button>
      <button class="lb-next" aria-label="Berikutnya">›</button>
      <figure class="lb-fig">
        <img class="lb-img" alt="" />
        <figcaption class="lb-cap"></figcaption>
      </figure>`;
    document.body.appendChild(lb);
  }
  const imgEl = lb.querySelector(".lb-img");
  const capEl = lb.querySelector(".lb-cap");
  const show = () => {
    imgEl.src = photos[idx].src;
    imgEl.alt = photos[idx].cap;
    capEl.textContent = `${idx + 1} / ${photos.length} · ${photos[idx].cap}`;
  };
  const close = () => { lb.classList.remove("open"); document.removeEventListener("keydown", onKey); };
  const next = () => { idx = (idx + 1) % photos.length; show(); };
  const prev = () => { idx = (idx - 1 + photos.length) % photos.length; show(); };
  const onKey = (e) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  };
  lb.querySelector(".lb-close").onclick = close;
  lb.querySelector(".lb-next").onclick = next;
  lb.querySelector(".lb-prev").onclick = prev;
  lb.onclick = (e) => { if (e.target === lb) close(); };
  document.addEventListener("keydown", onKey);
  show();
  lb.classList.add("open");
}
function closeDrawer(){
  $("#drawer").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
}
window.__openDrawer = openDrawer; // for popup links

// =========================================================
// TABS
// =========================================================
function setTab(id){
  activeTab = id;
  $$(".screen").forEach(s => s.classList.toggle("active", s.id === "screen-" + id));
  $$("#tabbar .tabbtn").forEach(b => b.classList.toggle("active", b.dataset.tab === id));
  if (id === "agenda") renderAgenda();
  if (id === "proyek") renderProyek();
  if (id === "info") renderInfo();
  window.scrollTo({ top:0, behavior:"smooth" });
}

function renderTabbar(){
  $("#tabbar").innerHTML = TABS.map(t => `
    <button class="tabbtn ${t.id === activeTab ? "active" : ""}" data-tab="${t.id}">
      <span class="tabicon">${t.icon}</span>
      <span class="tablabel">${esc(t.label)}</span>
    </button>
  `).join("");
  $$("#tabbar .tabbtn").forEach(b => b.addEventListener("click", () => setTab(b.dataset.tab)));
}

// =========================================================
// INIT
// =========================================================
function init(){
  applyTheme(getTheme());
  renderBeranda();
  renderTabbar();

  document.addEventListener("click", e => {
    if (e.target.closest(".theme-btn") || e.target.closest("#theme-toggle")) {
      toggleTheme();
    }
  });

  // ESC closes drawer
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeDrawer();
  });
}
init();
