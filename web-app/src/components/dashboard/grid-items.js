import classNames from 'classnames';
import styles from './grid-items.module.scss';

function GridItems({ children, className }) {
    return <div className={classNames(className, styles.grid)}>{children}</div>;
}

export default GridItems;
