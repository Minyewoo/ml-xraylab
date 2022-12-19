import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { profilePath, authPath } from 'components/routes';
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
    const history = useHistory();

    return (
        <nav className={classNames(className, styles.navigation)}>
            <HeaderLink>Новое сканирование</HeaderLink>
            <HeaderLink onClick={() => history.push(profilePath)}>
                Профиль
            </HeaderLink>
            <HeaderLink onClick={() => history.push(authPath)}>
                Выйти
            </HeaderLink>
        </nav>
    );
}

export default Navigation;
