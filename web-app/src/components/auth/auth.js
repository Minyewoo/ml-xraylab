/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react';
import classNames from 'classnames';
import { TextInputForwardingRef as TextInput } from 'components/UI/text-input';
import Button from 'components/UI/button';
import styles from './auth.module.scss';

function AuthForm({ children, onSubmit, className }) {
    return (
        <form
            action="#"
            className={classNames(className, styles.form)}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
}

function AuthFormInput({ type, label, caption, className, ...props }, ref) {
    return (
        <TextInput
            className={classNames(className, styles.input)}
            type={type}
            label={label}
            labelType="side"
            caption={caption}
            ref={ref}
            {...props}
        />
    );
}

const AuthFormInputFR = forwardRef(AuthFormInput);

function AuthFormAlertMessage({ message, className }) {
    return (
        <span className={classNames(className, styles.alert)}>{message}</span>
    );
}

function AuthFormSubmit({ children, className }) {
    return (
        <div className={classNames(className, styles.submitWrapper)}>
            <Button submit>{children}</Button>
        </div>
    );
}

export {
    AuthForm,
    AuthFormInputFR as TextInput,
    AuthFormSubmit as Submit,
    AuthFormAlertMessage as AlertMessage,
};
