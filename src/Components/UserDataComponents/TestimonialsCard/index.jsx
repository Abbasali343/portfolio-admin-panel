export default function TestimonialsCard({ data }) {
  let grayId = false;
  let renderCard;
  if (data) {
    renderCard = data.map((item) => (
      <tr
        key={item}
        className="edu-body-data-container"
        id={grayId ? "body-data-container" : null}
      >
        <td className="edu-table-body-data">{item.testimonialName}</td>
        <td className="edu-table-body-data">{item.profession}</td>
        <td
          className="table-body-data"
          id="show-details"
          onClick={() => handleDetails(item.name)}
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
