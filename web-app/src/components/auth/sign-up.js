/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import AuthContext from 'contexts/auth-context';
import { useSignUpMutation } from 'services/api';
import { AuthForm, TextInput, Submit, AlertMessage } from './auth';

function SignUp({ className }) {
    const { startSession } = useContext(AuthContext);

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    });

    const [signUp] = useSignUpMutation();
    const [error, setError] = useState(null);

    const onSubmit = data => {
        const handleSignUp = async () => {
            try {
                const { username, email, password } = data;
                const { token, response } = await signUp({
                    username,
                    email,
                    password,
                }).unwrap();

                if (token === undefined) {
                    setError(response);
                    return;
                }

                startSession(token);
            } catch (err) {
                // console.log('Za shooooo', err);
                setError('Something went wrong, please try again.');
            }
        };

        handleSignUp();
    };

    return (
        <AuthForm className={className} onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                type="text"
                label="Никнейм"
                {...register('username', { required: 'Введите никнейм' })}
            />
            <TextInput
                type="email"
                label="Email"
                {...register('email', { required: 'Введите почту' })}
            />
            <TextInput
                type="password"
                label="Пароль"
                {...register('password', { required: 'Введите пароль' })}
            />

            {error && <AlertMessage message={error} />}
            <Submit>Зарегистрироваться</Submit>
        </AuthForm>
    );
}

export default SignUp;
