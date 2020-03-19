import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {

    constructor(
        private http: HttpClient
    ) { 

    }


    getAllUser(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/admin/allUserList`);
    }

    editUser(data) {
        return this.http.post(`${environment.apiUrl}/admin/editUser`, data);
    }

}