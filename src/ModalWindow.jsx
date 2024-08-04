import React from "react";
import image from "./assets/close.svg"

export default function ModalWindow({isOpen, onClose, children}){
    return(
        <>
            {isOpen && (
                <div className="modal" onClick={() => onClose()}>
                <div className="modal-wrapper">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
            )}
        </>
        
    );
};