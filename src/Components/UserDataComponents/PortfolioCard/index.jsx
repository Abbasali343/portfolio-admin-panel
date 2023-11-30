import { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import ToggledBox from "../../ToggledBox";
import Modal from "../../Modal";
import { EditButton } from "../../../Components.style";
import UploadButton from "../../UploadButton";

const initialValues = [false, false, false, false];

export default function PortfolioCard({ data, name }) {
  const [isActive, setIsActive] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [images, setImages] = useState([]);
  const [images1, setImages1] = useState();
  const [toggleImages, setToggleImages] = useState(initialValues);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      setIsActive(data[0].field);
      setImages1(data[0].links);
    }
  }, [data]);

  let fields = [];
  let dataArray;
  let links;
  let renderCard;
  if (data) {
    data.map((item) => {
      fields.push(item.field);
    });
  }

  async function handleUpload(file, handleToggle, index) {
    const imageRef = ref(storage, `graphics/${file.name + v4()}`);
    const response = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(response.ref);
    setImages([...images, url]);
    handleToggle(index);
  }

  function toggleImage(index) {
    toggleImages[index] = true;
  }

  if (data) {
    dataArray = data.filter(checkCategory);
  }
  function checkCategory(detail) {
    return detail.field === isActive;
  }

  if (dataArray && dataArray.length > 0) {
    if (dataArray[0].links) {
      links = dataArray[0].links;
    }

    renderCard = images1.map((item, index) => (
      <div key={index} className="pf-details-img-container">
        <img src={item} className="pf-details-image" />
      </div>
    ));
  }

  function handleSubmit() {
    if (images.length < 1) {
      return alert("Please upload at least 1 image");
    }
    const requestedBody = {
      name: name,
      field: isActive,
      links: images,
    };
    axios
      .patch(
        "https://easy-pink-nematode-tie.cyclic.app/v1/admin/updateAllPortfolioInfo",
        requestedBody
      )
      .then((response) => {
        if (response.status === 201) {
          alert("Data added successfully");
          setToggleImages([false, false, false, false]);
          setImages([]);
          setIsEditing(!isEditing);
          setIsModal(!isModal);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert(err.response.data.error);
        }
      });
  }

  function handleCategory(item) {
    setIsActive(item);
  }

  function handleModal() {
    setIsModal(!isModal);
  }
  function deleteUser() {
    const requestBody = {
      name: name,
      field: isActive,
    };
    axios
      .delete(
        `https://easy-pink-nematode-tie.cyclic.app/v1/admin/deletePortfolio`,
        {
          data: requestBody,
        }
      )
      .then((response) => {
        alert("PortFolio Deleted");
        setIsModal(!isModal)
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert(err.response.data.error);
          setIsModal(!isModal)
        }
      });
  }
  return (
    <>
      {isModal && (
        <Modal
          handleModal={handleModal}
          onDelete={deleteUser}
        />
      )}
      <div className="test-main-container">
        <div className="test-head">
          <h1>PortFolio</h1>
          {isEditing ? (
            <>
              <EditButton
                top={"0"}
                left={"250px"}
                onClick={() => setIsEditing(!isEditing)}
              >
                Cancel
              </EditButton>
              <EditButton top={"0"} left={"300px"} onClick={handleSubmit}>
                Submit
              </EditButton>
            </>
          ) : (
            isActive && (
              <>
                <EditButton
                  className="delete-pf-btn"
                  top={"0"}
                  left={"250px"}
                  onClick={handleModal}
                >
                  Delete
                </EditButton>
                <EditButton
                  top={"0"}
                  left={"300px"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Edit
                </EditButton>
              </>
            )
          )}

          <div className="pf-nav-head">
            <div className="pf-nav-container">
              {fields &&
                fields.map((item, index) => (
                  <div key={index}>
                    <h1
                      className="pf-nav-update-option"
                      id={isActive === item ? "isActive" : null}
                      onClick={() => handleCategory(item)}
                    >
                      {item}
                    </h1>
                  </div>
                ))}
            </div>
          </div>
          <div className="render-card-container">
            {!isEditing && renderCard}
            {isEditing && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
