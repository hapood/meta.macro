import React from 'react';
import Controller from 'meta.macro';

// 详情页异步加载
@Controller('/detail', {
  async: true,
  chunk: 'common'
})
export default class extends React.Component {
  render() {
    return <div>Compile 详情页</div>;
  }
}
