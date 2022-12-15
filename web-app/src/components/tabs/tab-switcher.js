import classNames from 'classnames';
import ButtonLink from 'components/UI/button-link';
import styles from './tab-switcher.module.scss';

function SwitchTabButton({ children, onClick, isActiveTab }) {
    return (
        <ButtonLink
            onClick={onClick}
            type="dashed"
            variant={isActiveTab ? 'primary' : 'colored'}
            size="xl"
            disabled={isActiveTab}
        >
            {children}
        </ButtonLink>
    );
}

function TabSwitcher({ tabs, activeTabIdx, handleTabSwitch, className }) {
    return (
        <nav className={classNames(className, styles.navigation)}>
            <ul>
                {tabs.map(({ label }, idx) => (
                    <li key={label}>
                        <SwitchTabButton
                            onClick={() => handleTabSwitch(idx)}
                            isActiveTab={activeTabIdx === idx}
                        >
                            {label}
                        </SwitchTabButton>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default TabSwitcher;
