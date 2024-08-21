<template>
  <div id="app">
    <Header :comparisonList="comparisonList" :isLoggedIn="isLoggedIn" />
    <div class="container">
      <router-view
        :products="products"
        :comparisonList="comparisonList"
        :addToComparisonList="addToComparisonList"
        :removeFromComparisonList="removeFromComparisonList"
        :clearComparisonList="clearComparisonList"
        :isLoggedIn="isLoggedIn"
      />
    </div>
    <ComparisonList
      v-if="isLoggedIn"
      :comparisonList="comparisonList"
      :removeFromComparisonList="removeFromComparisonList"
      :clearComparisonList="clearComparisonList"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "./components/Header.vue";
import ComparisonList from "./components/ComparisonList.vue";
import {jwtDecode} from "jwt-decode"; // Corrected import statement

export default defineComponent({
  name: "App",
  components: {
    Header,
    ComparisonList,
  },
  setup() {
    const products = ref([]);
    const comparisonList = ref([]);
    const isLoggedIn = ref(!!localStorage.getItem("token"));
    const userId = ref(null);

    const MAX_COMPARISON_ITEMS = 4; // Defined a constant for the maximum number of comparison items
    const router = useRouter();

    onMounted(async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        products.value = await res.json();

        const token = localStorage.getItem("token");
        if (token) {
          userId.value = jwtDecode(token).userId;
          if (userId.value) {
            comparisonList.value =
              JSON.parse(localStorage.getItem(`comparison-${userId.value}`)) ||
              [];
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    });

    const addToComparisonList = (product) => {
      if (!isLoggedIn.value) {
        router.push("/login");
        return;
      }

      if (comparisonList.value.length < MAX_COMPARISON_ITEMS) {
        const existingItem = comparisonList.value.find(
          (item) => item.id === product.id
        );
        if (!existingItem) {
          comparisonList.value.push(product);
          saveComparisonList();
        }
      } else {
        alert("Comparison list is full. You can only add up to 4 items."); // Replaced console.log with alert for user notification
      }
    };

    const removeFromComparisonList = (productId) => {
      if (!isLoggedIn.value || !userId.value) {
        return;
      }

      const index = comparisonList.value.findIndex(
        (item) => item.id === productId
      );
      if (index !== -1) {
        comparisonList.value.splice(index, 1);
        saveComparisonList();
      }
    };

    const clearComparisonList = () => {
      if (!isLoggedIn.value || !userId.value) {
        return;
      }

      comparisonList.value = [];
      saveComparisonList();
    };

    const saveComparisonList = () => {
      try {
        if (userId.value) {
          localStorage.setItem(
            `comparison-${userId.value}`,
            JSON.stringify(comparisonList.value)
          );
        }
      } catch (error) {
        console.error("Failed to save comparison list:", error); // Added error handling for saveComparisonList
      }
    };

    return {
      products,
      comparisonList,
      isLoggedIn,
      addToComparisonList,
      removeFromComparisonList,
      clearComparisonList,
    };
  },
});
</script>

<style>
/* Cleaned up unused CSS styles and ensured consistent usage of quotes */
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
