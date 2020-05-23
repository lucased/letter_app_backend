import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersRepository } from './members.repository';
import { SearchMemberDto } from './dto/search-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MembersRepository)
    private membersRepository: MembersRepository,
  ) {}

  async getMemberFromPostcodeOrLocality(searchDto: SearchMemberDto) {
    const member = await this.membersRepository.getMemberFromPostcodeOrLocality(
      searchDto,
    );

    if (!member) {
      throw new NotFoundException(
        `No member found for search criteria ${JSON.stringify(searchDto)}`,
      );
    }
    return member;
  }
}
