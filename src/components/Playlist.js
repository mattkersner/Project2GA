import React from 'react';

class Playlist extends React.Component {

  render() {
    const { addSong } = this.props;
    return (
      <ul className="flexUl">
        {addSong()}
      </ul>
    )
  }
}

export default Playlist;
