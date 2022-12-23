/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { RxCross2 } from 'react-icons/rx';
import styles from './snapshot-thumbnail.module.scss';

function SnapshotThumbnail({ previewUrl, handleClose }) {
    return (
        <div className={styles.container}>
            <span
                onClick={handleClose}
                className={styles.removeBtn}
                role="button"
            >
                <RxCross2 />
            </span>
            <img className={styles.image} src={previewUrl} alt="" />
        </div>
    );
}

export default SnapshotThumbnail;
