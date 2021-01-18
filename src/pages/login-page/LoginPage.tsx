import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import TextField from '../../components/text-field/TextField'
import Button from '../../components/buttons/Button'
import LinkButton from '../../components/buttons/LinkButton'
import ErrorMessage from '../../components/error-message/ErrorMessage'
import { authenticate } from '../../store/actions'
import { RootState } from '../../store/types'
import { InputValues } from '../../interfaces'
import { useTranslation } from 'react-i18next'
declare let StatusBar: any;

const LoginPage: React.FC = (props) => {
    StatusBar.show();
    StatusBar.backgroundColorByHexString('#fff');
    StatusBar.styleDefault();

    const user = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [email, setEmail] = useState<InputValues>({ error: '', value: '' })
    const [password, setPassword] = useState<InputValues>({ error: '', value: '' })

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (e.target.id === "email")
            setEmail(prevState => { return { ...prevState, value: e.target.value } })
        else if (e.target.id === "password")
            setPassword(prevState => { return { ...prevState, value: e.target.value } })
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (e.target.id === "password") {
            // password validator
        }
    }

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (email.value === '' || password.value === '') {
            return
        } else {
            dispatch(authenticate(email.value, password.value))
        }
    }

    if (user.data) {
        return <Redirect to='/home' />
    }

    return <div className='center-middle-screen'>
        {user.error ? <ErrorMessage message={user.error} /> : null}

        <Typography variant="h5" align="center" gutterBottom>{t('login')}</Typography>
        <form onSubmit={onSubmitHandler}>
            <TextField
                id="email"
                type="email"
                label={email.error}
                value={email.value}
                placeholder={t('formPlaceholders.email')}
                onChange={onChangeHandler}
                onBlur={onBlurHandler} />
            <TextField
                id="password"
                type="password"
                label={password.error}
                value={password.value}
                placeholder={t('formPlaceholders.password')}
                onChange={onChangeHandler}
                onBlur={onBlurHandler} />
            <Button type="submit">{t('login')}</Button>
            <Typography variant="body1" align="center" gutterBottom>{t('or')}</Typography>
            <LinkButton to="/register">{t('signup')}</LinkButton>
        </form>
    </div>
}

export default LoginPage