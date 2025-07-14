import React from "react";
import styles from "../CSSModules/modal.module.css";

interface Props {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
    if (!isOpen) return null;

    return (
        <div className={styles["modal-overlay"]}>
            <div className={styles["modal-content"]}>
                <button onClick={onClose} className={styles["close-button"]}>
                    ×
                </button>
                <div className={styles["modal-body"]}>
                    {children ? (
                        children
                    ) : (
                        <>
                            <h3>📧 Check your inbox!</h3>
                            <p>
                                We've sent you a verification email. If you don't see it in a few minutes,
                                <strong> check your Spam or Promotions folder</strong>.
                            </p>
                            <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
                                Sent from: <code>noreply@radio-app-2e7d7.firebaseapp.com</code>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
