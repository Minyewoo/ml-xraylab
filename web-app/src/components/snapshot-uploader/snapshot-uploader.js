import classNames from 'classnames';
import { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from 'contexts/auth-context';
import { useHistory } from 'react-router-dom';
import { profilePath } from 'components/routes';
import { useUploadSnapshotMutation } from 'services/api';
import DragAndDrop from 'components/drag-and-drop';
import Button from 'components/UI/button';
import ButtonLink from 'components/UI/button-link';
import SnapshotThumbnail from './snapshot-thumbnail';
import styles from './snapshot-uploader.module.scss';

function SnapshotUploader({ className }) {
    const inputRef = useRef(null);

    const [previewUrl, setPreviewUrl] = useState(null);
    useEffect(() => URL.revokeObjectURL(previewUrl), [previewUrl]);

    const handleNewFiles = files => {
        const dtObj = new DataTransfer();
        const fileObj = files && files[0];

        if (!fileObj) return;

        setPreviewUrl(URL.createObjectURL(fileObj));
        dtObj.items.add(fileObj);
        inputRef.current.files = dtObj.files;
    };

    const clearFiles = () => {
        inputRef.current.value = null;
        setPreviewUrl(null);
    };

    const handleFilesDrop = files => {
        handleNewFiles(files);
    };

    const handleInputChange = event => {
        handleNewFiles(event.target.files);
    };

    // TODO: rewrite mutation queries
    const [uploadSnapshot] = useUploadSnapshotMutation();
    const { token, clearSession } = useContext(AuthContext);
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();
        const handleSnapshotUploading = async () => {
            const formData = new FormData();
            formData.append('', inputRef.current.files[0]);

            uploadSnapshot({
                token,
                data: formData,
            })
                .unwrap()
                .then(res => {
                    if (res.status === 401) {
                        clearSession();
                        return;
                    }
                    history.push(profilePath);
                });
        };

        handleSnapshotUploading();
    };

    return (
        <form
            action="#"
            className={classNames(className, styles.form)}
            onSubmit={handleSubmit}
        >
            <input
                className={styles.input}
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleInputChange}
                ref={inputRef}
            />
            <DragAndDrop
                className={styles.dropArea}
                accept={['.jpeg', '.jpg', '.png']}
                onDrop={handleFilesDrop}
            >
                {previewUrl && (
                    <SnapshotThumbnail
                        previewUrl={previewUrl}
                        handleClose={() => clearFiles()}
                    />
                )}
                {!previewUrl && (
                    <>
                        <img
                            className={styles.imagePlaceholder}
                            src="/lung.svg"
                            alt=""
                        />
                        <span className={classNames(styles.info, 'mt-5')}>
                            Перетащите фото рентгена или{' '}
                            <ButtonLink
                                type="dashed"
                                size="md"
                                onClick={() => inputRef.current.click()}
                            >
                                загрузите
                            </ButtonLink>{' '}
                            с компьютера
                        </span>
                    </>
                )}
            </DragAndDrop>
            <Button className="mt-8" submit disabled={!previewUrl}>
                проанализировать
            </Button>
        </form>
    );
}

export default SnapshotUploader;
