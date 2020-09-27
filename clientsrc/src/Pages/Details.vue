<template></template>

<script>
import Note from "../components/Notes";
export default {
  name: "details",
  data() {
    return {
      newNote: {},
    };
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
  mounted() {
    this.$store.dispatch("getBugById", this.$route.params.bugId);
    this.$store.dispatch("getNotes", this.$route.params.bugId);
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
};
</script>

<style>
</style>