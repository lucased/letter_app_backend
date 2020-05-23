import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectorateRepository } from './electorate.repository';

@Injectable()
export class ElectorateService {
  constructor(
    @InjectRepository(ElectorateRepository)
    private eletorateRepository: ElectorateRepository,
  ) {}
  async getElectorate() {
    const res = await this.eletorateRepository.find({
      where: { name: 'braddon' },
    });

    console.log(res);
    return 'test';
  }
}
