import { TypeOrmModule } from "@nestjs/typeorm";
import { Address, City, Restaurant } from "src/entities";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [
      TypeOrmModule.forFeature([Restaurant, Address, Location, City]),
    ],
    controllers: [RestaurantController],
    providers: [RestaurantService],
  })
  export class RestaurantModule {}
