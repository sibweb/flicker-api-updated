import React from 'react';
import {
  Container, Header, Dimmer, Loader, Message, Icon, Divider, Segment,
} from 'semantic-ui-react';
import fetchJsonp from 'fetch-jsonp';
import Cards from './cards';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // Set loading to true on initial state.
      loading: true,
      items: [],
    };
  }

  componentDidMount() {
    // When mounted run getData
    this.getData();
  }

  getData() {
    // User JsonP to call flicker.
    fetchJsonp('http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=cat,cats,animals,animal,dogs,dog&tagmode=any', {
      jsonpCallbackFunction: 'jsonFlickrFeed',
    })
      .then(response => response.json()).then((json) => {
        if (json.items) {
          // If we have items then set state with those items turn off loading.
          this.setState({ loading: false, items: json.items, error: false });
        } else {
          // If we don't have items throw error.
          this.setState({
            loading: false, items: null, error: true, errorMsg: 'No items found',
          });
        }
      }).catch((ex) => {
        // If we have a expection show set to error and use expection for error message
        this.setState({
          loading: false, items: null, error: true, errorMsg: ex,
        });
      });
  }

  render() {
    const {
      loading, error, errorMsg, items,
    } = this.state;

    let content;

    // If we have an error and we have stopped loading show the error message
    if (error && !loading) {
      content = (
        <Message negative>
          <Message.Header>Ooops</Message.Header>
          <p>Something has gone wrong. See error message below</p>
          <p>{errorMsg}</p>
        </Message>
      );
    } else if (!loading && !error) {
      // If we have finished loading and no error then go
      // and get the Component of cards and pass the data over to this.
      content = <Cards items={items} />;
    }

    return (
      <Container fluid>
        {/* Header for people to know where they are */}
        <Header as="h1" icon textAlign="center">
          <Icon name="flickr" />
          Flickr feed
          <Header.Subheader>Come look at the amazing animal Flickr feed</Header.Subheader>
        </Header>
        {/* Divider to break up content from header */}
        <Divider />
        {/* Loader is here which will take up the whole page while loading is set to true */}
        <Dimmer active={loading}>
          <Loader inverted>Loading images from Flickr</Loader>
        </Dimmer>
        {/* Segment to contain the content */}
        <Segment basic style={{ padding: '0px' }}>
          {/* Shows either error or cards component  */}
          {content}
        </Segment>
        <Divider />
      </Container>
    );
  }
}
