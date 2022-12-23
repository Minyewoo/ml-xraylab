import classNames from 'classnames';
import { useGetSnapshotByIdQuery } from 'services/api';
import useAuthorizedRequest from 'hooks/use-authorized-request';
import AnalysisResults from './analysis-result';
import SnapshotControls from './snapshot-controls';
import SnapshotHeatmap from './snapshot-heatmap';
// import SnapshotNote from './snapshot-note';
import styles from './snapshot-details.module.scss';

function SnapshotDetails({ id, className }) {
    const { data, isSuccess, isLoading } = useAuthorizedRequest({
        qeury: useGetSnapshotByIdQuery,
        payload: { id },
    });

    return (
        <>
            {isLoading && 'Loading...'}
            {isSuccess && (
                <div className={classNames(className)}>
                    <div
                        className={classNames(
                            'col-12 col-lg-5 mb-4',
                            styles.left,
                        )}
                    >
                        <AnalysisResults results={data?.results} />
                    </div>
                    <div
                        className={classNames('col-12 col-lg-5', styles.right)}
                    >
                        <SnapshotControls />
                        <SnapshotHeatmap
                            imgURL={`${process.env.REACT_APP_API_URL}/${data.image_path}`}
                            heatmapURL={`${process.env.REACT_APP_API_URL}/${data.mask_path}`}
                        />
                        {/* <SnapshotNote note={data?.note} /> */}
                    </div>
                </div>
            )}
        </>
    );
}

export default SnapshotDetails;
