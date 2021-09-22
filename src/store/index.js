import { createStore } from 'vuex';

const state = {
  searchValue: '',
  goods: null,
  cart: {
    totalPrice: 0,
    totalCal: 0,
    isOrdering: false,
    goods: [],
  },
};

const mutations = {};

export default createStore({
  state,
  mutations: {},
  actions: {},
  modules: {},
  getters: {},
});
