import { ClientProxy } from '@nestjs/microservices';
import { LoginDataDTO } from '../dto/loginData.dto';
export declare class AuthService {
    private readonly authService;
    constructor(authService: ClientProxy);
    login(loginData: LoginDataDTO): import("rxjs").Observable<any>;
}
