import MainLayout from 'components/layouts/main-layout';
import SnapshotUploader from 'components/snapshot-uploader';

function SnapshotUploadPage() {
    return (
        <MainLayout>
            <SnapshotUploader className="mt-16" />
        </MainLayout>
    );
}

export default SnapshotUploadPage;
