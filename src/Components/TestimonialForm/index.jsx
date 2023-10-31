import AddButton from "../AddButton";

export default function TestimonialForm() {
  return (
    <>
      <div className="professional-form-container">
      <AddButton />
        <div className="profession-input-container">
          <div className="input-container" id="input-container">
            <input className="personal-input" placeholder="Enter Name" />
          </div>
          <div className="input-container" id="input-container">
            <input
              className="personal-input"
              placeholder="Enter Profession"
            />
          </div>
          <div className="input-container" id="input-container">
            <input
              className="personal-input"
              id="personal-input"
              placeholder="Enter Your Message(15 to 200 words)"
              min={15}
              max={200}
            />
          </div>
        </div>
      </div>
    </>
  );
}
