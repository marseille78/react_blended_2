import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { getImages } from 'service/image-service';

export class Gallery extends Component {

  state = {
    query: '',
    page: 1,
    list: [],
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      getImages(query, page)
        .then(data => console.log(data));
    }
  }

  handleSubmit = (query) => {
    this.setState({
      query,
    });
  }

  render() {
    return (
      <>
        <SearchForm onSubmit={ this.handleSubmit } />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
