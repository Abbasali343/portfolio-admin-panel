import AddButton from "../AddButton";

export default function ContactForm() {
  return (
    <>
      <div className="professional-form-container">
        <AddButton />
        <div className="profession-input-container">
          <div className="input-container" id="input-container">
            <input className="personal-input" placeholder="Enter Email" />
          </div>
          <div className="input-container" id="input-container">
            <input className="personal-input" placeholder="Enter Phone No." />
          </div>
        </div>
      </div>
    </>
  );
}
