import { User } from './login-object.model';

export class Session {
    token: string;
    user: User;

    constructor( token, user) {
      this.token = token;
      this.user = user;
    }
}
