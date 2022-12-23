/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import AuthContext from 'contexts/auth-context';
import { useSignInMutation } from 'services/api';
import { AuthForm, TextInput, Submit, AlertMessage } from './auth';

function SignIn({ className }) {
    const { startSession } = useContext(AuthContext);

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    });

    const [signIn] = useSignInMutation();
    const [error, setError] = useState(null);

    const onSubmit = data => {
        const handleSignIn = async () => {
            try {
                const { username, password } = data;
                const { token, response } = await signIn({
                    username,
                    password,
                }).unwrap();

                if (token === undefined) {
                    setError(response);
                    return;
                }

                startSession(token);
            } catch (err) {
                console.log('Za shooooo', err);
            }
        };

        handleSignIn();
    };

    return (
        <AuthForm className={className} onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                type="text"
                label="Никнейм"
                {...register('username', { required: 'Введите никнейм' })}
            />
            <TextInput
                type="password"
                label="Пароль"
                {...register('password', { required: 'Введите пароль' })}
            />
            {error && <AlertMessage message={error} />}
            <Submit>Войти</Submit>
        </AuthForm>
    );
}

export default SignIn;
