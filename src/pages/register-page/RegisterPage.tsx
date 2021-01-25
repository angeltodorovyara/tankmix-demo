import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import TextField from '../../components/text-field/TextField'
import Button from '../../components/buttons/Button'
import { registerUser } from '../../store/actions/index'
import { RootState } from '../../store/types'
import { InputValues } from '../../interfaces'
import { useTranslation } from 'react-i18next'
import PageLayout from '../PageLayout'
import ErrorMessage from '../../components/error-message/ErrorMessage'

const RegisterPage: React.FC = (props) => {
    const user = useSelector((state: RootState) => state.auth)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [email, setEmail] = useState<InputValues>({ error: '', value: '' })
    const [password, setPassword] = useState<InputValues>({ error: '', value: '' })
    const [rePassword, setRePassword] = useState<InputValues>({ error: '', value: '' })

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (e.target.id === "email")
            setEmail(prevState => { return { ...prevState, value: e.target.value } })
        else if (e.target.id === "password")
            setPassword(prevState => { return { ...prevState, value: e.target.value } })
        else if (e.target.id === "rePassword")
            setRePassword(prevState => { return { ...prevState, value: e.target.value } })
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (e.target.id === "password") {
            // password validator
        }
        else if (e.target.id === "rePassword") {
            if (rePassword.value !== password.value)
                setRePassword(prevState => { return { ...prevState, error: t('formErrors.rePassword') } })
            else
                setRePassword(prevState => { return { ...prevState, error: '' } })
        }
    }

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (email.value === '' || password.value === '' || rePassword.value === '') {
            return
        } else {
            dispatch(registerUser(email.value, password.value))
        }
    }

    return <PageLayout>
        <div className="center-middle-screen">
            {user.error ? <ErrorMessage message={user.error} /> : null}
            <Typography variant="h5" align="center" gutterBottom>{t('signup')}</Typography>
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
                <TextField
                    id="rePassword"
                    type="password"
                    label={rePassword.error}
                    value={rePassword.value}
                    placeholder={t('formPlaceholders.rePassword')}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler} />
                <Button type="submit">{t('register')}</Button>
            </form>
        </div>
    </PageLayout>
}

export default RegisterPage