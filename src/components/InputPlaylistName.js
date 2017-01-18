import React from 'react';
import axios from 'axios';

class InputPlaylistName extends React.Component {

  namePlaylist() {
      axios({
      method: 'PATCH',
      url: `https://music-playlist-app-4acd6.firebaseio.com/playlists/playlistName.json`,
      data: {
        name: this.playlistName.value
      }
    }).then((res) => {
      this.props.getName(res.data.name);
      this.playlistName.value = "";
    })
  }

  keyPress(e) {
    if (e.charCode === 13) {
      this.namePlaylist();
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={(input) => this.playlistName = input}
          placeholder="Name Your Playlist"
          autoFocus="autofocus"
          onKeyPress={(e) => this.keyPress(e)} />
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

InputPlaylistName.propTypes = {
  getName: React.PropTypes.func.isRequired
}

export default InputPlaylistName;
