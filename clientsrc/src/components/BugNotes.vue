<template>
  <div>
    <div class="col d-flex justify-content-center">
      <h1 class="bg-dark text-light">
        should be here
        {{ noteProp.content }}
        {{ noteProp.bugId }}
        {{ noteProp.flagged }}
      </h1>

      <button @click="logg" type="button" class="btn btn-primary"></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["noteProp"],
  data() {
    return {
      note: {},
      editing: false,
    };
  },
  methods: {
    deleteNote() {
      this.$store.dispatch("deleteNote", this.noteProp);
    },
    editBody() {
      this.editing = true;
      this.note = this.noteProp;
    },
    editFinish() {
      this.$store.dispatch("editNote", this.note);
      this.editing = false;
    },
    logg() {
      console.log(this.$store.state.notes);
    },
  },
};
</script>

<style>
</style>