import React from 'react'
import {AiOutlineClose} from "react-icons/ai"
import { IoMdClose } from "react-icons/io";
function Modal({open,onClose, children}) {
  return (
    <div
  onClick={onClose}
  style={{
    marginTop:'30px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.3s',
    visibility: open ? 'visible' : 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }}
>
  <div
    onClick={(e) => e.stopPropagation()}
    style={{
      minWidth:'300px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      transition: 'transform 0.3s, opacity 0.3s',
      transform: open ? 'scale(1)' : 'scale(1.25)',
      opacity: open ? 1 : 0
    }}
    className="bg-white rounded-xl shadow p-6 transition-all"
  >
    
    {children}
  </div>
</div>
  )
}

export default Modal