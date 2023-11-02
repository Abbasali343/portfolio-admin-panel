import axios from "axios";
import AddButton from "../AddButton";
import UploadButton from "../UploadButton";
import ToggledBox from "../ToggledBox";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useFormik } from "formik";
import { introSchema } from "../../Schemas";
import { useState } from "react";

const initialValues = {
  name: "",
  profession: "",
  description: "",
  followers: 1,
  projects: 1,
  clients: 1,
  experience: 1,
};

export default function TestimonialForm() {
  const [image, setImage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: introSchema,
      onSubmit: (values, action) => {
        if (image === "") {
          return alert("Select Image");
        }
        axios
          .post("http://localhost:3000/v1/admin/addTestimonial", values)
          .then((response) => {
            if (response.status === 201) {
              alert(response.data.message);
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
      .patch("http://localhost:3000/v1/admin/updateTestimonial", requestBody)
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
          setIsUploaded(false)
        }
      });
  }

  return (
    <>
      <div className="professional-form-container">
        <AddButton handleClick={handleSubmit} />
        <div className="profession-input-container">
          <div className="input-container" id="input-container">
            <input
              className="personal-input"
              placeholder="Enter Name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name ? (
              <p className="form-error">{errors.name}</p>
            ) : null}
          </div>
          <div className="input-container" id="input-container">
            <input
              className="personal-input"
              placeholder="Enter Profession"
              name="profession"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.profession}
            />
            {errors.profession && touched.profession ? (
              <p className="form-error">{errors.profession}</p>
            ) : null}
          </div>
          <div className="both-input-container">
            <div className="input-container" id="input-container">
              <input
                className="personal-input"
                id="personal-input"
                placeholder="Enter Your Message(15 to 200 words)"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              {errors.description && touched.description ? (
                <p className="form-error">{errors.description}</p>
              ) : null}
            </div>
            <div className="input-container">
              {!isUploaded ? (
                <UploadButton
                  handleUpload={handleUpload}
                  toggle={toggleImage}
                />
              ) : (
                <ToggledBox />
              )}
              {errors.link && touched.link ? (
                <p className="form-error">{errors.link}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
