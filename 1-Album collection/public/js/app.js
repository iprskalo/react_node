class AlbumList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: [],
        };

        this.handleAlbumUpvote = this.handleAlbumUpvote.bind(this);
    }

    componentDidMount() {
        this.setState({ albums: Seed.albums });
    }


    handleAlbumUpvote(albumId) {
        const nextAlbums = this.state.albums.map((album) => {
            if (album.id === albumId) {
                return Object.assign({}, album, {
                    votes: album.votes + 1,
                });
            } else {
                return album;
            }
        });
        this.setState({
            albums: nextAlbums,
        });
    }


    render() {
        const albums = this.state.albums.sort((a, b) => (
            b.votes - a.votes
        ));

        const albumComponents = albums.map((album) => (
            <Albums
                key={'album-' + album.id}
                id={album.id}
                title={album.title}
                description={album.description}
                url={album.url}
                votes={album.votes}
                productImageUrl={album.productImageUrl}
                onVote={this.handleAlbumUpvote}
            />

        ));

        return (
            <div className='ui unstackable items'>
                {albumComponents}
            </div>
        )
    }
}

class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpVote = this.handleUpVote.bind(this);
    }

    handleUpVote() {
        this.props.onVote(this.props.id);
    }
    render() {
        return (
            <div className="ui divided items">
                <div className="item">
                    <div className="image">
                        <img src={this.props.productImageUrl} />
                    </div>
                    <div className="content">
                        <a className="header">{this.props.title}</a>
                        <div className="meta">
                            <span className="cinema">{this.props.description}</span>
                        </div>
                        <div className="description">
                            <p></p>
                        </div>
                        <div className="extra">
                            <a class="ui label" onClick={this.handleUpVote}>
                                <img className="ui right spaced avatar image" src="/images/like.png" />
                                <div className="detail">{this.props.votes}</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <AlbumList />,
    document.getElementById('content')
);