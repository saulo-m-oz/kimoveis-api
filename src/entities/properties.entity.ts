import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Addresses } from './addresses.entity'
import { Categories } from './categories.entity'
import { Schedules } from './schedules.entity'

@Entity()
export class Properties{

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({default: false})
    sold: boolean

    @Column("decimal", {precision: 12, scale: 2})
    value: number

    @Column("int")
    size: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Schedules, schedule => schedule.property)
    schedules: Schedules[]

    @ManyToOne(() => Categories, (category) => category.properties)
    category: Categories

    @OneToOne(() => Addresses)@JoinColumn()
    address: Addresses

}