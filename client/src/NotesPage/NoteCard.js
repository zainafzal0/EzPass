import React,{useEffect,useState} from "react";
import { useDispatch } from "react-redux";
import { setIndex } from "../Actions/Actions";
import noteIcon from "../Assets/note-icon.png";
import passIcon from "../Assets/pass.png";
import addressIcon from "../Assets/address-img.png";


function NoteCard({ title,modalIndex,setModalRequest,index ,pageType,defaultImg}) {
  const dispatch = useDispatch();

  const handleCardClick = (index) => {
    modalIndex(index);
    setModalRequest(true);
  };


  return (
    <div className="col-sm">
      <div
        className="card dashboard-card grid-card"
        data-bs-toggle="modal"
        data-bs-target="#NoteInfoModal"
        style={{ width: "15rem" }}
        key={index}
        onClick={() => handleCardClick(index)}
      >
        
        <div className="card-body">
            <div className="img-card">
            <img src={noteIcon} className="card-img-top" alt="..."></img>
            </div>
        
          <div>
            <h3 className="card-title">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
