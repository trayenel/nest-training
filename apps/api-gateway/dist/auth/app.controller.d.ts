import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { LoginDataDTO } from './dto/loginData.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(loginData: LoginDataDTO): Observable<any>;
}
