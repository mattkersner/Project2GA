import React from 'react';
import axios from 'axios';

class InputPlaylistName extends React.Component {

  // createPlaylist() {
    //maybe pass the name after it is set to the state a prop to input
    //then can post each artist and song key value pair to
    //url/playlists/${playlistName}

  namePlaylist() {
      axios({
      method: 'PATCH',
      url: `https://music-playlist-app-4acd6.firebaseio.com/playlists/playlistName.json`,
      data: {
        name: this.playlistName.value
      }
    }).then((res) => {
      console.log(res);
      this.props.setPlaylistName(this.playlistName.value);
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

export default InputPlaylistName;
