import { DataSource } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
export declare const roleProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<RoleEntity>;
    inject: string[];
}[];
