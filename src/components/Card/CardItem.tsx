import React, { useContext } from 'react';
import { Card, Col, Row, Rate } from 'antd';
import { format, parseISO } from 'date-fns';

import './Card.css';
import { TMovie } from '../types';
import { GenresContext } from '../SearchPage/SearchPage';

type CardProps = {
  data: TMovie[];
  minify: (text: string) => void;
  onChangeStar: (num: number, id: number) => void;
};

type CardState = {
  loading: boolean;
};

export default class CardItem extends React.Component<CardProps, CardState> {
  state = {
    loading: true,
  };
  arr = [];
  render() {
    const { data, minify, onChangeStar } = this.props;
    const newdata: TMovie[] = JSON.parse(localStorage.getItem('stars') || '{}');
    return (
      <Row gutter={16}>
        {newdata !== null ? (
          data.map((obj: TMovie) => {
            console.log(this.arr);
            let val = 0;
            const res = format(parseISO(obj.release_date), 'MMMM dd, yyyy');
            for (const objj of newdata) {
              if (objj.id === obj.id) {
                val = objj.star;
              }
            }
            const body: any = minify(obj.overview);
            return (
              <Col span={8} key={obj.id}>
                <Card
                  title={obj.title}
                  bordered={false}
                  cover={<img src={`https://image.tmdb.org/t/p/original${obj.poster_path}`} alt="" />}
                >
                  <div
                    className="reiting"
                    style={
                      val >= 0 && val <= 3
                        ? { borderColor: '#E90000' }
                        : val > 3 && val <= 5
                        ? { borderColor: '#E97E00' }
                        : val > 5 && val <= 7
                        ? { borderColor: '#E9D100' }
                        : val > 7
                        ? { borderColor: '#66E900' }
                        : { borderColor: 'black' }
                    }
                  >
                    {val}
                  </div>
                  <div className="card__date">{res}</div>
                  <GenresContext.Consumer>
                    {(value) => {
                      this.arr = [];
                      value?.map((objj) => {
                        for (const id of obj.genre_ids) {
                          if (objj.id === id) {
                            this.arr.push(objj.name);
                          }
                        }
                      });
                      return this.arr.map((val) => <span className="genre_id">{val}</span>);
                    }}
                  </GenresContext.Consumer>
                  <div className="card__description">{body}</div>
                  <Rate
                    allowHalf
                    count={10}
                    value={val}
                    onChange={(num) => {
                      onChangeStar(num, obj.id);
                      localStorage.setItem('stars', JSON.stringify(newdata));
                    }}
                  />
                </Card>
              </Col>
            );
          })
        ) : (
          <p>null</p>
        )}
      </Row>
    );
  }
}
