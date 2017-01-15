import React from 'react';

class Playlist extends React.Component {

  render() {
    const { addSong, playlistName } = this.props;
    return (
      <div>
        <h1>{ playlistName }</h1>
        <ul className="flexUl">
          {addSong()}
        </ul>
      </div>
    )
  }
}

export default Playlist;
