import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { buildSnapshotsPath } from 'components/routes';
import formatDate from 'helpers/format-date';
import { HighlightText, HighlightBlock } from 'components/UI/highlight';
import ButtonLink from 'components/UI/button-link';
import styles from './snapshot.module.scss';

function Snapshot({ scan, className }) {
    const history = useHistory();
    const {
        created_at: createdAt,
        image_path: imagePath,
        note,
        id,
        status,
    } = scan;

    return (
        <div className={classNames(className, styles.card)}>
            <div className={styles.date}>
                <HighlightText variant="black">
                    Дата <br />
                    {formatDate(createdAt)}
                </HighlightText>
            </div>
            {note && (
                <div className={styles.note}>
                    <HighlightText variant="black">{note}</HighlightText>
                </div>
            )}
            <div className={styles.linkContainer}>
                {status && (
                    <HighlightBlock variant="black">
                        <ButtonLink
                            type="dashed"
                            variant="white"
                            size="xl"
                            onClick={() => history.push(buildSnapshotsPath(id))}
                        >
                            Посмотреть
                        </ButtonLink>
                    </HighlightBlock>
                )}
            </div>
            <div className={styles.statusContainer}>
                {!status && (
                    <HighlightText variant="black">
                        Снимок <br /> обрабатывается
                    </HighlightText>
                )}
            </div>
            <div className={styles.imageContainer}>
                <img src={`http://localhost:4999/${imagePath}`} alt="" />
            </div>
        </div>
    );
}

export default Snapshot;
