import { useState } from "react";
import axios from "axios";
import AddButton from "../AddButton";
import UploadButton from "../UploadButton";
import ToggledBox from "../ToggledBox";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./PortfolioForm.css";

const PortfolioForm = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [toggleImages, setToggleImages] = useState([
    false,
    false,
    false,
    false,
  ]);

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
      return;
    }
    axios
      .post("http://localhost:3000/v1/admin/addPortfolio", {
        field: "web development",
        links: images,
      })
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
        }
      });
  }

  return (
    <>
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
    </>
  );
};

export default PortfolioForm;
