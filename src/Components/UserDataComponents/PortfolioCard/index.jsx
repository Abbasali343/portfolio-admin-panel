import { useEffect, useState } from "react";

export default function PortfolioCard({ data }) {
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setIsActive(data[0].field);
    }
  }, [data]);

  let fields = [];
  const allLinks = [];
  let dataArray;
  let links;
  let renderCard;
  if (data) {
    data.map((item) => {
      fields.push(item.field);
      allLinks.push(item.links);
    });
  }

  if (data) {
    dataArray = data.filter(checkCategory);
  }
  function checkCategory(detail) {
    return detail.field === isActive;
  }

  if (dataArray && dataArray.length > 0) {
    if (dataArray[0].links) {
      links = dataArray[0].links;
    }

    if (links !== null) {
      renderCard = links.map((item, index) => (
        <div key={index} className="pf-details-img-container">
          <img src={item} className="pf-details-image" />
        </div>
      ));
    }
  }

  function handleCategory(item) {
    setIsActive(item);
  }
  return (
    <>
      <div className="test-main-container">
        <div className="test-head">
          <h1>PortFolio</h1>
          <div className="pf-nav-head">
            <div className="pf-nav-container">
              {fields &&
                fields.map((item, index) => (
                  <div key={index}>
                    <h1
                      className="pf-nav-update-option"
                      id={isActive === item ? "isActive" : null}
                      onClick={() => handleCategory(item)}
                    >
                      {item}
                    </h1>
                  </div>
                ))}
            </div>
          </div>
          <div className="render-card-container">{renderCard}</div>
        </div>
      </div>
    </>
  );
}
