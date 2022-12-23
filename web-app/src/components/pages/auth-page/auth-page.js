import MainLayout from 'components/layouts/main-layout';
import { SignIn, SignUp } from 'components/auth';
import Tabs from 'components/tabs';

function AuthPage() {
    const tabs = [
        { label: 'Вход', content: <SignIn className="mt-8" /> },
        { label: 'Регистрация', content: <SignUp className="mt-8" /> },
    ];

    return (
        <MainLayout>
            <Tabs
                className="col-12 col-sm-8 col-md-6 col-lg-4 mt-16"
                tabs={tabs}
            />
        </MainLayout>
    );
}

export default AuthPage;
