import { Component, OnDestroy } from '@angular/core';
import { NewsService } from '../Services/NewsService/news.service';
import { CommonModule } from '@angular/common';
import { INewsArticle } from '../Models/INewsArticle';
import { NewsItemComponent } from '../news-item/news-item.component';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { IDateCapture } from '../Models/IDateCapture';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [NewsItemComponent, CommonModule, FormsModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent implements OnDestroy {
  allNews: INewsArticle[] = [];
  page = 1;
  errorMsg: string = '';
  newsSubscription!: Subscription;
  fromDate: string | null = null;
  toDate: string | null = null;
  filteredNewsList: INewsArticle[] = [];

  constructor(private newsService: NewsService) {}
  
  ngOnInit(): void {
    this.fetchNews();
  }
  
  fetchNews(fetchLatestData = false, dateRange?: {from: string, to: string}): void {
    if(this.newsService.allNewsArticles?.length && !fetchLatestData) {
      this.allNews = this.newsService.allNewsArticles;
    } else {
      const date: {from: string, to: string} | undefined = dateRange;
      this.newsSubscription = this.newsService.getNews(this.page, date).subscribe({
        next: (data: any) => {
          this.allNews = this.filteredNewsList = data.articles;
          this.newsService.allNewsArticles = this.allNews;
        },
        error: (error: any) => {
          this.errorMsg = error;
        }
      });
    }
  }
  
  onPrevious(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchNews(true);
    }
  }
  
  onNext(): void {
    this.page++;
    this.fetchNews(true);
  }

  onSearch(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    if(event.key === "Backspace" || event.key === "Delete") {
      this.filteredNewsList = this.allNews;  
      return;
    }
    this.filteredNewsList = this.allNews.filter((news: INewsArticle) => news.title?.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase()));
  }

  isDateFilterEnabled(): boolean {
    return this.fromDate !== null && this.toDate !== null;
  }

  filterByDate(): void {
    if (this.isDateFilterEnabled()) {
      const dateRange: IDateCapture = {
        from: this.fromDate ?? "",
        to: this.toDate ?? ""
      };
      this.fetchNews(true, dateRange);
      console.log('Filtering news from', this.fromDate, 'to', this.toDate);
    }
  }

  ngOnDestroy(): void {
    this.newsSubscription?.unsubscribe();
  }
}
