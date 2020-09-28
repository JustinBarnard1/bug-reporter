<template>
  <div>
    <div class="container-fluid mt-3">
      <p>Title:</p>
      <h1 class="">{{ bug.title }}</h1>
      <div class="d-flex justify-content-between">
        <p class="">Submitted by: {{ bug.creatorEmail }}</p>
        <div class="d-flex">
          <small><p class="mr-3 pt-1">Status:</p></small>
          <p v-if="!bug.closed" class="text-success">Open</p>
          <p v-else class="text-danger">Closed</p>
        </div>
      </div>
    </div>
    <div class="border border-dark mx-3">{{ bug.description }}</div>
    <div class="d-flex justify-content-end my-2">
      <button @click="markClosed" type="button" class="btn btn-danger mr-3">
        Close
      </button>
    </div>
    <div class="container-fluid">
      <h2>Notes</h2>
    </div>
    <div class="mx-5">
      <table class="table">
        <thead>
          <tr class="d-flex">
            <th scoped="col" class="col-3">Name</th>
            <th scoped="col" class="col-8">Message</th>
            <th scoped="col" class="col-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          <notes v-for="note in notes" :key="note.id" :noteProp="note" />
        </tbody>
      </table>
    </div>
    <div class="container d-flex justify-content-end">
      <button type="button" class="btn btn-success">Add</button>
    </div>
  </div>
</template>

<script>
import Notes from "../components/BugNotes";
export default {
  name: "bugdetails",
  data() {
    return {
      newNote: {},
    };
  },
  mounted() {
    this.$store.dispatch("getBugById", this.$route.params.bugId);
    this.$store.dispatch("getNotes", this.$route.params.bugId);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    },
    user() {
      return this.$auth.userInfo.email;
    },
  },
  methods: {
    addNote() {
      this.newNote.bugId = this.$route.params.bugId;
      this.$store.dispatch("addNote", this.newNote);
      this.newNote = {};
    },
    editBody() {
      this.editing = true;
      this.bug = this.bugId;
    },
    editFinish() {
      this.$sote.dispatch("editBug", this.bug);
      this.editing = false;
    },
    markClosed() {
      this.$store.dispatch("editBug", {
        id: this.bug,
      });
    },
  },
  components: {
    Notes,
  },
  props: ["bugId"],
};
</script>

<style>
</style>