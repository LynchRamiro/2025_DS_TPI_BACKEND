import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity('location')
export class Location extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column("float")
    lat:number

    @Column("float")
    lng:number

    @OneToOne(() => Address, (address) => address.location, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'address'})
    address: Address
}