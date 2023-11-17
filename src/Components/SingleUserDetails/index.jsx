import { useEffect, useState } from "react";
import axios from "axios";
import PersonalInfoCard from "../UserDataComponents/PersonalInfoCard";
import Resume from "../UserDataComponents/Resume";
import TestimonialsCard from "../UserDataComponents/TestimonialsCard";
import PortfolioCard from "../UserDataComponents/PortfolioCard";
import EditPersonalForm from "../EditPersonalForm";
import EditEducationForm from "../UserDataComponents/EditEducationForm";
import DisplayResume from "../UserDataComponents/DisplayResume";
import ProfessionCard from "../UserDataComponents/ProfessionCard";
import "../ShowDetails/ShowDetails.css";

export default function SingleUserDetails({ userName, handleDetails }) {
  const [data, setData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isEduEditing, setIsEduEditing] = useState(false);
  const [detailsType, setDetailsType] = useState();
  const [singleEducation, setSingleEducation] = useState();

  function fetchData() {
    axios
      .get(`http://localhost:3000/v1/admin/oneUser?name=${userName}`)
      .then((response) => {
        setData(response.data);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  let personalInfo;
  let professionalInfo;
  let educationInfo;
  let experienceInfo;
  let pfLinks;
  let testimonialsInfo;

  if (data) {
    personalInfo = {
      name: data.name,
      phoneNo: data.phoneNo,
      email: data.email,
      experience: data.experience,
      projects: data.projects,
      clients: data.clients,
      followers: data.clients,
      description: data.description,
      profession: data.profession,
      profilePicture: data.profilePicture,
    };
    educationInfo = data.education;
    professionalInfo = data.professionsData;
    experienceInfo = data.experienceData;
    pfLinks = data.pfLinks;
    testimonialsInfo = data.testimonials;
  }

  function handleEditing() {
    setIsEditing(!isEditing);
  }
  function handleEduEditing(title, type) {
    setDetailsType(type);
    setIsEduEditing(!isEduEditing);
    setSingleEducation(
      type === "education"
        ? educationInfo.filter((education) => {
            return education.title === title;
          })
        : type === "experience"
        ? experienceInfo.filter((experience) => {
            return experience.title === title;
          })
        : type === "profession"
        ? professionalInfo.filter((profession) => {
            return profession.title === title;
          })
        : type === "testimonial"
        ? testimonialsInfo.filter((testimonial) => {
            return testimonial.testimonialName === title;
          })
        : null
    );
  }
  return (
    <>
      {isEduEditing && (
        <>
          <EditEducationForm />
          <DisplayResume
            name={personalInfo.name}
            data={singleEducation}
            onClose={handleEduEditing}
            type={detailsType}
          />
        </>
      )}
      {!isEditing && (
        <>
          <div className="user-details-header">
            <h1 className="close-page" onClick={() => handleDetails("")}>
              X
            </h1>
          </div>
          <div className="details-container">
            <div className="card-container">
              <PersonalInfoCard
                data={personalInfo}
                handleEditing={handleEditing}
              />
              <ProfessionCard
                data={professionalInfo}
                handleEduEditing={handleEduEditing}
              />
              <Resume
                educationData={educationInfo}
                experienceData={experienceInfo}
                handleEduEditing={handleEduEditing}
              />
              <TestimonialsCard
                data={testimonialsInfo}
                handleEduEditing={handleEduEditing}
              />
              <PortfolioCard data={pfLinks} name={personalInfo && personalInfo.name} />
            </div>
          </div>
        </>
      )}
      {isEditing && (
        <EditPersonalForm data={personalInfo} handleEditing={handleEditing} />
      )}
    </>
  );
}
