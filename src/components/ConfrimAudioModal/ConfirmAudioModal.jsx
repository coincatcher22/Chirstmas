import React from "react";
import styles from "./ConfirmAudioModal.module.scss";
import PropTypes from 'prop-types';

const ConfirmAudioModal = ({open, onClose, ...props}) => {
    // console.log("audio modal render");
    return (
        <>
            {open &&
                <div className={styles.modal}>
                    <div className={styles.modalBody}>
                        <p>Attention! There is music on the site, do not forget to turn down the volume of your device</p>
                        <button
                            className={styles.acceptButton}
                            onClick={onClose}
                        >
                            Ok 🎅🏻
                        </button>
                    </div>
                </div>
            }
        </>
    );
}

ConfirmAudioModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default React.memo(ConfirmAudioModal);
