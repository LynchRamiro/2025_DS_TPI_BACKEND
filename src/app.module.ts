import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { AddressService } from './address/address.service';
import { AddressController } from './address/address.controller';
import { CityController } from './city/city.controller';
import { CityService } from './city/cityId.service';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { RestaurantController } from './restaurant/restaurant.controller';
import { RestaurantService } from './restaurant/restaurant.service';
import { HttpModule } from '@nestjs/axios';


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'mi_base_de_datos',
            username: 'postgres',
            password: 'mipassword',
            synchronize: true,
            entities
        }),
        TypeOrmModule.forFeature(entities),
        HttpModule,],
    controllers: [AppController, AddressController, CityController, LocationController, MenuController, RestaurantController],
    providers: [AppService, AddressService, CityService, LocationService, MenuService, RestaurantService],
})
export class AppModule {}
