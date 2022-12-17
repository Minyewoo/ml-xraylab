/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react';
import LabelWrapper from './label-wrapper';
import styles from './text-input.module.scss';

function TextInput(
    { type = 'text', label, labelType, caption, className, ...props },
    ref,
) {
    return (
        <LabelWrapper label={label} type={labelType} className={className}>
            <input className={styles.input} type={type} {...props} ref={ref} />
            {caption && <span className={styles.caption}>{caption}</span>}
        </LabelWrapper>
    );
}

export default forwardRef(TextInput);
