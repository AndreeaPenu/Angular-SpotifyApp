import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import {SongComponent} from "./song/song.component";
import {SONG_ROUTES} from "./song/song.routes";

const APP_ROUTES: Routes = [
  { path:'', component: SearchComponent},
  { path:'about', component: AboutComponent},
  { path:'artist/:id', component:ArtistComponent},
  { path:'album/:id', component:AlbumComponent},
  { path: 'songs', component:SongComponent, children: SONG_ROUTES},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
