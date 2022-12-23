import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import MainLayout from 'components/layouts/main-layout';
import SnapshotDetails from 'components/snapshot-details';

function SnapshotDetailsPage() {
    const { id } = useParams();

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
