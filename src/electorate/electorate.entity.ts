import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  Index,
} from 'typeorm';
import { Postcode } from 'src/postcode/postcode.entity';
import { Locality } from 'src/locality/locality.entity';
import { Member } from 'src/members/member.entity';

@Entity()
export class Electorate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @OneToOne(type => Member, member => member.electorate, {eager: true})
  member: Member;

  @OneToMany(
    type => Postcode,
    postcode => postcode.electorate,
    { eager: false },
  )
  postcodes: Postcode[];

  @OneToMany(
    type => Locality,
    locality => locality.electorate,
    { eager: false },
  )
  localities: Locality[];
}
