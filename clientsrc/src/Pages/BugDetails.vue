<template>
  <div class="noOverflow">
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
    <p @click="editBody" v-if="!editing" class="border border-dark mx-3">
      {{ bug.description }}
    </p>
    <form @submit.prevent="editFinish" v-if="editing" class="form-inline">
      <div class="form-group">
        <input
          v-model="bug.description"
          type="text"
          name
          class="form-control"
          placeholder
          aria-describedby="helpId"
        />
      </div>
      <button type="submit" class="btn btn-success">Done</button>
    </form>
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
      <form class="form-inline" @submit.prevent="addNote">
        <div class="form-group">
          <label for></label>
          <input
            v-model="newNote.content"
            type="text"
            name
            class="form-control"
            placeholder="Note"
            aria-describedby="helpId"
          />
          <button type="submit" class="btn btn-success">Add Note</button>
        </div>
      </form>
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
      editing: false,
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
      if (!this.bug.closed == true && this.bug.creatorEmail == this.user) {
        this.editing = true;
        this.bug.closedDate = new Date();
      }
      return;
    },
    editFinish() {
      this.$store.dispatch("editBug", this.bug);
      this.editing = false;
    },
    markClosed() {
      if (this.bug.closed == false) {
        let c = confirm(
          "Are you sure you want to close this? It can not be undone."
        );
        if (c == true) {
          this.bug.closed = true;
          this.$store.dispatch("editBug", this.bug);
        }
        return;
      }
      return;
    },
  },
  components: {
    Notes,
  },
  props: ["bugId"],
};
</script>

<style>
.noOverflow {
  overflow-x: hidden;
}
</style>