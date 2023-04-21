export class Room {
  id?: number = 0;
  roomTypeName: string = '';
  name: string = '';
  roomPicture: string = '';
  description: string = '';
  isActive!: boolean
  rating: string = '';
  currentPrice: number = 0;
  discountPrice: number = 0;
  peopleNumber: string = '';
  numberOfBed: string = '';
  starAmount: number = 0;
}

export class addRoom {
  [x: string]: any;
  id?: number = 0;
  roomTypeName: string = '';
  name: string = '';
  roomPicture: string = '';
  description: string = '';
  rating: string = '';
  currentPrice: number = 0;
  discountPrice: number = 0;
  peopleNumber: string = '';
  numberOfBed: string = '';
  starAmount: number = 0;
}
