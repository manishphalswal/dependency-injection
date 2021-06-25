import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ParentComponent } from './components/parent/parent.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { UsersComponent } from './components/users/users.component';
import { UsersResolveGuard } from './guards/dataresolve/users-resolve.guard';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "users", component: UsersComponent, pathMatch: "prefix", 
  resolve: { users: UsersResolveGuard},
  children: [
    {path: ":id", component: UserDetailComponent}
    //, {path: "", component: PlaceholderComponent}
  ] },
  { path: "parent", component: ParentComponent },
  { path: "**", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UsersResolveGuard]
})
export class AppRoutingModule { }
