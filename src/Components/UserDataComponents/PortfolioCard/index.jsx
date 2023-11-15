import { useState } from "react";

export default function PortfolioCard({ data }) {
  const [category, setCategory] = useState("all");
  let webDevelopment;
  let graphicDesign;
  let photoGraphy;
  let webContainer;
  let graphicContainer;
  let photoContainer;
  if (data) {
    webDevelopment = data.filter(checkWebDevelopment);
    graphicDesign = data.filter(checkGraphicDesign);
    photoGraphy = data.filter(checkPhotoGraphy);
    webContainer = webDevelopment[0];
    graphicContainer = graphicDesign[0];
    photoContainer = photoGraphy[0];
  }

  let links1;
  let links2;
  let links3;
  let renderCard1;
  let renderCard2;
  let renderCard3;

  if (webContainer) {
    links1 = webContainer.links;
  }
  if (graphicContainer) {
    links2 = graphicContainer.links;
  }
  if (photoContainer) {
    links3 = photoContainer.links;
  }

  if (links1) {
    renderCard1 = links1.slice(0, 4).map((item, index) => (
      <div
        key={index}
        className={
          category === "all" ? "pf-web-image-container" : "pf-web-container"
        }
      >
        <img src={item} className="pf-web-image" />
      </div>
    ));
  }
  if (links2) {
    renderCard2 = links2.slice(0, 4).map((item, index) => (
      <div
        key={index}
        className={
          category === "all" ? "pf-web-image-container" : "pf-web-container"
        }
      >
        <img src={item} className="pf-web-image" />
      </div>
    ));
  }
  if (links3) {
    renderCard3 = links3.slice(0, 4).map((item, index) => (
      <div
        key={index}
        className={
          category === "all" ? "pf-web-image-container" : "pf-web-container"
        }
      >
        <img src={item} className="pf-web-image" />
      </div>
    ));
  }

  function checkWebDevelopment(detail) {
    return detail.field === "web development";
  }
  function checkGraphicDesign(detail) {
    return detail.field === "graphic design";
  }
  function checkPhotoGraphy(detail) {
    return detail.field === "photography";
  }
  function handleCategory(value) {
    setCategory(value);
  }
  return (
    <>
      <div className="test-main-container">
        <div className="test-head">
          <h1>PortFolio</h1>
          <div className="test-body" id="pf-body">
            <div className="portfolio-details-nav">
              <h3 className="pf-nav-head" onClick={() => handleCategory("all")}>
                All
              </h3>
              <h3
                className="pf-nav-head"
                onClick={() => handleCategory("webDesign")}
              >
                Web Design
              </h3>
              <h3
                className="pf-nav-head"
                onClick={() => handleCategory("graphicDesign")}
              >
                Graphic Design
              </h3>
              <h3
                className="pf-nav-head"
                onClick={() => handleCategory("photoGrapher")}
              >
                PhotoGrapher
              </h3>
            </div>
            <div className="pf-body">
              {category === "all" && (
                <>
                  <div className="pf-details-all-container">{renderCard1}</div>
                  <div className="pf-details-all-container">{renderCard2}</div>
                  <div className="pf-details-all-container">{renderCard3}</div>
                </>
              )}
              {category !== "all" && (
                <>
                  <div className="pf-details-container">
                    {category === "webDesign" && renderCard1}
                    {category === "graphicDesign" && renderCard2}
                    {category === "photoGrapher" && renderCard3}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
