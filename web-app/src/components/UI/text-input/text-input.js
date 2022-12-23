/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react';
import LabelWrapper from './label-wrapper';
import styles from './text-input.module.scss';

function TextInput({
    type = 'text',
    label,
    labelType,
    caption,
    className,
    innerRef = null,
    ...props
}) {
    return (
        <LabelWrapper label={label} type={labelType} className={className}>
            <input
                className={styles.input}
                type={type}
                {...props}
                ref={innerRef}
            />
            {caption && <span className={styles.caption}>{caption}</span>}
        </LabelWrapper>
    );
}

const TextInputForwardingRef = forwardRef((props, ref) => (
    <TextInput {...props} innerRef={ref} />
));

export { TextInput, TextInputForwardingRef };
