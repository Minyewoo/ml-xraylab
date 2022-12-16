import classNames from 'classnames';
import MainLayout from 'components/layouts/main-layout';
import SnapshotDetails from 'components/snapshot-details';

function SnapshotDetailsPage({ id }) {
    return (
        <MainLayout>
            <SnapshotDetails
                className={classNames('col-12', 'row', 'mt-16')}
                id={id}
            />
        </MainLayout>
    );
}

export default SnapshotDetailsPage;
