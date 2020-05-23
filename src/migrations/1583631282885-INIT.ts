// import {MigrationInterface, QueryRunner} from 'typeorm';

// export class INIT1583631282885 implements MigrationInterface {
//     // name = 'INIT1583631282885';

//     public async up(queryRunner: QueryRunner): Promise<any> {
//         await queryRunner.query(`CREATE TABLE "locality" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "electorateId" integer, "postcodeId" integer, CONSTRAINT "PK_c0445d9b8706ac2d31be91c9b6b" PRIMARY KEY ("id"))`, undefined);
//         await queryRunner.query(`CREATE INDEX "IDX_874fa5a9394d8b65344cf7c65f" ON "locality" ("name") `, undefined);
//         await queryRunner.query(`CREATE TABLE "postcode" ("id" SERIAL NOT NULL, "code" integer NOT NULL, "electorateId" integer, CONSTRAINT "PK_c19bc9f774c1cf019766a35ca4d" PRIMARY KEY ("id"))`, undefined);
//         await queryRunner.query(`CREATE INDEX "IDX_44fe7ed471d491039531f32b6c" ON "postcode" ("code") `, undefined);
//         await queryRunner.query(`CREATE INDEX "IDX_2ba4a1f98bcdf3c13e63b361ad" ON "postcode" ("electorateId") `, undefined);
//         await queryRunner.query(`CREATE TABLE "member" ("id" SERIAL NOT NULL, "honorific" character varying NOT NULL, "salutation" character varying NOT NULL, "postNominals" character varying NOT NULL, "surname" character varying NOT NULL, "firstname" character varying NOT NULL, "otherName" character varying NOT NULL, "preferredName" character varying NOT NULL, "initials" character varying NOT NULL, "state" character varying NOT NULL, "party" character varying NOT NULL, "gender" character varying NOT NULL, "telephone" character varying NOT NULL, "fax" character varying NOT NULL, "electorateAddressLine1" character varying NOT NULL, "electorateAddressLine2" character varying NOT NULL, "electorateSuburb" character varying NOT NULL, "electorateState" character varying NOT NULL, "electoratePostcode" integer NOT NULL, "electorateTelephone" character varying NOT NULL, "electorateFax" character varying NOT NULL, "electorateTollfree" character varying NOT NULL, "electoratePostalAddress" character varying NOT NULL, "electoratePostalSuburb" character varying NOT NULL, "electoratePostalState" character varying NOT NULL, "electoratePostalPostcode" integer NOT NULL, "parliamentaryTitle" character varying NOT NULL, "ministerialTitle" character varying NOT NULL, "electorateId" integer, CONSTRAINT "REL_2e9ab7248f57428166e0a71433" UNIQUE ("electorateId"), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`, undefined);
//         await queryRunner.query(`CREATE TABLE "electorate" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_fa43e71f4e6d9e94a3e3dbe7aab" PRIMARY KEY ("id"))`, undefined);
//         await queryRunner.query(`CREATE INDEX "IDX_b87a9ad9013d155ce8e13945b3" ON "electorate" ("name") `, undefined);
//         await queryRunner.query(`ALTER TABLE "locality" ADD CONSTRAINT "FK_fe017ca86434a5e636586fbf8f8" FOREIGN KEY ("electorateId") REFERENCES "electorate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
//         await queryRunner.query(`ALTER TABLE "locality" ADD CONSTRAINT "FK_ee656fb36cfa61bb6a95411f99e" FOREIGN KEY ("postcodeId") REFERENCES "postcode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
//         await queryRunner.query(`ALTER TABLE "postcode" ADD CONSTRAINT "FK_2ba4a1f98bcdf3c13e63b361adf" FOREIGN KEY ("electorateId") REFERENCES "electorate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
//         await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_2e9ab7248f57428166e0a714331" FOREIGN KEY ("electorateId") REFERENCES "electorate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
//         console.log('first migration');
//     }

//     public async down(queryRunner: QueryRunner): Promise<any> {
//         await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_2e9ab7248f57428166e0a714331"`, undefined);
//         await queryRunner.query(`ALTER TABLE "postcode" DROP CONSTRAINT "FK_2ba4a1f98bcdf3c13e63b361adf"`, undefined);
//         await queryRunner.query(`ALTER TABLE "locality" DROP CONSTRAINT "FK_ee656fb36cfa61bb6a95411f99e"`, undefined);
//         await queryRunner.query(`ALTER TABLE "locality" DROP CONSTRAINT "FK_fe017ca86434a5e636586fbf8f8"`, undefined);
//         await queryRunner.query(`DROP INDEX "IDX_b87a9ad9013d155ce8e13945b3"`, undefined);
//         await queryRunner.query(`DROP TABLE "electorate"`, undefined);
//         await queryRunner.query(`DROP TABLE "member"`, undefined);
//         await queryRunner.query(`DROP INDEX "IDX_2ba4a1f98bcdf3c13e63b361ad"`, undefined);
//         await queryRunner.query(`DROP INDEX "IDX_44fe7ed471d491039531f32b6c"`, undefined);
//         await queryRunner.query(`DROP TABLE "postcode"`, undefined);
//         await queryRunner.query(`DROP INDEX "IDX_874fa5a9394d8b65344cf7c65f"`, undefined);
//         await queryRunner.query(`DROP TABLE "locality"`, undefined);
//     }

// }
