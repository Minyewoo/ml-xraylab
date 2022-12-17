/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { AuthForm, TextInput, Submit } from './auth';

function SignIn({ className }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <AuthForm className={className} onSubmit={handleSubmit(onSubmit)}>
            <TextInput type="email" label="Email" {...register('email')} />
            <TextInput
                type="password"
                label="Пароль"
                {...register('password')}
            />
            <Submit>Войти</Submit>
        </AuthForm>
    );
}

export default SignIn;
