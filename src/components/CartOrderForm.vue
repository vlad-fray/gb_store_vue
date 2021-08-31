<template>
  <form class="order-form hidden">
    <h3 class="order-form__heading">Ordering</h3>
    <label class="order-input">
      Name* :
      <input id="name" type="text" placeholder="Ivan Ivanov" />
    </label>

    <label class="order-input">
      Number* :
      <input id="number" type="text" placeholder="+7(000)000-0000" />
    </label>
    <label class="order-input">
      Email :
      <input id="email" type="email" placeholder="mymail@mail.ru"
    /></label>
    <label class="order-textarea">
      Your message :
      <textarea id="message" placeholder="message" resize="none"></textarea>
    </label>

    <div class="order-form__actions">
      <button type="submit" class="button button--cart-make-order">
        Make Order
      </button>
      <button type="button" class="button button--close-order">Close</button>
    </div>
  </form>
</template>