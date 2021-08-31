const initialCartData = {
  goods: [],
  totalPrice: 0,
  totalCal: 0,
  isOrdering: false,
};

export const state = {
  goods: {},
  cart: { ...initialCartData, goods: [] },
  orderList: [],
};

export const loadCatalogItemsFromDatabase = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    state.goods = data;
  } catch (err) {
    console.error(err);
  }
};
