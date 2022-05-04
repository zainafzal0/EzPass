import React, { useState,useReducer, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import TopBar from "./TopBar";
import editLogo from "../Assets/pen-fill.svg"
import eyeFill from "../Assets/eye-fill.svg"
import eyeFillSlash from "../Assets/eye-slash-fill.svg"
import copyIcon from "../Assets/clipboard.svg"
import { useHistory } from "react-router-dom";
import modalInfoReducer from "../Reducers/modalInfo"


function InfoModal(props) {
  const loginInfo = useSelector((state) => state.loginReducer);
  const modalIndex = useSelector((state) => state.modalIndexReducer);
  const history = useHistory();
  const [disableInfo,setDisableInfo]=useState(true);

  const initialState = {
    data_1: "", //For Password Page Data 1 represents the EMAIL
    data_2: "", //For Password Page Data 2 represents the PASSWORD
    data_3: "",
    data_4: "",
    data_5: "",
  };

  const [modalInfo, dispatch] = useReducer(modalInfoReducer,initialState)
  const [showPass,setShowPass]=useState(true);


useEffect(()=> {
  
},[]);

  const handleCloseClick = () => {
    console.log(modalInfo.data_1);
    setShowPass(true);
    setDisableInfo(true);
  }

  const deleteInfo = () => {
      const infoID = props.data[modalIndex].id;
      
      
      
      Axios.post("http://localhost:3001/api/deletePassword", {id:infoID})
      .then((response) => {
        props.setStoredPasswords(props.storedPasswords.filter(element=>{
          return element.id!==infoID
        }))
      });
  }



  
  return (
    <div></div>

    
    // <div class="modal fade" id="infoModal" tabindex="-1" >
    //   <div class="modal-dialog modal-dialog-centered" >
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         {props.data[modalIndex] &&  
    //         <div>
    //           <h5 class="modal-title"><strong>{props.data[modalIndex].site}</strong></h5>
    //         </div>
    //         }
            
    //         <button
    //           type="button"
    //           class="btn-close"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //           onClick={handleCloseClick}
    //         ></button>
    //       </div>
    //       <div class="modal-body">
    //       {props.data[modalIndex] &&  
    //       <div className="container-row">
    //         <h5 class="modal-title"><strong>Email: </strong> </h5>
    //         <div className="flex-row">
    //         <input
                  
    //               type="siteName"
    //               class="form-control"
    //               id="modal-info"
                  
    //               value={modalInfo.data_1}
    //               disabled={disableInfo}
    //               onChange={(e) => dispatch(editEmail(e.target.value))}
    //             ></input>
    //             <i class="bi bi-clipboard eye"  onClick={() =>  navigator.clipboard.writeText(props.data[modalIndex].email)}></i>

    //         </div>
            
            
    //       </div>
    //       }
    //       {props.data[modalIndex] &&  
    //       <div className="container-row">
    //           <h5 class="modal-title"><strong>Password: </strong></h5>
    //           <div className="flex-row">
                

    //             {showPass ? <span><i class="bi bi-eye-fill eye" onClick={()=>setShowPass(!showPass)}></i></span> : <span><i class="bi bi-eye-slash-fill eye" onClick={()=>setShowPass(!showPass)}></i></span> }
                
              
    //           <input
    //               type={showPass?"password":"text"}
    //               class="form-control"
    //               id="modal-info"
                  
    //               value={disableInfo ?  props.data[modalIndex].pass : ""}
    //               disabled={disableInfo}
    //             ></input>
    //           <i class="bi bi-clipboard eye"  onClick={() =>  navigator.clipboard.writeText(props.data[modalIndex].pass)}></i>
              

    //       </div>
    //       </div>
          
    //       }
    //       </div>
    //       <div class="modal-footer">
    //         <div className="flex-row">
    //         <i class="bi bi-trash-fill eye" onClick={()=>deleteInfo()} data-bs-dismiss="modal"></i>
    //         {/* <button
    //           type="button"
    //           class="btn btn-secondary delete"
    //           onClick={()=>deleteInfo()}
    //           data-bs-dismiss="modal"
    //         >
    //           Delete
    //         </button> */}
    //         <i class="bi bi-pencil-fill eye" onClick={()=>setDisableInfo(false)}></i>
    //         {/* <button
    //           type="button"
    //           class="btn btn-secondary"
    //           onClick={()=>setDisableInfo(false)}
              
    //         >
    //           Edit
    //         </button> */}

            
    //         </div>
    //         <div className="flex-row">
    //         <button
    //           type="button"
    //           class="btn btn-secondary"
    //           data-bs-dismiss="modal"
    //           onClick={handleCloseClick}
    //         >
    //           Close
    //         </button>
    //         <button onClick={handleCloseClick} type="button" data-bs-dismiss="modal" class="btn btn-primary">
    //          Save Changes
    //         </button>
    //         </div>
            
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default InfoModal;
