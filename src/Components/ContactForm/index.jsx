import axios from "axios";
import AddButton from "../AddButton";
import ProfileSelector from "../ProfileSelector";
import { useFormik } from "formik";
import { adminSchema } from "../../Schemas";
import { useState } from "react";

const initialValues = {
  title: "don't have",
  email: "",
  phoneNo: "",
  description: "i have no values for this section",
  company: "don't have",
  userName: "",
};
export default function ContactForm() {
  const [selectedName, setSelectedName] = useState("");
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: adminSchema,
      onSubmit: (values, action) => {
        const requestedValues = {
          email: values.email,
          phoneNo: values.phoneNo,
          name: values.userName,
        };
        axios
          .patch("http://localhost:3000/v1/admin/addContact", requestedValues)
          .then((response) => {
            if (response.status === 201) {
              alert(response.data.message);
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

  return (
    <>
      {values.userName === "" ? (
        <ProfileSelector getName={getName} />
      ) : (
        <div className="professional-form-container">
          <AddButton handleClick={handleSubmit} />
          <div className="profession-input-container">
            <div className="input-container" id="input-container">
              <input
                className="personal-input"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
            </div>
            <div className="input-container" id="input-container">
              <input
                className="personal-input"
                name="phoneNo"
                placeholder="Enter Phone No. of 10 words"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNo}
              />
              {errors.phoneNo && touched.phoneNo ? (
                <p className="form-error">{errors.phoneNo}</p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
