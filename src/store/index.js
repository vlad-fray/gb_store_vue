import { createStore } from 'vuex';
import { API } from './../config';

// empty cart = {
//   totalPrice: 0,
//   totalCal: 0,
//   isOrdering: false,
//   goods: [],
// }

const state = {
  goods: null,
  loadError: null,
  cart: {
    totalPrice: 0,
    totalCal: 0,
    isOrdering: false,
    goods: [],
  },
  showCart: false,
  orders: [],
};

const mutations = {
  openCart(state) {
    state.showCart = true;
  },
  closeCart(state) {
    state.showCart = false;
  },
  async loadCatalog(state) {
    try {
      const res = await fetch(API + 'goodsList/');
      const data = await res.json();

      state.goods = data;
    } catch (err) {
      state.loadError = err.message;
      console.error(err);
    }
  },
  async loadCart(state) {
    try {
      const res = await fetch(API + 'cart/');
      const data = await res.json();

      if (!data.goods.length) return;
      state.cart = data;
    } catch (err) {
      state.loadError = err.message;
      console.error(err);
    }
  },
  async loadOrders(state) {
    try {
      const res = await fetch(API + 'ordersList/');
      const data = await res.json();

      // console.log(data);
      state.orders = data;
    } catch (err) {
      state.loadError = err.message;
      console.error(err);
    }
  },
  async removeCartItem(state, { itemId }) {
    const cart = state.cart;
    const itemToDelete = cart.goods.find((good) => good.id === itemId);

    cart.totalPrice -= itemToDelete.itemPrice;
    cart.totalCal -= itemToDelete.itemCal;
    cart.goods = cart.goods.filter((good) => good.id !== itemId);

    await fetch(API + 'cart/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart),
    });
  },
  async addToCart(state, { id }) {
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

    state.cart = {
      ...state.cart,
      totalPrice: state.cart.totalPrice + currentGood.price,
      totalCal: state.cart.totalCal + currentGood.cal,
      goods: [...state.cart.goods, newCartItem],
    };

    await fetch(API + 'cart/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.cart),
    });
  },
  async toggleSupMeal(state, { burgerId, supId }) {
    const cart = state.cart;

    const currentItem = cart.goods.find((burger) => burger.id === burgerId);
    const currentSup = currentItem.supplements.find((sup) => sup.id === supId);
    console.log(currentItem);

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

    //is needed to make a new key for 'v-for'
    currentItem.id = 'burger' + Math.floor(Math.random() * 1000);

    await fetch(API + 'cart/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.cart),
    });
  },
  async submitOrder(state, { userData }) {
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

    await fetch(API + 'ordersList/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrdersListItem),
    });

    await fetch(API + 'cart/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        totalPrice: 0,
        totalCal: 0,
        isOrdering: false,
        goods: [],
      }),
    });

    state.cart = {
      totalPrice: 0,
      totalCal: 0,
      isOrdering: false,
      goods: [],
    };
  },
};

export default createStore({
  state,
  mutations,
  actions: {},
  modules: {},
  getters: {},
});
