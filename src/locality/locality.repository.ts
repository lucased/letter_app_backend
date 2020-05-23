import { EntityRepository, Repository } from 'typeorm';
import { Locality } from './locality.entity';

@EntityRepository(Locality)
export class LocalityRepository extends Repository<Locality> {}
