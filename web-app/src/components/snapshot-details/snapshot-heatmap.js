import { useState } from 'react';
import Checkbox from 'components/UI/checkbox';
import styles from './snapshot-heatmap.module.scss';

function SnapshotHeatmap({ className, imgURL, heatmapURL }) {
    const [showHeatmap, setShowHeatmap] = useState(false);
    const handleCheckboxToggle = event => setShowHeatmap(event.target.checked);

    return (
        <div className={className}>
            <div className={styles.snapshotContainer}>
                {showHeatmap ? (
                    <img src={imgURL} alt="" />
                ) : (
                    <img src={heatmapURL} alt="" />
                )}
            </div>
            <div className={styles.toggle}>
                <span>Тепловая карта</span>
                <Checkbox
                    onChange={handleCheckboxToggle}
                    checked={showHeatmap}
                />
            </div>
        </div>
    );
}

export default SnapshotHeatmap;
