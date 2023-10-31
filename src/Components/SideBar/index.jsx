import { useState } from "react";
import profile from "../../assets/images/profile.png";
import "./SideBar.css";

const options = [
  "Personal",
  "Professional",
  "Education",
  "Experience",
  "Portfolio",
  "Testimonials",
  "Contact",
];

export default function SideBar({handleCategory}) {
  const [status, setStatus] = useState(0);
  const sections = (item, index) => (
    <div key={index} className="section">
      <a
        className="clickable"
        id={status === index ? "active" : null}
        onClick={() => {setStatus(index);
          handleCategory(options[index])}}
      >
        {item}
      </a>
    </div>
  );
  return (
    <>
      <div className="sidebar-main-container">
        <div>
          <img src={profile} />
        </div>
        <div className="section-container">
          {options.map((item, index) => sections(item, index))}
        </div>
      </div>
    </>
  );
}
