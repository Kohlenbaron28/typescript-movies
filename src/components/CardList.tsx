import React from 'react';
import { Spin, Alert, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Offline, Online } from 'react-detect-offline';

import { TMovie } from './types';
import CardItem from './Card/CardItem';

type ListProps = {
  loading: boolean;
  error: boolean;
  onChangeStar: (num: number, id: number) => void;
  getGenres: () => void;
  genresArr: string[];
  minify: (text: string) => void;
  movies: TMovie[];
  pagination: (num: number) => void;
  keyword: string;
  updateMovie: (key: string, num: number) => void;
};

export default class CardList extends React.Component<ListProps> {
  stars = this.props.movies.map((mov) => mov.star);

  render() {
    const { loading, error, onChangeStar, minify } = this.props;

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div>
        <Offline>
          <h1>You are offline!🐖</h1>
        </Offline>
        <Online>
          {loading && !error ? (
            <Spin
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
              indicator={antIcon}
            />
          ) : !loading && !error ? (
            <div>
              <CardItem data={this.props.movies} minify={minify} onChangeStar={onChangeStar} />
              <Pagination total={20} onChange={(num) => this.props.pagination(num)} />;
            </div>
          ) : error ? (
            <Alert message="Error" description="This is an error message about copywriting." type="error" showIcon />
          ) : null}
        </Online>
      </div>
    );
  }
}
