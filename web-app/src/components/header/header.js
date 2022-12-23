import classNames from 'classnames';
import Logo from './logo';
import Navigation from './navigation';
import styles from './header.module.scss';

function Header({ className }) {
    return (
        <header className={classNames(className, 'container', styles.header)}>
            <div className="row">
                <div className={classNames('col', styles.headerContent)}>
                    <Logo />
                    <Navigation />
                </div>
            </div>
        </header>
    );
}

export default Header;
