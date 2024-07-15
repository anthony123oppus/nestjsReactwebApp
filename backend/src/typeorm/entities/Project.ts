import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'project'})
export class Project {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column({nullable : true})
    link : string

    @Column()
    description : string

    @Column()
    techStack : string

    @Column()
    phoneImage : string

    @Column()
    desktopImage : string

    @Column({type : 'timestamp', default : () => 'CURRENT_TIMESTAMP'})
    createdAt : Date
}