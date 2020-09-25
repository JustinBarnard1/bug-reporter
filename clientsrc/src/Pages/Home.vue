<template>
  <div class="home container-fluid">
    <h1>Bring On The Bugs!</h1>
    <div class="row">
      <div class="col-8 card my-1 bg-primary" v-for="bug in bugs" :key="bug.id">
        <div class="card-body">
          <span>{{ bug.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getBugs");
  },
  data() {
    return {
      newBug: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
    profile() {
      return this.$auth.userInfo;
    },
  },
  addBug() {
    this.$store.dispatch("addBug", this.newBug);
    this.newBug = { title: "", description: "" };
  },
  editBug() {},
};
</script>
