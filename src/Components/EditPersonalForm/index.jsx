import axios from "axios";
import { useFormik } from "formik";
import { introSchema } from "../../Schemas";
import UploadButton from "../UploadButton";
import ToggledBox from "../ToggledBox";
import Modal from "../Modal";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import "./EditPersonalForm.css";

export default function EditPersonalForm({ data, handleEditing }) {
  const [image, setImage] = useState(data.profilePicture);

  const initialValues = {
    name: data.name,
    profession: data.profession,
    description: data.description,
    followers: data.followers,
    projects: data.projects,
    clients: data.clients,
    experience: data.experience,
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: introSchema,
      onSubmit: (values, action) => {
        if (image === "") {
          return alert("Select Image");
        }
        axios
          .post("http://localhost:3000/v1/admin/addUser", values)
          .then((response) => {
            if (response.status === 201) {
              handleClick(values.name);
              action.resetForm();
            }
          })
          .catch((err) => {
            if (err.response.status === 403) {
              alert(err.response.data.error);
            }
          });
      },
    });

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

  function handleClick(name) {
    const requestBody = { name: name, link: image };

    axios
      .patch("http://localhost:3000/v1/admin/updateUser", requestBody)
      .then((response) => {
        if (response.status === 201) {
          setIsModal(!isModal);
          setIsUploaded(false);
        }
      });
  }

  return (
    <>
      <div className="edit-personal-container">
        <div className="edit-input-container">
          <div className="input-container-1">
            <input
              className="personal-input"
              placeholder="Enter Your Name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name ? (
              <p className="form-error">{errors.name}</p>
            ) : null}
          </div>
          <div className="input-container-1">
            <input
              className="personal-input"
              placeholder="Enter Your Profession"
              name="profession"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.profession}
            />
            {errors.profession && touched.profession ? (
              <p className="form-error">{errors.profession}</p>
            ) : null}
          </div>
        </div>
        <div className="edit-input-container">
          <div className="input-container-1">
            <p className="subtitle">Enter Projects</p>
            <input
              className="personal-input"
              placeholder="Enter Projects "
              name="projects"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.projects}
            />
            {errors.projects && touched.projects ? (
              <p className="form-error">{errors.projects}</p>
            ) : null}
          </div>
          <div className="input-container-1">
            <p className="subtitle">Enter Experience</p>
            <input
              className="personal-input"
              placeholder="Enter Experience"
              name="experience"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.experience}
            />
            {errors.experience && touched.experience ? (
              <p className="form-error">{errors.experience}</p>
            ) : null}
          </div>
        </div>
        <div className="edit-input-container">
          <div className="input-container-1">
            <p className="subtitle">Enter Clients</p>
            <input
              className="personal-input"
              placeholder="Enter Clients"
              name="clients"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.clients}
            />
            {errors.clients && touched.clients ? (
              <p className="form-error">{errors.clients}</p>
            ) : null}
          </div>
          <div className="input-container-1">
            <p className="subtitle">Enter Followers</p>
            <input
              className="personal-input"
              placeholder="Enter Followers"
              name="followers"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.followers}
            />
            {errors.followers && touched.followers ? (
              <p className="form-error">{errors.followers}</p>
            ) : null}
          </div>
        </div>
        <div className="edit-input-container" id="edit-input-container">
          <div className="input-container-1">
            <textarea
              className="personal-input"
              id="personal-input"
              placeholder="Enter Your Intro(15 to 200 words)"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            {errors.description && touched.description ? (
              <p className="form-error">{errors.description}</p>
            ) : null}
          </div>
          <div className="input-container-1">
            {!image ? (
              <UploadButton handleUpload={handleUpload} toggle={toggleImage} />
            ) : (
              <ToggledBox image={image} />
            )}
            {errors.link && touched.link ? (
              <p className="form-error">{errors.link}</p>
            ) : null}
          </div>
        </div>

        <div className="new-user-buttons-container" id="edit-btn-container">
          <button
            className="personal-button"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={handleEditing}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
