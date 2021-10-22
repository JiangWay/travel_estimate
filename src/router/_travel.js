export default [
  {
    path: '/travel/all',
    name: 'allTravels',
    component: () => import('@/views/travel/AllTravels.vue'),
  },
  {
    path: '/travel/create',
    name: 'createTravel',
    component: () => import('@/views/travel/createTravel.vue'),
  },

]
