import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
  }

  handleEdit() {
    this.props.editName(this.name.value);
    this.setState({ edit: !this.state.edit });
  }

  keyPress(e) {
    if (e.charCode === 13) {
      this.props.editName(this.name.value);
      this.setState({ edit: !this.state.edit });
    }
  }

  editRender() {
    const { addSong, playlistName } = this.props;
    return (
      <div className="spacing">
      <input
        ref={(input) => this.name = input}
        type="text"
        defaultValue={playlistName}
        autoFocus="autoFocus"
        onKeyPress={(e) => this.keyPress(e)} />
      <button
        type="submit"
        onClick={() => this.handleEdit()}
        className="flat">
        Save
      </button>
      <button
        type="submit"
        onClick={() => this.setState({edit: !this.state.edit})}
        className="flat">
        Cancel
      </button>
      <ul className="flexUl">
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        {addSong()}
      </ReactCSSTransitionGroup>
      </ul>
      </div>
    )
  }

  normalRender() {
    const { addSong, playlistName, deletePlaylist } = this.props;
    return (
      <div>
        <div>
          <h1 className="inline-block">{playlistName}</h1>
          <button
            type="submit"
            onClick={() => this.setState({ edit: !this.state.edit })}
            className="flat">
          Edit Name
          </button>
          <button
            type="submit"
            onClick={() => deletePlaylist()}
            className="flat">
          Delete Playlist
          </button>
        </div>
        <ul className="flexUl">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          {addSong()}
        </ReactCSSTransitionGroup>
        </ul>
      </div>
    )
  }

  render() {
    if(!this.state.edit) {
     return (this.normalRender());
    } else {
      return (this.editRender());
    }
  }
}

Playlist.propTypes = {
  addSong: React.PropTypes.func.isRequired,
  editName: React.PropTypes.func.isRequired,
  deletePlaylist: React.PropTypes.func.isRequired,
  playlistName: React.PropTypes.string.isRequired,
}

export default Playlist;
