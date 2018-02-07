class CodingTaskProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      resultCount: 0
    };
    // You stick around I'll make it worth your while
    this.artist_id = 1971863;
  }

  componentDidMount() {
    fetch("https://itunes.apple.com/lookup?id=" + this.artist_id+ "&entity=album")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results,
            resultCount: result.resultCount,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items, resultCount } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
        <div class="content_parent">
          {items.map(item => {
            if (item.wrapperType === 'artist') {
            	return <div class="artist_info text-center">
            		<a href={item.artistLinkUrl} target="_blank">
		            	<h1 class="artist_name">{item.artistName}</h1>
            		</a>
			          <small class="results_count text-muted">{resultCount} Results</small>
            	</div>
            }
            else if (item.wrapperType === 'collection') {
              return <div class="album_info row well">
	              <div class="col-md-3">
	                <img class="album_image img-responsive img-circle" src={item.artworkUrl100} alt={item.collectionName}/>
	              </div>
	              <div class="col-md-9">
		              <a href={item.collectionViewUrl} target="_blank"> 
		                <h2 class="album_title h4">{item.collectionName}</h2>
			            </a>
	                <p class="release_date">Released {parseInt(item.releaseDate)}</p>
		              <a href={item.collectionViewUrl} target="_blank"> 
		              	View on iTunes
			            </a>
	              </div>
	            </div>
            }
          })}
        </div>
      );
    }
  }
}

ReactDOM.render(
  <CodingTaskProject/>,
  document.getElementById('content')
);
