import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog.model';
import { ApiService } from '../_service/api.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs: Blog[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit(): void {

    this.getBlogs();
  }
  getBlogs(){
    this.apiService.getBlogs().subscribe((res: any)=>{
      this.blogs = res;
    })
  }
}
