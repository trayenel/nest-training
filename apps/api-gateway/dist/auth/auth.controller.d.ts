import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { LoginDataDTO } from '../dto/loginData.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getHello(loginData: LoginDataDTO): Observable<any>;
}
