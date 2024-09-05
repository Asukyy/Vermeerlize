import React, { useEffect } from 'react';
import '../styles/Modal.css';

const Modal = ({ message, type, visible, onClose }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // La modal se fermera après 3 secondes
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    return (
        <div className={`modal-popup ${type} ${visible ? 'visible' : ''}`}>
            {message}
        </div>
    );
};

export default Modal;
