export const actionSheetOptions = {
    title: 'Select Photo',
    buttonLabels: ['Camera', 'Gallery'],
    androidEnableCancelButton: true, // default false
    addCancelButtonWithLabel: 'Cancel',
    // addDestructiveButtonWithLabel: 'Delete it',
    // position: [20, 40], // for iPad pass in the [x, y] position of the popover
    // destructiveButtonLast: true // you can choose where the destructive button is shown
}

export const qrScanningOptions: object = {
    preferFrontCamera: false, // iOS and Android
    showFlipCameraButton: true, // iOS and Android
    showTorchButton: true, // iOS and Android
    torchOn: true, // Android, launch with the torch switched on (if available)
    saveHistory: false, // Android, save scan history (default false)
    prompt: "Place a barcode inside the scan area", // Android
    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
    orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
    disableAnimations: true, // iOS
    disableSuccessBeep: false // iOS and Android
}