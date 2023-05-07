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
  roomNumber: number = 0;
}

export class addRoom {
  NumberOfBed: number = 0;
  RoomPicture: string = '';
  RoomPictures: string = '';
  RoomNumber: string = '';
  Name: string = '';
  IsActive: string = '';
  RoomTypeId: string = '';
  CurrentPrice: string = '';
  PeopleNumber: string = '';
  Description: string = '';
}
