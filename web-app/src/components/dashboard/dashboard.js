import classNames from 'classnames';
import { useGetSnapshotsQuery } from 'services/api';
import useAuthorizedRequest from 'hooks/use-authorized-request';
import GridItems from './grid-items';
import Snapshot from './snapshot';

function Dashboard() {
    const { data, isLoading, isSuccess } = useAuthorizedRequest({
        qeury: useGetSnapshotsQuery,
        settings: {
            pollingInterval: 3000,
        },
    });

    return (
        <>
            {/* TODO: add loader component and HOC */}
            {isLoading && <p>Loading...</p>}
            {isSuccess && (
                <GridItems className={classNames('my-16')}>
                    {data?.map(scan => (
                        <Snapshot key={scan.id} scan={scan} />
                    ))}
                </GridItems>
            )}
        </>
    );
}

export default Dashboard;
