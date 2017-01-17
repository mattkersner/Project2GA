import React from 'react';
import axios from 'axios';

class Song extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
  }

  handleDelete(key) {
    axios.delete(`https://music-playlist-app-4acd6.firebaseio.com/playlists/${this.props.playlistId}/songs/${key}.json`)
    .then((res) => {
      this.props.getSongs();
    })
  }

  render() {
    const { playlists, uniquePostCode, playlistId, getSongInfo } = this.props;
    return (
      <li className="flexLi">
        <p>{playlists[playlistId].songs[uniquePostCode].song}<span className="byline"> by </span>{playlists[uniquePostCode].artist}</p>
        <div className="buttons">
        <button
          type="submit"
          onClick={() => getSongInfo(playlists[uniquePostCode].artist)}
          className="flat">
        Info
        </button>
        <button
          type="submit"
          onClick={() => this.handleDelete(uniquePostCode)}
          className="flat">
        Delete
        </button>
        </div>
      </li>
    )
  }
}

export default Song;
