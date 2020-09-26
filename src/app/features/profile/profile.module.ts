import { FormsModule } from '@Angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [ProfileComponent, ShowComponent, EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
