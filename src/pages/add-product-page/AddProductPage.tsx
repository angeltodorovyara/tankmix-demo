import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageLayout from '../PageLayout'
import TextField from '../../components/text-field/TextField'
import Button from '../../components/buttons/Button'
import { InputValues } from '../../interfaces'
import { Typography } from '@material-ui/core'
import { createProduct, createProductCleanup } from '../../store/actions'
import { RootState } from '../../store/types'
import { Redirect } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { actionSheetOptions } from '../../utils/options'

declare let navigator: any;
declare let Camera: any;
declare let window: any;

const AddProductPage: React.FC = props => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products);
    const [productName, setProductName] = useState<InputValues>({ value: '', error: '' });
    const [productDesc, setProductDesc] = useState<InputValues>({ value: '', error: '' });
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {

        return () => {
            dispatch(createProductCleanup())
        }
    }, [dispatch])

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (productName.value === '' || productDesc.value === '') {
            return
        }
        dispatch(createProduct(productName.value, productDesc.value, image))
    }

    const actionSheetCallback = (buttonIndex: number) => {
        if (buttonIndex === 1) {
            navigator.camera.getPicture((photo: string) => {
                setImage(photo)
            }, (err: string) => alert(err), {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                saveToPhotoAlbum: false
            })
        } else if (buttonIndex === 2) {
            navigator.camera.getPicture((photo: string) => {
                setImage(photo)
            }, (err: string) => alert(err), {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                saveToPhotoAlbum: false
            })
        }
    };

    if (products.isAddingDone) {
        return <Redirect to='/home' />
    }

    return <PageLayout>
        <div className="center-middle-screen">
            <Typography variant="h5" align="center" gutterBottom>{t('newProduct')}</Typography>
            <form onSubmit={onSubmitHandler}>
                <TextField
                    id="productName"
                    type="text"
                    label={productName.error}
                    value={productName.value}
                    placeholder={t('formPlaceholders.name')}
                    onChange={(e) => setProductName(prevState => ({ ...prevState, value: e.target.value }))}
                    onBlur={(e) => setProductName(prevState => ({ ...prevState, error: (e.target.value === '' ? t('formErrors.cannotBeEmpty') : '') }))} />
                <TextField
                    id="productDesc"
                    type="text"
                    multiline={true}
                    label={productDesc.error}
                    value={productDesc.value}
                    placeholder={t('formPlaceholders.description')}
                    onChange={(e) => setProductDesc(prevState => ({ ...prevState, value: e.target.value }))}
                    onBlur={(e) => setProductDesc(prevState => ({ ...prevState, error: (e.target.value === '' ? t('formErrors.cannotBeEmpty') : '') }))} />
                <Button onClick={() => window.plugins.actionsheet.show(actionSheetOptions, actionSheetCallback)}>{t('addPhoto')}</Button>
                <Button type="submit">{t('addProduct')}</Button>
            </form>
        </div>
    </PageLayout>
}

export default AddProductPage