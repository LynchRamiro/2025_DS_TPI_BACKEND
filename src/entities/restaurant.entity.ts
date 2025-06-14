import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Menu } from "./menu.entity";

@Entity('restaurant')
export class Restaurant extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    name:string

    @Column({nullable: false})
    imageUrl:string

    @OneToOne(() => Address, (address) => address.restaurant, {nullable: false})
    address: Address
    //Esta column es la relacion con address
    //El tipo de relación se especifica en la @
    //() => Address indica que la entidad con la que se relacionará es Address
    //(address) => address.restaurant indica con qué propiedad de la entidad Address se relacionará
    //JoinColumn indica que en esta columna va la clave foránea en la tabla Address
    //address este es el nombre de la propiedad en la entidad Restaurant

    @OneToMany(() => Menu, (menu) => menu.restaurant)
    menu: Menu[]
    static id: any;
}