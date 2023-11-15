export default function UploadButton({ handleUpload, toggle,index }) {
  return (
    <>
      <div className="portfolio-container" id="upload">
        <input
          type="file"
          id="profile"
          className="profile-upload"
          onChange={(event) => {
            const file = event.target.files[0];
            handleUpload(file,toggle,index);
          }}
        />
        <div className="upload-container">
          <label className="profile-upload-btn" htmlFor="profile">
            Click To Upload Profile Image
          </label>
        </div>
      </div>
    </>
  );
}
