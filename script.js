// Lokasi diurutkan sesuai agenda
const LOCATIONS = [
  {
    n:1, paket:'Sekolah Rakyat Tahap 2 — Kota Makassar', tag:'sr', tagLabel:'Sekolah Rakyat',
    kota:'Kota Makassar',
    alamat:'GOR Sudiang, Kel. Sudiang, Kec. Biringkanaya, Kota Makassar',
    koord:'5°06\'18"S 119°31\'41"E', lat:-5.105, lng:119.5281,
    gmaps:'https://maps.app.goo.gl/eTJrzjBFGmghBjK96',
    day:'Day 1 · 10.00–12.30 WITA'
  },
  {
    n:2, paket:'Stadion Sudiang', tag:'stadion', tagLabel:'Stadion',
    kota:'Kota Makassar',
    alamat:'Jl. Pajjaiang, Kel. Sudiang Raya, Kec. Biringkanaya, Kota Makassar',
    koord:'5°06\'35.40"S 119°31\'46.58"E', lat:-5.10983, lng:119.52960,
    gmaps:'https://maps.app.goo.gl/Ypr2LfL1HSkw32fs5',
    day:'Day 1 · 10.00–12.30 WITA'
  },
  {
    n:3, paket:'PHTC Sulsel 2 — MTsS Darul Muttaqin', tag:'phtc', tagLabel:'PHTC Madrasah',
    kota:'Kab. Maros',
    alamat:'Jl. Garuda Maccopa, Maccini Baji, Kec. Lau, Kab. Maros',
    koord:'5°02\'29.14"S 119°34\'26.96"E', lat:-5.04143, lng:119.57415,
    gmaps:'https://maps.app.goo.gl/cRpKG4iGDQ4mvAhN7',
    day:'Day 1 · 14.30–16.00 WITA'
  },
  {
    n:4, paket:'Sekolah Rakyat Tahap 2 — Kab. Takalar', tag:'sr', tagLabel:'Sekolah Rakyat',
    kota:'Kab. Takalar',
    alamat:'Desa Pa\'rappunganta, Kec. Polombangkeng Utara, Kab. Takalar',
    koord:'5°21\'16"S 119°28\'17"E', lat:-5.3544, lng:119.4714,
    gmaps:'https://maps.app.goo.gl/ZxpUhP6VNbecbjn4A',
    day:'Day 2 · 10.00–12.00 WITA'
  },
  {
    n:5, paket:'SPPG Takalar', tag:'sppg', tagLabel:'SPPG',
    kota:'Kab. Takalar',
    alamat:'Biringbalang, Bajeng, Kec. Polombangkeng Utara, Kab. Takalar (titik pekerjaan: Kel. Bajeng, Kec. Pattalassang)',
    koord:'5°24\'00.27"S 119°26\'53.22"E', lat:-5.40008, lng:119.44812,
    gmaps:'https://maps.app.goo.gl/KNqZU15LPFPNYZoEA',
    day:'Day 2 · 14.00–15.30 WITA'
  },
  {
    n:6, paket:'PHTC Sulsel 1 — MIS & MAS Ulul Albab', tag:'phtc', tagLabel:'PHTC Madrasah',
    kota:'Kota Makassar',
    alamat:'Jl. Dg. Ramang, Sudiang Raya, Kec. Biringkanaya, Kota Makassar',
    koord:'5°05\'55.31"S 119°31\'20.96"E', lat:-5.09870, lng:119.52249,
    gmaps:'https://maps.app.goo.gl/aZtazCmwo9WRrEbs6',
    day:'Day 3 · 09.00–10.30 WITA'
  }
];

// Render location cards
const cardsEl = document.getElementById('loc-cards');
if (cardsEl) {
  cardsEl.innerHTML = LOCATIONS.map(l => `
    <article class="card loc-card">
      <span class="chip chip-${l.tag}">${l.tagLabel}</span>
      <h3><span class="loc-num">${l.n}</span>${l.paket}</h3>
      <p class="meta"><strong>${l.kota}</strong> · ${l.day}</p>
      <p class="meta">${l.alamat}</p>
      <p class="meta">Koordinat: ${l.koord}</p>
      <a class="btn btn-maps" href="${l.gmaps}" target="_blank" rel="noopener">Buka di Google Maps</a>
    </article>
  `).join('');
}

// Tabs
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));
  t.classList.add('active');
  document.getElementById('panel-' + t.dataset.tab).classList.add('active');
  if (t.dataset.tab === 'agenda' && window._map) setTimeout(()=>window._map.invalidateSize(), 60);
  window.scrollTo({top:0, behavior:'smooth'});
}));

// Subtabs
const subs = document.querySelectorAll('.subtab');
const subPanels = document.querySelectorAll('.sub-panel');
subs.forEach(s => s.addEventListener('click', () => {
  subs.forEach(x => x.classList.remove('active'));
  subPanels.forEach(p => p.classList.remove('active'));
  s.classList.add('active');
  document.getElementById('sub-' + s.dataset.sub).classList.add('active');
}));

// Leaflet map
if (window.L) {
  const map = L.map('map').setView([-5.20, 119.50], 9);
  window._map = map;
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:19, attribution:'&copy; OpenStreetMap'
  }).addTo(map);

  const colors = {sr:'#3b82f6', phtc:'#10b981', sppg:'#f59e0b', stadion:'#ef4444'};
  const bounds = [];
  LOCATIONS.forEach(l => {
    const icon = L.divIcon({
      className:'pin',
      html:`<div style="background:${colors[l.tag]};color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.25)">${l.n}</div>`,
      iconSize:[28,28], iconAnchor:[14,14]
    });
    L.marker([l.lat, l.lng], {icon}).addTo(map)
      .bindPopup(`<strong>${l.n}. ${l.paket}</strong><br/>${l.kota}<br/><a href="${l.gmaps}" target="_blank" rel="noopener">Buka di Google Maps →</a>`);
    bounds.push([l.lat, l.lng]);
  });
  if (bounds.length) map.fitBounds(bounds, {padding:[40,40]});
}
