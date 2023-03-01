import React from 'react';

export default class Service extends React.Component {
  _imgBase = 'https://image.tmdb.org/t/p/original';
  async getResource(key: string, num: number) {
    const link = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${key}&page=${num}`
    );
    console.log(num);
    if (!link.ok) {
      throw new Error('service err');
    }
    const json = await link.json();
    console.log(json);
    return json;
  }
  async getImage(url: string) {
    return `${this._imgBase}/${url}`;
  }
  async updateMovie(key: string, page: number) {
    const link = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${key}&page=${page}`
    );
    if (!link.ok) {
      throw new Error('service err');
    }
    const json = await link.json();
    console.log(json);
    return json;
  }
  async getGenres() {
    const link = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`);
    if (!link.ok) {
      throw new Error('service err');
    }
    const json = await link.json();
    console.log(json);
    return json;
  }
}
//@ts-ignore
export const service = new Service();
