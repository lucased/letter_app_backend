import { Module } from '@nestjs/common';
import { ElectorateService } from './electorate.service';
import { ElectorateController } from './electorate.controller';

@Module({
  providers: [ElectorateService],
  controllers: [ElectorateController],
})
export class ElectorateModule {}
