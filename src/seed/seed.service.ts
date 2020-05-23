import { Injectable, NotFoundException } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import { InjectRepository } from '@nestjs/typeorm';
import { Sema } from 'async-sema';
import _ from 'lodash';

import { Postcode } from 'src/postcode/postcode.entity';
import { Electorate } from 'src/electorate/electorate.entity';
import { Locality } from 'src/locality/locality.entity';
import { Member, State, Gender } from 'src/members/member.entity';

import { ElectorateRepository } from 'src/electorate/electorate.repository';
import { PostcodeRepository } from 'src/postcode/postcode.repository';
import { LocalityRepository } from 'src/locality/locality.repository';
import { MembersRepository } from 'src/members/members.repository';

import eletoratesJson from 'data/electorates.json';
import postcodeJson from 'data/postcodes.json';
import localitiesJson from 'data/locality.json';
import memebersJson from 'data/members.json';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(ElectorateRepository)
    private electorateRepository: ElectorateRepository,
    @InjectRepository(PostcodeRepository)
    private postcodeRepository: PostcodeRepository,
    @InjectRepository(LocalityRepository)
    private localityRepository: LocalityRepository,
    @InjectRepository(MembersRepository)
    private membersRepository: MembersRepository,
  ) {}

  private async insertLocality(locality) {
    return new Promise(async (resolve, reject) => {
      try {
        const { electorate: e, postcode: p, locality: l } = locality;

        const electorate = await this.electorateRepository
          .createQueryBuilder('electorate')
          .where('electorate.name = :name', { name: e.toLowerCase() })
          .getOne();

        const postcodeNumber = Number(p);
        const postcode = await this.postcodeRepository
          .createQueryBuilder('postcode')
          .where('postcode.code = :code', { code: postcodeNumber })
          .getOne();

        if (!electorate || !postcode) {
          resolve();
        }

        const newLocality = new Locality();
        newLocality.name = l.toLowerCase();
        newLocality.electorate = electorate;
        newLocality.postcode = postcode;

        await this.localityRepository.insert(newLocality);
        console.log(`Locality: ${l} added`);
        resolve();
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  }

  @Command({
    command: 'seed:db',
    describe: 'Create electorates, postcodes, localities and members',
    autoExit: true,
  })
  async create() {
    const electorateCount = await this.electorateRepository.count();
    if (electorateCount === 0) {
      await Promise.all(
        eletoratesJson.map(async electorate => {
          return new Promise(async (resolve, reject) => {
            try {
              const newElectorate = new Electorate();
              newElectorate.name = electorate.toLowerCase();

              await this.electorateRepository.save(newElectorate);

              console.log(`Electorate: ${electorate} added`);

              resolve();
            } catch (error) {
              console.log(error);
              reject();
            }
          });
        }),
      );
    } else {
      console.log('Skipping electorate');
    }

    const postcodeCount = await this.postcodeRepository.count();
    if (postcodeCount === 0) {
      const s = new Sema(
        50, // Allow 4 concurrent async calls
        {
          capacity: 1000, // Prealloc space for 100 tokens
        },
      );
      await Promise.all(
        postcodeJson.map(async d => {
          await s.acquire();
          console.log(s.nrWaiting() + ' calls to fetch are waiting');
          return new Promise(async (resolve, reject) => {
            try {
              const { postcode, electorate: e } = d;
              const electorate = await this.electorateRepository.findOne({
                name: e.toLowerCase(),
              });

              if (!electorate) {
                resolve();
              }

              const newPostcode = new Postcode();
              newPostcode.code = Number(postcode);
              newPostcode.electorate = electorate;

              await this.postcodeRepository.save(newPostcode);

              console.log(`Postcode: ${postcode} added`);
              resolve();
            } catch (error) {
              console.log(error);
              reject();
            } finally {
              s.release();
            }
          });
        }),
      );
    } else {
      console.log('Skipping postcode');
    }

    const localityCount = await this.localityRepository.count();
    if (localityCount === 0) {
      const localityChunks = _.chunk(localitiesJson, 100);
      for (let i = 0; i < localityChunks.length; i++) {
        const currentBatchPromises = localityChunks[i].map(async locality => {
          return this.insertLocality(locality);
        });
        await Promise.all(currentBatchPromises);
      }
    } else {
      console.log('Skipping locality');
    }

    const memberCount = await this.membersRepository.count();
    if (memberCount === 0) {
      await Promise.all(
        memebersJson.map(async member => {
          return new Promise(async (resolve, reject) => {
            try {
              const electorate = await this.electorateRepository.findOne({
                name: member.Electorate.toLowerCase(),
              });
              const newMember = new Member();
              newMember.honorific = member.Honorific;
              newMember.salutation = member.Salutation;
              (newMember.postNominals = member['Post Nominals']),
                (newMember.surname = member.Surname);
              newMember.firstname = member['First Name'];
              newMember.otherName = member['Other Name'];
              newMember.preferredName = member['Preferred Name'];
              newMember.initials = member.Initials;
              newMember.electorate = electorate;
              newMember.state = member.State as State;
              newMember.party = member['Political Party'];
              newMember.gender = member.Gender as Gender;
              newMember.telephone = member.Telephone;
              newMember.fax = member.Fax;
              newMember.electorateAddressLine1 =
                member['Electorate Address Line 1'];
              newMember.electorateAddressLine2 =
                member['Electorate Address Line 2'];
              newMember.electorateSuburb = member['Electorate Suburb'];
              newMember.electorateState = member['Electorate State'];
              newMember.electoratePostcode = Number(
                member['Electorate PostCode'],
              );
              newMember.electorateTelephone = member['Electorate Telephone'];
              newMember.electorateFax = member['Electorate Fax'];
              newMember.electorateTollfree = member['Electorate TollFree'];
              newMember.electoratePostalAddress =
                member['Electorate Postal Address'];
              newMember.electoratePostalSuburb =
                member['Electorate Postal Suburb'];
              newMember.electoratePostalState =
                member['Electorate Postal State'];
              newMember.electoratePostalPostcode =
                member['Electorate Postal Postcode'];
              newMember.parliamentaryTitle = member['Parliamentary Title'];
              newMember.ministerialTitle = member['Ministerial Title'];

              await this.membersRepository.save(newMember);
              console.log(
                `Member: ${newMember.firstname} ${newMember.surname} added`,
              );
              resolve();
            } catch (error) {
              console.log(error);
              reject();
            }
          });
        }),
      );
    } else {
      console.log('skipping members');
    }
  }
}
