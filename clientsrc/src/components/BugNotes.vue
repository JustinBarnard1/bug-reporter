<template>
  <tr>
    <td class>{{ noteProp.creatorEmail }}</td>
    <td>{{ noteProp.content }}</td>
    <td><i class="fa fa-trash" aria-hidden="true"></i></td>
  </tr>
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
    check() {
      console.log(noteProp);
    },
  },
};
</script>

<style>
</style>