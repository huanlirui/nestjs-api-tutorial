import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signUp() {
        return {
            msg:"signUp"
        };
    }
    signIn(){
        return 'signIn';
    }
}
