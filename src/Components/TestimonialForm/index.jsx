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
  userName: "",
};

export default function TestimonialForm() {
  const [image, setImage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [isModal, setIsModal] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: introSchema,
      onSubmit: (values, action) => {
        if (image === "") {
          return alert("Select Image");
        }
        const requestedValues = {
          name: values.userName,
          testimonialName: values.name,
          description: values.description,
          profession: values.profession,
        };
        axios
          .patch(
            "http://localhost:3000/v1/admin/addTestimonial",
            requestedValues
          )
          .then((response) => {
            if (response.status === 201) {
              handleClick(values.name, values.userName);
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
  function handleClick(testimonialName, name) {
    const requestBody = {
      name: name,
      testimonialName: testimonialName,
      link: image,
    };

    axios
      .patch("http://localhost:3000/v1/admin/updateTestimonial", requestBody)
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
                <textarea
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
                  <ToggledBox image={image} />
                )}
                {errors.link && touched.link ? (
                  <p className="form-error">{errors.link}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
