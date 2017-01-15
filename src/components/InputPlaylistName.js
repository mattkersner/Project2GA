import React from 'react';

class InputPlaylistName extends React.Component {

  namePlaylist() {
      this.props.setPlaylistName(this.playlistName.value);
      this.playlistName.value = "";
  }

  keyPress(e) {
    if (e.charCode === 13) {
      this.props.setPlaylistName(this.playlistName.value);
      this.playlistName.value = "";
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
