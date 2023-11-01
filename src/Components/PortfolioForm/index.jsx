import { useState } from "react";
import AddButton from "../AddButton";
import UploadButton from "../UploadButton";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./PortfolioForm.css";

const PortfolioForm = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [toggleImages, setToggleImages] = useState([]);

  async function handleUpload(file, index) {
    const imageRef = ref(storage, `graphics/${file.name + v4()}`);
    const response = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(response.ref);
    setImages([...images, url]);
    toggleImages[index] = index;
    // setToggleImages([...toggleImages,toggleImages])
  }

  console.log(toggleImages);

  async function handleClick() {
    if (image === null) {
      alert("select image1");
      return;
    }
    if (image === null) {
      alert("select image2");
      return;
    }
    if (image === null) {
      alert("select image3");
      return;
    }
    if (image === null) {
      alert("select image4");
      return;
    }
  }

  return (
    <>
      <div className="professional-form-container">
        <AddButton handleClick={handleClick} />
        <div className="portfolio-input-container">
          <UploadButton handleUpload={handleUpload} index={0} />
          <UploadButton handleUpload={handleUpload} index={1} />
          <UploadButton handleUpload={handleUpload} index={2} />
          <UploadButton handleUpload={handleUpload} index={3} />
        </div>
      </div>
    </>
  );
};

export default PortfolioForm;
