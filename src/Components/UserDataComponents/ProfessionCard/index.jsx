export default function ProfessionCard({ data ,handleEduEditing}) {
    const type = 'profession';
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
        <td className="edu-table-body-data">{item.description}</td>
        <td
          className="table-body-data"
          id="show-details"
          onClick={() => handleEduEditing(item.title, type)}
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
          <h1>Professions</h1>
          <div className="test-body">
            <table className="test-table-h">
              <thead className="test-table-h">
                <tr className="test-table-head">
                  <th className="test-th">Title</th>
                  <th className="test-th">Description</th>
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
