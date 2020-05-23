import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalityRepository } from './locality.repository';

@Injectable()
export class LocalityService {
  constructor(
    @InjectRepository(LocalityRepository)
    private localityRepository: LocalityRepository,
  ) {}

  async getLocality(postcode: number) {
    const locality = await this.localityRepository
      .createQueryBuilder('locality')
      .innerJoinAndSelect('locality.postcode', 'postcode')
      .innerJoinAndSelect('locality.electorate', 'electorate')
      .innerJoinAndSelect('electorate.member', 'member')
      .where("locality.name = 'apollo bay'")
      .andWhere('postcode.code = :postcode', { postcode })
      .getOne();

    return locality;
  }
}
