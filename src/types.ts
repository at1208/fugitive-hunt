export interface City {
  id: string;
  name: string;
  distance: number;
}

export interface Vehicle {
  id: string;
  kind: string;
  range: number;
  count: number;
}

export interface Cop {
  id: string;
  name: string;
  city: City;
  vehicle: Vehicle;
}
