function ButtonBase({
    children,
    onClick,
    submit = false,
    disabled = false,
    className,
}) {
    return (
        <button
            className={className}
            type={submit ? 'submit' : 'button'}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ButtonBase;
