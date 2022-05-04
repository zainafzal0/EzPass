import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

function AddPass(props) {
  const loginInfo = useSelector((state) => state.loginReducer);
  const history = useHistory();

  const [passAdded, setPassAddedStatus] = useState(props.passAdded);
  const [site, setSite] = useState("");
  const [password, setPassword] = useState("");

  const addPassword = () => {
    Axios.post("http://localhost:3001/api/addPassword", {
      site: site,
      password: password,
      user_id: loginInfo.id,
    }).then((response) => {
      setPassAddedStatus(true);
      console.log(response);
    });
  };

  return (
    <div data-aos="fade-in">
      {!passAdded && (
        <div className="AddPass" data-aos="fade-down">
          <h3 className="fadeIn first">Site: </h3>
          <input
            type="text"
            id="username"
            className="fadeIn first"
            name="username"
            placeholder="Site Name"
            onChange={(e) => {
              setSite(e.target.value);
            }}
          />

          <h3 className="passInput fadeIn second">Password: </h3>
          <input
            type="password"
            id="password"
            className="fadeIn second"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            type="button"
            onClick={addPassword}
            className="btn btn-dark dashboard-button fadeIn second"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default AddPass;
