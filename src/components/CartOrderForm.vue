<template>
  <form @submit.prevent="submitForm" class="order-form hidden">
    <h3 class="order-form__heading">Ordering</h3>
    <label class="order-input">
      Name* :
      <input
        v-model="name"
        id="name"
        type="text"
        placeholder="Ivan Ivanov"
        maxlength="30"
      />
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
        maxlength="20"
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
        maxlength="50"
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
import { ref } from "@vue/reactivity";
import Button from "../UI/Button.vue";

const validateNameInput = (value) => {
  const regExp = /^[a-zа-яё\s]+$/gi;
  if (regExp.test(value.trim())) return value.trim();
  return null;
};

const validateNumberInput = (value) => {
  const nums = value
    .split("")
    .filter((letter) => Number.isFinite(+letter))
    .join("");

  if (nums.length === 11 && +nums[0] === 7) return "+" + nums;
  if (nums.length === 11 && +nums[0] === 8) return nums;

  return null;
};

const validateEmailInput = (value) => {
  const regExp = /^[a-zA-Z]{1}[a-zA-Z\d]*@[a-z]{2,6}.[a-z]{2,4}$/;
  console.log(regExp.test(value.trim()));
  if (regExp.test(value.trim())) return value;

  return null;
};

export default {
  components: { Button },
  setup(props, context) {
    const name = ref("");
    const number = ref("");
    const email = ref("");
    const isValidName = ref(true);
    const isValidNumber = ref(true);
    const isValidEmail = ref(true);

    const closeForm = () => {
      context.emit("closeForm");
    };

    const submitForm = () => {
      isValidName.value = true;
      isValidNumber.value = true;
      isValidEmail.value = true;

      const userData = {
        name: null,
        number: null,
        email: "",
      };

      userData.name = validateNameInput(name.value);
      if (!userData.name) {
        isValidName.value = false;
        return;
      }

      userData.number = validateNumberInput(number.value);
      if (!userData.number) {
        isValidNumber.value = false;
        return;
      }

      if (email.value.trim().length !== 0) {
        userData.email = validateEmailInput(email.value);
        if (!userData.email) {
          isValidEmail.value = false;
          return;
        }
      }

      context.emit("submitForm", userData);
    };
    return {
      name,
      number,
      email,
      isValidName,
      isValidNumber,
      isValidEmail,
      closeForm,
      submitForm,
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
  box-shadow: 0 0 0 1px var(--color-accent);
}
.button--close-order {
  padding: 1rem;
}
</style>