import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import TextField from '../../components/text-field/TextField'
import Button from '../../components/buttons/Button'
import { cleanAuthError, registerUser } from '../../store/actions/index'
import { RootState } from '../../store/types'
import { InputValues } from '../../interfaces'
import { useTranslation } from 'react-i18next'
import PageLayout from '../PageLayout'
import ErrorMessage from '../../components/error-message/ErrorMessage'
import emailValidator from '../../utils/validators/emailValidator'
import passwordValidator from '../../utils/validators/passwordValidator'
import rePasswordValidator from '../../utils/validators/rePasswordValidator'

const RegisterPage: React.FC = (props) => {
    const user = useSelector((state: RootState) => state.auth)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [email, setEmail] = useState<InputValues>({ error: '', value: '' })
    const [password, setPassword] = useState<InputValues>({ error: '', value: '' })
    const [rePassword, setRePassword] = useState<InputValues>({ error: '', value: '' })

    useEffect(() => {

        return () => {
            dispatch(cleanAuthError())
        }
    }, [dispatch])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (e.target.id === "email")
            setEmail(prevState => ({ ...prevState, value: e.target.value }))
        else if (e.target.id === "password")
            setPassword(prevState => ({ ...prevState, value: e.target.value }))
        else if (e.target.id === "rePassword")
            setRePassword(prevState => ({ ...prevState, value: e.target.value }))
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (e.target.id === "email") {
            const tempEmail = e.target.value.trim()
            setEmail(prevState => ({ ...prevState, value: tempEmail, error: emailValidator(email.value) }))
        }
        else if (e.target.id === "password")
            setPassword(prevState => ({ ...prevState, error: passwordValidator(password.value) }))
        else if (e.target.id === "rePassword")
            setRePassword(prevState => ({ ...prevState, error: rePasswordValidator(password.value, rePassword.value) }))
    }

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (email.value === '' || password.value === '' || rePassword.value === '' ||
            email.error !== '' || password.error !== '' || rePassword.error !== '') {
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
                    label={t(email.error)}
                    value={email.value}
                    placeholder={t('formPlaceholders.email')}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler} />
                <TextField
                    id="password"
                    type="password"
                    label={t(password.error)}
                    value={password.value}
                    placeholder={t('formPlaceholders.password')}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler} />
                <TextField
                    id="rePassword"
                    type="password"
                    label={t(rePassword.error)}
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