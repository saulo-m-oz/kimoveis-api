import { Exclude } from 'class-transformer'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Schedules } from './schedules.entity'


@Entity()
export class Users{

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    isAdm: boolean

    @Column({default:  true})
    isActive: boolean

    @Column()
    @Exclude()
    password: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Schedules, schedule => schedule.user)
    schedule: Schedules[]
}