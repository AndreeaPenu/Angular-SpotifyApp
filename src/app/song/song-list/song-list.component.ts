import {Component, OnInit, OnDestroy, animate, transition, style, state, trigger} from '@angular/core';
import {SpotifyService} from "../../spotify.service";
import {Song} from "../../Song";
import {Subscription} from "rxjs";

import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
  animations:[
    trigger('jumping', [
      state('normal', style({
        transform: 'translateY(0)'
      })),
      transition('normal => jump',[
        animate('200ms ease-in', style({
          transform:'translateY(-20px)'
        })),
        animate('100ms ease-in', style({
          transform:'translateY(0px)'
        }))
      ])
    ])
  ]

})
export class SongListComponent implements OnInit, OnDestroy{
  state = 'normal';

  songs: Song[] = [];

  constructor(private router: Router, private route: ActivatedRoute,private spotifyService: SpotifyService) {}

  selectedSong: Song;
  private songIndex: number;
  private subscription: Subscription;

  ngOnInit() {
    this.songs = this.spotifyService.getSongs();
    this.spotifyService.songsChanged.subscribe(
      (songs: Song[]) => this.songs = songs
    );

    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.songIndex = params['id'];
        this.selectedSong = this.spotifyService.getSong(this.songIndex);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onJump(){
    this.state == 'normal' ? this.state = 'jump' : this.state = 'normal';
  }


  onFetch(){
    this.spotifyService.fetchData();
  }

  onStore(){
    this.spotifyService.storeData().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }













}
