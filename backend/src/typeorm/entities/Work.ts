import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum EmploymentStatus {
    PRESENT = 'Present',
    NOT_PRESENT = 'Not Present'
}

@Entity({name : 'workExperience'})
export class WorkExperience{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyName : string

    @Column()
    jobTitle : string

    @Column()
    employmentType : string

    @Column()
    startMonth : string

    @Column()
    startYear : string

    @Column({
        type: 'enum',
        enum: EmploymentStatus,
        default: EmploymentStatus.NOT_PRESENT
    })
    untilPresent: string;

    @Column({nullable : true})
    endMonth : string

    @Column({nullable : true})
    endYear : string

    @Column()
    jobDescription : string

    @Column('float')
    monthlySalary : number

    @Column({type : 'timestamp', default : () => 'CURRENT_TIMESTAMP'})
    createdAt : Date
}