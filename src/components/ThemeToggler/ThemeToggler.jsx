import {memo} from "react";
// Redux
import {useSelector, useDispatch} from "react-redux";
import {changeTheme} from "../../store/actions/themeActions";
// Styles
import styles from "./ThemeToggler.module.scss"
// Icons
import moonIcon from "../../assets/icons/moon.svg"
import sunIcon from "../../assets/icons/sun.svg"

const ThemeToggler = ({...props}) => {
    const dispatch = useDispatch();
    const themeState = useSelector(state => state.theme);

    return (
        <div className={styles.toggleContainer}>
            <span
                className={`${styles.toggle} ${themeState.theme === "dark" ? styles.toggleDark : ""}`}
                onClick={() => dispatch(changeTheme(themeState.theme === "light" ? "dark" : "light"))}
            >
                <img src={sunIcon} className={styles.sunIcon} alt="Sun" />
                <img src={moonIcon} className={styles.moonIcon} alt="Moon" />
                <span
                    className={`${styles.toggleIndicator} ${themeState.theme === "dark" ? styles.toggleIndicatorRight : ""}`}
                />
            </span>
        </div>
    );
}

export default ThemeToggler;