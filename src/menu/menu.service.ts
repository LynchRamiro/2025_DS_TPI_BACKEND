import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu, Restaurant } from 'src/entities';
import { DeepPartial, Repository } from 'typeorm';
import { MenuInput, MenuResponse } from './dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private menuRepo: Repository<Menu>,
        @InjectRepository(Restaurant)
        private restaurantRepo: Repository<Restaurant>,
    ) {}
    async newMenu(datos: MenuInput): Promise<MenuResponse> {
        const constRestaurant = await this.restaurantRepo.findOne({ where: { id: datos.restaurantId } });
        if (!constRestaurant) throw new Error('404 City not found.');
        const constMenu = this.menuRepo.create({
            restaurant: constRestaurant,
            name: datos.name,
            description: datos.description,
            price: datos.price,
            imageUrl: datos.imageUrl,
        });
        await this.menuRepo.save(constMenu);
        const response: MenuResponse = {
            "id": constMenu.id,
            "restaurantId": constMenu.restaurant.id,
            "name": constMenu.name,
            "description": constMenu.description,
            "price": constMenu.price,
            "imageUrl": constMenu.imageUrl,
        };
        return response;
    }
    async getAllMenu(page: number, quantity: number): Promise<MenuResponse[]> {
        const skip = (page - 1) * quantity;
        const constMenues = await this.menuRepo.find({
            relations: {
                restaurant: true,
            },
            skip,
            take: quantity,
        });
        return constMenues.map((menu) => ({
            id: menu.id,
            restaurantId: menu.restaurant.id,
            name: menu.name,
            description: menu.description,
            price: menu.price,
            imageUrl: menu.imageUrl,
        }));
    }
    async getMenuById(id: number): Promise<MenuResponse> {
        const constMenu = await this.menuRepo.findOne({
            where: { id },
            relations: {
                restaurant: true,
            },
        });
        if (!constMenu) throw new Error('404 Menu not found.');
        return {
            id: constMenu.id,
            restaurantId: constMenu.restaurant.id,
            name: constMenu.name,
            description: constMenu.description,
            price: constMenu.price,
            imageUrl: constMenu.imageUrl,
        };
    }

    async updateMenu(id: number, datos: MenuInput): Promise<MenuResponse> {
        const constMenu = await this.menuRepo.findOne({ where: { id } });
        if (!constMenu) throw new Error('404 Menu not found.');
        const constRestaurant = await this.restaurantRepo.findOne({ where: { id: datos.restaurantId } });
        if (!constRestaurant) throw new Error('404 City not found.');
        constMenu.restaurant = constRestaurant;
        constMenu.name = datos.name;
        constMenu.description = datos.description;
        constMenu.price = datos.price;
        constMenu.imageUrl = datos.imageUrl;
        await this.menuRepo.save(constMenu);
        const response: MenuResponse = {
            id: constMenu.id,
            restaurantId: constMenu.restaurant.id,
            name: constMenu.name,
            description: constMenu.description,
            price: constMenu.price,
            imageUrl: constMenu.imageUrl,
        };
        return response;
    }

    async partialUpdateMenu(id: number, datos: Partial<MenuInput>): Promise<MenuResponse> {
        const constMenu = await this.menuRepo.findOne({ where: { id } });
        if (!constMenu) throw new Error('404 Menu not found.');
        if (datos.restaurantId) {
            const constRestaurant = await this.restaurantRepo.findOne({ where: { id: datos.restaurantId } });
            if (!constRestaurant) throw new Error('404 City not found.');
            constMenu.restaurant = constRestaurant;
        }
        if (datos.name) constMenu.name = datos.name;
        if (datos.description) constMenu.description = datos.description;
        if (datos.price) constMenu.price = datos.price;
        if (datos.imageUrl) constMenu.imageUrl = datos.imageUrl;
        await this.menuRepo.save(constMenu);
        const updatedMenu = await this.menuRepo.findOne({ where: { id }, relations: { restaurant: true } });
        if (!updatedMenu) throw new Error('404 Menu not found after update.');

        const response: MenuResponse = {
            id: updatedMenu.id,
            restaurantId: updatedMenu.restaurant.id,
            name: updatedMenu.name,
            description: updatedMenu.description,
            price: updatedMenu.price,
            imageUrl: updatedMenu.imageUrl,
        };
        return response;
    }

    async deleteMenuById(id: number): Promise<{ message: string }> {
        const constMenu = await this.menuRepo.findOne({ where: { id } });
        if (!constMenu) throw new Error('404 Menu not found.');
        await this.menuRepo.remove(constMenu);
        return { message: 'Deleted' };
    }
}