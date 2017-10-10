import {Routes} from "@angular/router";
import {SongEditComponent} from "./song-edit/song-edit.component";
import {SongDetailComponent} from "./song-detail/song-detail.component";


export const SONG_ROUTES: Routes = [ //this are the child routes
  { path: 'new', component: SongEditComponent},
  { path: ':id', component: SongDetailComponent},
  { path: ':id/edit', component: SongEditComponent}
];
