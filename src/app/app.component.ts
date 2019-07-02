import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {Plugins, Capacitor} from '@capacitor/core';

import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private authService: AuthService,
        private router: Router,
        private http: HTTP,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready()
            .then(() => {
                console.log('[LOG] SSL Pinning Starts');
                this.http.setDataSerializer('json');
                this.http.setSSLCertMode('pinned')
                    .then(() => {
                        console.log('[SUCCESS] SSL Pinning Works!');
                        if (Capacitor.isPluginAvailable('SplashScreen')) {
                            Plugins.SplashScreen.hide();
                            this.getTestURL();
                        }
                    })
                    .catch(() => {
                        console.log('[ERROR] SSL Pinning Fails!');
                        this.getTestURL();
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

    onLogout() {
        this.authService.logout();
        this.router.navigateByUrl('/auth');
    }
}
