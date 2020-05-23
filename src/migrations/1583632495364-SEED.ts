import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Sema } from 'async-sema';
import _ from 'lodash';

import { Postcode } from 'src/postcode/postcode.entity';
import { Electorate } from 'src/electorate/electorate.entity';
import { Locality } from 'src/locality/locality.entity';
import { Member, State, Gender } from 'src/members/member.entity';
import eletoratesJson from '../../data/electorates.json';
import postcodeJson from '../../data/postcodes.json';
import localitiesJson from '../../data/locality.json';
import memebersJson from '../../data/members.json';

export class SEED1583632495364 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const postcodeRepository = getRepository(Postcode);
    const electorateRepository = getRepository(Electorate);
    const localityRepository = getRepository(Locality);
    const membersRepository = getRepository(Member);

    const electorateCount = await electorateRepository.count();
    if (electorateCount === 0) {
      await Promise.all(
        eletoratesJson.map(async electorate => {
          return new Promise(async (resolve, reject) => {
            try {
              const newElectorate = new Electorate();
              newElectorate.name = electorate.toLowerCase();

              await electorateRepository.insert(newElectorate);
              resolve();
            } catch (error) {
              console.log(error);
              reject();
            }
          });
        }),
      );
      console.log(`Electorates added`);
    } else {
      console.log('Skipping electorate');
    }

    const postcodeCount = await postcodeRepository.count();
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
          return new Promise(async (resolve, reject) => {
            try {
              const { postcode, electorate: e } = d;
              const electorate = await electorateRepository
                .createQueryBuilder('electorate')
                .where('electorate.name = :name', { name: e.toLowerCase() })
                .getOne();

              if (!electorate) {
                resolve();
              }

              const newPostcode = new Postcode();
              newPostcode.code = Number(postcode);
              newPostcode.electorate = electorate;

              await postcodeRepository.save(newPostcode);

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
      console.log(`Postcodes added`);
    } else {
      console.log('Skipping postcode');
    }

    const localityCount = await localityRepository.count();
    if (localityCount === 0) {
      const localityChunks = _.chunk(localitiesJson, 100);
      for (let i = 0; i < localityChunks.length; i++) {
        const currentBatchPromises = localityChunks[i].map(async locality => {
          return new Promise(async (resolve, reject) => {
            try {
              const { electorate: e, postcode: p, locality: l } = locality;

              const electorate = await electorateRepository
                .createQueryBuilder('electorate')
                .where('electorate.name = :name', { name: e.toLowerCase() })
                .getOne();

              const postcodeNumber = Number(p);
              const postcode = await postcodeRepository
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

              await localityRepository.insert(newLocality);
              resolve();
            } catch (error) {
              console.log(error);
              reject();
            }
          });
        });
        await Promise.all(currentBatchPromises);
      }
      console.log(`Localities added`);
    } else {
      console.log('Skipping locality');
    }

    const memberCount = await membersRepository.count();
    if (memberCount === 0) {
      await Promise.all(
        memebersJson.map(async member => {
          return new Promise(async (resolve, reject) => {
            try {
              const electorate = await electorateRepository
                .createQueryBuilder('electorate')
                .where('electorate.name = :name', {
                  name: member.Electorate.toLowerCase(),
                })
                .getOne();

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

              await membersRepository.save(newMember);
              resolve();
            } catch (error) {
              console.log(error);
              reject();
            }
          });
        }),
      );
      console.log(`Members added`);
    } else {
      console.log('skipping members');
    }
    console.log('second migation');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
