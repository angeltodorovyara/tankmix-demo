declare let cordova: any;

export function notificationSetup() {
    cordova.plugins.notification.local.setDefaults({
        smallIcon: 'res://icons/logo-mono-version.png',
        foreground: true,
        vibrate: true
    });
};