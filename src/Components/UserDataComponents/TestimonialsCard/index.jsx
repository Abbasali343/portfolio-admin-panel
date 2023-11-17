export default function TestimonialsCard({ data, handleEduEditing }) {
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
        <td
          className="table-body-data"
          id="show-details"
          onClick={() => {
            handleEduEditing(item.testimonialName, type);
          }}
        >
          See Details
        </td>
        {(grayId = !grayId)}
      </tr>
    ));
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