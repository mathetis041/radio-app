import React, { useState } from "react";
import styles from "../CSSModules/Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.brand}>MattVinc Radio</div>

            {/* Hamburger Icon */}
            <div className={styles.hamburger} onClick={toggleMenu}>
                <span className={menuOpen ? styles.barActive : styles.bar}></span>
                <span className={menuOpen ? styles.barActive : styles.bar}></span>
                <span className={menuOpen ? styles.barActive : styles.bar}></span>
            </div>

            {/* Auth Buttons */}
            <div className={`${styles.actions} ${menuOpen ? styles.show : ""}`}>
                <Link to="/login" className={`${styles.button} ${styles.signin}`} onClick={() => setMenuOpen(false)}>
                    Sign out
                </Link>
                {/* <Link to="/signup" className={`${styles.button} ${styles.signup}`} onClick={() => setMenuOpen(false)}>
                    Sign Up
                </Link> */}
            </div>
        </nav>
    );
};

export default Navbar;
