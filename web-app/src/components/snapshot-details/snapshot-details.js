import classNames from 'classnames';
import { useGetScanByIdQuery } from 'services/api';
import AnalysisResults from './analysis-result';
import SnapshotControls from './snapshot-controls';
import SnapshotHeatmap from './snapshot-heatmap';
import SnapshotNote from './snapshot-note';
import styles from './snapshot-details.module.scss';

function SnapshotDetails({ id, className }) {
    const { data, isSuccess, isLoading } = useGetScanByIdQuery(id);

    return (
        <>
            {isLoading && 'Loading...'}
            {isSuccess && (
                <div className={classNames(className)}>
                    <div className={classNames('col-12 col-md-5', styles.left)}>
                        <AnalysisResults results={data?.results} />
                    </div>
                    <div
                        className={classNames('col-12 col-md-5', styles.right)}
                    >
                        <SnapshotControls />
                        <SnapshotHeatmap
                            imgURL={data?.image}
                            heatmapURL={data?.heatmap}
                        />
                        <SnapshotNote note={data?.note} />
                    </div>
                </div>
            )}
        </>
    );
}

export default SnapshotDetails;
