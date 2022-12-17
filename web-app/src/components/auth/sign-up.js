/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { AuthForm, TextInput, Submit } from './auth';

function SignUp({ className }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <AuthForm className={className} onSubmit={handleSubmit(onSubmit)}>
            <TextInput type="text" label="Имя" {...register('name')} />
            <TextInput type="email" label="Email" {...register('email')} />
            <TextInput
                type="password"
                label="Пароль"
                {...register('password')}
            />
            <Submit>Зарегистрироваться</Submit>
        </AuthForm>
    );
}

export default SignUp;
