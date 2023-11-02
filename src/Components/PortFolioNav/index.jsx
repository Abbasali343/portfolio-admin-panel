export default function PortfolioNav({handleNavClick}) {
  return (
    <>
      <div className="portfolio-nav">
        <h1 className="portfolio-nav-heading" onClick={()=>handleNavClick('web development')}>Web Development</h1>
        <h1 className="portfolio-nav-heading" onClick={()=>handleNavClick('graphic design')}>Graphic Design</h1>
        <h1 className="portfolio-nav-heading" onClick={()=>handleNavClick('photography')}>PhotoGraphy</h1>
      </div>
    </>
  );
}
