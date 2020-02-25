// ルーティング定義ファイル
import { Routes } from '@angular/router';

// ページのコンポーネントをインポート
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { SuccessComponent } from './login/success/success.component';
import { FailedComponent } from './login/failed/failed.component';
import { TryComponent } from './try/try.component';
import { CoilEditComponent } from './coil-edit/coil-edit.component';
import { ReviewComponent } from './review/review.component';
import { HomeComponent } from './home/home.component';
import { DescriptionComponent } from './description/description.component';

// ルーティング定義
export const route: Routes = [
    {
        // /auth
        component: AuthComponent,
        path: 'auth'
    },
    {
        // /auth
        component: DescriptionComponent,
        path: 'description'
    },
    {
        // home
        component: HomeComponent,
        path: 'home',
        //canActivate: [AuthGuard]
    },
    {
        // /try
        component: TryComponent,
        path: 'try/:keyword',
        //canActivate: [AuthGuard]
    },
    {
        // /review
        component: ReviewComponent,
        path: 'review/:missword',
        //canActivate: [AuthGuard]
    },
    {
        //coil-edit
        component: CoilEditComponent,
        path: 'coil-edit',
        //canActivate: [AuthGuard]
    },
    {
        // /loginsuccess
        component: SuccessComponent,
        path: 'login/Success'
    },
    {
        // /loginfailed
        component: FailedComponent,
        path: 'login/Failed',
        // //canActivate: [AuthGuard]
    },


];