import SideBar from "../../Components/SideBar";
import AdminPanel from "../../Components/AdminPanel";
import "./Panel.css";
import { useState } from "react";

export default function Panel() {
  const [category, setCategory] = useState("Personal");
  function handleCategory(index) {
    setCategory(index);
  }
  return (
    <>
      <div className="main-container">
        <div className="sidebar-container">
          <SideBar handleCategory={handleCategory} />
        </div>
        <div className="form-container">
          <AdminPanel category={category} />
        </div>
      </div>
    </>
  );
}
