import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import TopBar from "./TopBar";
import Card from "./Card";
import { useHistory } from "react-router-dom";

function Notes() {
  const loginInfo = useSelector((state) => state.loginReducer);
  const history = useHistory();
  const [storedNotes, setStoredNotes] = useState([]);

  return (
    <div>
      <TopBar />
      <div data-aos="fade-down">
        <div class="container page-container">
          <div className="table-header">
            <div className="table-heading">
              <h1>Manage Notes</h1>
              <input
                type="text"
                id="searchKeyword"
                className="fadeIn first"
                placeholder="Keyword"
              />
            </div>
            <hr />
          </div>

          <div class="row">
            {storedNotes &&
              storedNotes.map((noteData, i) => {
                return <Card data={noteData} index={i} />;
              })}

            {storedNotes.length === 0 && (
              <div>
                <h1>You Have No Notes Stored</h1>
              </div>
            )}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          className="bi bi-plus-circle add-password"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </div>
    </div>
  );
}

export default Notes;
