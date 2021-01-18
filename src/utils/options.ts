declare let Camera: any

export const actionSheetOptions = {
    title: 'Select Photo',
    buttonLabels: ['Camera', 'Gallery'],
    androidEnableCancelButton: true, // default false
    addCancelButtonWithLabel: 'Cancel',
    // addDestructiveButtonWithLabel: 'Delete it',
    // position: [20, 40], // for iPad pass in the [x, y] position of the popover
    // destructiveButtonLast: true // you can choose where the destructive button is shown
}

export const setGetPictureOptions = (source: number): object => {
    const type = source === 0 ? Camera.SourceType.CAMERA : Camera.SourceType.PHOTOLIBRARY
    return {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: type,
        saveToPhotoAlbum: false
    }
}