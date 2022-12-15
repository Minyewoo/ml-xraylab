import classNames from 'classnames';
import ButtonBase from 'components/UI/button-base';
import styles from './button.module.scss';

function Button({
    children,
    submit = false,
    disabled = false,
    onClick,
    className,
}) {
    return (
        <ButtonBase
            className={classNames(className, styles.btn)}
            submit={submit}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </ButtonBase>
    );
}

export default Button;
