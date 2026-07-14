import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Первый Сварной — сварочные работы в Минске",
  description: "Автомобильные сварочные работы, пескоструйная чистка и антикоррозийная обработка в Минске.",
};

const heroCards = [
  "/assets/hero-card-1.png",
  "/assets/hero-card-2.png",
  "/assets/hero-card-3.png",
  "/assets/hero-card-4.png",
  "/assets/hero-card-5.png",
];

function Corners() {
  return <span className="corners" aria-hidden="true"><i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" /></span>;
}

function Header() {
  return (
    <header className="siteHeader">
      <div className="headerInner">
        <button className="menuButton" type="button" aria-label="Открыть меню">
          <span className="menuIcon" aria-hidden="true"><i /><i /></span>
          <span className="menuLabel">МЕНЮ</span>
        </button>
        <a className="logoLink" href="#top" aria-label="Первый Сварной — главная">
          <img src="/assets/logo.png" alt="Первый Сварной" />
        </a>
        <a className="diagnosticLink" href="tel:+375333771440">
          <span>БЕСПЛАТНАЯ ДИАГНОСТИКА</span>
          <span className="phoneButton" aria-hidden="true"><Corners /><span>↗</span></span>
        </a>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <main id="top">
      <Header />
      <section className="hero" aria-labelledby="hero-title">
        <div className="heroBackground" aria-hidden="true" />
        <div className="heroShade" aria-hidden="true" />
        <div className="heroContent">
          <div className="heroText">
            <div className="heroCopy">
              <h1 id="hero-title">Автомобильные сварочные работы, пескоструйная чистка и антикоррозийная обработка в Минске</h1>
              <p>Комплексное восстановление кузова: от глубокой очистки металла до долговременной защиты — с точной диагностикой и контролем результата!</p>
            </div>
            <a className="heroButton" href="tel:+375333771440"><Corners /><span>Записаться На Бесплатную Диагностику</span><img src="/assets/arrow.svg" alt="" /></a>
          </div>
          <div className="heroCards" aria-label="Примеры работ">
            {heroCards.map((src, index) => <div className="heroCard" key={src}><Corners /><img src={src} alt={`Пример кузовных работ ${index + 1}`} /></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
