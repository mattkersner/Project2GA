import React from 'react';
import axios from 'axios';

class Input extends React.Component {

  createPlaylist() {
    axios({
      method: 'POST',
      url: 'https://music-playlist-app-4acd6.firebaseio.com/playlists.json',
      data: {
        artist: this.artist.value,
        song: this.song.value
      }
    }).then(() => {
      this.props.getSongs();
      this.artist.value = "";
      this.song.value = "";
    })
  }

  keyPress(e) {
    if (e.charCode === 13) {
      this.createPlaylist();
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={(input) => this.artist = input}
          placeholder="Artist"
          autoFocus="autofocus" />
        <input
          type="text"
          ref={(input) => this.song = input}
          onKeyPress={(e) => this.keyPress(e)}
          placeholder="Song" />
        <button
          type="submit"
          onClick={() => this.createPlaylist()}
          className="flat">
          Submit
        </button>
      </div>
    )
  }
}

export default Input;
