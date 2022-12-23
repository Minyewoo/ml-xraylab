import { useHistory } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { profilePath } from 'components/routes';
import ButtonLink from 'components/UI/button-link';
import styles from './snapshot-controls.module.scss';

function SnapshotControls() {
    const history = useHistory();

    return (
        <div className={styles.controls}>
            <ButtonLink
                onClick={() => history.push(profilePath)}
                className={styles.backButton}
                type="text"
                variant="primary"
                size="m"
            >
                <BsArrowLeft /> Вернуться к истории
            </ButtonLink>
        </div>
    );
}

export default SnapshotControls;
