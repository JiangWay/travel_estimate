/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import {
  getFirestore, doc, setDoc, updateDoc, getDoc, arrayUnion,
} from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { Traveler, travelerConverter } from '@/store/model/traveler'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
}

// Initialize Firebase
initializeApp(firebaseConfig)

const db = getFirestore()

// 全域變數 但無法使用在composition-api 上
Vue.prototype.$db = db

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    traveler: new Traveler(),
  },
  mutations: {
    setTraveler(state, traveler) {
      state.traveler = traveler
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async submitJoinTravelFrom({ state, commit }, joinForm) {
      console.log(joinForm)
      console.log(state.traveler)

      if (state.traveler.joinedTravels) {
        state.traveler.joinedTravels.push(joinForm)
      } else {
        state.traveler.joinedTravels = [joinForm]
      }
      console.log(state.traveler)

      commit('setTraveler', state.traveler)

      // update到firestore

      const docRef = doc(db, 'traveler', state.traveler.id).withConverter(travelerConverter)
      const docSnap = await getDoc(docRef)

      try {
        // To update age and favorite color:
        await updateDoc(docRef, {
          joinedTravels: arrayUnion({ ...joinForm }),
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
  modules: {},
})
