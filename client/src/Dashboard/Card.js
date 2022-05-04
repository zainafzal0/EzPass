import React, { useState } from "react";
import Axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import TopBar from "./TopBar";
import {setIndex} from "../Actions/Actions"
import { useHistory } from "react-router-dom";
import passItemLogo from "../Assets/pass.png";

function Card(props) {
  const loginInfo = useSelector((state) => state.loginReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCardClick = (index) => {
    dispatch(setIndex(index));
  }

  return (
    <div className="col-sm">
      <div
        className="card dashboard-card"
        data-bs-toggle="modal"
        data-bs-target="#infoModal"
        style={{ width: "18rem" }}
        key={props.index}
        onClick={()=>handleCardClick(props.index)}
      >
        <img src={passItemLogo} class="card-img-top" alt="..."></img>
        <div className="card-body">
          {props.type === "Password" && (
            <div>
              <h3 className="card-title">{props.data.site}</h3>
              <h4 className="card-title">{props.data.email}</h4>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
}

export default Card;
