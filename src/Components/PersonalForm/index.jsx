import { useFormik } from "formik";
import { introSchema } from "../../Schemas";
import UploadButton from "../UploadButton";
import "../../assets/css/Form.css";

const initialValues = {
  name: "",
  profession: "",
  description: '',
  followers: 0,
  projects: 0,
  clients: 0,
  experience: 0,
};

const PersonalForm = () => {
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
      <div className="main-input-container">
        <div className="input-container">
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
        <div className="input-container">
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
        <div className="input-container">
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
        <div className="input-container">
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
        <div className="input-container">
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
        <div className="input-container">
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
        <div className="input-container">
          <UploadButton />
        </div>
        <button className="personal-button" type="button" onClick={handleSubmit} >Submit</button>
      </div>
    </>
  );
};

export default PersonalForm;
