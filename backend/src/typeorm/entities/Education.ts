import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { Degree } from "./Degree";

@Entity({name : 'education'})
export class Education {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    schoolName : string

    @Column()
    course : string

    @Column()
    monthGraduated : string

    @Column()
    yearGraduated : string

    @Column()
    schoolAddress : string

    @Column()
    schoolImage : string

    @Column({type : 'timestamp', default : () => 'CURRENT_TIMESTAMP' })
    createdAt : Date

    @ManyToOne(() => Degree)
    degree : Degree
}