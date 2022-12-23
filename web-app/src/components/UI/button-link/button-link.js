import classNames from 'classnames';
import ButtonBase from 'components/UI/button-base';
import styles from './button-link.module.scss';

function ButtonLink({
    type = 'text',
    variant = 'primary',
    size = 's',
    disabled = false,
    children,
    onClick,
    className,
}) {
    const styleClasses = classNames(className, styles.btn, {
        [styles.type_text]: type === 'text',
        [styles.type_dashed]: type === 'dashed',

        [styles.variant_primary]: variant === 'primary',
        [styles.variant_secondary]: variant === 'secondary',
        [styles.variant_colored]: variant === 'colored',
        [styles.variant_white]: variant === 'white',

        [styles.size_s]: size === 's',
        [styles.size_m]: size === 'm',
        [styles.size_l]: size === 'l',
        [styles.size_xl]: size === 'xl',
    });
    return (
        <ButtonBase
            className={styleClasses}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </ButtonBase>
    );
}

export default ButtonLink;
