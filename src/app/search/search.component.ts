import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { Artist } from '../Artist';

@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  constructor(private _spotifyService:SpotifyService) {}

  ngOnInit() {}

  searchStr:string;
  searchRes:Artist[];
  searchMusic(){
    this._spotifyService.searchMusic(this.searchStr)
      .subscribe(res => {
        this.searchRes = res.artists.items;
      })
  }

}
