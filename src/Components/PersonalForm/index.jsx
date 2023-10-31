import UploadButton from "../UploadButton";
import "../../assets/css/Form.css";

const PersonalForm = () => {
  return (
    <>
      <div className="main-input-container">
        <div className="input-container">
          <input className="personal-input" placeholder="Enter Your Name" />
        </div>
        <div className="input-container">
          <input
            className="personal-input"
            placeholder="Enter Your Profession"
          />
        </div>
        <div className="input-container">
          <input className="personal-input" placeholder="Enter Projects " />
        </div>
        <div className="input-container">
          <input className="personal-input" placeholder="Enter Experience" />
        </div>
        <div className="input-container">
          <input className="personal-input" placeholder="Enter Clients" />
        </div>
        <div className="input-container">
          <input className="personal-input" placeholder="Enter Followers" />
        </div>
        <div className="input-container">
          <input
            className="personal-input"
            id="personal-input"
            placeholder="Enter Your Intro(15 to 200 words)"
            min={15}
            max={200}
          />
        </div>
        <div className="input-container">
          <UploadButton />
        </div>
        <button className="personal-button">Submit</button>
      </div>
    </>
  );
};

export default PersonalForm;
