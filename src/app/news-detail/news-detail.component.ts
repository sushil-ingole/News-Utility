import { Component, OnInit } from '@angular/core';
import { INewsArticle } from '../Models/INewsArticle';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsService } from '../Services/NewsService/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent implements OnInit {
  newsDetail: INewsArticle | undefined;
  publishedAt!: string;

  constructor(private router: Router, private route: ActivatedRoute, private newsService: NewsService) {}
  ngOnInit(): void {
    if(this.newsService.allNewsArticles?.length) {
      this.route.params.forEach((val: any) => {
        this.publishedAt = val.id;
        this.newsDetail = this.newsService.allNewsArticles?.find(article => article?.publishedAt === this.publishedAt);
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
