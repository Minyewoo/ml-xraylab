import classNames from 'classnames';
import MainLayout from 'components/layouts/main-layout';
import Tabs from 'components/tabs';
import Dashboard from 'components/dashboard';

function ProfilePage() {
    const tabs = [
        {
            label: 'История сканирований',
            content: <Dashboard />,
        },
        {
            label: 'Настройки',
            content: <p className="my-10 mx-2"> Settings here </p>,
        },
    ];
    return (
        <MainLayout>
            <Tabs className={classNames('col-12', 'mt-16')} tabs={tabs} />
        </MainLayout>
    );
}

export default ProfilePage;
