import {Component, OnInit, OnDestroy, trigger, state, style, transition, animate} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Song} from "../../Song";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SpotifyService} from "../../spotify.service";

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css'],
  animations:[
    trigger('shake', [
      state('normal', style({
        transform: 'translateX(0)'
      })),
      transition('normal => move',[
        animate('100ms ease-in', style({
          transform:'translateX(5px)'

        })),
        animate('100ms ease-in', style({
          transform:'translateX(-5px)'

        })),
        animate('100ms ease-in', style({
          transform:'translateX(5px)'

        })),
        animate('100ms ease-in', style({
          transform:'translateX(0px)'
        }))
      ]),
      transition('normal => leave',[
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class SongEditComponent implements OnInit, OnDestroy {

  state = 'normal';
  state2 = 'normal';
  state3 = 'normal';
  songForm: FormGroup;
  private songIndex: number;
  private song: Song;
  private isNew = true;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private spotifyService: SpotifyService,
              private formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.songIndex = +params['id'];
          this.song = this.spotifyService.getSong(this.songIndex);
        } else {
          this.isNew = true;
          this.song = null;
        }
        this.initForm();
      }
    );
  }

  onAnimate(){
    this.state == 'normal' ? this.state = 'move' : this.state = 'normal';
  }
  onAnimate2(){
    this.state2 == 'normal' ? this.state2 = 'move' : this.state2 = 'normal';
  }
  onAnimate3(){
    this.state3 == 'normal' ? this.state3 = 'move' : this.state3= 'normal';
  }


  onSubmit() {
    const newSong = this.songForm.value;
    if (this.isNew) {
      this.spotifyService.addSong(newSong);
    } else {
      this.spotifyService.editSong(this.song, newSong);
    }
    this.router.navigate(['/songs']);
  }

  onCancel() {
    this.router.navigate(['/songs']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    let songName = '';
    let songImageUrl = '';
    let songArtist = '';
    if (!this.isNew) {
      songName = this.song.name;
      songImageUrl = this.song.imagePath;
      songArtist = this.song.artist;
    }
    this.songForm = this.formBuilder.group({
      name: [songName, Validators.required],
      imagePath: [songImageUrl, Validators.required],
      artist: [songArtist, Validators.required]
    });
  }
}
