import { EntityRepository, Repository } from 'typeorm';
import { Member } from './member.entity';
import { SearchMemberDto } from './dto/search-member.dto';

@EntityRepository(Member)
export class MembersRepository extends Repository<Member> {
  async getMemberFromPostcodeOrLocality(searchDto: SearchMemberDto) {
    const { postcode, locality } = searchDto;

    const query = this.createQueryBuilder('member');

    query
      .leftJoinAndSelect('member.electorate', 'electorate')
      .leftJoin('electorate.postcodes', 'postcode')
      .leftJoin('electorate.localities', 'locality');

    if (locality) {
      query.where('locality.name = :locality', { locality: locality.toLowerCase() });
    }

    if (postcode) {
      query.andWhere('postcode.code = :postcode', { postcode });
    }

    if (!postcode && !locality) {
      return this.find();
    }

    const members = query.getMany();
    return members;
  }
}
