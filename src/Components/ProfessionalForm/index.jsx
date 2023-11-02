import { useState } from "react";
import axios from "axios";
import AddButton from "../AddButton";
import UploadButton from "../UploadButton";
import ToggledBox from "../ToggledBox";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useFormik } from "formik";
import { adminSchema } from "../../Schemas";
import "./ProfessionalForm.css";

const initialValues = {
  title: "",
  email: "abc@gmail.com",
  phoneNo: "1234567890",
  description: "",
  company: "don't have",
};
export default function ProfessionalForm() {
  const [image, setImage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: adminSchema,
      onSubmit: (values, action) => {
        if (image === "") {
          return alert("Select Image");
        }
        axios
          .post("http://localhost:3000/v1/admin/addProfession", values)
          .then((response) => {
            if (response.status === 201) {
              alert(response.data.message);
              handleClick(values.title);
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

  function handleClick(title) {
    const requestBody = { title: title, link: image };

    axios
      .patch("http://localhost:3000/v1/admin/updateProfession", requestBody)
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
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
              placeholder="Enter Title"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            {errors.title && touched.title ? (
              <p className="form-error">{errors.title}</p>
            ) : null}
          </div>
          <div className="input-container">
            <input
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
          <div className="input-container" id="upload">
            {!isUploaded ? (
              <UploadButton handleUpload={handleUpload} toggle={toggleImage} />
            ) : (
              <ToggledBox />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
