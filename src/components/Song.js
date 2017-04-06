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
    const { playlists, songId, playlistId, getSongInfo } = this.props;
    return (
      <li className="flexLi">
        <p>{playlists[playlistId].songs[songId].song}<span className="byline"> by </span>{playlists[playlistId].songs[songId].artist}</p>
        <div className="buttons">
        <button
          type="submit"
          onClick={() => getSongInfo(playlists[playlistId].songs[songId].artist)}
          className="flat">
        Info
        </button>
        <button
          type="submit"
          onClick={() => this.handleDelete(songId)}
          className="flat">
        Delete
        </button>
        </div>
      </li>
    )
  }
}

Song.propTypes = {
  getSongs: React.PropTypes.func.isRequired,
  getSongInfo: React.PropTypes.func.isRequired,
  playlists: React.PropTypes.object.isRequired
}

export default Song;
