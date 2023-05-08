export default [
  {
    path: '/holiday',

    component: './Holiday',
  },
    {
      path: '/weather',

      component: './Weather',
    },
  {
    path: '/',
    redirect: '/holiday',
  },
  {
    component: './404',
  },
];
