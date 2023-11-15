export default function ExperienceCard({ data }) {
  let grayId = false;
  let renderCard;
  if (data) {
    renderCard = data.map((item) => (
      <tr
        key={item._id}
        className="edu-body-data-container"
        id={grayId ? "body-data-container" : null}
      >
        <td className="edu-table-body-data">{item.title}</td>
        <td className="edu-table-body-data">{item.company}</td>
        <td
          className="table-body-data"
          id="show-details"
          onClick={()=>handleDetails(item.name)}
        >
          See Details
        </td>
        {(grayId = !grayId)}
      </tr>
    ));
  }
  return (
    <>
      <div>
        <div className="education-card-container">
            <table>
                <thead >
                    <tr className="edu-table-head">
                        <th className="edu-th">Designation</th>
                        <th className="edu-th">Company</th>
                        <th className="edu-th">Action</th>
                    </tr>
                </thead>
                <tbody className="edu-table-body">{renderCard}</tbody>
            </table>
        </div>
      </div>
    </>
  );
}
