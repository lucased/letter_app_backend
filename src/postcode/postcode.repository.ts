import { EntityRepository, Repository } from 'typeorm';
import { Postcode } from './postcode.entity';

@EntityRepository(Postcode)
export class PostcodeRepository extends Repository<Postcode> {}
