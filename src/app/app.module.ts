import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';

import { routing } from './app.routing';
import { SearchComponent } from './search/search.component';

import { SpotifyService } from './spotify.service';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { SongComponent } from './song/song.component';
import { SongItemComponent } from './song/song-list/song-item.component';
import { SongListComponent } from './song/song-list/song-list.component';
import { SongEditComponent } from './song/song-edit/song-edit.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    SearchComponent,
    ArtistComponent,
    AlbumComponent,
    SongComponent,
    SongItemComponent,
    SongListComponent,
    SongEditComponent,
    SongDetailComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
