import { useState } from "react";
import axios from "axios";
import AddButton from "../AddButton";
import UploadButton from "../UploadButton";
import ToggledBox from "../ToggledBox";
import ProfileSelector from "../ProfileSelector";
import Modal from "../Modal";
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
  userName: "",
};
export default function ProfessionalForm() {
  const [image, setImage] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: adminSchema,
      onSubmit: (values, action) => {
        if (image === "") {
          return alert("Select Image");
        }
        const requestedValues = {
          title: values.title,
          description: values.description,
          name: values.userName,
        };
        axios
          .post("http://localhost:3000/v1/admin/addProfession", requestedValues)
          .then((response) => {
            if (response.status === 201) {
              handleClick(values.userName, values.title);
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

  function handleClick(name, title) {
    const requestBody = { name: name, title: title, link: image };

    axios
      .patch("http://localhost:3000/v1/admin/updateProfession", requestBody)
      .then((response) => {
        if (response.status === 201) {
          setIsModal(!isModal);
          setIsUploaded(false);
        }
      });
  }
  function getName(name) {
    setSelectedName(name);
    values.userName = name;
  }
  function handleModal() {
    setIsModal(!isModal);
    setSelectedName("");
  }
  return (
    <>
      {selectedName === "" ? (
        <ProfileSelector getName={getName} />
      ) : (
        <div className="professional-form-container">
          {isModal && <Modal handleModal={handleModal} />}
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
            <div className="input-container" id="upload">
              {!isUploaded ? (
                <UploadButton
                  handleUpload={handleUpload}
                  toggle={toggleImage}
                />
              ) : (
                <ToggledBox image={image} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
