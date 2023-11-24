import { useEffect, useState } from "react";
import axios from "axios";
import { EditButton } from "../../../Components.style";
import UploadButton from "../../UploadButton";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Modal from "../../Modal";
import ToggledBox from "../../ToggledBox";
import "../EditEducationForm/EditEducationForm.css";

export default function DisplayResume({ name, data, onClose, type }) {
  const [image, setImage] = useState();
  const [details, setDetails] = useState(data[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const baseLink = "https://easy-pink-nematode-tie.cyclic.app/v1/admin/";
  let requestedBody;

  useEffect(() => {
    if (type === "testimonial" || type === "profession") {
      setImage(details.link);
    }
  }, [type]);
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

  function handleSubmit() {
    let link;
    if (type === "education" || type === "experience") {
      link = "updateAllEducationInfo";
      requestedBody = {
        name: name,
        title: details.title,
        type: type,
        company: details.company,
        description: details.description,
      };
    } else if (type === "profession") {
      link = "updateAllProfessionalInfo";
      requestedBody = {
        name: name,
        title: details.title,
        description: details.description,
        link: image,
      };
    } else {
      link = "updateAllTestimonialInfo";
      requestedBody = {
        name: name,
        testimonialName: details.testimonialName,
        profession: details.profession,
        description: details.description,
        link: image,
      };
    }
    axios
      .patch(baseLink + link, requestedBody)
      .then((response) => {
        if (response.status === 201) {
          setIsModal(!isModal);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert(err.response.data.error);
        }
      });
  }
  function handleModal() {
    setIsModal(!isModal);
    onClose();
  }

  return (
    <>
      <div className="main-display-container">
        {isModal && <Modal handleModal={handleModal} />}
        <div className="display-header">
          <h1 className="display-back-button" onClick={onClose}>
            &#8592;
          </h1>
          {isEditing ? (
            <>
              <EditButton
                top={"20px"}
                left={"600px"}
                onClick={() => setIsEditing(!isEditing)}
              >
                Cancel
              </EditButton>
              <EditButton top={"20px"} left={"650px"} onClick={handleSubmit}>
                Submit
              </EditButton>
            </>
          ) : (
            <EditButton
              top={"20px"}
              left={"700px"}
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit
            </EditButton>
          )}
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
                  <h2>Image:</h2>
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
                    disabled
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
                      {!isUploaded ? (
                        <UploadButton
                          handleUpload={handleUpload}
                          toggle={toggleImage}
                        />
                      ) : (
                        <ToggledBox image={image} />
                      )}
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
                  {type === "testimonial" && (
                    <div className="edit-profession-input-container">
                      {!isUploaded ? (
                        <UploadButton
                          handleUpload={handleUpload}
                          toggle={toggleImage}
                        />
                      ) : (
                        <ToggledBox image={image} />
                      )}
                    </div>
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
                  {type === "profession" && (
                    <div className="edit-info-img-container-1">
                      <img src={image} className="edit-info-img" />
                    </div>
                  )}
                  <h2>
                    {type === "education" || type === "experience"
                      ? details.company
                      : details.profession}
                  </h2>
                  {type === "testimonial" && (
                    <div className="edit-info-img-container">
                      <img src={image} className="edit-info-img" />
                    </div>
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
