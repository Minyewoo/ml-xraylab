import classNames from 'classnames';
import styles from './label-wrapper.module.scss';

function LabelWrapper({ children, htmlFor, label, type = 'top', className }) {
    return (
        <label
            className={classNames(className, styles.wrapper)}
            htmlFor={htmlFor}
        >
            {label && (
                <span
                    className={classNames(styles.label, {
                        [styles.labelTop]: type === 'top',
                        [styles.labelSide]: type === 'side',
                    })}
                >
                    {label}
                </span>
            )}
            {children}
        </label>
    );
}

export default LabelWrapper;
