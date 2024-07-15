import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'skill'})
export class Skill{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    level : string

    @Column('float')
    yrsExperience : number

    @Column()
    image : string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt : Date
}