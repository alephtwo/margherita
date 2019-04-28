import * as React from 'react';

interface ScaffoldingProps {
  baseClass: string;
  classNames?: string;
}

class Scaffolding extends React.Component<ScaffoldingProps, {}> {
  getClasses () {
    const { baseClass, classNames } = this.props;
    const safeBaseClass = baseClass || '';
    return classNames ? `${baseClass} ${classNames}` : safeBaseClass;
  }

  render () {
    return <div className={this.getClasses()}>{this.props.children}</div>;
  }
}

interface RowProps { classNames?: string; }

export class Row extends React.Component<RowProps, {}> {
  render () {
    return <Scaffolding baseClass='row' {...this.props} />;
  }
}

interface ColumnProps {
  classNames?: string;
}

export class Column extends React.Component<ColumnProps, {}> {
  render () {
    return <Scaffolding baseClass='col' {...this.props} />;
  }
}
