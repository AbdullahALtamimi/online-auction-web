import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);

const state = {
    user:null
};

const store = new vuex.Store({
    state,
    getters:{
        user: (state) => {
            return state.user;
        }
    },
    actions:{
        user(context,user) {
            context.commit('user',user);
        }
    },
    mutations:{
        user(state,user) {
            state.user = user;
        }
    },
})

export default store;