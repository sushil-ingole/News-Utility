import { Routes } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: NewsListComponent
    },
    {
        path: 'news-detail/:id',
        component: NewsDetailComponent
    }
];
