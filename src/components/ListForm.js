import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListForm = () => {
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    getForms();
  }, []);

  const getForms = () => {
    axios.get("http://localhost:5000/forms").then((res) => {
      console.log("inside get forms", res);
      setFormList([...res.data]);
    });
  };

  return (
    <>
      <div className="card-container">
        {formList.map((eachForm) => (
          <div className="card">
            <Link to={`/viewForm/${eachForm._id}`}>
              <p>{eachForm.formData[0].name}</p>
            </Link>
          </div>
        ))}
        <div className="card">
          <Link to={`/createForm`}>
            <p className="card-text">Add New Form</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ListForm;
