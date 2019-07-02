import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _userIsAuthenticated = false;

    constructor() {
    }

    get userIsAuthenticated(): boolean {
        return this._userIsAuthenticated;
    }

    login() {
        this._userIsAuthenticated = true;
    }

    logout() {
        this._userIsAuthenticated = false;
    }
}
