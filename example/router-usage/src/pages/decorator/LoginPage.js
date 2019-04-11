import React from 'react';
import Controller from '~/decorator/Controller';
import { RoutePath } from '~/const';

// 可使用运行时的值，可指定任意的参数
@Controller(RoutePath.login)
export default class extends React.PureComponent {
  render() {
    return <div>Decorator 登录页</div>;
  }
}
