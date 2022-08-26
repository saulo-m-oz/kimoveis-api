import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import { Properties } from './properties.entity'

@Entity()
export class Categories{

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({unique: true, nullable: false})
    name: string

    @OneToMany(()=> Properties, (property) => property.category)
    properties: Properties[]
}