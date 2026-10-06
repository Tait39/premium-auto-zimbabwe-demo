"use client";

import { useEffect, useState } from "react";

type Car = {
  name: string;
  year: string;
  km: string;
  fuel: string;
  price: string;
  type: string;
  img: string;
};

const cars: Car[] = [
  {name:"Mercedes-Benz GLE 450",year:"2024",km:"32,000 KM",fuel:"Petrol",type:"SUV",price:"US$89,500",img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=85"},
  {name:"Range Rover Sport",year:"2023",km:"18,400 KM",fuel:"Petrol",type:"Luxury",price:"US$118,000",img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=85"},
  {name:"BMW X5 xDrive40i",year:"2024",km:"21,700 KM",fuel:"Petrol",type:"SUV",price:"US$92,000",img:"https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1400&q=85"},
  {name:"Toyota Land Cruiser",year:"2023",km:"27,900 KM",fuel:"Diesel",type:"4x4",price:"US$96,500",img:"https://images.unsplash.com/photo-1621007750207-8e4d1c4f1a7b?auto=format&fit=crop&w=1400&q=85"},
  {name:"Mercedes-Benz C-Class",year:"2024",km:"14,200 KM",fuel:"Petrol",type:"Luxury",price:"US$64,500",img:"https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=85"},
  {name:"Ford Ranger Wildtrak",year:"2024",km:"19,800 KM",fuel:"Diesel",type:"4x4",price:"US$58,500",img:"https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=1400&q=85"},
  {name:"Porsche Cayenne",year:"2024",km:"11,800 KM",fuel:"Petrol",type:"Luxury",price:"US$124,000",img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"},
  {name:"Toyota Hilux Legend",year:"2024",km:"16,600 KM",fuel:"Diesel",type:"4x4",price:"US$61,500",img:"https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1400&q=85"}
];

const heroCars = [
  {car: cars[0], eyebrow:"01 / Mercedes-Benz GLE 450"},
  {car: cars[1], eyebrow:"02 / Range Rover Sport"},
  {car: cars[6], eyebrow:"03 / Porsche Cayenne"},
  {car: cars[7], eyebrow:"04 / Toyota Hilux Legend"}
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [selected, setSelected] = useState<Car | null>(null);
  const [filter, setFilter] = useState("All Vehicles");

  useEffect(() => {
    const timer = window.setInterval(() => setSlide(s => (s + 1) % heroCars.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const visibleCars = filter === "All Vehicles"
    ? cars
    : filter === "Under US$60k"
      ? cars.filter(c => Number(c.price.replace(/[^0-9]/g, "")) < 60000)
      : cars.filter(c => c.type === filter);

  const activeHero = heroCars[slide];

  return <main>
    <nav className="nav"><div className="container navInner">
      <a className="brand" href="#top">PREMIUM AUTO <span>ZIMBABWE</span></a>
      <div className="links"><a href="#stock">Stock</a><a href="#experience">Experience</a><a href="#sourcing">Sourcing</a><a href="#contact">Contact</a></div>
      <a className="navCta" href="#stock">View Collection</a>
    </div></nav>

    <section className="hero" id="top">
      {heroCars.map((item, i) => <button key={item.car.name} className={`heroSlide ${i === slide ? "active" : ""}`} onClick={() => setSelected(item.car)} aria-label={`View ${item.car.name}`}>
        <span className="heroImage" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.74),rgba(0,0,0,.18) 55%,rgba(0,0,0,.3)),url('${item.car.img}')`}} />
      </button>)}
      <div className="container heroContent">
        <div className="eyebrow">Harare · Zimbabwe · Curated Automotive</div>
        <div className="heroVehicle">{activeHero.eyebrow}</div>
        <h1>Drive<br/>Different.</h1>
        <p>A new standard for premium vehicle discovery. Exceptional cars, beautifully presented and ready for your next chapter.</p>
        <div className="buttons"><a className="btn btnLight" href="#stock">Explore Collection</a><a className="btn btnGhost" href="#contact">Speak to Sales</a></div>
      </div>
      <div className="heroControls">
        <button className="heroArrow" onClick={() => setSlide((slide - 1 + heroCars.length) % heroCars.length)} aria-label="Previous vehicle">←</button>
        {heroCars.map((item, i) => <button key={item.car.name} className={`heroDot ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)} aria-label={`Show vehicle ${i + 1}`} />)}
        <button className="heroArrow" onClick={() => setSlide((slide + 1) % heroCars.length)} aria-label="Next vehicle">→</button>
      </div>
      <div className="heroMeta"><div className="container heroMetaInner"><div className="slideCount"><b>{String(slide + 1).padStart(2,"0")}</b> / 04</div><div className="heroNote">Click any vehicle to preview</div></div></div>
    </section>

    <section className="section" id="stock"><div className="container">
      <div className="sectionHead"><div><div className="kicker">The collection</div><h2>Selected.<br/>Not crowded.</h2></div><p className="sectionIntro">A considered collection of premium SUVs, executive sedans and capable 4x4s. Every listing is presented with the details serious buyers need.</p></div>
      <div className="filters">{["All Vehicles","SUV","Luxury","4x4","Under US$60k"].map(f => <button key={f} className={`filter ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>)}</div>
      <div className="grid">{visibleCars.map(c=><button className="car" key={c.name} onClick={() => setSelected(c)} aria-label={`View ${c.name}`}>
        <div className="carImg" style={{backgroundImage:`url('${c.img}')`}}/><div className="carBody"><div className="carTop"><h3>{c.name}</h3><div className="price">{c.price}</div></div><div className="spec"><span>{c.year}</span><span>{c.km}</span><span>{c.fuel}</span></div><span className="view">View vehicle →</span></div>
      </button>)}</div>
    </div></section>

    <section className="manifesto" id="experience"><div className="container"><div className="kicker">The experience</div><h2>Luxury should feel effortless.</h2><p>From the first image to the first conversation, every touchpoint is designed around clarity, confidence and a faster path to the right vehicle.</p><div className="featureGrid">
      <a className="feature" href="#stock"><small>01 / SEARCH</small><strong>Find your next car without the noise.</strong></a>
      <a className="feature" href="#contact"><small>02 / WHATSAPP</small><strong>Talk directly to a sales specialist.</strong></a>
      <a className="feature" href="#sourcing"><small>03 / SOURCE</small><strong>Can't find it? We'll source it.</strong></a>
      <a className="feature" href="#contact"><small>04 / VIEW</small><strong>Book a private viewing in Harare.</strong></a>
    </div></div></section>

    <section className="section finder" id="sourcing"><div className="container"><div className="kicker">Find your match</div><h2>Tell us what<br/>you're looking for.</h2><div className="finderBox">
      <label className="field"><span>Budget</span><select defaultValue="US$20k — US$150k+"><option>US$20k — US$150k+</option><option>Under US$60k</option><option>US$60k — US$100k</option><option>US$100k+</option></select></label>
      <label className="field"><span>Body type</span><select defaultValue="SUV / Sedan / 4x4"><option>SUV / Sedan / 4x4</option><option>SUV</option><option>Luxury</option><option>4x4</option></select></label>
      <label className="field"><span>Make</span><select defaultValue="Any make"><option>Any make</option><option>Mercedes-Benz</option><option>Range Rover</option><option>BMW</option><option>Toyota</option><option>Porsche</option></select></label>
      <a className="finderBtn" href="#stock">Show my matches →</a>
    </div></div></section>

    <footer className="footer" id="contact"><div className="container footerGrid"><div><a className="brand" href="#top">PREMIUM AUTO ZIMBABWE</a><p>A cinematic digital showroom concept built for Zimbabwe's premium automotive market. Replace the demo identity, stock and contact details for each dealership.</p></div><div className="footerLinks"><a href="#stock">Stock</a><a href="#sourcing">Source a Car</a><a href="#contact">WhatsApp Sales</a><a href="mailto:sales@example.com">Email Sales</a></div></div></footer>

    {selected && <div className="modalBackdrop" onClick={() => setSelected(null)}><div className="vehicleModal" onClick={e => e.stopPropagation()}>
      <button className="modalClose" onClick={() => setSelected(null)} aria-label="Close">×</button>
      <div className="modalImage" style={{backgroundImage:`url('${selected.img}')`}} />
      <div className="modalBody"><div className="kicker">Premium vehicle preview</div><h2>{selected.name}</h2><div className="modalPrice">{selected.price}</div><div className="modalSpecs"><span>{selected.year}</span><span>{selected.km}</span><span>{selected.fuel}</span><span>{selected.type}</span></div><p>Interested in this vehicle? Send an enquiry, request the full specification or book a private viewing.</p><div className="modalActions"><a className="btn btnDark" href="#contact" onClick={() => setSelected(null)}>Enquire about vehicle</a><button className="btn btnOutline" onClick={() => setSelected(null)}>Close preview</button></div></div>
    </div></div>}
  </main>;
}
