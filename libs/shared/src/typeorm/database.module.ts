import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

const typeOrmConfig: any = (configService: ConfigService) => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_VENDOR'),
  schema: configService.get<string>('DATABASE_SCHEMA'),
  entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*.ts'],
  autoLoadEntities: true,
  synchronize: false,
})

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: typeOrmConfig,
  })],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

