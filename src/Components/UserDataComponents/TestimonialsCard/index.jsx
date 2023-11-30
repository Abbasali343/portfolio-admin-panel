import { useEffect, useState } from "react";
import axios from "axios";
import EditDocumentButton from "../../EditDocumentButton";
import DeleteButton from "../../DeleteButton";
import Modal from "../../Modal";

export default function TestimonialsCard({ name, data, handleEduEditing }) {
  const [isModal, setIsModal] = useState(false);
  const [testimonialName, setTestimonialName] = useState("");
  const type = "testimonial";
  let grayId = false;
  let renderCard;
  let card;
  if (data) {
    renderCard = data.map((item, index) => (
      <tr
        key={index}
        className="edu-body-data-container"
        id={grayId ? "body-data-container" : null}
      >
        <td className="edu-table-body-data">{item && item.testimonialName}</td>
        <td className="edu-table-body-data">{item && item.profession}</td>
        <td className="table-body-data" id="show-details">
          <EditDocumentButton
            onSelect={() => handleEduEditing(item.testimonialName, type)}
          />
          <DeleteButton
            handleModal={handleModal}
            name={item.name}
            title={null}
            testimonialName={item.testimonialName}
          />
        </td>
        {(grayId = !grayId)}
      </tr>
    ));
  }
  function deleteUser(name, title, testimonialName) {
    const requestBody = {
      name: name,
      testimonialName: testimonialName,
    };
    console.log(requestBody);

    axios
      .delete(
        `https://easy-pink-nematode-tie.cyclic.app/v1/admin/deleteTestimonial`,
        {
          data: requestBody,
        }
      )
      .then((response) => {
        alert("Testimonial Deleted");
        setIsModal(!isModal);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert(err.response.data.error);
          setIsModal(!isModal);
        }
      });
  }
  function handleModal(name, title, testimonialName) {
    if (testimonialName) {
      setTestimonialName(testimonialName);
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
          testimonialName={testimonialName}
        />
      ) : (
        <>
          <div className="test-main-container">
            <div className="test-head">
              <h1>Testimonials</h1>
              <div className="test-body">
                <table className="test-table-h">
                  <thead className="test-table-h">
                    <tr className="test-table-head">
                      <th className="test-th">Name</th>
                      <th className="test-th">Profession</th>
                      <th className="test-th">Action</th>
                    </tr>
                  </thead>
                  <tbody className="edu-table-body">{renderCard}</tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
