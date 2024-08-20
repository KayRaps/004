<template>
    <div class="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 z-50">
      <div class="container mx-auto">
        <h2 class="text-2xl font-bold mb-4">Your Cart</h2>
        <table class="w-full">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-2">Product</th>
              <th class="p-2">Quantity</th>
              <th class="p-2">Price</th>
              <th class="p-2">Total</th>
              <th class="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id" class="border-b">
              <td class="p-2">{{ getProductName(item.id) }}</td>
              <td class="p-2">
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  class="border border-gray-300 px-2 py-1 rounded w-20"
                  @change="updateCartItem(item.id, item.quantity)"
                />
              </td>
              <td class="p-2">{{ getProductPrice(item.id).toFixed(2) }}</td>
              <td class="p-2">{{ (getProductPrice(item.id) * item.quantity).toFixed(2) }}</td>
              <td class="p-2">
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  @click="removeFromCart(item.id)"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-end mt-4">
          <div class="text-right">
            <p class="text-lg font-bold">Total: ${{ totalCost }}</p>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              @click="clearCart"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "Cart",
    props: {
      cartItems: {
        type: Array,
        required: true,
      },
      totalCost: {
        type: String,
        required: true,
      },
      updateCartItem: {
        type: Function,
        required: true,
      },
      removeFromCart: {
        type: Function,
        required: true,
      },
      clearCart: {
        type: Function,
        required: true,
      },
    },
    methods: {
      getProductName(id) {
        const product = this.$parent.products.find((p) => p.id === id);
        return product?.title || "";
      },
      getProductPrice(id) {
        const product = this.$parent.products.find((p) => p.id === id);
        return product?.price || 0;
      },
    },
  });
  </script>