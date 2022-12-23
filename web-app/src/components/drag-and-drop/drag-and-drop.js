import { useState } from 'react';
import classNames from 'classnames';
import styles from './drag-and-drop.module.scss';

const formatValidates = (formats, files) =>
    !files.some(file =>
        formats.some(format =>
            file.name.toLowerCase().endsWith(format.toLowerCase()),
        ),
    );

function DragAndDrop({ onDrop, accept, children, className }) {
    const [active, setActive] = useState(false);

    const handleDrag = event => {
        event.preventDefault();
        event.stopPropagation();

        if (event.type === 'dragenter' || event.type === 'dragover') {
            setActive(true);
            return;
        }

        if (event.type === 'dragleave') {
            setActive(false);
        }
    };

    const handleDrop = event => {
        event.preventDefault();
        event.stopPropagation();

        setActive(false);

        const { files } = event.dataTransfer;

        if (formatValidates(accept, [...files])) {
            return;
        }

        if (files && files[0]) {
            onDrop(event.dataTransfer.files);
        }
    };

    return (
        <div
            className={classNames(classNames(className, styles.area))}
            onDragEnter={handleDrag}
        >
            {active && (
                <div
                    className={styles.popup}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                />
            )}
            {children}
        </div>
    );
}

export default DragAndDrop;
