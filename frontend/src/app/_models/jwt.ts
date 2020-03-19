import { User } from './user';

export class Jwt {
    access_token?:string;
    token_type?:string;
    expires_in:number;
    user: User
}