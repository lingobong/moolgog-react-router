import React from 'react';

export const globalRoutes = [

];
// '/home/:param/'


export default (PageComponent) => {
      return (...routes) => {
            for (let i = 0; i < routes.length; i++) {
                  let route = routes[i].split('/').filter(r => !!r);
                  // let params = [];
                  // for (let j = 0; j < route.length; j++) {
                  //       if (route[j][0] == ':') {
                  //             params.push(route[j].substr(1));
                  //             route[j] = ':param';
                  //       }
                  // }
                  routes[i] = '/' + route.join('/');
                  globalRoutes.push({
                        route: routes[i],
                        PageComponent,
                        // params,
                  });
            }
            return PageComponent;
      };
};