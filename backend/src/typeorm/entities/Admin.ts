import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { DevInfo } from "./DevInfo";

@Entity({name : 'admin'})
export class AdminAccount {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    username : string

    @Column()
    password : string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt : Date

    @OneToOne(() => DevInfo)
    @JoinColumn()
    devInfo : DevInfo

}