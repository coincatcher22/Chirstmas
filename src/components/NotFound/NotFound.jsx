// React
import {useEffect} from "react";
// Redux
import {useSelector} from "react-redux";
import notFoundImage from "../../assets/images/not-found.png";
import {Link} from "react-router-dom";
import styles from "./NotFound.module.scss";
import {projectTitle} from "../../config";

const NotFound = () => {
    const themeState = useSelector(state => state.theme);

    useEffect(() => {
        // Set page title
        document.title = `Page not found (404) -  ${projectTitle}`;
    }, [])

    return (
        <div className={`container ${styles.contentContainer}`}>
            <h1 className={`christmasFont ${styles.title}`}>Page 404</h1>
            <img
                src={notFoundImage}
                alt={projectTitle}
                className={styles.image}
            />
            <p
                className={`${styles.alertMessage} ${themeState.theme === "dark" ? styles.alertMessageDark : ""}`}
            >
                This page was not found
            </p>
            {/*<Link to="/">Go to main page</Link>*/}
        </div>
    );
}

export default NotFound;