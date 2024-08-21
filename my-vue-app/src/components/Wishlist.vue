<template>
    <div class="wishlist-page">
      <h1>My Wishlist</h1>
      <p>Total items: {{ totalItems }}</p>
      <input type="text" v-model="searchQuery" placeholder="Search products" />
      <select v-model="sortBy">
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
      <button @click="clearWishlist">Clear Wishlist</button>
      <ul class="product-list">
        <li v-for="product in filteredProducts" :key="product.id">
          <img :src="product.image" :alt="product.name" />
          <h2>{{ product.name }}</h2>
          <p>{{ product.price }}</p>
          <button @click="addToCart(product)">Add to Cart</button>
          <button @click="removeFromWishlist(product)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "Wishlist",
    data() {
      return {
        wishlistedProducts: [],
        searchQuery: "",
        sortBy: "name",
      };
    },
    computed: {
      totalItems() {
        return this.wishlistedProducts.length;
      },
      filteredProducts() {
        const filtered = this.wishlistedProducts.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        return filtered.sort((a, b) =>
          a[this.sortBy] > b[this.sortBy] ? 1 : -1
        );
      },
    },
    methods: {
      addToCart(product) {
        // Add product to the shopping cart
      },
      removeFromWishlist(product) {
        // Remove product from the wishlist
      },
      clearWishlist() {
        // Clear all items from the wishlist
      },
    },
    created() {
      // Load wishlisted products from local storage or API
    },
  };
  </script>
  
  <style scoped>
  .wishlist-page {
    background-color: cadetblue;
  }
  </style>