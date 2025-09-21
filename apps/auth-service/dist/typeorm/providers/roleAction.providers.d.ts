import { RoleActionEntity } from '../entities/roleAction.entity';
import { DataSource } from 'typeorm';
export declare const roleActionProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<RoleActionEntity>;
    inject: string[];
}[];
