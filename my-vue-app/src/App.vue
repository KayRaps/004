<template>
  <div id="app">
    <Header :cartItems="cartItems" :totalCost="totalCost" />
    <div class="container">
      <router-view
        :products="products"
        :cartItems="cartItems"
        :addToCart="addToCart"
        :updateCartItem="updateCartItem"
        :removeFromCart="removeFromCart"
        :clearCart="clearCart"
      />
    </div>
    <Cart
      v-if="isLoggedIn"
      :cartItems="cartItems"
      :totalCost="totalCost"
      :updateCartItem="updateCartItem"
      :removeFromCart="removeFromCart"
      :clearCart="clearCart"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter } from 'vue-router/dist/vue-router.esm-bundler.js';
import Header from "./components/Header.vue";
import Cart from "./components/Cart.vue";
import {jwtDecode} from "jwt-decode";
export default defineComponent({
  name: "App",
  components: {
    Header,
    Cart,
  },
  setup() {
    const router = useRouter();
    const products = ref([]);
    const cartItems = ref([]);
    const isLoggedIn = ref(!!localStorage.getItem("token"));
    const userId = ref(null);

    onMounted(async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        products.value = await res.json();

        const token = localStorage.getItem("token");
    if (token) {
      userId.value = jwtDecode.default(token).userId; // Use jwtDecode.default
      cartItems.value = JSON.parse(localStorage.getItem(`cart-${userId.value}`)) || [];
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});

    const addToCart = (product) => {
      const existingItem = cartItems.value.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        updateCartItem(product.id, existingItem.quantity + 1);
      } else {
        cartItems.value.push({ id: product.id, quantity: 1 });
        saveCart();
      }
    };

    const updateCartItem = (productId, quantity) => {
      const item = cartItems.value.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
        saveCart();
      }
    };

    const removeFromCart = (productId) => {
      const index = cartItems.value.findIndex((item) => item.id === productId);
      if (index !== -1) {
        cartItems.value.splice(index, 1);
        saveCart();
      }
    };

    const clearCart = () => {
      cartItems.value = [];
      saveCart();
    };

    const saveCart = () => {
      localStorage.setItem(
        `cart-${userId.value}`,
        JSON.stringify(cartItems.value)
      );
    };

    const totalCost = computed(() => {
      return cartItems.value
        .reduce((total, item) => {
          const product = products.value.find((p) => p.id === item.id);
          return total + (product?.price || 0) * item.quantity;
        }, 0)
        .toFixed(2);
    });

    return {
      products,
      cartItems,
      isLoggedIn,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      totalCost,
    };
  },
});
</script>

<style>
header {
  background-color: #f8f8f8;
  padding: 1em;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em;
}
</style>
