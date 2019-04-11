import React from 'react';
import Controller from '~/decorator/Controller';

@Controller('/home')
export default class extends React.PureComponent {
  render() {
    return <div>Decorator 首页</div>;
  }
}
