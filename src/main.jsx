import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowUpRight, CalendarDays, ChevronDown, Clock, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const tripAdvisorUrl = 'https://www.tripadvisor.es/Restaurant_Review-g294480-d7259844-Reviews-Azahar_Panama-Panama_City_Panama_Province.html';
const whatsappUrl = 'https://api.whatsapp.com/send?phone=50768904962&text=Hola%20Azahar%2C%20quisiera%20hacer%20una%20reserva.';
const img = (id, params = 'auto=format&fit=crop&w=1600&q=82') => `https://images.unsplash.com/${id}?${params}`;

const assets = {
  heroPoster: img('photo-1551218808-94e220e084d2', 'auto=format&fit=crop&w=2400&q=88'),
  dining: img('photo-1559339352-11d035aa65de'),
  dishOne: img('photo-1546833999-b9f581a1996d'),
  dishTwo: img('photo-1600891964599-f61ba0e24092'),
  dishThree: img('photo-1553621042-f6e147245754'),
  cocktail: img('photo-1513558161293-cdaf765ed2fd'),
  chef: img('photo-1577219491135-ce391730fb2c'),
  wine: img('photo-1510812431401-41d2bd2722f3'),
  room: img('photo-1514933651103-005eec06c04b'),
  table: img('photo-1414235077428-338989a2e8c0'),
  galleryA: img('photo-1592861956120-e524fc739696'),
  galleryB: img('photo-1579027989536-b7b1f875659b'),
  galleryC: img('photo-1540189549336-e6e99c3679fe'),
  galleryD: img('photo-1504674900247-0877df9cc836'),
  galleryE: img('photo-1517248135467-4c7edcad34c4'),
  galleryF: img('photo-1552566626-52f8b828add9')
};

const menuCategories = [
  {
    id: 'entradas',
    label: 'Entradas',
    image: assets.dishThree,
    note: 'Crudos, latas, tiraditos y pequeños platos para abrir la noche.',
    items: [
      ['Salmón pizza', 'salmón fresco, mayo-anchoa, rábano, tortilla crocante', '11'],
      ['Ceviche de corvina', 'cítricos, mango, cebolla morada, ají rojo, batata cremosa', '13'],
      ['Tartares en sus latas', 'salmón, atún y kampachi con acentos fríos', '20'],
      ['Dátiles rellenos', 'manchego cream, chistorra y bacon crujiente', '11']
    ]
  },
  {
    id: 'platos-fuertes',
    label: 'Platos fuertes',
    image: assets.dishOne,
    note: 'Recetas de autor con fuego, técnica europea y una memoria tropical.',
    items: [
      ['Corvina in brodo', 'caldo de tomates, alcachofas, Bruselas y aceitunas Kalamata', '24'],
      ['Branzino acevichado', 'risotto de aguacate y cremoso de pimientos rostizados', '46'],
      ['Langosta termidor', 'mantequilla de hierbas, espuma termidor y hongos al Cognac', '45'],
      ['Tagliatelle cacio, pepe e tartufo', 'pasta artesanal, trufas, Pecorino y pimienta negra', '17']
    ]
  },
  {
    id: 'mariscos',
    label: 'Mariscos',
    image: assets.dishTwo,
    note: 'Mar profundo, cítricos, umami y texturas que aparecen como luz baja.',
    items: [
      ['King crab leg', 'pieza generosa, servicio preciso y temperatura limpia', '100'],
      ['Rock prawn sliders', 'langostinos crocantes y salsa dragon-yuzu', '16'],
      ['Lobster hand roll', 'spicy lobster dynamite, aguacate, cebollín y aonori crunch', '16'],
      ['Scallops tiradito', 'naranja, coco, lemongrass, soya-yuzu y aceite verde', '16']
    ]
  },
  {
    id: 'carnes',
    label: 'Carnes',
    image: img('photo-1558030006-450675393462'),
    note: 'Cortes nobles, cocciones lentas y salsas con profundidad nocturna.',
    items: [
      ['Filet mignon y aligot', 'prosciutto crocante, reducción de res y emmenthal', '39'],
      ['Short rib ahumado', '24 horas, humo in-house y jugos concentrados', '35'],
      ['Entraña Azahar', 'mantequilla clarificada de trufas negras y sal Maldon', '40'],
      ['Cowboy Café de Paris', '22oz USDA Choice, yuca, padrón y ajo rostizado', '75']
    ]
  },
  {
    id: 'postres',
    label: 'Postres',
    image: img('photo-1488477181946-6428a0291777'),
    note: 'Finales suaves, perfumados y precisos; dulzor con arquitectura.',
    items: [
      ['Profiteroles gluten free', 'Nocciolina, dulce de leche, avellanas y cacao', '11'],
      ['Pie de manzana', 'mousse de vino blanco, crumble de canela y vainilla', '10'],
      ['Mousse de maracuyá', 'coco, gel de maracuyá y sable de almendras', '10'],
      ['Baba whiskey', 'almíbar de naranja, Hibiki, ricotta cremosa y coriander', '10']
    ]
  },
  {
    id: 'cocteles',
    label: 'Cocteles',
    image: assets.cocktail,
    note: 'Cristal frío, botánicos, amargos elegantes y una energía de medianoche.',
    items: [
      ['Azahar nocturno', 'gin, flor de azahar, jerez seco y piel de limón', '14'],
      ['Balboa sour', 'pisco, maracuyá, bitter de cacao y espuma sedosa', '13'],
      ['Fuego bajo', 'mezcal, piquillo, miel especiada y sal ahumada', '15'],
      ['Martini de la casa', 'vodka, vermut fino, aceite cítrico y aceituna rellena', '16']
    ]
  },
  {
    id: 'vinos',
    label: 'Vinos',
    image: assets.wine,
    note: 'Etiquetas de vieja escuela y botellas contemporáneas para quedarse.',
    items: [
      ['Champagne brut reserve', 'burbuja fina, brioche, manzana verde y mineralidad', 'copa 18'],
      ['Albariño costero', 'salinidad, lima, flor blanca y final largo', 'copa 12'],
      ['Pinot noir de altura', 'cereza oscura, especias, tanino fino', 'copa 15'],
      ['Rioja reserva', 'cuero suave, vainilla, ciruela y roble noble', 'botella 72']
    ]
  }
];

const gallery = [assets.room, assets.galleryA, assets.galleryB, assets.table, assets.galleryC, assets.galleryD, assets.galleryE, assets.galleryF];

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, wheelMultiplier: 0.85 });
    const raf = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    window.setTimeout(() => {
      if (window.location.hash) {
        document.querySelector(window.location.hash)?.scrollIntoView();
      }
    }, 100);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}

function useCinematicScroll(rootRef) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 46 }, {
          autoAlpha: 1,
          y: 0,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true }
        });
      });

      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax) || -12,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.9 }
        });
      });

      gsap.utils.toArray('[data-mask]').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(18% 12% 18% 12%)', scale: 1.08 }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.35,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 78%', once: true }
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [rootRef]);
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Experiencia', 'experiencia'],
    ['Carta', 'carta'],
    ['Galería', 'galeria'],
    ['Reservas', 'reservas']
  ];
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-5 py-4 text-sm uppercase tracking-[0.26em] text-ivory/80 md:px-8">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-ivory/10 pb-4">
        <a href="#inicio" className="font-sans text-[0.72rem] font-semibold tracking-[0.34em]">Azahar Panamá</a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} className="nav-link">{label}</a>)}
        </nav>
        <a href="#reservas" className="hidden items-center gap-2 rounded-full border border-ivory/20 px-4 py-2 text-[0.68rem] transition hover:border-amber/70 hover:text-amber md:flex">
          Reservar <ArrowUpRight size={14} />
        </a>
        <button className="grid size-10 place-items-center rounded-full border border-ivory/15 md:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú">
          <MenuIcon size={18} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-ink/95 p-6 backdrop-blur-xl md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="ml-auto grid size-11 place-items-center rounded-full border border-ivory/20" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X size={18} /></button>
            <div className="mt-16 grid gap-7 font-serif text-5xl">
              {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.22], [0, 140]);
  const scale = useTransform(scrollYProgress, [0, 0.22], [1.06, 1]);
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <video className="absolute inset-0 size-full object-cover opacity-70" poster={assets.heroPoster} autoPlay muted loop playsInline>
          <source src="https://cdn.coverr.co/videos/coverr-serving-a-dish-in-a-restaurant-2213/1080p.mp4" type="video/mp4" />
        </video>
        <img src={assets.heroPoster} alt="" className="absolute inset-0 size-full object-cover video-fallback" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_44%,rgba(181,99,43,0.18),transparent_34%),linear-gradient(90deg,rgba(8,7,5,0.92),rgba(8,7,5,0.36)_45%,rgba(8,7,5,0.74))]" />
      <div className="grain" />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] content-end px-5 pb-12 pt-28 md:px-8 lg:pb-16">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.14 } } }} className="max-w-5xl">
          <motion.p variants={fadeUp} className="eyebrow">Sushi bar | Alta gastronomía</motion.p>
          <motion.h1 variants={fadeUp} className="mt-5 max-w-4xl font-serif text-[clamp(4.1rem,11vw,12.5rem)] leading-[0.78] text-ivory">
            Una noche que respira fuego, mar y seda.
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg leading-8 text-ivory/72">Cocina de autor, luz baja y hospitalidad precisa en el piso 7 de PH Yoo, Av. Balboa.</p>
            <a href="#reservas" className="cta group w-fit"><span>Reservar experiencia</span><ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} /></a>
          </motion.div>
        </motion.div>
        <div className="mt-12 flex items-center justify-between text-[0.68rem] uppercase tracking-[0.28em] text-ivory/55">
          <span>Ciudad de Panamá</span>
          <a href="#experiencia" className="flex items-center gap-2">Descubrir <ChevronDown size={14} /></a>
        </div>
      </div>
    </section>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 34 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } };

function Experience() {
  return (
    <section id="experiencia" className="section-grid experience-grid border-t border-ivory/10">
      <div data-reveal className="md:col-span-4">
        <p className="eyebrow">Experiencia insignia</p>
        <h2 className="section-title experience-title">Mediterráneo contemporáneo con pulso nocturno.</h2>
      </div>
      <div className="md:col-span-7 md:col-start-6">
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-[16/10]" data-mask>
          <img data-parallax="-10" src={assets.dining} alt="Mesa iluminada con servicio elegante" className="absolute inset-0 size-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 max-w-sm text-xl leading-8 text-ivory/82">Cada plato llega como una escena: temperatura, textura, perfume y silencio antes del primer bocado.</p>
        </div>
      </div>
    </section>
  );
}

function FeaturedDishes() {
  const dishes = [
    ['Branzino acevichado', 'Aguacate, cebolla morada, pimientos rostizados.', assets.dishOne],
    ['O-toro y yuzu', 'Miso, soya, cítrico y grasa limpia.', assets.dishTwo],
    ['Short rib ahumado', '24 horas de paciencia y humo discreto.', img('photo-1544025162-d76694265947')]
  ];
  return (
    <section className="px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div data-reveal className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Platos destacados</p>
            <h2 className="section-title max-w-3xl">Técnica visible solo en la calma del resultado.</h2>
          </div>
          <p className="max-w-md text-ivory/60">Una carta extensa, curada para moverse entre crudos, fuego, trufa, mariscos y finales memorables.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {dishes.map(([name, desc, image], index) => (
            <motion.article key={name} data-reveal className={`dish-tile ${index === 1 ? 'md:mt-20' : ''}`} whileHover="hover">
              <div className="relative h-[470px] overflow-hidden">
                <motion.img variants={{ hover: { scale: 1.07 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} src={image} alt={name} className="size-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/12 to-transparent" />
              </div>
              <div className="absolute bottom-0 p-6">
                <span className="text-xs uppercase tracking-[0.28em] text-amber">0{index + 1}</span>
                <h3 className="mt-3 font-serif text-4xl">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-ivory/65">{desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CocktailChef() {
  return (
    <section className="grid md:grid-cols-2">
      <StoryPanel image={assets.cocktail} kicker="Coctelería" title="La barra baja la voz y sube la temperatura." body="Botánicos, amargos, cítricos y cristal frío. Cocteles pensados para acompañar la mesa o abrir una segunda escena." />
      <StoryPanel image={assets.chef} kicker="Filosofía del chef" title="Autor sin exceso, lujo sin ruido." body="La cocina busca precisión emocional: producto noble, técnica limpia y una cadencia que deja respirar cada ingrediente." flip />
    </section>
  );
}

function StoryPanel({ image, kicker, title, body, flip }) {
  return (
    <article className="relative min-h-[720px] overflow-hidden p-5 md:p-8">
      <img data-parallax="-9" src={image} alt={title} className="absolute inset-0 size-full object-cover opacity-70" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      <div data-reveal className={`relative z-10 flex h-full flex-col justify-end ${flip ? 'md:items-end md:text-right' : ''}`}>
        <p className="eyebrow">{kicker}</p>
        <h2 className="mt-4 max-w-xl font-serif text-[clamp(3rem,6vw,6.4rem)] leading-[0.88]">{title}</h2>
        <p className="mt-6 max-w-md text-lg leading-8 text-ivory/68">{body}</p>
      </div>
    </article>
  );
}

function Gallery() {
  return (
    <section id="galeria" className="px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div data-reveal className="mb-14 max-w-4xl">
          <p className="eyebrow">Galería</p>
          <h2 className="section-title">Una atmósfera para mirar lento.</h2>
        </div>
        <div className="columns-1 gap-4 md:columns-3">
          {gallery.map((image, index) => (
            <div key={image} data-mask className={`mb-4 overflow-hidden ${index % 3 === 1 ? 'md:mt-20' : ''}`}>
              <img src={image} alt="Atmósfera cinematica de Azahar" className="w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuExperience() {
  const [active, setActive] = useState(menuCategories[0]);
  return (
    <section id="carta" className="relative overflow-hidden border-y border-ivory/10 bg-smoke px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div data-reveal className="mb-14 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">La carta</p>
            <h2 className="section-title">Un menú editorial para entrar por capas.</h2>
          </div>
          <p className="self-end text-lg leading-8 text-ivory/62 md:col-span-5 md:col-start-8">Categorías que cambian de imagen, ritmo y temperatura. Inspirado en revistas de lujo, diseñado para recorrer antes de reservar.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.55fr_1fr]">
          <div data-reveal className="flex gap-2 overflow-x-auto pb-3 lg:block lg:space-y-2 lg:overflow-visible">
            {menuCategories.map((cat) => (
              <button key={cat.id} onClick={() => setActive(cat)} className={`menu-tab ${active.id === cat.id ? 'is-active' : ''}`}>{cat.label}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="grid gap-6 md:grid-cols-[0.8fr_1fr]">
              <div className="relative min-h-[540px] overflow-hidden" data-mask>
                <img src={active.image} alt={active.label} className="absolute inset-0 size-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="eyebrow">{active.label}</p>
                  <p className="mt-3 max-w-sm text-xl leading-8 text-ivory/78">{active.note}</p>
                </div>
              </div>
              <div className="divide-y divide-ivory/10 border-y border-ivory/10">
                {active.items.map(([name, desc, price]) => (
                  <motion.div key={name} className="group grid grid-cols-[1fr_auto] gap-5 py-7" whileHover={{ x: 10 }} transition={{ duration: 0.35 }}>
                    <div>
                      <h3 className="font-serif text-3xl text-ivory group-hover:text-amber">{name}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-ivory/56">{desc}</p>
                    </div>
                    <span className="pt-2 font-serif text-2xl text-amber">{price}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <p className="eyebrow justify-center">Voces</p>
        <blockquote className="font-serif text-[clamp(2.6rem,6vw,6.8rem)] leading-[0.95] text-ivory">“El amor fluye en todo el ambiente. La música se impregna de su esencia.”</blockquote>
        <p className="mt-7 text-sm uppercase tracking-[0.28em] text-ivory/48">Rafael R. · TripAdvisor</p>
        <a href={tripAdvisorUrl} target="_blank" rel="noreferrer" className="cta mt-9">
          Ver reseñas <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}

function Reservation() {
  const [guests, setGuests] = useState('2');
  return (
    <section id="reservas" className="relative overflow-hidden px-5 py-24 md:px-8 md:py-36">
      <img src={assets.table} alt="" className="absolute inset-0 size-full object-cover opacity-36" loading="lazy" />
      <div className="absolute inset-0 bg-ink/76" />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <p className="eyebrow">Reservas</p>
          <h2 className="section-title max-w-3xl">Permítanos preparar la noche con anticipación.</h2>
          <div className="mt-8 grid gap-4 text-ivory/64">
            <p className="flex items-center gap-3"><MapPin size={17} /> Av. Balboa, PH Yoo, piso 7.</p>
            <p className="flex items-center gap-3"><Clock size={17} /> Lunes a miércoles 12m-11pm · jueves a sábado 12m-12am.</p>
          </div>
        </div>
        <form className="reservation-panel">
          <label>Nombre<input placeholder="Nombre y apellido" /></label>
          <label>Fecha<input type="date" /></label>
          <label>Hora<select><option>8:00 pm</option><option>8:30 pm</option><option>9:00 pm</option><option>9:30 pm</option></select></label>
          <label>Invitados<select value={guests} onChange={(e) => setGuests(e.target.value)}><option>2</option><option>3</option><option>4</option><option>5</option><option>6+</option></select></label>
          <label className="md:col-span-2">Preferencia<textarea placeholder="Mesa íntima, celebración, maridaje o detalle especial" /></label>
          <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="cta md:col-span-2" type="button"><CalendarDays size={18} /> Solicitar reserva</motion.button>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="whatsapp-cta md:col-span-2">
            Reservar por WhatsApp <ArrowUpRight size={17} />
          </a>
        </form>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <footer className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1500px] border-t border-ivory/10 pt-10">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">Azahar Panamá</p>
            <h2 className="mt-4 max-w-5xl font-serif text-[clamp(4rem,10vw,12rem)] leading-[0.8]">La noche empieza antes del primer plato.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a href="#reservas" className="cta w-fit">Reservar ahora <ArrowUpRight size={18} /></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="cta w-fit">WhatsApp <ArrowUpRight size={18} /></a>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 text-sm text-ivory/48 md:flex-row">
          <span>Av. Balboa · PH Yoo · Piso 7 · Ciudad de Panamá</span>
          <span>Teléfono +(507) 203 98 56 · WA +(507) 6890 49 62</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const rootRef = useRef(null);
  useLenis();
  useCinematicScroll(rootRef);
  return (
    <main ref={rootRef} className="min-h-screen bg-ink text-ivory">
      <Header />
      <Hero />
      <Experience />
      <FeaturedDishes />
      <CocktailChef />
      <MenuExperience />
      <Gallery />
      <Testimonials />
      <Reservation />
      <FinalCTA />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
