import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Properties } from './properties.entity'
import { Users } from './users.entity'

@Entity("schedules_users_properties")
export class Schedules{

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({type: "date", nullable: false})
    date: string

    @Column("time",{nullable: false})
    hour: string

    @ManyToOne(() => Users, {eager: true})
    user: Users

    @ManyToOne(() => Properties)
    property: Properties

}