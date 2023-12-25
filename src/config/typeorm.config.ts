import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'staarmtechnology',
    password : '1234',
    database : 'taskmanagement',
    entities : [__dirname + '/../**/*.entity.ts'],
    synchronize : true,
}