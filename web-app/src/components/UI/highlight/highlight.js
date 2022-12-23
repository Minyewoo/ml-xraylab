import classNames from 'classnames';
import styles from './highlight.module.scss';

function getVariantStyle(variant) {
    return {
        [styles.variant_black]: variant === 'black',
        [styles.variant_colored]: variant === 'colored',
    };
}

export function HighlightText({ children, variant = 'black', className }) {
    const highlightTextClasses = classNames(
        className,
        styles.text,
        getVariantStyle(variant),
        {
            [styles.text_black]: variant === 'black',
            [styles.text_colored]: variant === 'colored',
        },
    );
    return <span className={highlightTextClasses}>{children}</span>;
}

export function HighlightBlock({ children, variant = 'black', className }) {
    const highlightBlockClasses = classNames(
        className,
        styles.block,
        getVariantStyle(variant),
    );
    return <div className={highlightBlockClasses}>{children}</div>;
}
