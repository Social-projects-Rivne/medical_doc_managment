import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    public username: string;
    public roles: Array<string>;
    public role: string;
    private grant_type:string = "password"
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        this.token = currentUser && currentUser.token;
        this.username = currentUser && currentUser.username;
        this.role = currentUser && currentUser.role;
    }
    getRolesArray(rolesInput: string): Array<string> {
        let formattedRoles: any = rolesInput.replace(/[\"\[\]]+/g, '');
        let outputRoles: Array<string> = new Array<string>(formattedRoles.split(","));
        return outputRoles;
    }
    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let data: string = "grant_type=password&username=" + username + "&password=" + password;
        return this.http.post('/token', data, options)
                        .map((response: Response) => {
                            console.log("Login response: ");
                            console.log(response);
                            // login successful if there's a jwt token in the response
                            let token = response.json() && response.json().access_token;
                            this.roles = this.getRolesArray(response.json().roles);
                            this.role = this.roles[0];
                            if (token) {
                                // set token property
                                this.token = token;

                                // store username and jwt token in local storage to keep user logged in between page refreshes
                                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, role: this.role}));
                                // return true to indicate successful login
                                return true;
                            } else {
                                // return false to indicate failed login
                                return false;
                            }
                        });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}