import { Component } from 'react';

import * as ImageService from 'service/image-service';
import {
  Button,
  SearchForm,
  Grid,
  GridItem,
  Text,
  CardItem,
  Loader,
} from 'components';
import { getImages } from 'service/image-service';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    list: [],
    showLoadMore: false,
    isEmpti: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      getImages(query, page)
        .then(({ photos, total_results }) => {
          if (!photos.length) {
            this.setState({ isEmpti: true });
            return;
          }
          this.setState(({ list }) => ({
            list: [...list, ...photos],
            showLoadMore: page < Math.ceil(total_results / 15),
            // showLoadMore: photos.length > 0 && total_results > page * 15,
          }));
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleSubmit = query => {
    this.setState({
      query,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { list, showLoadMore, isEmpti, isLoading } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {list.map(({ id, alt, src, avg_color }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {showLoadMore && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        {isEmpti && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {isLoading && <Loader />}
      </>
    );
  }
}
