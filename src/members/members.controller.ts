import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './member.entity';
import { SearchMemberDto } from './dto/search-member.dto';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get()
  getAll(@Query(ValidationPipe) searchDto: SearchMemberDto): Promise<Member[]> {
    return this.membersService.getMemberFromPostcodeOrLocality(searchDto);
  }
}
