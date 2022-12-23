import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from 'contexts/auth-context';
import classNames from 'classnames';
import { snapshotsUploadPath, profilePath } from 'components/routes';
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
    const { clearSession, isAuthorized } = useContext(AuthContext);

    return (
        <nav className={classNames(className, styles.navigation)}>
            {isAuthorized() && (
                <>
                    <HeaderLink
                        onClick={() => history.push(snapshotsUploadPath)}
                    >
                        Новое сканирование
                    </HeaderLink>
                    <HeaderLink onClick={() => history.push(profilePath)}>
                        Профиль
                    </HeaderLink>
                    <HeaderLink onClick={clearSession}>Выйти</HeaderLink>
                </>
            )}
        </nav>
    );
}

export default Navigation;
