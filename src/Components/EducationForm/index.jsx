import AddButton from "../AddButton";

export default function EducationForm() {
  return (
    <>
      <div className="professional-form-container">
      <AddButton />
        <div className="profession-input-container">
          <div className="input-container" id="input-container">
            <input className="personal-input" placeholder="Enter Title" />
          </div>
          <div className="input-container" id="input-container">
            <input className="personal-input" placeholder="Enter University/Company" />
          </div>
          <div className="input-container" id="input-container">
            <input
              className="personal-input"
              id="personal-input"
              placeholder="Enter Your Intro(15 to 200 words)"
              min={15}
              max={200}
            />
          </div>
          
        </div>
      </div>
    </>
  );
}
