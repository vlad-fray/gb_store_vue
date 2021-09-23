<template>
  <form @submit.prevent="submitForm" class="order-form hidden">
    <h3 class="order-form__heading">Ordering</h3>
    <label class="order-input">
      Name* :
      <input v-model="name" id="name" type="text" placeholder="Ivan Ivanov" />
      <p v-if="!isValidName" class="order-input--error">
        Name input has to be not empty
      </p>
    </label>

    <label title="Only Russian numbers" class="order-input">
      Number* :
      <input
        v-model="number"
        id="number"
        type="text"
        placeholder="+7(000)000-0000"
      />
      <p v-if="!isValidNumber" class="order-input--error">
        Number value is not valid
      </p>
    </label>

    <label class="order-input">
      Email :
      <input
        v-model="email"
        id="email"
        type="email"
        placeholder="mymail@mail.ru"
      />
      <p v-if="!isValidEmail" class="order-input--error">
        Email value is not valid
      </p>
    </label>

    <label class="order-textarea">
      Your message :
      <textarea id="message" placeholder="message" resize="none"></textarea>
    </label>

    <div class="order-form__actions">
      <Button type="submit" class="button--cart-make-order">
        Make Order
      </Button>
      <Button @onClick="closeForm" type="button" class="button--close-order">
        Close
      </Button>
    </div>
  </form>
</template>

<script>
import Button from "../UI/Button.vue";
export default {
  components: { Button },
  methods: {
    closeForm() {
      this.$emit("closeForm");
    },
    submitForm() {
      this.isValidName = true;
      this.isValidNumber = true;
      this.isValidEmail = true;
      if (!this.validateNameInput(this.name)) {
        console.log("wow");
        this.isValidName = false;
      } else if (!this.validateNumberInput(this.number)) {
        console.log("wow2");
        this.isValidNumber = false;
      } else if (!this.validateEmailInput(this.email)) {
        console.log("wow3");
        this.isValidEmail = false;
      } else {
        this.$emit("submitForm", {
          name: this.name,
          number: this.number,
          email: this.email,
        });
      }
    },
    validateNameInput(value) {
      const regExp = /^[a-zа-яё\s]+$/gi;
      return regExp.test(value.trim());
    },
    validateNumberInput(value) {
      const regExp = /^\+7\(\d{3}\)\d{3}-\d{4}$/g;
      return regExp.test(value.trim());
    },
    validateEmailInput(value) {
      const regExp = /^[a-zA-z]{1}[a-zA-Z\.-\d]*@[a-z]{2,6}.[a-z]{2,4}$/;
      return regExp.test(value.trim()) || value.trim().length === 0;
    },
  },
  data() {
    return {
      name: "",
      number: "",
      email: "",
      isValidName: true,
      isValidNumber: true,
      isValidEmail: true,
    };
  },
};
</script>

<style scoped>
.order-form {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.order-form__heading {
  margin-bottom: 1rem;
}

.order-form__actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.order-input {
  margin-bottom: 1rem;
}
.order-input input {
  display: block;
  width: 100%;
  height: 2.5rem;
  padding: 0.3rem;
}

.order-input--error {
  color: crimson;
}

.order-textarea {
  margin-bottom: 2rem;
}
.order-textarea textarea {
  display: block;
  width: 100%;
  height: 4rem;
  padding: 0.5rem 0.3rem;
  resize: none;
}

.button--cart-make-order {
  margin: 0 1rem;
  padding: 1rem;
  color: white;
  background-color: var(--color-accent);
}
.button--cart-make-order:hover {
  color: var(--color-accent);
  background-color: white;
}
.button--close-order {
  padding: 1rem;
}
</style>