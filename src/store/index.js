import Vue from 'vue'
import Vuex from 'vuex'

import subway from "@/assets/subway.jpg";
import subwayDepth from "@/assets/subway-depth.jpg";
import mountain from "@/assets/mountain.jpg";
import mountainDepth from "@/assets/mountain-depth.jpg";
import controller from "@/assets/controller.jpg";
import controllerDepth from "@/assets/controller-depth.jpg";
import boarder from "@/assets/boarder.jpg";
import boarderDepth from "@/assets/boarder-depth.jpg";
import shelf from "@/assets/shelf-blur.jpg";
import shelfDepth from "@/assets/shelf-depth.jpg";
// import flowers from "@/assets/flowers.jpg";
// import flowersDepth from "@/assets/flowers-depth.jpg";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentBG: subway,
        currentDepth: subwayDepth,
        xymove: false,
        sensitivity: 40
    },
    mutations: {
        setImage(state, name) {
            if(name === 'mountain') {
                state.currentBG = mountain;
                state.currentDepth = mountainDepth;
            }
            if(name === 'subway') {
                state.currentBG = subway;
                state.currentDepth = subwayDepth;
            }
            if(name === 'controller') {
                state.currentBG = controller;
                state.currentDepth = controllerDepth;
            }
            if(name === 'boarder') {
                state.currentBG = boarder;
                state.currentDepth = boarderDepth;
            }
            if(name === 'shelf') {
                state.currentBG = shelf;
                state.currentDepth = shelfDepth;
            }
        },
        xymove(state, bool) {
            state.xymove = bool;
        },
        sensitivity(state, num) {
            state.sensitivity = num;
        }
    },
    actions: {
        setImage(context, payload) {
            console.log(payload);
            context.commit('setImage', payload)
        },
        xymove(context, payload) {
            console.log(payload);
            context.commit('xymove', payload)
        },
        sensitivity(context, payload) {
            console.log(payload);
            context.commit('sensitivity', payload)
        }
    },
    modules: {}
})