import { useState } from 'react';
import classNames from 'classnames';
import styles from './snapshot-note.module.scss';

function SnapshotNote({ className, note }) {
    const [noteValue, setNoteValue] = useState(note);

    const handleChange = event => setNoteValue(event.target.value);

    return (
        <label
            className={classNames(className, styles.label)}
            htmlFor="snapshote-note"
        >
            <span>Заметки</span>
            <textarea
                className={styles.note}
                id="snapshote-note"
                rows="3"
                value={noteValue}
                onChange={handleChange}
            />
        </label>
    );
}

export default SnapshotNote;
