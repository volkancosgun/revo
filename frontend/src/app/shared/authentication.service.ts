import { Injectable } from '@angular/core';
import { Jwt } from '../_models/jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { Role } from '../_models/role';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    public currentUserSubject: BehaviorSubject<Jwt>;
    public currentUser: Observable<Jwt>;
    
    constructor(private http: HttpClient) {

        this.currentUserSubject = new BehaviorSubject<Jwt>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

    }

    public get isAdmin(): boolean {
        return this.currentUserValue.user && this.currentUserValue.user.role === Role.Admin;
    }

    public get currentUserValue(): Jwt {
        return this.currentUserSubject.value;
    }

    login(user: any) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, user)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    me(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/auth/me`);
    }

    logout() {
        return this.http.get(`${environment.apiUrl}/auth/logout`);
    }

    autoLogout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    updateCurrentUser(user: User) {

        let data = this.currentUserValue;
        data.user = user;
        localStorage.setItem('currentUser', JSON.stringify(data));

    }

}