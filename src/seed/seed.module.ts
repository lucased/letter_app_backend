import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';

import { MembersRepository } from 'src/members/members.repository';
import { ElectorateRepository } from 'src/electorate/electorate.repository';
import { PostcodeRepository } from 'src/postcode/postcode.repository';
import { LocalityRepository } from 'src/locality/locality.repository';
import { SeedService } from './seed.service';

@Module({
  imports: [
    CommandModule,
    TypeOrmModule.forFeature([
      MembersRepository,
      ElectorateRepository,
      PostcodeRepository,
      LocalityRepository,
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
