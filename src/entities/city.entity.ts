import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity('city')
export class City extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    name:string

    @OneToMany(() => Address, (address) => address.city)
    address: Address[]
}