import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersRepository } from './members.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MembersRepository])],
  providers: [MembersService],
  controllers: [MembersController],
})
export class MembersModule {}
