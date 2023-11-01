import AddButton from "../AddButton";
import UploadButton from "../UploadButton";
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
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: adminSchema,
      onSubmit: (values, action) => {
        action.resetForm();
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
            <UploadButton />
          </div>
        </div>
      </div>
    </>
  );
}
