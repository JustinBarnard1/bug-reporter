<template>
  <div class="home container-fluid">
    <h1 class="text-center">Bring On The Bugs!</h1>
    <form
      class="d-flex justify-content-center"
      v-if="$auth.isAuthenticated"
      @submit.prevent="addBug"
    >
      <input
        class="bg-light"
        type="text"
        placeholder="New Bug Title"
        v-model="newBug.title"
        required
      />
      <input
        class="bg-light"
        type="text"
        placeholder="Bug Description"
        v-model="newBug.description"
      />
      <button type="submit" class="btn text-dark border border-light">
        Create New Bug
      </button>
    </form>
    <div class="row mt-2">
      <div class="col d-flex justify-content-start">
        <h1>Current Bugs</h1>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-end">
        <input
          class="mx-3 mt-1"
          v-model="checked"
          type="checkbox"
          name
          autocomplete="off"
        />
        <small><p>Hide Closed</p></small>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Reported By</th>
          <th scope="col">Status</th>
          <th scope="col">Last Modified</th>
        </tr>
      </thead>
      <tbody v-for="bug in bugs" :key="bug.id">
        <tr v-if="!checked || !bug.closed">
          <router-link :to="{ name: 'BugDetails', params: { bugId: bug.id } }">
            <th class="my-0" scope="row">{{ bug.title }}</th>
          </router-link>
          <td>{{ bug.creatorEmail }}</td>
          <td v-if="!bug.closed" class="text-primary">Open</td>
          <td v-else class="text-danger">Closed</td>
          <td>{{ bug.closedDate | formatDate }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="row d-flex justify-content-center">
      <div class="col-8 card my-1 bg-primary" v-for="bug in bugs" :key="bug.id">
        <div class="card-body">
          <span
            >{{ bug.title }} - {{ bug.creatorEmail }} - {{ bug.closed }} -
            {{ bug.closedDate | formatDate }}</span
          >
        </div>
      </div>
    </div> -->
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
      checked: false,
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
  methods: {
    addBug() {
      this.creatorEmail = this.profile.email;
      this.$store.dispatch("addBug", this.newBug);
      this.newBug = { title: "", description: "" };
    },
  },
};
</script>
