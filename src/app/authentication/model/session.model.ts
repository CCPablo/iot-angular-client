import { User } from './user.model'

export class Session {
    token: string;
    user: string;

    constructor( token, user) {
      this.token = token;
      this.user = user;
    }
}
