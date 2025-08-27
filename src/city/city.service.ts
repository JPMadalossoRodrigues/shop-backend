import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './interfaces/city.entity';
import { Repository } from 'typeorm';
import { createCache } from 'cache-manager';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    const cache = createCache();

    const citiesCache = await cache.get<CityEntity[]>(`${stateId}`);

    if (citiesCache) {
      return citiesCache;
    }

    const cities = this.cityRepository.find({
      where: {
        stateId: stateId,
      },
    });

    await cache.set(`${stateId}`, cities);

    return cities;
  }
}
