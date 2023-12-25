import styles from "./Layout.module.scss";
import PropTypes from 'prop-types';
import ConfirmAudioModal from "../ConfrimAudioModal/ConfirmAudioModal";

const Layout = ({children, ...props}) => {
    return (
        <div className={styles.layoutContainer}>
            {children}
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout;