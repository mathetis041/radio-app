import React from 'react';
import styles from '../CSSModules/modal.module.css';


interface props{
    children: string,
    isOpen: boolean,
    onClose: ()=>void
}
const Modal = ({ isOpen, onClose, children } :props) => {
    return isOpen ? (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-content']}>
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    ) : null;
};

export default Modal;
