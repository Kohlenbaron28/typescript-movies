import React from 'react';
import { Card, Col, Row, Rate } from 'antd';
import { format, parseISO } from 'date-fns';

import { TMovie } from './types';

type RatedProps = {
  minify: (text: string) => void;
};

export default class RatedPage extends React.Component<RatedProps> {
  arr = [];
  render() {
    const { minify } = this.props;
    const itemRated: TMovie[] = JSON.parse(localStorage.getItem('stars') || '{}');
    const genres = JSON.parse(localStorage.getItem('genres') || '{}');
    return (
      <Row gutter={16}>
        {itemRated !== null ? (
          itemRated.map((obj) => {
            const res = format(parseISO(obj.release_date), 'MMMM dd, yyyy');
            this.arr = [];
            for (const id of obj.genre_ids) {
              for (const objj of genres) {
                if (objj.id === id) {
                  //@ts-ignore
                  this.arr.push(objj.name);
                }
              }
            }
            const body: any = minify(obj.overview);
            return (
              <Col span={8} key={obj.id}>
                <Card
                  title={obj.title}
                  bordered={false}
                  cover={<img src={`https://image.tmdb.org/t/p/original/${obj.poster_path}`} alt="" />}
                >
                  <div
                    className="reiting"
                    style={
                      obj.star >= 0 && obj.star <= 3
                        ? { borderColor: '#E90000' }
                        : obj.star > 3 && obj.star <= 5
                        ? { borderColor: '#E97E00' }
                        : obj.star > 5 && obj.star <= 7
                        ? { borderColor: '#E9D100' }
                        : obj.star > 7
                        ? { borderColor: '#66E900' }
                        : { borderColor: 'black' }
                    }
                  >
                    {obj.star}
                  </div>
                  <div className="card__date">{res}</div>
                  <div className="card__genres">
                    {
                      //@ts-ignore
                      this.arr.map((genre) => (
                        <span className="genre_id" key={genre}>
                          {genre}
                        </span>
                      ))
                    }
                  </div>
                  <div className="card__description">{body}</div>
                  <Rate allowHalf count={10} value={obj.star} />
                </Card>
              </Col>
            );
          })
        ) : (
          <p>nothing</p>
        )}
      </Row>
    );
  }
}
