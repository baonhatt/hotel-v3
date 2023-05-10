import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service/api.service';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-blog-newest',
  templateUrl: './blog-newest.component.html',
  styleUrls: ['./blog-newest.component.scss']
})
export class BlogNewestComponent implements OnInit{
  blogs!: Blog[];
  blogtoDisplay!: Blog[];
  constructor(
    private apiService: ApiService
  ){

  }
  ngOnInit(): void {
    this.apiService.getNewestBlog().subscribe((res: any) => {

      this.blogtoDisplay = res
    });
  }

  navigateToPage(url: string) {
    window.location.href = url;
    window.scrollTo(0, 0);
  }
}
