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
      console.log(res.data.name);
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

  getSongInfo(artist) {
    axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
    }).then((res) => {
      console.log(res.data.artists);
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

  // setPlaylistName(name) {
  //   this.setState({ playlistName: name, enterName: false})
  // }

  // editPlaylistName(name) {
  //   this.setState({ playlistName: name })
  // }

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
          <Input getSongs={this.getSongs} playlistName={this.state.playlistName} />
          <Playlist
            addSong={this.addSong}
            editName={this.editName}
            playlistName={this.state.playlistName}
            editPlaylistName={this.editPlaylistName} />
        </div>
        );
      }
  }
}

export default App;
