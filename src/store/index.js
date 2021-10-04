import { createStore } from 'vuex';
import { projectFirestore } from '../firebase/config';

// empty cart = {
//   totalPrice: 0,
//   totalCal: 0,
//   goods: [],
// }

const state = {
  goods: null,
  loadError: null,
  cart: {
    totalPrice: 0,
    totalCal: 0,
    goods: [],
  },
  showCart: false,
  orders: [],
};

const mutations = {
  OPEN_CART(state) {
    state.showCart = true;
  },
  CLOSE_CART(state) {
    state.showCart = false;
  },
  LOAD_CATALOG(state, payload) {
    state.goods = payload;
  },
  LOAD_CART(state, payload) {
    state.cart = payload;
  },
  LOAD_ORDERS(state, payload) {
    state.orders = payload;
  },
  REMOVE_CART_ITEM(state, cart) {
    state.cart = { ...cart };
  },
  CLEAN_CART(state) {
    state.cart = {
      totalPrice: 0,
      totalCal: 0,
      goods: [],
    };
  },
  ADD_TO_CART(state, cart) {
    state.cart = { ...cart };
  },
  TOGGLE_SUP_MEAL({ cart }, { burger, burgerId }) {
    let currentItem = cart.goods.find((bur) => bur.id === burgerId);
    currentItem = { ...burger };
  },
  SUBMIT_ORDER(state, newOrder) {
    state.orders = [...state.orders, newOrder];
  },
  LOAD_ERROR(state, error) {
    state.loadError = error;
  },
};

const actions = {
  async LOAD_CATALOG({ commit }) {
    try {
      const doc = await projectFirestore
        .collection('store')
        .doc('goodsList')
        .get();

      const data = doc.data();

      commit('LOAD_CATALOG', data);
    } catch (err) {
      commit('LOAD_ERROR', err.message);
      console.error(err);
    }
  },
  async LOAD_CART({ commit }) {
    try {
      const doc = await projectFirestore
        .collection('store')
        .doc('cart')
        .get();

      const data = doc.data();

      if (!data.goods.length) return;
      commit('LOAD_CART', data);
    } catch (err) {
      commit('LOAD_ERROR', err.message);
      console.error(err);
    }
  },
  async LOAD_ORDERS({ commit }) {
    try {
      const doc = await projectFirestore.collection('orders').get();
      const data = doc.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      commit('LOAD_ORDERS', data);
    } catch (err) {
      commit('LOAD_ERROR', err.message);
      console.error(err);
    }
  },
  async ADD_TO_CART({ commit, state }, { id }) {
    const { burgers, supplements } = state.goods;
    const currentGood = burgers.find((burger) => burger.id === id);

    const sups = supplements.toBurgers.map((sup) => {
      return {
        ...sup,
        isAdded: false,
      };
    });

    const ranNum = Math.floor(Math.random() * 500);

    const newCartItem = {
      id: `burger${ranNum}`,
      item: currentGood,
      supplements: [...sups],
      itemPrice: currentGood.price,
      itemCal: currentGood.cal,
    };

    const newCart = {
      ...state.cart,
      totalPrice: state.cart.totalPrice + currentGood.price,
      totalCal: state.cart.totalCal + currentGood.cal,
      goods: [...state.cart.goods, newCartItem],
    };

    commit('ADD_TO_CART', newCart);

    await projectFirestore
      .collection('store')
      .doc('cart')
      .update(newCart);
  },
  async REMOVE_CART_ITEM({ commit, state, dispatch }, { itemId }) {
    const cart = state.cart;
    const itemToDelete = cart.goods.find((good) => good.id === itemId);

    if (cart.goods.length < 2) {
      await dispatch('CLEAN_CART');
      return;
    }

    const newCart = {
      ...cart,
      totalPrice: cart.totalPrice - itemToDelete.itemPrice,
      totalCal: cart.totalCal - itemToDelete.itemCal,
      goods: cart.goods.filter((good) => good.id !== itemId),
    };

    commit('REMOVE_CART_ITEM', newCart);

    await projectFirestore
      .collection('store')
      .doc('cart')
      .update(newCart);
  },
  async CLEAN_CART({ commit, state }) {
    await commit('CLEAN_CART');

    console.log(state.cart);
    await projectFirestore
      .collection('store')
      .doc('cart')
      .set(state.cart);
  },
  async TOGGLE_SUP_MEAL({ commit, state }, { burgerId, supId }) {
    const cart = state.cart;

    const currentItem = { ...cart.goods.find((burger) => burger.id === burgerId) };
    const currentSup = currentItem.supplements.find((sup) => sup.id === supId);

    if (currentSup.isAdded) {
      cart.totalPrice -= currentSup.price;
      currentItem.itemPrice -= currentSup.price;
      cart.totalCal -= currentSup.cal;
      currentItem.itemCal -= currentSup.cal;
    } else {
      cart.totalPrice += currentSup.price;
      currentItem.itemPrice += currentSup.price;
      cart.totalCal += currentSup.cal;
      currentItem.itemCal += currentSup.cal;
    }
    currentSup.isAdded = !currentSup.isAdded;

    await commit('TOGGLE_SUP_MEAL', { burger: currentItem, burgerId });

    await projectFirestore
      .collection('store')
      .doc('cart')
      .update(state.cart);
  },
  async SUBMIT_ORDER({ commit, state, dispatch }, userData) {
    const cart = state.cart;

    const goods = cart.goods.map((good) => {
      const supplements = good.supplements.filter((sup) => sup.isAdded);

      return {
        id: good.id,
        item: good.item,
        supplements: [...supplements],
        price: good.itemPrice,
      };
    });

    const newOrdersListItem = {
      userData,
      orderData: {
        goods,
        totalPrice: cart.totalPrice,
      },
    };

    await projectFirestore.collection('orders').add(newOrdersListItem);

    await dispatch('CLEAN_CART');
    await commit('SUBMIT_ORDER', newOrdersListItem);
  },
  async REMOVE_ORDER({ dispatch }, { id }) {
    console.log(id);
    await projectFirestore
      .collection('orders')
      .doc(id)
      .delete();

    await dispatch('LOAD_ORDERS');
  },
};

const getters = {
  getCart(state) {
    return state.cart;
  },
  getCatalog(state) {
    return state.goods;
  },
  getCartGoods(state) {
    return state.cart.goods;
  },
  getOrders(state) {
    return state.orders;
  },
  getShowCart(state) {
    return state.showCart;
  },
};

export default createStore({
  state,
  mutations,
  actions,
  modules: {},
  getters,
});
