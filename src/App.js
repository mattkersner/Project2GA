import React, { Component } from 'react';
import Input from './components/Input';
import Song from './components/Song';
import Playlist from './components/Playlist';
import InputPlaylistName from './components/InputPlaylistName';
import axios from 'axios';
import logo from './music.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      playlists: {},
      playlistName: null,
    }
    this.getSongs = this.getSongs.bind(this);
    this.addSong = this.addSong.bind(this);
    this.getName = this.getName.bind(this);
    this.getSongInfo = this.getSongInfo.bind(this);
    this.editName = this.editName.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
  }

  componentDidMount() {
    this.getName();
    this.getSongs();
  }

  getSongs() {
    axios.get('https://music-playlist-app-4acd6.firebaseio.com/playlists/songs.json')
    .then((res) => {
      console.log(res);
      this.setState({
        playlists: res.data
      })
    })
  }

  getName() {
    axios.get('https://music-playlist-app-4acd6.firebaseio.com/playlists/playlistName.json')
    .then((res) => {
      this.setState({
        playlistName: res.data.name,
      })
    })
  }

  editName(name) {
    axios({
      method: 'PATCH',
      url: `https://music-playlist-app-4acd6.firebaseio.com/playlists/playlistName.json`,
      data: {
        name: name,
      }
    }).then((res) => {
      console.log(res);
      this.setState({
        playlistName: res.data.name
      })
    })
  }

  deletePlaylist() {
    axios.delete(`https://music-playlist-app-4acd6.firebaseio.com/playlists/.json`)
    .then((res) => {
      this.setState({
        playlistName: null,
      })
    })
  }

  getSongInfo(artist) {
    axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
    }).then((res) => {
      console.log(res.data.artists);
      this.setState({
        artistName: res.data.artists.items[0].name,
        genre: res.data.artists.items[0].genres[0],
        genre2: res.data.artists.items[0].genres[1],
        genre3: res.data.artists.items[0].genres[2],
        image: res.data.artists.items[0].images[0].url,
        spotifyLink: res.data.artists.items[0].external_urls.spotify,
        followers: res.data.artists.items[0].followers.total,
        popularity: res.data.artists.items[0].popularity
      })
    })
  }

  addSong() {
    if (this.state.playlists) {
      let playlist = Object.keys(this.state.playlists)
      .reverse()
      .map((key, i) => {
        return (
            <Song
              key={key}
              getSongs={this.getSongs}
              uniquePostCode={key}
              playlists={this.state.playlists}
              getSongInfo={this.getSongInfo} />
        )
      })
    return playlist;
    }
  }

  renderSongInfo() {
    if (this.state.spotifyLink) {
      return (
        <div className="songInfo">
          <h1>{this.state.artistName}</h1>
          <p>Followers on Spotify: {this.state.followers}</p>
          <p>Popularity on Spotify: {this.state.popularity}%</p>
          <a href={this.state.spotifyLink}>Spotify Link</a>
          <ul> Genre:
            <li>{this.state.genre}</li>
            <li>{this.state.genre2}</li>
            <li>{this.state.genre3}</li>
          </ul>
          <img src={this.state.image} alt="album cover art" />
        </div>
      )
    }
  }

  render() {
    if (this.state.playlistName === null) {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Create a New Playlist</h2>
          </div>
          <InputPlaylistName
            getName={this.getName} />
        </div>
      );
      } else {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Create a New Playlist</h2>
            </div>
            <Input getSongs={this.getSongs}  />
            <div className="flexPlaylist">
            <Playlist
              addSong={this.addSong}
              editName={this.editName}
              deletePlaylist={this.deletePlaylist}
              playlistName={this.state.playlistName} />
             {this.renderSongInfo()}
            </div>
          </div>
        );
      }
  }
}

export default App;
