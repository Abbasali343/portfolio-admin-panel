import axios from "axios";
import EditDocumentButton from "../../EditDocumentButton";
import DeleteButton from "../../DeleteButton";

export default function TestimonialsCard({ name, data, handleEduEditing }) {
  const type = "testimonial";
  let grayId = false;
  let renderCard;
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
            onDelete={deleteUser}
            name={name}
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

    axios
      .delete(
        `https://easy-pink-nematode-tie.cyclic.app/v1/admin/deleteTestimonial`,
        {
          data: requestBody,
        }
      )
      .then((response) => {
        alert("Testimonial Deleted");
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert(err.response.data.error);
        }
      });
  }
  return (
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
  );
}
