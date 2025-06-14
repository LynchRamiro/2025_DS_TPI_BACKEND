import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './cityId.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  create(@Body() body: { name: string }) {
    return this.cityService.createCity(body.name);
  }

  @Get()
  findAll() {
    return this.cityService.getAllCities();
  }
}
