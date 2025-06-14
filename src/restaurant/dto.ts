export class RestaurantInput {
  name: string;
  address: {
    street: string,
    number: string,
    cityId: number,
    location: {
        lat: number,
        lng: number
      }
    };
    imageUrl: string
}
export class RestaurantResponse {
  id: number;
  name: string;
  imageUrl: string;
  address: {
    street: string;
    number: string;
    cityId: number;
    location: {
      lat: number;
      lng: number;
    };
  };
}
export class MenuInput {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
export class MenuOutput {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
export class MenuPut {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
