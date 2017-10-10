import { Injectable, EventEmitter } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Song} from "./Song";

@Injectable()
export class SpotifyService {
  songsChanged = new EventEmitter<Song[]>();

  private searchUrl:string;
  private artistUrl:string;
  private albumsUrl:string;
  private albumUrl:string;

  constructor(private _http : Http) {}

  searchMusic(str:string, type='artist'){
    this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';
    return this._http.get(this.searchUrl)
      .map(res => res.json());
  }
  getArtist(id:string){
    this.artistUrl = 'https://api.spotify.com/v1/artists/'+id;
    return this._http.get(this.artistUrl)
      .map(res => res.json());
  }
  getAlbums(artistId:string){
    this.albumsUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/albums';
    return this._http.get(this.albumsUrl)
      .map(res => res.json());
  }
  getAlbum(id:string){
    this.albumUrl = 'https://api.spotify.com/v1/albums/'+id;
    return this._http.get(this.albumUrl)
      .map(res => res.json());
  }
  private songs: Song[] = [
    new Song('Eraser', 'Ed Sheeran','https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png'),
    new Song('Castle on the Hill', 'Ed Sheeran','https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png')
  ];
  getSongs(){
    return this.songs;
  }

  getSong(id: number){
    return this.songs[id];
  }

  deleteSong(song: Song){
    this.songs.splice(this.songs.indexOf(song), 1);
  }

  addSong(song: Song){
    this.songs.push(song);
  }

  editSong(oldSong: Song, newSong: Song){
    this.songs[this.songs.indexOf(oldSong)] = newSong;
  }

  storeData(){
    const body = JSON.stringify(this.songs);
    const headers = new Headers({
      'Content-Type' : 'application/json'
    });
    return this._http.put('https://spotify-608a0.firebaseio.com/songs.json', body, {headers: headers});
  }

  fetchData(){
    return this._http.get('https://spotify-608a0.firebaseio.com/songs.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Song[]) => {
          this.songs = data;
          this.songsChanged.emit(this.songs);
        }
      );
  }
}
