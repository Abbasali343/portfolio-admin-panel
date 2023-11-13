import { useState } from "react";
import axios from "axios";
import AddButton from "../AddButton";
import UploadButton from "../UploadButton";
import ToggledBox from "../ToggledBox";
import PortfolioNav from "../PortFolioNav";
import ProfileSelector from "../ProfileSelector";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./PortfolioForm.css";

const initialValues = [false, false, false, false];

const PortfolioForm = () => {
  // const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [field, setField] = useState("all");
  const [toggleImages, setToggleImages] = useState(initialValues);
  const [selectedName, setSelectedName] = useState("");

  function toggleImage() {
    toggleImages[0] = true;
    setToggleImages(toggleImages);
  }
  function toggleImage1() {
    toggleImages[1] = true;
    setToggleImages(toggleImages);
  }
  function toggleImage2() {
    toggleImages[2] = true;
    setToggleImages(toggleImages);
  }
  function toggleImage3() {
    toggleImages[3] = true;
    setToggleImages(toggleImages);
  }

  async function handleUpload(file, handleToggle) {
    const imageRef = ref(storage, `graphics/${file.name + v4()}`);
    const response = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(response.ref);
    setImages([...images, url]);
    handleToggle();

    // setToggleImages([...toggleImages,toggleImages])
  }

  async function handleClick() {
    if (images.length < 4) {
      return alert("Please upload all 4 images");
    }
    axios
      .patch("http://localhost:3000/v1/admin/addPortfolio", {
        name:selectedName,
        field: field,
        links: images,
      })
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
          setToggleImages([false, false, false, false]);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert(err.response.data.error);
        }
      });
  }

  function handleNavClick(fieldName) {
    setField(fieldName);
  }

  function getName(name) {
    setSelectedName(name);
  }

  return (
    <>
    {selectedName===""?(<ProfileSelector getName={getName} />):(<>{field !== "all" ? (
        <div className="professional-form-container">
          <AddButton handleClick={handleClick} />
          <div className="portfolio-input-container">
            {toggleImages[0] === false ? (
              <UploadButton handleUpload={handleUpload} toggle={toggleImage} />
            ) : (
              <ToggledBox />
            )}
            {toggleImages[1] === false ? (
              <UploadButton handleUpload={handleUpload} toggle={toggleImage1} />
            ) : (
              <ToggledBox />
            )}
            {toggleImages[2] === false ? (
              <UploadButton handleUpload={handleUpload} toggle={toggleImage2} />
            ) : (
              <ToggledBox />
            )}
            {toggleImages[3] === false ? (
              <UploadButton handleUpload={handleUpload} toggle={toggleImage3} />
            ) : (
              <ToggledBox />
            )}
          </div>
        </div>
      ) : (
        <PortfolioNav handleNavClick={handleNavClick} />
      )}</>)}
      
    </>
  );
};

export default PortfolioForm;
