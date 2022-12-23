import classNames from 'classnames';
import Header from 'components/header';

function MainLayout({ children }) {
    return (
        <>
            <Header />
            <main className={classNames('container')}>
                <div className={classNames('row', 'justify-content-center')}>
                    {children}
                </div>
            </main>
        </>
    );
}

export default MainLayout;
