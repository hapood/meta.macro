import React from 'react';
import Controller from 'meta.macro';

@Controller('/home')
export default class extends React.PureComponent {
  render() {
    return <div>Compile 首页</div>;
  }
}
