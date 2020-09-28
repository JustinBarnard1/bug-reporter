<template>
  <tr class="d-flex">
    <td class="col-3">{{ noteProp.creatorEmail }}</td>
    <td v-if="!editing" @click="editBody" class="col-8">
      {{ noteProp.content }}
    </td>
    <td v-else>
      <form @submit.prevent="editFinish" class="form-inline">
        <div class="form-group">
          <input
            v-model="noteProp.content"
            type="text"
            class="form-control"
            placeholder
            aria-describedby="helpId"
          />
        </div>
        <button type="submit" class="btn btn-success">Done</button>
      </form>
    </td>
    <td class="col-2">
      <i @click="deleteNote" class="fa fa-trash" aria-hidden="true"></i>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["noteProp"],
  data() {
    return {
      editNote: {
        content: "",
        id: "",
      },
      editing: false,
    };
  },
  methods: {
    deleteNote() {
      if (this.noteProp.creatorEmail == this.user) {
        let c = confirm("Are you sure you want to delete this?");
        if (c == true) {
          this.$store.dispatch("deleteNote", this.noteProp);
        }
        return;
      }
      return;
    },
    editBody() {
      console.log(this.user);
      if (this.noteProp.creatorEmail == this.user) {
        this.editing = true;
      }
      return;
    },
    editFinish() {
      this.$store.dispatch("editNote", this.noteProp);
      this.editing = false;
    },
    check() {
      console.log(noteProp);
    },
  },
  computed: {
    user() {
      return this.$auth.userInfo.email;
    },
  },
};
</script>

<style>
</style>