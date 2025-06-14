import { Controller, Post, Body, Get, Param, Delete, Put, Patch, Query, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantInput } from './dto';
import { RemoteAuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';

@Controller('restaurant')
export class RestaurantController {
    restaurantService: RestaurantService;
    constructor(restaurantService: RestaurantService) {
        this.restaurantService = restaurantService;
    }
    @UseGuards(RemoteAuthGuard)
    @Permissions(['restaurant_edit'])
    @Post()
    newRestaurant(@Body() restaurant: RestaurantInput){
        //@Body() es un decorador de NestJS que toma los datos enviados
        //en el cuerpo de la solicitud y los convierte en un objeto de tipo RestaurantInput
        //Este objeto de tipo RestaurantInput se guarda en la variable restaurant
        //De este modo, se puede asegurar que los datos enviados en el cuerpo de la solicitud
        //cumplen con la estructura definida en el DTO RestaurantInput.
        return this.restaurantService.newRestaurant(restaurant);
        //Asigna el trabajo al servicio RestaurantService
        //El servicio RestaurantService se encarga de la lógica de negocio
    }
    @Get()
    getAllRestaurants(@Query('page') page: number = 1, @Query('quantity') quantity: number = 10) {
        return this.restaurantService.getAllRestaurants(+page, +quantity);
    }
    @Get(':id')
        getRestaurantById(@Param('id') id: number) {
            return this.restaurantService.getRestaurantById(id);
    }

    @UseGuards(RemoteAuthGuard)
    @Permissions(['restaurant_edit'])
    @Put(':id')
    updateRestaurant(@Param('id') id: number, @Body() restaurant: RestaurantInput) {
        return this.restaurantService.updateRestaurant(id, restaurant);
    }

    @UseGuards(RemoteAuthGuard)
    @Permissions(['restaurant_edit'])
    @Patch(':id')
    partialUpdateRestaurant(@Param('id') id: number, @Body() restaurant: Partial<RestaurantInput>) {
        return this.restaurantService.partialUpdateRestaurant(id, restaurant);
    }

    @UseGuards(RemoteAuthGuard)
    @Permissions(['restaurant_edit'])
    @Delete(':id')
    deleteRestaurant(@Param('id') id: number) {
        return this.restaurantService.deleteRestaurantById(id);
    }
    /*@Get(':id') //sub-endpoint
    //El decorador @Get(':id') indica que este método manejará las solicitudes GET por id
    getRestaurantById(@Param('id') id: number) {
        return this.restaurantService.getRestaurantById(id);
    }*/
    @Get(':id/menu')
    getMenuByRestaurantId(@Param('id') id: number) {
        return this.restaurantService.getMenuByRestaurantId(id);
    }
}