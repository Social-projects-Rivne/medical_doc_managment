// import { Injectable } from '@angular/core';
// import { Http, Headers, Response, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map'

// @Injectable()
// export class AuthenticationService {
//     public token: string;
//     private grant_type:string = "password"
//     constructor(private http: Http) {
//         // set token if saved in local storage
//         var currentUser = JSON.parse(localStorage.getItem('currentUser'));
//         this.token = currentUser && currentUser.token;
//     }

//     login(username: string, password: string): Observable<boolean> {
//         let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
//         let options = new RequestOptions({ headers: headers });
//         let data: string = "grant_type=password&username=" + username + "&password=" + password;
//         return this.http.post('/token', data, options)
//                         .map((response: Response) => {
//                             console.log("Login response: ");
//                             console.log(response);
//                             // login successful if there's a jwt token in the response
//                             let token = response.json() && response.json().access_token;
//                             if (token) {
//                                 // set token property
//                                 this.token = token;

//                                 // store username and jwt token in local storage to keep user logged in between page refreshes
//                                 localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
//                                 // return true to indicate successful login
//                                 return true;
//                             } else {
//                                 // return false to indicate failed login
//                                 return false;
//                             }
//                         });
//     }

//     logout(): void {
//         // clear token remove user from local storage to log user out
//         this.token = null;
//         localStorage.removeItem('currentUser');
//     }
// }
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    public id: string;
    public username: string;
    public roles: Array<string>;
    public role: string;
    public position: string;
    public positionId: number;
    public firstName: string;
    public secondName: string;
    public lastName: string;
    public email: string;
    private grant_type:string = "password"
    constructor(private http: Http) {
        // set token if saved in local storage
        //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //console.log(currentUser);
        //this.token = currentUser && currentUser.token;
        //this.username = currentUser && currentUser.username;
        //this.role = currentUser && currentUser.role;
        this.getCredentialsFromLocalStorage();
    }
    getCredentialsFromLocalStorage() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        this.token = currentUser && currentUser.token;
        this.id = currentUser && currentUser.id;
        this.username = currentUser && currentUser.username;
        this.role = currentUser && currentUser.role;
        this.position = currentUser && currentUser.position;
        this.firstName = currentUser && currentUser.firstName;
        this.secondName = currentUser && currentUser.secondName;
        this.lastName = currentUser && currentUser.lastName;
        this.email = currentUser && currentUser.email;
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
                            this.id = response.json()["id"];
                            this.roles = this.getRolesArray(response.json().roles);
                            this.role = this.roles[0].toString();
                            this.position = response.json()["position"];
                            this.positionId = response.json()["positionId"];
                            this.firstName = response.json()["firstName"];
                            this.secondName = response.json()["secondName"];
                            this.lastName = response.json()["lastName"];
                            this.email = response.json()["email"];
                            if (token) {
                                // set token property
                                this.token = token;

                                // store username and jwt token in local storage to keep user logged in between page refreshes
                                localStorage.setItem('currentUser', JSON.stringify({
                                    id: this.id,
                                    firstName: this.firstName,
                                    secondName: this.secondName,
                                    lastName: this.lastName,
                                    email: this.email,
                                    username: username,
                                    token: token,
                                    role: this.role,
                                    position: this.position,
                                    positionId: this.positionId
                                }));
                                this.getCredentialsFromLocalStorage();
                                // return true to indicate successful login
                                return true;
                            } else {
                                // return false to indicate failed login
                                return false;
                            }
                        });
    }

    logout(): void {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        this.http.get('/logout', options).subscribe();

        // clear token remove user from local storage to log user out
        this.token = null;
        this.id = null;
        this.username = null;
        this.roles = null;
        this.role = null;
        this.position = null;
        this.positionId = null;
        this.firstName = null;
        this.secondName = null;
        this.lastName = null;
        this.email = null;
        localStorage.removeItem('currentUser');
    }
}