import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';

import { ElectorateModule } from './electorate/electorate.module';
import * as typeOrmConfig from './config/typeorm.config';
import { PostcodeModule } from './postcode/postcode.module';
import { MembersModule } from './members/members.module';
import { LocalityModule } from './locality/locality.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ElectorateModule,
    PostcodeModule,
    MembersModule,
    LocalityModule,
    SeedModule,
  ],
})
export class AppModule {}
