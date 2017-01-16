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
    this.setPlaylistName = this.setPlaylistName.bind(this);
    this.editPlaylistName = this.editPlaylistName.bind(this);
    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    this.getSongs();
    this.getName();
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
              playlists={this.state.playlists} />
        )
      })
    return playlist;
    }
  }

  setPlaylistName(name) {
    this.setState({ playlistName: name, enterName: false})
  }

  editPlaylistName(name) {
    this.setState({ playlistName: name })
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
            getName={this.getName}
            setPlaylistName={this.setPlaylistName}
            playlistName={this.state.playlistName}
            setPlaylistCode={this.setPlaylistCode} />
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
            playlistName={this.state.playlistName}
            editPlaylistName={this.editPlaylistName} />
        </div>
        );
      }
  }
}

export default App;
