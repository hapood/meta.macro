import React from 'react';
import Controller from 'meta.macro';
// import { RoutePath } from '~/const';

// 不可使用运行时的值
@Controller('/login')
export default class extends React.PureComponent {
  render() {
    return <div>Compile 登录页</div>;
  }
}
