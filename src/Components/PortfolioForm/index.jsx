import { useState } from "react";
import axios from "axios";
import AddButton from "../AddButton";
import UploadButton from "../UploadButton";
import ToggledBox from "../ToggledBox";
import PortfolioNav from "../PortFolioNav";
import ProfileSelector from "../ProfileSelector";
import Modal from "../Modal";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./PortfolioForm.css";

const initialValues = [false, false, false, false];

const PortfolioForm = () => {
  // const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [field, setField] = useState("");
  const [toggleImages, setToggleImages] = useState(initialValues);
  const [selectedName, setSelectedName] = useState("");
  const [isModal, setIsModal] = useState(false);

  function toggleImage(index) {
    // index === 0
    //   ?
    //   : index === 1
    //   ? setImage1(true)
    //   : index === 2
    //   ? setImage2(true)
    //   : index === 3
    //   ? setImage3(true)
    //   : null;
    toggleImages[index] = true;
  }
  async function handleUpload(file, handleToggle, index) {
    const imageRef = ref(storage, `graphics/${file.name + v4()}`);
    const response = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(response.ref);
    setImages([...images, url]);
    handleToggle(index);
  }

  async function handleClick() {
    if (images.length < 1) {
      return alert("Please upload at least 1 image");
    }
    if (field === "") {
      return alert("enter a field");
    }
    axios
      .patch(
        "https://easy-pink-nematode-tie.cyclic.app/v1/admin/addPortfolio",
        {
          name: selectedName,
          field: field,
          links: images,
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setIsModal(!isModal);
          setToggleImages([false, false, false, false]);
          setImages([]);
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
  function handleModal() {
    setIsModal(!isModal);
    setField("");
    setSelectedName("");
  }
  return (
    <>
      {selectedName === "" ? (
        <ProfileSelector getName={getName} />
      ) : (
        <>
          <div className="professional-form-container">
            {isModal && <Modal handleModal={handleModal} />}
            <AddButton handleClick={handleClick} />
            <div className="portfolio-input-container">
              <div className="pf-input-header">
                <input
                  className="personal-input"
                  placeholder="Enter Field"
                  name="field"
                  onChange={(e) => {
                    setField(e.target.value);
                  }}
                  value={field}
                />
              </div>
              <div className="pf-input-body">
                <div className="pf-btn-container">
                  {!toggleImages[0] ? (
                    <UploadButton
                      handleUpload={handleUpload}
                      toggle={toggleImage}
                      index={0}
                    />
                  ) : (
                    <ToggledBox image={images[0]} />
                  )}
                </div>
                <div className="pf-btn-container">
                  {!toggleImages[1] ? (
                    <UploadButton
                      handleUpload={handleUpload}
                      toggle={toggleImage}
                      index={1}
                    />
                  ) : (
                    <ToggledBox image={images[1]} />
                  )}
                </div>
                <div className="pf-btn-container">
                  {!toggleImages[2] ? (
                    <UploadButton
                      handleUpload={handleUpload}
                      toggle={toggleImage}
                      index={2}
                    />
                  ) : (
                    <ToggledBox image={images[2]} />
                  )}
                </div>
                <div className="pf-btn-container">
                  {!toggleImages[3] ? (
                    <UploadButton
                      handleUpload={handleUpload}
                      toggle={toggleImage}
                      index={3}
                    />
                  ) : (
                    <ToggledBox image={images[3]} />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* {field !== "all" ? (
            
          ) : (
            <PortfolioNav handleNavClick={handleNavClick} />
          )} */}
        </>
      )}
    </>
  );
};

export default PortfolioForm;
