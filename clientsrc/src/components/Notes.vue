<template>
  <div class="mx-2 mb-2">
    <li class="offset-1 card">
      <p
        class="d-flex justify-content-left p-2"
        v-if="!editing"
        @click="editBody"
      >
        {{ noteProp.body }}
      </p>
      <form @submit.prevent="editFinish" v-if="editing" class="form-inline">
        <div class="form-group">
          <input
            style="max-width: 13em"
            v-model="note.body"
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
    </li>
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