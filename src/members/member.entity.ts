import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Electorate } from 'src/electorate/electorate.entity';

export enum State {
  VIC = 'VIC',
  NSW = 'NSW',
  ACT = 'ACT',
  QLD = 'QLD',
  NT = 'NT',
  WA = 'WA',
  SA = 'SA',
  TAS = 'TAS',
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  honorific: string;

  @Column()
  salutation: string;

  @Column()
  postNominals: string;

  @Column()
  surname: string;

  @Column()
  firstname: string;

  @Column()
  otherName: string;

  @Column()
  preferredName: string;

  @Column()
  initials: string;

  @OneToOne(type => Electorate)
  @JoinColumn()
  electorate: Electorate;

  @Column()
  state: State;

  @Column()
  party: string;

  @Column()
  gender: Gender;

  @Column()
  telephone: string;

  @Column()
  fax: string;

  @Column()
  electorateAddressLine1: string;

  @Column()
  electorateAddressLine2: string;

  @Column()
  electorateSuburb: string;

  @Column()
  electorateState: string;

  @Column()
  electoratePostcode: number;

  @Column()
  electorateTelephone: string;

  @Column()
  electorateFax: string;

  @Column()
  electorateTollfree: string;

  @Column()
  electoratePostalAddress: string;

  @Column()
  electoratePostalSuburb: string;

  @Column()
  electoratePostalState: string;

  @Column()
  electoratePostalPostcode: number;

  @Column()
  parliamentaryTitle: string;

  @Column()
  ministerialTitle: string;
}
