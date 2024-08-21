<template>
    <div class="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 z-50">
      <div class="container mx-auto">
        <h2 class="text-2xl font-bold mb-4">Comparison List</h2>
        <table class="w-full">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-2">Image</th>
              <th class="p-2">Title</th>
              <th class="p-2">Description</th>
              <th class="p-2">Price</th>
              <th class="p-2">Rating</th>
              <th class="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in comparisonList" :key="item.id" class="border-b">
              <td class="p-2">
                <img :src="item.image" :alt="item.title" class="w-20 h-20 object-contain" />
              </td>
              <td class="p-2">{{ item.title }}</td>
              <td class="p-2">{{ item.description }}</td>
              <td class="p-2">${{ item.price.toFixed(2) }}</td>
              <td class="p-2">{{ item.rating.rate }} ({{ item.rating.count }})</td>
              <td class="p-2">
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  @click="removeFromComparisonList(item.id)"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-end mt-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="clearComparisonList"
          >
            Clear Comparison List
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "ComparisonList",
    props: {
      comparisonList: {
        type: Array,
        required: true,
      },
      removeFromComparisonList: {
        type: Function,
        required: true,
      },
      clearComparisonList: {
        type: Function,
        required: true,
      },
    },
  });
  </script>