export default {
    state: {
      isLoggedIn: false,
      token: null,
    },
    mutations: {
      SET_IS_LOGGED_IN(state, isLoggedIn) {
        state.isLoggedIn = isLoggedIn;
      },
      SET_TOKEN(state, token) {
        state.token = token;
      },
    },
    actions: {
      async login({ commit }, credentials) {
        try {
          // Simulate API call to validate credentials
          const response = await fetch("https://fakestoreapi.com/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });
  
          if (response.ok) {
            const data = await response.json();
            const token = data.token;
  
            commit("SET_IS_LOGGED_IN", true);
            commit("SET_TOKEN", token);
  
            // Store the token in local storage
            localStorage.setItem("token", token);
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Failed to login:", error);
          throw error;
        }
      },
      logout({ commit }) {
        commit("SET_IS_LOGGED_IN", false);
        commit("SET_TOKEN", null);
  
        // Remove the token from local storage
        localStorage.removeItem("token");
      },
    },
  };