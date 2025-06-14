import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepo: Repository<City>,
  ) {}

  async createCity(name: string) {
    const city = this.cityRepo.create({ name });
    return await this.cityRepo.save(city);
  }

  async getAllCities() {
    return this.cityRepo.find();
  }
}
