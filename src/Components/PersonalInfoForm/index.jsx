import InfoHeader from "../InfoHeader";
import ShowDetails from "../ShowDetails";
import ProfessionalForm from "../ProfessionalForm";
import EducationForm from "../EducationForm";
import ExperienceForm from "../ExperienceForm";
import PortfolioForm from "../PortfolioForm";
import TestimonialForm from "../TestimonialForm";
import ContactForm from "../ContactForm";
import "../../assets/css/Form.css";

export default function PersonalInfoForm({ category }) {
  const title = category;
  const renderForm =
    category === "Personal" ? (
      <ShowDetails />
    ) : category === "Professional" ? (
      <ProfessionalForm />
    ) : category === "Education" ? (
      <EducationForm />
    ) : category === "Experience" ? (
      <ExperienceForm />
    ) : category === "Portfolio" ? (
      <PortfolioForm />
    ) : category === "Testimonials" ? (
      <TestimonialForm />
    ) : category === "Contact" ? (
      <ContactForm />
    ) : null;
  return (
    <>
      <div className="info-form-container">
        <InfoHeader title={`Update ${title} Info`} />
        {renderForm}
      </div>
    </>
  );
}
