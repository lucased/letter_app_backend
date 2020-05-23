import { Module } from '@nestjs/common';
import { LocalityService } from './locality.service';
import { LocalityController } from './locality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalityRepository } from './locality.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LocalityRepository])],
  providers: [LocalityService],
  controllers: [LocalityController],
})
export class LocalityModule {}
