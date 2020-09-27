<template>
  <div>
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">{{ bug.title }}</h5>
        <p class="card-text">{{ bug.description }}</p>
      </div>
      <button type="button" class="btn btn-primary">click here</button>
    </div>
    <div></div>
    <div>
      <notes v-for="note in notes" :key="note.id" :noteProp="note" />
    </div>
    <button @click="checker" type="button" class="btn btn-primary">
      asdfa
    </button>
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
    checker() {
      console.log(notes);
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