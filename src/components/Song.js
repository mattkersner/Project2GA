import React from 'react';
import axios from 'axios';

class Song extends React.Component {

  handleDelete(key) {
    axios.delete(`https://music-playlist-app-4acd6.firebaseio.com/playlists/${key}.json`)
    .then((res) => {
      this.props.getSongs();
    })
  }

  render() {
    const { playlists, uniquePostCode } = this.props;
    return (
      <li className="flexLi">
        <p>{playlists[uniquePostCode].song} by {playlists[uniquePostCode].artist}</p>
        <button type="submit" onClick={() => this.handleDelete(uniquePostCode)}>Delete</button>
      </li>
    )
  }
}

export default Song;
