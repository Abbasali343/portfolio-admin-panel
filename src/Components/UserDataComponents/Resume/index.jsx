import EducationCard from "../EducationCard";
import ExperienceCard from "../ExperienceCard";
import "../UserDataComponents.css";

export default function Resume({name, educationData, experienceData,handleEduEditing }) {
  return (
    <>
      <div className="resume-details-container">
        <div className="resume-header">
          <h1>Education Details</h1>
        </div>
        <div className="main-resume-container">
          <div className="resume-education-container">
            <EducationCard name={name} data={educationData && educationData} handleEduEditing={handleEduEditing} />
          </div>
        </div>
      </div>
    </>
  );
}
