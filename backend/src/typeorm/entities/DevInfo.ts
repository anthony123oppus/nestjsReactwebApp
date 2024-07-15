import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'dev_info'})
export class DevInfo {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    firstName : string

    @Column()
    middleName : string

    @Column()
    lastName : string

    @Column()
    age : number

    @Column()
    birthDate : Date

    @Column()
    gender : string

    @Column()
    devMotto : string

    @Column()
    devImage : string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt : Date
}