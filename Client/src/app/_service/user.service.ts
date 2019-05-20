import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    currUser = null;

    constructor() { }

    getUserLogIn() {
        return this.currUser;
    }

    initUserLogedIn(user) {
        this.currUser = user;
    }

    isUserLogIn(): boolean {
        return this.currUser ? true : false;
    }

}
