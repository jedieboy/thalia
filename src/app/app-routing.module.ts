import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { StoryComponent } from './story/story.component';
import { YoutubeComponent } from './youtube/youtube.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'story',
    component: HomeComponent
  },
  {
    path: 'youtube',
     component: HomeComponent
  },
  {
    path: 'about',
     component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
