import { UserRoleEntity } from '../entities/userRole.entity';
import { DataSource } from 'typeorm';
export declare const userRoleProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<UserRoleEntity>;
    inject: string[];
}[];
