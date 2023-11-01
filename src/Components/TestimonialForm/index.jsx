import AddButton from "../AddButton";
import { useFormik } from "formik";
import { introSchema } from "../../Schemas";

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
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: introSchema,
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
        </div>
      </div>
    </>
  );
}
