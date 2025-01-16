<template>
  <div class="login-form">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
  </div>
</template>

<script>
import apiClient, { devBasicAuth } from "@/api/apiClient";

export default {
  name: "LoginForm",
  data() {
    return {
      msg: String,
    };
  },
  methods: {
    async authenticate() {
      try {
        devBasicAuth();

        const response = await apiClient.get("/get_detailed_trunk?username=boloplayer");
        console.log(response);
        this.msg = response.data;
      } catch (error) {
        console.error("Authentication failed:", error);
        this.response = error.response?.data || "Error occurred";
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
