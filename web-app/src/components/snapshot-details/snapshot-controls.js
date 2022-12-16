import { BsArrowLeft } from 'react-icons/bs';
import ButtonLink from 'components/UI/button-link';
import styles from './snapshot-controls.module.scss';

function SnapshotControls() {
    return (
        <div className={styles.controls}>
            <ButtonLink
                className={styles.backButton}
                type="text"
                variant="primary"
                size="m"
            >
                <BsArrowLeft />
                Вернуться к истории
            </ButtonLink>
        </div>
    );
}

export default SnapshotControls;
