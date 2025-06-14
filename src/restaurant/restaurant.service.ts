import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { Address } from '../entities/address.entity';
import { Location } from '../entities/location.entity';
import { City } from '../entities/city.entity';
import { MenuOutput, RestaurantInput, RestaurantResponse } from './dto';
import { Menu } from 'src/entities';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
    @InjectRepository(Address)
    private addressRepo: Repository<Address>,
    @InjectRepository(Location)
    private locationRepo: Repository<Location>,
    @InjectRepository(City)
    private cityRepo: Repository<City>,
    @InjectRepository(Menu)
    private menuRepo: Repository<Menu>,
  ) {}
  /*
export class RestaurantService {
  private restaurantRepo: Repository<Restaurant>;
  private addressRepo: Repository<Address>;
  private locationRepo: Repository<Location>;
  private cityRepo: Repository<CityId>;

  constructor(
    @InjectRepository(Restaurant) restaurantRepo: Repository<Restaurant>,
    @InjectRepository(Address) addressRepo: Repository<Address>,
    @InjectRepository(Location) locationRepo: Repository<Location>,
    @InjectRepository(CityId) cityRepo: Repository<CityId>,
  ) {
    this.restaurantRepo = restaurantRepo;
    this.addressRepo = addressRepo;
    this.locationRepo = locationRepo;
    this.cityRepo = cityRepo;
  }
}
*/

  
    async newRestaurant(datos: RestaurantInput): Promise<RestaurantResponse> {
        const constCity = await this.cityRepo.findOne({ where: { id: datos.address.cityId } });
        if (!constCity) throw new Error('404 City not found.');

        const constRestaurant = this.restaurantRepo.create({
            name: datos.name,
            imageUrl: datos.imageUrl
        });
        await this.restaurantRepo.save(constRestaurant);

        const constAddress = this.addressRepo.create({
            street: datos.address.street,
            number: datos.address.number,
            city: constCity,
            restaurant: constRestaurant
        });
        await this.addressRepo.save(constAddress);

        const constLocation = this.locationRepo.create({
            lat: datos.address.location.lat,
            lng: datos.address.location.lng,
            address: constAddress});
        await this.locationRepo.save(constLocation);
        
        const response: RestaurantResponse = {
            "id": constRestaurant.id,
            "name": constRestaurant.name,
            "address": {
                "street": constAddress.street,
                "number": constAddress.number,
                "cityId": constCity.id,
                "location": {
                    "lat": constLocation.lat,
                    "lng": constLocation.lng,
                },
            },
            "imageUrl": constRestaurant.imageUrl
        };
        return response;
        //24 async permite definir una función asincrónica (que puede esperar a que se resuelva una promesa)
        //24 Promise<Restaurant> es el tipo de dato que se espera que devuelva la función
        //24 una promesa representa una operación asincrónica que puede completarse en el futuro
        //25 await permite esperar a que se resuelva una promesa (en este caso, se espera a que se resuelva la búsqueda de la ciudad)
        //26 throw permite lanzar un error manualmente
        //28 crea la instancia de la entidad location
        //29 guarda la instancia de la entidad location en la base de datos
    }
  
    async getAllRestaurants(page: number = 1, quantity: number = 10): Promise<RestaurantResponse[]> {
        const skip = (page - 1) * quantity;
        const constRestaurants = await this.restaurantRepo.find({
        relations: {
            address: {
            city: true,
            location: true,
            },
        },
        skip,
        take: quantity,
    });
    // tambien puede ser relations: ['address', 'address.cityId', 'address.location']
        return constRestaurants.map((restaurant) => ({
            id: restaurant.id,
            name: restaurant.name,
            address: {
                street: restaurant.address.street,
                number: restaurant.address.number,
                cityId: restaurant.address.city.id,
                location: {
                    lat: restaurant.address.location.lat,
                    lng: restaurant.address.location.lng,
                },
            },
            imageUrl: restaurant.imageUrl,
        }));
    }

    async getRestaurantById(id: number): Promise<RestaurantResponse> {
        const constRestaurant = await this.restaurantRepo.findOne({
            where: { id },
            relations: {
                address: {
                    city: true,
                    location: true,
                },
            },
        });
        if (!constRestaurant) throw new Error('404 Restaurant not found.');
        return {
            id: constRestaurant.id,
            name: constRestaurant.name,
            address: {
                street: constRestaurant.address.street,
                number: constRestaurant.address.number,
                cityId: constRestaurant.address.city.id,
                location: {
                    lat: constRestaurant.address.location.lat,
                    lng: constRestaurant.address.location.lng,
                },
            },
            imageUrl: constRestaurant.imageUrl,
        };
    }

    async updateRestaurant(id: number, datos: RestaurantInput): Promise<RestaurantResponse> {
        const constRestaurant = await this.restaurantRepo.findOne({ where: { id } });
        if (!constRestaurant) throw new Error('404 Restaurant not found.');
        const constCity = await this.cityRepo.findOne({ where: { id: datos.address.cityId } });
        if (!constCity) throw new Error('404 City not found.');
        const constAddress = await this.addressRepo.findOne({ where: { restaurant: { id } } });
        if (!constAddress) throw new Error('404 Address not found.');
        const constLocation = await this.locationRepo.findOne({ where: { address: { id: constAddress.id } } });
        if (!constLocation) throw new Error('404 Location not found.');
        constRestaurant.name = datos.name;
        constRestaurant.imageUrl = datos.imageUrl;
        constAddress.street = datos.address.street;
        constAddress.number = datos.address.number;
        constAddress.city = constCity;
        constLocation.lat = datos.address.location.lat;
        constLocation.lng = datos.address.location.lng;
        await this.restaurantRepo.save(constRestaurant);
        await this.addressRepo.save(constAddress);
        await this.locationRepo.save(constLocation);
        const response: RestaurantResponse = {
            id: constRestaurant.id,
            name: constRestaurant.name,
            address: {
                street: constAddress.street,
                number: constAddress.number,
                cityId: constCity.id,
                location: {
                    lat: constLocation.lat,
                    lng: constLocation.lng,
                },
            },
            imageUrl: constRestaurant.imageUrl,
        };
        return response;
    }

    async partialUpdateRestaurant(id: number, datos: Partial<RestaurantInput>): Promise<RestaurantResponse> {
        const constRestaurant = await this.restaurantRepo.findOne({ where: { id } });
        if (!constRestaurant) throw new Error('404 Restaurant not found.');
        const constAddress = await this.addressRepo.findOne({ where: { restaurant: { id } } });
        if (!constAddress) throw new Error('404 Address not found.');
        const constLocation = await this.locationRepo.findOne({ where: { address: { id: constAddress.id } } });
        if (!constLocation) throw new Error('404 Location not found.');
        if (datos.name) constRestaurant.name = datos.name;
        if (datos.imageUrl) constRestaurant.imageUrl = datos.imageUrl;
        await this.restaurantRepo.save(constRestaurant);
        if (datos.address) {    
            if (datos.address.cityId){
                const constCity = await this.cityRepo.findOne({ where: { id: datos.address.cityId } });
                if (!constCity) throw new Error('404 City not found.');
                constAddress.city = constCity;
            }
            if (datos.address.street) constAddress.street = datos.address.street;
            if (datos.address.number) constAddress.number = datos.address.number;
            if (datos.address.location) {
                if (datos.address.location.lat) constLocation.lat = datos.address.location.lat;
                if (datos.address.location.lng) constLocation.lng = datos.address.location.lng;
                await this.locationRepo.save(constLocation);
            }
            await this.addressRepo.save(constAddress);
        }
        const updatedRestaurant = await this.restaurantRepo.findOne({
            where: { id },
            relations: {
                address: {
                    city: true,
                    location: true,
                },
            },
        });
        if (!updatedRestaurant) throw new Error('404 Restaurant not found after update.');
        const response: RestaurantResponse = {
            id: updatedRestaurant.id,
            name: updatedRestaurant.name,
            address: {
                street: updatedRestaurant.address.street,
                number: updatedRestaurant.address.number,
                cityId: updatedRestaurant.address.city.id,
                location: {
                    lat: updatedRestaurant.address.location.lat,
                    lng: updatedRestaurant.address.location.lng,
                },
            },
            imageUrl: updatedRestaurant.imageUrl,
        };
        return response;
    }

    async deleteRestaurantById(id: number): Promise<{message: string}> {
        const constRestaurant = await this.restaurantRepo.findOne({ where: { id } });
        if (!constRestaurant) throw new Error('404 Restaurant not found.');
        await this.restaurantRepo.remove(constRestaurant);
        return { message: 'Deleted' };
    }
    
    async getMenuByRestaurantId(restaurantId: number): Promise<MenuOutput[]> {
        const constMenu = await this.menuRepo.find({where: { restaurant: { id: restaurantId } },
            relations: ['restaurant'],
        });
        return constMenu.map(menu => ({
            id: menu.id,
            restaurantId: menu.restaurant.id,
            name: menu.name,
            description: menu.description,
            price: menu.price,
            imageUrl: menu.imageUrl
        }));
    }
}
