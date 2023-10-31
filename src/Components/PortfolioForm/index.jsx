import AddButton from "../AddButton";
import UploadButton from "../UploadButton";
import "./PortfolioForm.css";

const PortfolioForm = () => {
  return (
    <>
      <div className="professional-form-container">
      <AddButton />
        <div className="portfolio-input-container">
          <UploadButton />
          <UploadButton />
          <UploadButton />
          <UploadButton />
        </div>
      </div>
    </>
  );
};

export default PortfolioForm;
