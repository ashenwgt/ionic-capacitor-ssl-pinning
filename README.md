# Ionic - Capacitor SSL Pinning


## Project Structure

- `/certificates`: Certificates (X.509 DER .cer)
- `/logs`: Xcode log location for iOS build


## Implementation

src/app/app.module.ts
```
import {HTTP} from '@ionic-native/http/ngx';
...

@NgModule({
    ...
    providers: [
        HTTP,
        ...
    ]
})
export class AppModule {
}
```

src/app/app.component.ts
```
import {HTTP} from '@ionic-native/http/ngx';
...

export class AppComponent {
    constructor(
        private http: HTTP,
        ...
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready()
            .then(() => {
                console.log('[LOG] Platform Ready!');
                this.http.setSSLCertMode('pinned')
                    .then(() => {
                        console.log('[SUCCESS] SSL Pinning Starts!');
                        if (Capacitor.isPluginAvailable('SplashScreen')) {
                            Plugins.SplashScreen.hide();
                            this.getTestURL();
                        }
                    })
                    .catch(() => {
                        console.log('[ERROR] SSL Pinning Fails!');
                    });
            });
    }

    getTestURL() {
        this.http.get('https://reqres.in/api/users/2', {}, {})
            .then(data => {

            console.log(data.status);
            console.log(data.data); // data received by server
            console.log(data.headers);
            console.log('pinning success');
            var responseData = JSON.parse(data.data);
            console.log('responseData',responseData);

            alert( responseData.data.first_name );

            })
            .catch(error => {

            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
            alert('SSL Pinning failed OR http req error');

        });
    }
}

```

angular.json
```
{
    ...
    ...
    "projects": {
        "app": {
            ...
            ...
            "architect": {
                "build": {
                    ...
                    ...
                    "options": {
                        ...
                        ...
                        "assets": [
                            ...
                            ...
                            {
                                "glob": "*.cer",
                                "input": "certificates",
                                "output": "./certificates"
                            }
                        ]
                    }
                }
            }
        }
    }
}
```

## Terminal Commands

### Install Ionic Native HTTP plugin: https://ionicframework.com/docs/native/http

```
ionic cordova plugin add cordova-plugin-advanced-http
npm install @ionic-native/http
```

### Build project

```
ionic build
```

### Add platform
```
npx cap add ios
npx cap add android
```

### Copy/sync built web assets to native app
```
npx cap copy
npx cap sync
```

### **[Workaround]** Copy certificate files to a newly-created assets directory which is visible to Cordova plugin builds - https://github.com/silkimen/cordova-plugin-advanced-http/issues/168
```
// android
mkdir -p android/capacitor-cordova-android-plugins/src/main/assets/www/
cp -r android/app/src/main/assets/public/certificates android/capacitor-cordova-android-plugins/src/main/assets/www/certificates
```

### Open native app on native IDE with Capacitor
```
npx cap open ios
npx cap open android
```