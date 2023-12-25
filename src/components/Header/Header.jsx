// React
import {useState, useEffect} from "react";
// Redux
import {useSelector} from "react-redux";
// Theme toggler
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import MusicMuteHandler from "../MusicMuteHandler/MusicMuteHandler";
// Assets
import christmasLogoPng from "../../assets/images/logo.png"
import christmasLogoWebP from "../../assets/images/logo.webp"
import {projectTitle} from "../../config";
// Styles
import styles from "./Header.module.scss"
// React Router
import {Link} from "react-router-dom";

const Header = () => {
    const themeState = useSelector(state => state.theme);
    const [scrollDistance, setScrollDistance] = useState(0);

    useEffect(() => {
        const getScrollDistance = event => {
            const scrollDistance = document.documentElement.scrollTop;
            setScrollDistance(scrollDistance);
        }

        window.addEventListener("scroll", getScrollDistance);
        getScrollDistance();
        return () => {
            window.removeEventListener("scroll", getScrollDistance);
        }
    }, [])

    return (
        <header
            className={`${styles.header} ${themeState.theme === "dark" ? styles.headerDark : ""} ${scrollDistance > 30 ? styles.headerShadow : ""}`}
        >
            <div className={`container ${styles.headerContainer}`}>
                <Link
                    to="/"
                    className={styles.logoContainer}
                >
                    <picture>
                        <source srcSet={christmasLogoWebP} type="image/webp" />
                        <source srcSet={christmasLogoPng} type="image/png" />
                        <img src={christmasLogoPng} alt={projectTitle} />
                    </picture>
                </Link>
                <div className={styles.settingsContainer}>
                    <MusicMuteHandler />
                    <ThemeToggler />
                </div>
            </div>
        </header>
    );
}

export default Header;
