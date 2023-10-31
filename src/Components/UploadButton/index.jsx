export default function UploadButton() {
  return (
    <>
      <div className="portfolio-container" id="upload">
        <input type="file" id="profile" className="profile-upload" />
        <div className="upload-container">
          <label className="profile-upload-btn" for="profile">
            Click To Upload Profile Image
          </label>
        </div>
      </div>
    </>
  );
}
