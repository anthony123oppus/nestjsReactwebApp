import { MigrationInterface, QueryRunner } from "typeorm";
import { hashPassword } from "../utils/hash.util";
import { Logger } from "@nestjs/common";

export class AnthonyAccount1716103808774 implements MigrationInterface {
    private readonly logger = new Logger(AnthonyAccount1716103808774.name)

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Up')

        const password = '@Anthony_123';
        const hashedPassword = await hashPassword(password);

        await queryRunner.query(`INSERT INTO admin (username, password) VALUES ('anthonyoppus2000@gmail.com', '${hashedPassword}')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Down')
    }

}
