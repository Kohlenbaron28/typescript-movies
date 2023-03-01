import React from 'react';
import { debounce } from 'lodash';

import './Search.css';

type SearchState = {
  search: string;
};
type SearchProps = {
  enterHandler: (criteria: string) => void;
};
export default class Search extends React.Component<SearchProps, SearchState> {
  state = {
    search: '',
  };
  debouncedSearch = debounce(async (criteria: string) => {
    this.setState({
      search: criteria,
    });
    this.props.enterHandler(criteria);
  }, 500);
  changeItem = async (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    this.debouncedSearch(target.value);
    console.log(this.state.search);
  };

  render() {
    return (
      <div className="search">
        <input className="search__input" type="text" placeholder="Type to search..." onChange={this.changeItem} />
      </div>
    );
  }
}
