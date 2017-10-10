import {Component, OnInit, OnDestroy, trigger, state, style, animate, transition} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {Song} from "../../Song";
import {SpotifyService} from "../../spotify.service";



@Component({
  selector: 'app-song-detail',
  templateUrl: 'song-detail.component.html',
  animations: [
    trigger('flyIn', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ])
    ])
  ]
})
export class SongDetailComponent implements OnInit, OnDestroy {

  state;
  private subscription: Subscription; //we need this to unsubscribe
  private songIndex: number;
  selectedSong: Song;

  constructor(
              private route: ActivatedRoute,
              private spotifyService: SpotifyService,
              private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.songIndex = params['id'];
        this.selectedSong = this.spotifyService.getSong(this.songIndex);

      }
    );
  }

  onEdit(){
    this.router.navigate(['/songs' , this.songIndex , 'edit']); //navigating there when clicking the button

  }

  onDelete(){
    this.spotifyService.deleteSong(this.selectedSong); //this will remove it from the array
    this.router.navigate(['/songs']); //navigate away (because it is deleted)
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  flyIn(){
    this.state = 'in';
  }

}
