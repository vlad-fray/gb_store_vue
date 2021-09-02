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
    // console.log(state.goods);
  } catch (err) {
    console.error(err);
  }
};

export const addToCart = (id) => {
  const currentGood = state.goods.burgers.find(
    (burger) => burger.id === id
  );

  const supplements = state.goods.supplements.toBurgers.map((sup) => {
    return {
      ...sup,
      isAdded: false,
    };
  });

  const ranNum = Math.floor(Math.random() * 500);

  const newCartItem = {
    id: `burger${ranNum}`,
    item: currentGood,
    supplements: [...supplements],
    itemPrice: currentGood.price,
    itemCal: currentGood.cal,
  };

  state.cart.totalPrice += currentGood.price;
  state.cart.totalCal += currentGood.cal;
  state.cart.goods.push(newCartItem);

  console.log(state.cart);
};
