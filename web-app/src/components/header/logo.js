import classNames from 'classnames';
import styles from './logo.module.scss';

// TODO: replace to SVG

function Logo({ className }) {
    return <span className={classNames(className, styles.logo)}>xraylab</span>;
}

export default Logo;
