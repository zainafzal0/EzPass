import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import Card from "./Card";
import { useHistory } from "react-router-dom";
import TopBar from "./TopBar";
import InfoModal from "./InfoModal";
import nextArrow from "../Assets/arrow-right-circle.svg";
import backArrow from "../Assets/arrow-left-circle.svg";

function Passwords() {
  const loginInfo = useSelector((state) => state.loginReducer);
  const modalIndex = useSelector((state) => state.modalIndex);
  const history = useHistory();
  const [storedPasswords, setStoredPasswords] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [sendRequest, setSendRequest] = useState(false);

  const [siteName, setSiteName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    Axios.get(
      `http://localhost:3001/api/getPasswords?user_id=${loginInfo.id}`
    ).then((response) => {
      setStoredPasswords(response.data);
      setSendRequest(false);
    });
  }, [sendRequest]);

  const addPassword = () => {
    Axios.post("http://localhost:3001/api/addPassword", {
      site: siteName,
      email: email,
      password: password,
      user_id: loginInfo.id,
    }).then((response) => {
      document.getElementById("add-new-pass").reset();
      setSiteName("");
      setEmail("");
      setPassword("");
      setSendRequest(true);
      // console.log(response);
    });
  };

  return (
    <div>
      <TopBar />
      <div data-aos="fade-down">
        <div class="container page-container">
          <div className="table-header">
            <div className="table-heading">
              <h1>Manage Passwords</h1>
              <input
                type="text"
                id="searchKeyword"
                className="fadeIn first"
                placeholder="Keyword"
                onChange={(e) => setFilterQuery(e.target.value)}
              />
            </div>
            <hr />
          </div>

          <div className="table-nav">
            <div>
            <i class="bi bi-plus-circle add-password" data-bs-toggle="modal"
                data-bs-target="#addModal"></i>
            </div>

            <div className="flex-row">
              
              <i class="bi bi-arrow-left-circle arrows"></i>
              <i class="bi bi-arrow-right-circle arrows"></i>
            </div>
          </div>

          <div class="row">
            {storedPasswords &&
              storedPasswords.map((passwordData, i) => {
                if (
                  passwordData.site.toLowerCase().includes(filterQuery) ||
                  passwordData.site.includes(filterQuery)
                ) {
                  return (
                    <Card data={passwordData} index={i} type={"Password"} />
                  );
                }
              })}

            {storedPasswords.length === 0 && (
              <div>
                <h1>You Have No Passwords Stored</h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <div class="modal fade" id="addModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Password</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="add-new-pass">
                <label for="site-name" class="form-label">
                  Site Name
                </label>
                <input
                  type="siteName"
                  class="form-control1"
                  id="site-name"
                  placeholder="Site Name"
                  onChange={(e) => setSiteName(e.target.value)}
                ></input>

                <label for="site-name" class="form-label">
                  Email
                </label>
                <input
                  type="user-name"
                  class="form-control1"
                  id="password"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>

                <label for="site-name" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control1"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={addPassword}
                data-bs-dismiss="modal"
                type="button"
                class="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {storedPasswords.length !== 0 && <InfoModal data={storedPasswords} storedPasswords = {storedPasswords} setStoredPasswords={setStoredPasswords}  />}
    </div>
  );
}

export default Passwords;
