import classNames from 'classnames';
import { useGetScansQuery } from 'services/api';
import GridItems from './grid-items';
import Snapshot from './snapshot';

function Dashboard() {
    const { data, isLoading, isSuccess } = useGetScansQuery();

    return (
        <>
            {/* TODO: add loader component and HOC */}
            {isLoading && <p>Loading...</p>}
            {isSuccess && (
                <GridItems className={classNames('mt-16')}>
                    {data?.map(scan => (
                        <Snapshot key={scan.id} scan={scan} />
                    ))}
                </GridItems>
            )}
        </>
    );
}

export default Dashboard;
