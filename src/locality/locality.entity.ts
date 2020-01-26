import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
import { Electorate } from 'src/electorate/electorate.entity';
import { Postcode } from 'src/postcode/postcode.entity';

@Entity()
export class Locality extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    type => Electorate,
    electorate => electorate.localities,
    { eager: false },
  )
  electorate: Electorate;

  @ManyToOne(
    type => Postcode,
    postcode => postcode.localities,
    { eager: false },
  )
  postcode: Postcode;
}
