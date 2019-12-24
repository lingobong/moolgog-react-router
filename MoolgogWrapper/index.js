import React from 'react';
import { globalRoutes } from '../MoolgogRouter';

interface ComponentInterface {
      preExecute?: Function;
      emptyComponent?: Function;
      initComponent?: Function;
}
let _MoolgogWrapperInit = () => { };
export const MoolgogWrapperInit = (...args) => _MoolgogWrapperInit(...args);
export default class _ extends React.Component<ComponentInterface> {
      state = {
            pathname: null,
            query: null,
      };
      async componentDidMount() {
            if (typeof this.props.preExecute == 'function') {
                  await this.props.preExecute();
            }
            await this.init(window.location);
            window.addEventListener('popstate', async (e) => {
                  await this.init(e.target.location);
            });

            _MoolgogWrapperInit = this.init;
      };

      init = async (location: Location) => {
            let locationSearch = location.search.substr(1).split('&');
            let query = {};
            for (let search of locationSearch) {
                  let searchSplit = search.split('=');
                  query[searchSplit[0]] = search.substr(searchSplit[0].length + 1);
            }
            this.setState({
                  pathname: location.pathname,
                  query,
            });
      };

      render() {
            let { pathname } = this.state;
            if (pathname == null) {
                  return !!this.props.initComponent ? this.props.initComponent() : (<></>);
            }
            for (let routeInfo of globalRoutes) {
                  let routes = routeInfo.route.split('/').filter(r => !!r);
                  let paths = pathname.split('/').filter(r => !!r);
                  let isExactRouter = true;
                  let ___params = {};
                  for (let i = 0; i < Math.max(routes.length, paths.length); i++) {
                        let route = routes[i] || '';
                        let path = paths[i];
                        if (route[0] == ':') {
                              let paramName = route.substr(1);
                              let paramValue = path;
                              ___params[paramName] = paramValue;
                        } else if (route != path) {
                              isExactRouter = false;
                              continue;
                        }
                  }
                  if (isExactRouter) {
                        let PageComponent = routeInfo.PageComponent;
                        return <PageComponent
                              __params={___params}
                              __query={this.state.query} />
                  }
            }

            return !!this.props.emptyComponent ? this.props.emptyComponent() : (<></>);
      }
}