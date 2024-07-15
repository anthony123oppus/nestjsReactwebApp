import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'degree'})
export class Degree {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    degree : string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt : Date
}