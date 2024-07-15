import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Degree1719207496452 implements MigrationInterface {
    private readonly logger = new Logger(Degree1719207496452.name)

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('up')

        const degrees = ['High School Level', 'High School Graduate', 'Vocational School Graduate', 'College Level', 'College Graduate']

        for(const degree of degrees){
            await queryRunner.query(`INSERT INTO degree (degree) VALUES ('${degree}')`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('down')

        const degrees = ['High School Level', 'High School Graduate', 'Vocational School Graduate', 'College Level', 'College Graduate']

        for(const degree of degrees){
            await queryRunner.query(`DELETE FROM degree WHERE degree = '${degree}'`)
        }
    }

}
