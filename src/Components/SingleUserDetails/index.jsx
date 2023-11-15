import { useEffect, useState } from "react";
import axios from "axios";
import PersonalInfoCard from "../UserDataComponents/PersonalInfoCard";
import Resume from "../UserDataComponents/Resume";
import TestimonialsCard from "../UserDataComponents/TestimonialsCard";
import PortfolioCard from "../UserDataComponents/PortfolioCard";
import "../ShowDetails/ShowDetails.css";

export default function SingleUserDetails({ userName, handleDetails }) {
  const [data, setData] = useState();
  const [isEditing, setIsEditing] = useState(false);
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
    experienceInfo = data.experienceData;
    pfLinks = data.pfLinks;
    testimonialsInfo = data.testimonials;
  }

  function handleEditing() {
    setIsEditing(!isEditing);
  }
  return (
    <>
      <div className="user-details-header">
        <h1 className="close-page" onClick={() => handleDetails("")}>
          X
        </h1>
      </div>
      {!isEditing && (
        <div className="details-container">
          <div className="card-container">
            <PersonalInfoCard
              data={personalInfo}
              handleEditing={handleEditing}
            />
            <Resume
              educationData={educationInfo}
              experienceData={experienceInfo}
            />
            <TestimonialsCard data={testimonialsInfo} />
            <PortfolioCard data={pfLinks} />
          </div>
        </div>
      )}
    </>
  );
}
