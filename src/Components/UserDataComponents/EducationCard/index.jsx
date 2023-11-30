import axios from "axios";
import EditDocumentButton from "../../EditDocumentButton";
import DeleteButton from "../../DeleteButton";
import Modal from "../../Modal";
import { useState } from "react";

export default function EducationCard({ name, data, handleEduEditing }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [title, setTitle] = useState("");
  const type = "education";
  let grayId = false;
  let renderCard;
  if (data) {
    renderCard = data.map((item, index) => (
      <tr
        key={index}
        className="edu-body-data-container"
        id={grayId ? "body-data-container" : null}
      >
        <td className="edu-table-body-data">{item.title}</td>
        <td className="edu-table-body-data">{item.company}</td>
        <td className="table-body-data" id="show-details">
          <EditDocumentButton
            onSelect={() => handleEduEditing(item.title, type)}
          />
          <DeleteButton
            handleModal={handleModal}
            name={item.name}
            title={item.title}
          />
        </td>
        {(grayId = !grayId)}
      </tr>
    ));
  }

  function deleteUser(name, title) {
    const requestBody = {
      name: name,
      title: title,
      type: type,
    };

    axios
      .delete(
        `https://easy-pink-nematode-tie.cyclic.app/v1/admin/deleteEducation`,
        {
          data: requestBody,
        }
      )
      .then((response) => {
        alert("Education Deleted");
        setIsDeleted(!isDeleted);
        setIsModal(!isModal)
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert(err.response.data.error);
          setIsModal(!isModal)
        }
      });
  }
  function handleModal(name, title) {
    if (title) {
      setTitle(title);
    }
    setIsModal(!isModal);
  }

  return (
    <>
      {isModal ? (
        <Modal
          handleModal={handleModal}
          onDelete={deleteUser}
          name={name}
          title={title}
        />
      ) : (
        <div>
          <div className="education-card-container">
            <table>
              <thead>
                <tr className="edu-table-head">
                  <th className="edu-th">Degree</th>
                  <th className="edu-th">University</th>
                  <th className="edu-th">Action</th>
                </tr>
              </thead>
              <tbody className="edu-table-body">{renderCard}</tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
