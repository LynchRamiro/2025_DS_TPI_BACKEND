import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity('menu')
export class Menu extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    name:string

    @Column('text')
    description:string

    @Column()
    price:number

    @Column()
    imageUrl:string

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'restaurant'})
    restaurant: Restaurant
}