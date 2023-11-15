import axios from "axios";
import AddButton from "../AddButton";
import Modal from "../Modal";
import { useFormik } from "formik";
import ProfileSelector from "../ProfileSelector";
import { adminSchema } from "../../Schemas";
import { useEffect, useState } from "react";

const initialValues = {
  title: "",
  email: "abc@gmail.com",
  phoneNo: "1234567890",
  description: "",
  company: "",
  type: "experience",
  userName: "",
};

export default function ExperienceForm() {
  const [isModal, setIsModal] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: adminSchema,
      onSubmit: (values, action) => {
        const requestedValues = {
          title: values.title,
          description: values.description,
          company: values.company,
          type: values.type,
          name: values.userName,
        };
        axios
          .patch("http://localhost:3000/v1/admin/addEducation", requestedValues)
          .then((response) => {
            if (response.status === 201) {
              setIsModal(!isModal);
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
            <div className="input-container" id="input-container">
              <input
                className="personal-input"
                placeholder="Enter Company"
                name="company"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.company}
              />
              {errors.company && touched.company ? (
                <p className="form-error">{errors.company}</p>
              ) : null}
            </div>
            <div className="input-container" id="input-container">
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
          </div>
        </div>
      )}
    </>
  );
}
