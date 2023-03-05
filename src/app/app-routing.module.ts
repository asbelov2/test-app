import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { PostScreenComponent } from './pages/post-screen/post-screen.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'post', component: PostScreenComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
