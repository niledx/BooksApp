import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { AuthGuard } from './../../core/guards/auth.guard';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    children: [
      {
        path: 'show',
        component: ShowComponent
      },
      {
        path: 'edit',
        component: EditComponent
      },
      {
        path: '',
        redirectTo: 'show',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'show'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
