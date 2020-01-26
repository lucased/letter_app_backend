import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Postcode } from 'src/postcode/postcode.entity';
import { Locality } from 'src/locality/locality.entity';

@Entity()
export class Electorate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    type => Postcode,
    postcode => postcode.electorate,
    { eager: true },
  )
  postcodes: Postcode[];

  @OneToMany(
    type => Locality,
    locality => locality.electorate,
    { eager: true },
  )
  localities: Locality[];
}
