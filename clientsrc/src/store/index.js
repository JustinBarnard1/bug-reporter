import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    notes: {},
    activeBug: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, allBugs) {
      state.bugs = allBugs
    },
    setActive(state, bug) {
      state.activeBug = bug
    },
    setNotes(state, allNotes) {
      state.notes = allNotes
    },
    deleteNote(state, note) {
      state.notes = state.notes.filter(n => n.id != note.id)
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugs({ commit }) {
      api.get('bugs')
        .then(res => {
          commit('setBugs', res.data)
        })
    },
    getBugById({ commit }, id) {
      api.get('bugs/' + id)
        .then(res => {
          commit('setActive', res.data)
        })
    },
    async addBug({ }, bugData) {
      let res = await api.post('bugs', bugData)
      router.push({ name: "BugDetails", params: { bugId: res.data.id } })
    },
    editBug({ commit }, bug) {
      api.put(`bugs/${bug.id}`, bug)
        .then(res => { commit('setActive', res.data) })
    },
    getNotes({ commit }, id) {
      api.get("bugs/" + id + "/notes")
        .then(res => {
          commit("setNotes", res.data)
        })
    },
    addNote({ dispatch }, note) {
      api.post('notes', note)
        .then(n => {
          dispatch('getNotes', note.bugId)
        })
    },
    deleteNote({ commit }, note) {
      api.delete('notes/' + note.id)
        .then(res => {
          commit("deleteNote", note)
        })
    },
    editNote({ dispatch }, note) {
      api.put(`notes/${note.id}`, note)
        .then(n => { dispatch("getNotes", note.bugId) })
    }
  }
})
