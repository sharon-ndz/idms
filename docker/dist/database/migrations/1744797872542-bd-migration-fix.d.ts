import { MigrationInterface, QueryRunner } from "typeorm";
export declare class BdMigrationFix1744797872542 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
