import { EditButton } from "../../../Components.style";
export default function PersonalInfoCard({ data,handleEditing }) {
  return (
    <>
      <div className="personal-info-container">
        <div className="info-container">
          <div>
            <img
              src={data && data.profilePicture}
              className="personal-card-image"
            />
          </div>
          <div className="info-sub-container">
            <h3>{data && data.name}</h3>
            <h5 className="single-user-email">{data && data.email}</h5>
          </div>
          <EditButton top={"30px"} left={"500px"} onClick={handleEditing}>
            Edit
          </EditButton>
        </div>
        <div className="about-info-container">
          <div className="about-info-sub-container">
            <div className="sub-card">
              <h3>Profession:</h3>
              <h3>Experience:</h3>
              <h3>Phone No. :</h3>
            </div>
            <div className="sub-card">
              <h3 className="info-data">{data && data.profession}</h3>
              <h3 className="info-data">{data && data.experience} +years</h3>
              <h3 className="info-data">{data && data.phoneNo}</h3>
            </div>
          </div>
          <div className="about-info-sub-container">
            <div className="sub-card">
              <h3>Projects:</h3>
              <h3>Clients:</h3>
              <h3>Followers :</h3>
            </div>
            <div className="sub-card">
              <h3 className="info-data">{data && data.projects} +</h3>
              <h3 className="info-data">{data && data.clients} +</h3>
              <h3 className="info-data">{data && data.followers} +</h3>
            </div>
          </div>
          <div className="about-info-sub-container">
            <h3 className="intro-heading">Intro</h3>
            <h3 className="intro-msg">{data && data.description}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
