import axios from "axios";
import AddButton from "../AddButton";
import { useFormik } from "formik";
import { adminSchema } from "../../Schemas";

const initialValues = {
  title:"don't have",
  email: "",
  phoneNo: "",
  description: "i have no values for this section",
  company:"don't have"
};
export default function ContactForm() {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: adminSchema,
      onSubmit: (values, action) => {
        axios
        .post("http://localhost:3000/v1/admin/addContact", values)
        .then((response) => {
          if (response.status === 201) {
            alert(response.data.message);
            action.resetForm();
          }
        });
      },
    });
  return (
    <>
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
    </>
  );
}
