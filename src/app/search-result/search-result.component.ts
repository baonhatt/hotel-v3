import { Component, OnInit } from '@angular/core';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
interface RoomType {
  id: number;
  typeName: string;
  maxPerson: number;

}


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit{
  rooms!: Room[];
  constructor( private roomService: ApiService,
    private router: Router,
    private api: ApiService){
  }
  ngOnInit(): void {
    if(this.rooms == null)
    {
      this.getRooms();
    }
  }
  getRooms(){
    this.roomService.getRooms().subscribe((res: any)=>{
      this.rooms = res;
    })
  }
}
