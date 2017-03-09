App.info({
  id: 'com.meteor.spd',
  name: 'spd_reporte',
  description: 'reportes de seguimiento de tareas',
  author: 'maryon torres',
  email: 'maryontorres@gmail.com',
  website: 'http://github.com/maryito/SPD_D'
});
// Set up resources such as icons and launch screens.
App.icons({
  'android_mdpi': 'img/icons/icon-48-mdpi.png',
  'android_hdpi': 'img/icons/icon-72-hdpi.png',
  'android_xhdpi': 'img/icons/icon-96-xhdpi.png',
  'android_xxhdpi': 'img/icons/icon-144-xxhdpi.png',
  'android_xxxhdpi': 'img/icons/icon-192-xxxhdpi.png',
  // ... more screen sizes and platforms ...
});
App.launchScreens({
  'android_mdpi_portrait': 'img/splash/screen-mdpi-portrait.png',
  'android_mdpi_landscape': 'img/splash/screen-mdpi-landscape.png',
  'android_hdpi_portrait': 'img/splash/screen-hdpi-portrait.png',
  'android_hdpi_landscape': 'img/splash/screen-hdpi-landscape.png',
  'android_xhdpi_portrait': 'img/splash/screen-xhdpi-portrait.png',
  'android_xhdpi_landscape': 'img/splash/screen-xhdpi-landscape.png',
  'android_xxhdpi_portrait': 'img/splash/screen-xxhdpi-portrait.png',
  'android_xxhdpi_landscape': 'img/splash/screen-xxhdpi-landscape.png',
  // ... more screen sizes and platforms ...
});
// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
// // Pass preferences for a particular PhoneGap/Cordova plugin
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });
// Add custom tags for a particular PhoneGap/Cordova plugin
// to the end of generated config.xml.
// Universal Links is shown as an example here.
App.appendToConfig(`
  <universal-links>
    <host name="138.197.127.251:80" />
  </universal-links>
`);
