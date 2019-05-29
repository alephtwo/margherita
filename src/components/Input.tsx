import * as React from 'react';

interface InputProps {
  type: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  step?: string;
  value: any;
  onChange?: (e: object) => void;
  disabled?: boolean;
  min?: string;
}

export default class Input extends React.Component<InputProps, {}> {
  getAddon (isPrefix: boolean) {
    const { prefix, suffix } = this.props;
    const addon = isPrefix ? prefix : suffix;
    if (!addon) {
      return null;
    }

    const klass = isPrefix ? 'input-group-prepend' : 'input-group-append';

    return (
      <div className={klass}>
        <span className='input-group-text'>{addon}</span>
      </div>
    );
  }

  render () {
    return (
      <div className='input-group'>
        {this.getAddon(true)}
        <input className='form-control' {...this.props} />
        {this.getAddon(false)}
      </div>
    );
  }
}
