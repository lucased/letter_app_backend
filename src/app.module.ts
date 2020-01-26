import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectorateModule } from './electorate/electorate.module';
import * as typeOrmConfig from './config/typeorm.config';
import { PostcodeModule } from './postcode/postcode.module';
import { MembersModule } from './members/members.module';
import { LocalityModule } from './locality/locality.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ElectorateModule, PostcodeModule, MembersModule, LocalityModule],
})
export class AppModule {}
