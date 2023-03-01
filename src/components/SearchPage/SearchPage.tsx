import React, { createContext } from 'react';

import './SearchPage.css';
import { TMovie } from '../types';
import CardList from '../CardList';
import Search from '../Search/Search';
import { service } from '../../services/Service';
// import { Provider } from '../../services/Context';

type SearchState = {
  movies: TMovie[];
  keyword: string;
  loading: boolean;
  currentPage: number;
  genres: string[] | null;
  error: boolean;
};
type SearchProps = {
  minify: (text: string) => void;
};

export const GenresContext = createContext<{ id: number; name: string }[] | null>(null);

export default class SearchPage extends React.Component<SearchProps, SearchState> {
  state = {
    movies: [],
    keyword: '',
    loading: true,
    currentPage: 1,
    genres: null,
    error: false,
  };
  componentDidMount() {
    //this.handleEnter();
    this.getGenres();
  }
  genresArr = [];
  items: TMovie[] = [];
  currentPage = (num: number) => {
    let items: TMovie[];
    const key: string = this.state.keyword;
    service
      .getResource(key, num)
      .then((res) => res.results)
      .then((res) =>
        res.forEach((res: TMovie) => {
          items.push({
            id: res.id,
            title: res.title,
            release_date: res.release_date,
            poster_path: res.poster_path,
            overview: res.overview,
            genre_ids: res.genre_ids,
            star: 0,
          });
          this.setState({
            movies: [...items],
            loading: false,
            currentPage: num,
          });
        })
      );
    console.log(num);
  };
  onError() {
    this.setState({
      error: true,
      loading: false,
    });
  }
  handleEnter = (search: string) => {
    this.setState({
      keyword: search,
    });
    this.updateMovie(this.state.keyword, 1);
  };
  updateMovie(key: string = this.state.keyword, num: number) {
    service
      .updateMovie(key, num)
      .then((res) => res.results)
      .then((res) =>
        res.forEach((res: TMovie) => {
          this.items.push({
            id: res.id,
            title: res.title,
            release_date: res.release_date,
            poster_path: res.poster_path,
            overview: res.overview,
            genre_ids: res.genre_ids,
            star: 0,
          });
          this.setState({
            movies: [...this.items],
            loading: false,
          });
        })
      );
  }
  getGenres = () => {
    service
      .getGenres()
      .then((res) => res.genres)
      .then((res) => {
        this.setState({
          genres: res,
        });
        localStorage.setItem('genres', JSON.stringify(res));
      });
  };
  onChangeStar: (num: number, id: number) => void = (num: number, id: number) => {
    this.setState((state: SearchState) => {
      let existingEntries: TMovie[] = JSON.parse(localStorage.getItem('stars') || '{}');
      if (existingEntries == null) existingEntries = [];
      const idx: number = state.movies.findIndex((el) => el.id === id);
      const oldItem = state.movies[idx];
      const newItem = { ...oldItem, star: num };
      localStorage.setItem('newStar', JSON.stringify(newItem));
      existingEntries.push(newItem);
      localStorage.setItem('stars', JSON.stringify(existingEntries));
      const newArr = [...state.movies.slice(0, idx), newItem, ...state.movies.slice(idx + 1)];
      console.log(newItem);
      return {
        movies: newArr,
      };
    });
  };
  render() {
    return (
      <GenresContext.Provider value={this.state.genres}>
        <div>
          <Search enterHandler={this.handleEnter} />
          {this.items.length <= 1 ? (
            <div className="nothing">
              <p>no matches...</p>
              <img src="https://i.gifer.com/2GU.gif" alt="" />
            </div>
          ) : (
            <CardList
              movies={this.state.movies}
              keyword={this.state.keyword}
              loading={this.state.loading}
              error={this.state.error}
              pagination={this.currentPage}
              updateMovie={this.updateMovie}
              getGenres={this.getGenres}
              genresArr={this.genresArr}
              onChangeStar={this.onChangeStar}
              minify={this.props.minify}
            />
          )}
        </div>
      </GenresContext.Provider>
    );
  }
}
