import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Sema } from 'async-sema';
import { Postcode } from 'src/postcode/postcode.entity';
import { Electorate } from 'src/electorate/electorate.entity';
import { Locality } from 'src/locality/locality.entity';
// import { Member, State, Gender } from 'src/members/member.entity.js';
import { Member, State, Gender } from 'src/members/member.entity';
import eletoratesJson from '../../data/electorates.json';
import postcodeJson from '../../data/postcodes.json';
import localitiesJson from '../../data/locality.json';
import memebersJson from '../../data/members.json';

// const s = new Sema(
//   100, // Allow 4 concurrent async calls
//   {
//     capacity: 20000, // Prealloc space for 100 tokens
//   },
// );
export class SEEDER1580011834645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const postcodeReop = getRepository(Postcode);
    const eletorateRepo = getRepository(Electorate);
    const localityRepo = getRepository(Locality);
    const memberRepo = getRepository(Member);

    await Promise.all(
      eletoratesJson.map(async electorate => {
        return new Promise(async (resolve, reject) => {
          try {
            const newElectorate = new Electorate();
            newElectorate.name = electorate.toLowerCase();

            await eletorateRepo.save(newElectorate);

            console.log(`Electorate: ${electorate} added`);

            resolve();
          } catch (error) {
            console.log(error);
            reject();
          }
        });
      }),
    );

    await Promise.all(
      postcodeJson.map(async d => {
        return new Promise(async (resolve, reject) => {
          try {
            const { postcode, electorate: e } = d;
            const electorate = await eletorateRepo.findOne({ name: e.toLowerCase() });

            const newPostcode = new Postcode();
            newPostcode.code = Number(postcode);
            newPostcode.electorate = electorate;

            await postcodeReop.save(newPostcode);

            console.log(`Postcode: ${postcode} added`);
            resolve();
          } catch (error) {
            console.log(error);
            reject();
          }
        });
      }),
    );

    await Promise.all(
      localitiesJson.map(async locality => {
        return new Promise(async (resolve, reject) => {
        //   await s.acquire();
          try {
            const { electorate: e, postcode: p, locality: l } = locality;
            const electorate = await eletorateRepo.findOne({ name: e.toLowerCase() });
            const postcode = await postcodeReop.findOne({ code: Number(p) });

            const newLocality = new Locality();
            newLocality.name = l.toLowerCase();
            newLocality.electorate = electorate;
            newLocality.postcode = postcode;

            await localityRepo.save(newLocality);
            console.log(`Locality: ${l} added`);
            resolve();
          } catch (error) {
            console.log(error);
            reject();
          } finally {
            // s.release();
          }
        });
      }),
    );

    await Promise.all(
      memebersJson.map(async member => {
        return new Promise(async (resolve, reject) => {
          try {
            const electorate = await eletorateRepo.findOne({
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
            newMember.electoratePostalState = member['Electorate Postal State'];
            newMember.electoratePostalPostcode =
              member['Electorate Postal Postcode'];
            newMember.parliamentaryTitle = member['Parliamentary Title'];
            newMember.ministerialTitle = member['Ministerial Title'];

            await memberRepo.save(newMember);
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
