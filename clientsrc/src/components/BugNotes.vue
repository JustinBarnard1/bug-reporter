<template>
  <tr class="d-flex">
    <td class="col-3">{{ noteProp.creatorEmail }}</td>
    <td class="col-8">{{ noteProp.content }}</td>
    <td class="col-2"><i class="fa fa-trash" aria-hidden="true"></i></td>
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