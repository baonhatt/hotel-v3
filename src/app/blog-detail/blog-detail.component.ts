import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from '../_service/api.service';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  blogDetail = new Blog;
  constructor(private route: ActivatedRoute, private apiService: ApiService){}

  ngOnInit(): void {

    this.getRoute(this.route.snapshot.params['id']);
  }
  getRoute(id : any) {
    this.apiService.getBlogDetail(id).subscribe((res:any)=>{
      this.blogDetail = res;
    });
  }

}
