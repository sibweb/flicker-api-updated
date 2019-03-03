import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

export default class Cards extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { items } = this.props;
    const cards = [];
    if (items) {
      items.map((item) => {
        // Set variables to default string.
        let author = 'No author';
        let title = 'No title';
        let tags = 'No Tags';

        // Check if we have title and if so get link and set as A href
        if (item.title.length > 1) {
          title = <a target="_blank" rel="noopener noreferrer" href={item.link}>{item.title}</a>;
        }
        // Check if we have an author.
        if (item.author.length > 1) {
          // match the text inside the brackets on the username.
          const getName = item.author.match(/\("(.*)"\)/);
          author = <a style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer" href={`http://www.flickr.com/photos/${item.author_id}`}>{getName[1]}</a>;
        }
        // Check we have tags
        if (item.tags.length > 1) {
          // eslint-disable-next-line prefer-destructuring
          tags = item.tags;
        }
        const image = item.media.m ? item.media.m : 'https://react.semantic-ui.com/images/wireframe/white-image.png';
        cards.push(
          <Card color="teal" raised key={`card${item.date_taken}`}>
            <Image height="200" src={image} />
            <Card.Content>
              <Card.Header style={{ wordBreak: 'break-all' }}>{title}</Card.Header>
              <Card.Meta style={{ wordBreak: 'break-all' }}>
                <strong>By</strong>
                {' '}
                {author}
              </Card.Meta>
            </Card.Content>
            <Card.Content extra style={{ wordBreak: 'break-all' }}>
              <strong>Tags: </strong>
              {' '}
              {tags}
            </Card.Content>
          </Card>,
        );
        return cards;
      });
    }
    return (
      <Card.Group centered key="cardGroup">
        {cards}
      </Card.Group>

    );
  }
}

Cards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
