![Game Image](https://i.imgur.com/kk0g5wV.png)

# Music Playlist App
Music has always been a passion of mine, and with the advent of apps like Spotify, sharing music has never been easier. My friends and I are always creating playlists for any occassion, a birthday party, a BBQ, a road trip, or even just a Saturday night spent inside. I saw this project as an opportunity to have a centralized place to create music playlists from scratch, create it in a music app like Spotify, and then share it with friends. 

###[Deployed Version](http://philologist-otter-32505.bitballoon.com/) 


##Technologies Used
- HTML
- CSS
- React
- Firebase
- Axios

```React Playlist Component
class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
  }
  handleEdit(e) {
    e.preventDefault();
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
        onClick={(e) => this.handleEdit(e)}
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
```

###Build Strategy
I started by focusing on CRUD and meeting those requirements. Once I had the ability to name the playlist and edit that name, and then add songs to the playlist and delete those songs, I was able to move on to the icing on the cake. I added the song info functionality where I have a getRequest to a third party API and render all the information, including a link which will launch Spotify on the selected Arist's page.

###Complications/Future Improvements
I would like to add the ability to save playlists and then access all previously created playlists. I also want to add the ability to log in and then add collaborators via email and everyone who is added can add/remove songs to the playlist as they see fit. Once those are added, I feel that I will have an app that I will be using with my friends on a weekly (if not daily) basis.

####Authors
Matt Kersner
