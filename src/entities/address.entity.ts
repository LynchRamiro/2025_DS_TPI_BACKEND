import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";
import { City } from "./city.entity";
import { Location } from "./location.entity";

@Entity('address')
export class Address extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    street:string

    @Column()
    number:string

    @ManyToOne(() => City, (city) => city.address, {nullable: false})
    city: City

    @OneToOne(() => Location, (location) => location.address)
    location: Location

    @OneToOne(() => Restaurant, (restaurant) => restaurant.address, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'restaurant'})
    restaurant: Restaurant
}