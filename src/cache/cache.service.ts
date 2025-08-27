import { Injectable } from '@nestjs/common';
import { createCache } from 'cache-manager';

@Injectable()
export class CacheService {
  async getCache<T>(key: string, request: () => Promise<T>): Promise<T> {
    const cache = createCache();

    const allData = await cache.get<T>(key);

    if (allData) {
      return allData;
    }

    const data: Promise<T> = request();

    await cache.set(key, data);

    return data;
  }
}
