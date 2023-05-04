import React from "react";
import "./modal-form.css";

function ModalForm(props){

    return(
            <div className={props.active? "modal-form active": "modal-form"} onClick={()=>props.setActive(false)}>
                <div className={props.active? "modal-form_content active": "modal-form_content" } onClick={e=>e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
    );
}

export default ModalForm;