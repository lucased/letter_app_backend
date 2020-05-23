import { Module } from '@nestjs/common';
import { ElectorateService } from './electorate.service';
import { ElectorateController } from './electorate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectorateRepository } from './electorate.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ElectorateRepository])],
  providers: [ElectorateService],
  controllers: [ElectorateController],
})
export class ElectorateModule {}
