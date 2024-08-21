import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { INewsArticle } from '../../Models/INewsArticle';
import { IDateCapture } from '../../Models/IDateCapture';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'd6255252a3334fc8bd1aa6116003c070';
  private baseUrl = `https://newsapi.org/v2/everything?q=technology&apiKey=${this.apiKey}`;
  allNewsArticles!: INewsArticle[];

  constructor(private http: HttpClient) {}

  getNews(page: number, date?: IDateCapture | null): Observable<any> {
    if(date) {
      return this.http.get<any>(`${this.baseUrl}&page=${page}&from=${date.from}&to=${date.to}`).pipe(
        catchError(error => {
          return throwError(() => new Error(error.error.message || 'Server Error'));
        })
      );  
    }
    return this.http.get<any>(`${this.baseUrl}&page=${page}`).pipe(
      catchError(error => {
        return throwError(() => new Error(error.error.message || 'Server Error'));
      })
    );
  }
}
