import React from "react";
import "./modal.css";

function Modal({active, setActive, text, confirmationButtonText, confirmation}){

    return(
            <div className={active? "modal active": "modal"} onClick={()=>setActive(false)}>
                <div className={active? "modal_content active": "modal_content" } onClick={e=>e.stopPropagation()}>
                    <p>{text}</p>
                    <div>
                        <button className="choice" onClick={confirmation}>{confirmationButtonText}</button>
                        <button className="choice" onClick={()=>setActive(false)}>Cancel</button>
                    </div>
                </div>
            </div>
    );
}

export default Modal;