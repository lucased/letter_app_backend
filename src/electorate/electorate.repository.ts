import { EntityRepository, Repository } from 'typeorm';
import { Electorate } from './electorate.entity';

@EntityRepository(Electorate)
export class ElectorateRepository extends Repository<Electorate> {}
