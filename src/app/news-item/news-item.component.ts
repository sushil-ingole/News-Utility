import { Component, Input } from '@angular/core';
import { INewsArticle } from '../Models/INewsArticle';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-item',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './news-item.component.html',
  styleUrl: './news-item.component.scss'
})
export class NewsItemComponent {
  @Input() newsDetail!: INewsArticle;
}
