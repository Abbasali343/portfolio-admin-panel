import EducationCard from "../EducationCard";
import ExperienceCard from "../ExperienceCard";
import "../UserDataComponents.css";

export default function Resume({ educationData, experienceData,handleEduEditing }) {
  return (
    <>
      <div className="resume-details-container">
        <div className="resume-header">
          <h1>Education Details</h1>
        </div>
        <div className="main-resume-container">
          <div className="resume-education-container">
            <EducationCard data={educationData && educationData} handleEduEditing={handleEduEditing} />
          </div>
        </div>
        <div className="resume-header">
          <h1>Experience Details</h1>
        </div>
        <div className="main-resume-container">
          <div className="resume-education-container">
            <ExperienceCard data={experienceData && experienceData} handleEduEditing={handleEduEditing} />
          </div>
        </div>
      </div>
    </>
  );
}
