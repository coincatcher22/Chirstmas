// Redux
import {useSelector} from "react-redux";
import styles from "./Foote.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                All rights reserved. I guess so 😜 {new Date().getFullYear()}
            </div>
        </footer>
    );
}

export default Footer;
