import {Component, OnInit, Input} from '@angular/core';
import {Song} from "../../Song";

@Component({
  selector: 'app-song-item',
  templateUrl: 'song-item.component.html'
})
export class SongItemComponent implements OnInit {

  @Input() song: Song;
  @Input() songId: number;

  constructor() { }

  ngOnInit() {
  }


}
