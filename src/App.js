import React, { Component } from 'react';
import Input from './components/Input';
import Song from './components/Song';
import Playlist from './components/Playlist';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      playlists: {},
    }
    this.getSongs = this.getSongs.bind(this);
    this.addSong = this.addSong.bind(this);
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs() {
    axios.get('https://music-playlist-app-4acd6.firebaseio.com/playlists.json')
    .then((res) => {
      console.log(res);
      this.setState({
        playlists: res.data,
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Input getSongs={this.getSongs} />
        <Playlist addSong={this.addSong} />
      </div>
    );
  }
}

export default App;

//<InputPlaylistName setPlaylistName={this.setPlaylistName} />

// this.setPlaylistName = this.setPlaylistName.bind(this);
// this.addPlaylistName = this.addPlaylistName.bind(this);

// import PlaylistName from './components/PlaylistName';
// import InputPlaylistName from './components/InputPlaylistName';

// setPlaylistName(name) {
//     this.setState({ playlistName: name })
//   }

//   addPlaylistName() {
//     let playlistName = Object.keys(this.state.playlists)
//       .map((key, i) => {
//         return (
//           <PlaylistName
//             key={key}
//             uniquePostCode={key}
//             playlists={this.state.playlists}
//             name={this.state.playlistName} />
//         )
//       })
//       return playlistName;
//   }
