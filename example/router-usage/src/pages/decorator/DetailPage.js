import React from 'react';
import Controller from '~/decorator/Controller';

// 详情页异步加载
@Controller('/detail', {
  async: true
})
export default class extends React.Component {
  state = {
    Bar: null
  };

  componentWillMount() {
    import('~/component/List').then(Bar => {
      this.setState({ Bar: Bar.default });
    });
  }

  render() {
    let { Bar } = this.state;
    if (!Bar) {
      return <div>Loading...</div>;
    } else {
      return <Bar />;
    }
  }
}
