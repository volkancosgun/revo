export class AccountModel {
    id: number;
    category: number;
    uname: string;
    upass: string;
    unumber: string;
    country: string;
    lang: string;
    _ref: string;
    starred: boolean;
    read: boolean;
    unote: string;
    status: number;

    clear() {
        this.id = null;
        this.category = null;
        this.uname = null;
        this.upass = null;
        this.unumber = null;
        this.country = null;
        this.lang = null;
        this._ref = null;
        this.starred = null;
        this.read = null;
        this.unote = null;
        this.status= null;
    }
}