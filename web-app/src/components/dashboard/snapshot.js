import classNames from 'classnames';
import convertTimestampToDate from 'helpers/convertTimestampToDate';
import { HighlightText, HighlightBlock } from 'components/UI/highlight';
import ButtonLink from 'components/UI/button-link';
import styles from './snapshot.module.scss';

function Snapshot({ scan, className }) {
    const { createdAt, note } = scan;

    return (
        <div className={classNames(className, styles.card)}>
            <div className={styles.date}>
                <HighlightText variant="black">
                    Дата <br />
                    {convertTimestampToDate(createdAt)}
                </HighlightText>
            </div>
            <div className={styles.note}>
                <HighlightText variant="black">{note}</HighlightText>
            </div>
            <div className={styles.linkContainer}>
                <HighlightBlock variant="black">
                    <ButtonLink type="dashed" variant="white" size="xl">
                        Посмотреть
                    </ButtonLink>
                </HighlightBlock>
            </div>
            <div className={styles.imageContainer} />
        </div>
    );
}

export default Snapshot;
