import React from 'react';
import axios from 'axios';

class PlaylistName extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
  }

  handleEdit(key) {
    this.setState({edit: !this.state.edit})
    axios.patch(`https://music-playlist-app-4acd6.firebaseio.com/playlists/${key}.json`, {
      playlistName: this.textArea.value
    })
    .then((res) => {

    })
  }

  editRender() {
    const { playlists, uniquePostCode } = this.props;
    return (
      <div className="editRender">
        <textArea
          ref={(text) => this.textArea = text}
          defaultValue={playlists[uniquePostCode].playlistName}
          autoFocus="autoFocus" />
        <button
          type="submit"
          onClick={() => this.handleEdit(uniquePostCode)}
          className="flat">
        Submit
        </button>
        <button
          type="submit"
          onClick={() => this.setState({edit: !this.state.edit})}
          className="flat">
          Cancel
        </button>
      </div>
    )
  }

  normalRender() {
    return (
      <div>
        <h1>{this.props.playlistName}</h1>
        <button type="submit" onClick={() => this.handleEdit(this.props.uniquePostCode)}>Edit</button>
      </div>
    )
  }

  render() {
    if (!this.state.edit) {
      return (this.normalRender());
    } else {
      return(this.editRender());
    }
  }
}

export default PlaylistName;
