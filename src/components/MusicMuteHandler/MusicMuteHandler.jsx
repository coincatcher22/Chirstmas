// Redux
import {useSelector, useDispatch} from "react-redux";
import {playMusic, stopMusic} from "../../store/actions/musicActions";
// Icons
import {ReactComponent as VoiceLogo} from "../../assets/icons/voice.svg";
import {ReactComponent as NoVoiceLogo} from "../../assets/icons/no-voice.svg";
import styles from "./MusicHandler.module.scss";

const MusicMuteHandler = () => {
    const dispatch = useDispatch();
    const themeState = useSelector(state => state.theme);
    const musicState = useSelector(state => state.music);

    return (
        <div className={styles.contentContainer}>
            {!musicState.play ?
                <NoVoiceLogo
                    onClick={() => dispatch(playMusic())}
                    className={`${styles.icon} ${themeState.theme === "dark" ? styles.iconDark : ""}`}
                />
                :
                <VoiceLogo
                    onClick={() => dispatch(stopMusic())}
                    className={`${styles.icon} ${themeState.theme === "dark" ? styles.iconDark : ""}`}
                />
            }
        </div>
    );
}

export default MusicMuteHandler;