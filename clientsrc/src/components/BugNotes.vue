<template>
  <div>
    <div class="col d-flex justify-content-center">
      <h1 class="bg-dark text-light">
        should be here
        {{ noteProp.content }}
      </h1>
      <form @submit.prevent="editFinish" v-if="editing" class="form-inline">
        <div class="form-group">
          <input
            v-model="noteProp.content"
            type="text"
            name
            class="form-control"
            placeholder
            aria-describedby="helpId"
          />
        </div>
        <button type="submit" class="btn btn-success">Done</button>
        <small>
          <i class="ml-3 text-danger" @click="deleteNote">Delete</i>
        </small>
      </form>
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
  },
};
</script>

<style>
</style>