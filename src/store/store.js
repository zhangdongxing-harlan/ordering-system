import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        menuItems: {},
        currentUser: '',
        isLogin: false
    },
    getters: {
        currentUser(state) {
            return state.currentUser;
        },
        isLogin(state) {
            return state.isLogin;
        }
    },
    mutations: {
        setMenuItems(state, data) {
            state.menuItems = data;
        },
        setUser(state, data) {
            state.currentUser = data;
            state.isLogin = true;
        },
        removeUser(state){
            state.currentUser = null;
            state.isLogin = false;
        }
    },
    actions: {
        login(context, data) {
            context.commit('setUser',data);
        },
        removeLogin(context,data){
            context.commit('removeUser');
        }
    }
})