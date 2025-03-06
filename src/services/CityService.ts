import { CityRepository } from "../repositories/CityRepository";
import { CitySchema, CitiesSchema, CityType } from "../validators/validation";

export class CityService {
  static async listCities(): Promise<CityType[]> {
    const cities = await CityRepository.getAllCities();
    return CitiesSchema.parse(cities);
  }

  static async createCity(cityData: any): Promise<CityType> {
    if (await CityRepository.getCityByName(cityData.name)) {
      throw new Error("City with this name already exists.");
    }
    const city = await CityRepository.createCity(cityData);
    return CitySchema.parse(city);
  }
}
