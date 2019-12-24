import React from 'react';
import { MoolgogWrapperInit } from '../MoolgogWrapper';

interface ComponentInterface extends HTMLAnchorElement {

}
export default class _ extends React.Component<ComponentInterface> {
      onClick = (e) => {
            if (this.props.onClick && !!this.props.onClick()) return true;
            if (!!window.history && !!window.history.pushState) {
                  window.history.pushState(null, null, this.props.href);
                  MoolgogWrapperInit(window.location);
                  e.preventDefault();
                  return true;
            } else {
                  return false;
            }
      };
      render() {
            return (<a {...this.props} onClick={this.onClick}>{this.props.children}</a>);
      }
}