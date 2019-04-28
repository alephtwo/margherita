import * as React from 'react';

interface CardProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}

export default class Card extends React.Component<CardProps, {}> {
  static getBlock (prop: React.ReactNode, klass: string) {
    if (!prop) {
      return null;
    }
    return <div className={klass}>{prop}</div>;
  }

  render () {
    const { header, body, footer } = this.props;

    return (
      <div className='card'>
        {Card.getBlock(header, 'card-header')}
        {Card.getBlock(body, 'card-body')}
        {Card.getBlock(footer, 'card-footer')}
      </div>
    );
  }
}
