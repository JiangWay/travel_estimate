export default [
  {
    path: '/travel/all',
    name: 'allTravels',
    component: () => import('@/views/travel/AllTravels.vue'),
  },
  {
    path: '/travel/create',
    name: 'createTravel',
    component: () => import('@/views/travel/CreateTravel.vue'),
  },
  {
    path: '/travel/join/agreement',
    name: 'travelAgreement',
    component: () => import('@/views/travel/join/Agreement.vue'),
  },
  {
    path: '/travel/join/form',
    name: 'travelForm',
    component: () => import('@/views/travel/join/Form.vue'),
  },
  {
    path: '/travel/overview',
    name: 'travelOverview',
    component: () => import('@/views/travel/Overview.vue'),
  },
  {
    path: '/travel/addMyItem',
    name: 'addMyItem',
    component: () => import('@/views/travel/AddMyItem.vue'),
  },
  {
    path: '/travel/myItemList',
    name: 'myItemList',
    component: () => import('@/views/travel/MyItemList.vue'),
  },
  {
    path: '/travel/addGroupBuy',
    name: 'addGroupBuy',
    component: () => import('@/views/travel/AddGroupBuy.vue'),
  },
  {
    path: '/travel/groupBuyList',
    name: 'groupBuyList',
    component: () => import('@/views/travel/GroupBuyList.vue'),
  },

]
