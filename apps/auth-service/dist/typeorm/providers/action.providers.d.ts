import { ActionEntity } from '../entities/action.entity';
import { DataSource } from 'typeorm';
export declare const actionProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ActionEntity>;
    inject: string[];
}[];
