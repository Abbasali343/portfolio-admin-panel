import { useState } from "react";
import { EditButton } from "../../../Components.style";
import UploadButton from "../../UploadButton";
import "../EditEducationForm/EditEducationForm.css";
export default function DisplayResume({ data, onClose, type }) {
  const [details, setDetails] = useState(data[0]);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  async function handleUpload(file, handleToggle) {
    const imageRef = ref(storage, `graphics/${file.name + v4()}`);
    const response = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(response.ref);
    setImage(url);
    handleToggle();
  }

  function toggleImage() {
    setIsUploaded(true);
  }

  return (
    <>
      <div className="main-display-container">
        <div className="display-header">
          <h1 className="display-back-button" onClick={onClose}>
            &#8592;
          </h1>
          <EditButton
            top={"20px"}
            left={"700px"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </EditButton>
        </div>
        <div className="display-details-container">
          <div className="display-details-sub-container">
            <div className="label-container">
              {type === "education" ? (
                <>
                  <h2>Degree:</h2>
                  <h2>University:</h2>
                </>
              ) : type === "experience" ? (
                <>
                  <h2>Designation:</h2>
                  <h2>Company:</h2>
                </>
              ) : type === "profession" ? (
                <>
                  <h2>Title:</h2>
                  <h2>image:</h2>
                </>
              ) : (
                <>
                  <h2>Name:</h2>
                  <h2>Profession:</h2>
                </>
              )}
            </div>
            <div className="value-container">
              {isEditing ? (
                <>
                  <input
                    className="personal-input"
                    placeholder="Enter Your Name"
                    name={
                      type === "education" ||
                      type === "experience" ||
                      type === "profession"
                        ? "title"
                        : "testimonialName"
                    }
                    onChange={handleChange}
                    value={
                      type === "education" ||
                      type === "experience" ||
                      type === "profession"
                        ? details.title
                        : details.testimonialName
                    }
                  />
                  {type === "profession" ? (
                    <div className="edit-profession-input-container">
                      <UploadButton
                        handleUpload={handleUpload}
                        toggle={toggleImage}
                      />
                    </div>
                  ) : (
                    <input
                      className="personal-input"
                      placeholder="Enter Your Name"
                      name={
                        type === "education" || type === "experience"
                          ? "company"
                          : "profession"
                      }
                      onChange={handleChange}
                      value={
                        type === "education" || type === "experience"
                          ? details.company
                          : details.profession
                      }
                    />
                  )}
                </>
              ) : (
                <>
                  <h2>
                    {type === "education" ||
                    type === "experience" ||
                    type === "profession"
                      ? details.title
                      : details.testimonialName}
                  </h2>
                  {type === "profession" ? (
                    <img src={details.link} className="edit-info-img" />
                  ) : (
                    <h2>
                      {type === "education" || type === "experience"
                        ? details.company
                        : details.profession}
                    </h2>
                  )}
                </>
              )}
            </div>
          </div>
          <div
            className="display-details-sub-container"
            id="display-details-sub-container"
          >
            <div className="edu-intro-container">
              {type === "education" || type === "experience" ? (
                <h2>Introduction:</h2>
              ) : (
                <h2>Message:</h2>
              )}
              {isEditing ? (
                <textarea
                  className="personal-input"
                  id="personal-input"
                  placeholder="Enter Your Intro(15 to 200 words)"
                  name="description"
                  onChange={handleChange}
                  value={details.description}
                />
              ) : (
                <h2 className="edu-details-intro">{data[0].description}</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
