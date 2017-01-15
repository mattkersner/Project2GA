import React from 'react';
import axios from 'axios';

class InputPlaylistName extends React.Component {

  namePlaylist() {
    axios({
      method: 'POST',
      url: 'https://music-playlist-app-4acd6.firebaseio.com/playlists.json',
      data: {
        playlistName: this.playlistName.value
      }
    }).then(() => {
      this.props.setPlaylistName(this.playlistName.value);
      this.playlistName.value = "";
    })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={(input) => this.playlistName = input}
          placeholder="Name Your Playlist"
          autoFocus="autofocus"/>
        <button
          type="submit"
          onClick={() => this.namePlaylist()}
          className="flat">
          Submit
          </button>
      </div>
    )
  }
}

export default InputPlaylistName;
