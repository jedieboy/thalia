import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {AngularFireModule} from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { FileUploadModule } from 'ng2-file-upload';


import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { FooterComponent } from './footer/footer.component';
import { StoryComponent } from './story/story.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { SharedDirective } from './main-directive.directive';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [    
    AppComponent,    
    HomeComponent,
    AboutComponent,
    // GalleryComponent,
    YoutubeComponent,
    SanitizeHtmlPipe,
    FooterComponent,
    StoryComponent,
    AdminComponent,
    SharedDirective,
    NavigationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    YouTubePlayerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    FileUploadModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
      preventDuplicates: true,
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

