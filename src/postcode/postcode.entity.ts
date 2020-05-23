import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Electorate } from 'src/electorate/electorate.entity';
import { Locality } from 'src/locality/locality.entity';

@Entity()
export class Postcode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  code: number;

  @Index()
  @ManyToOne(
    type => Electorate,
    electorate => electorate.postcodes,
    { eager: false },
  )
  electorate: Electorate;

  @OneToMany(
    type => Locality,
    locality => locality.postcode,
    { eager: false },
  )
  localities: Locality[];
}
