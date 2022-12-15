import classNames from 'classnames';
import ButtonLink from 'components/UI/button-link';
import styles from './navigation.module.scss';

function HeaderLink({ children, onClick, className }) {
    return (
        <ButtonLink
            type="text"
            variant="primary"
            size="m"
            onClick={onClick}
            className={classNames(className, styles.link)}
        >
            {children}
        </ButtonLink>
    );
}

function Navigation({ className }) {
    return (
        <nav className={classNames(className, styles.navigation)}>
            <HeaderLink>Новое сканирование</HeaderLink>
            <HeaderLink>Профиль</HeaderLink>
            <HeaderLink>Выйти</HeaderLink>
        </nav>
    );
}

export default Navigation;
