/* eslint-disable no-unused-vars */
<template>
  <v-menu
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    content-class="user-profile-menu-content"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        bottom
        :color="userInfo.isLogin ? 'success' : 'error'"
        overlap
        offset-x="12"
        offset-y="12"
        class="ms-4"
        dot
      >
        <v-avatar
          size="40px"
          v-bind="attrs"
          v-on="on"
        >
          <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
        </v-avatar>
      </v-badge>
    </template>
    <v-list>
      <div class="pb-3 pt-2">
        <v-badge
          bottom
          :color="userInfo.isLogin ? 'success' : 'error'"
          overlap
          offset-x="12"
          offset-y="12"
          class="ms-4"
          dot
        >
          <v-avatar size="40px">
            <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
          </v-avatar>
        </v-badge>
        <div
          class="d-inline-flex flex-column justify-center ms-3"
          style="vertical-align:middle"
        >
          <span class="text--primary font-weight-semibold mb-n1">{{ userInfo.displayName }} </span>
          <small class="text--disabled">{{ userInfo.email }}</small>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Profile -->
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiAccountOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <!-- Settings -->
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiCogOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <!-- Logout -->
      <v-list-item
        v-if="userInfo.isLogin"
        link
        @click="logout()"
      >
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiLogoutVariant }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Login -->
      <v-list-item
        v-else
        link
        @click="login()"
      >
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiLoginVariant }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiCogOutline, mdiLogoutVariant, mdiLoginVariant } from '@mdi/js'
// eslint-disable-next-line object-curly-newline
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { mapMutations } from 'vuex'
import { travelerConverter } from '@/store/model/traveler'

export default {
  data() {
    return {
      userInfo: {
        displayName: 'wyn',
        email: '123@mail.com',
        isLogin: false,
      },
    }
  },
  computed: {},
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('已登入')
        console.log(user)
        this.userInfo.displayName = user.displayName
        this.userInfo.email = user.email
        this.userInfo.isLogin = true

        // 用uid 將traveler呼叫出來

        this.checkTraveler(user)
        console.log(this.userInfo.isLogin)
      } else {
        console.log('已被登出')
        this.userInfo.displayName = ''
        this.userInfo.email = ''
        this.userInfo.isLogin = false

        // 登出則清除
        this.setTraveler({})
      }
    })
  },
  methods: {
    ...mapMutations([
      'setTraveler',
    ]),
    async logout() {
      const auth = getAuth()
      await signOut(auth)
        .then(() => {
          console.log('登出成功')
        })
        .catch(error => {
          console.log(error)
        })
    },
    async login() {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        login_hint: 'user@webcomm.com.tw',
      })

      // const auth = getAuth()
      const auth = getAuth()
      signInWithPopup(auth, provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken

          // The signed-in user info.
          const { user } = result
          console.log(user)
          console.log(token)
          this.checkTraveler(user)

          console.log('登入成功')
        })
        .catch(error => {
          // Handle Errors here.
          // const errorCode = error.code
          // const errorMessage = error.message
          // const { email } = error
          // const credential = GoogleAuthProvider.credentialFromError(error)
          console.log(error)
        })
    },
    async checkTraveler(user) {
      console.log('確認旅行者')
      const docRef = doc(this.$db, 'traveler', user.uid).withConverter(travelerConverter)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log('已存在的旅行者')
        console.log(docSnap.data())
        this.setTraveler(docSnap.data())
        console.log('Document data:', docSnap.data())
      } else {
        console.log('新加入的旅行者')

        // doc.data() will be undefined in this case
        // 首次登入 只取要的資訊存進去
        this.saveTraveler(user)
        console.log('No such document!')
      }
    },
    async saveTraveler(user) {
      // eslint-disable-next-line no-undef
      try {
        const docRef = await setDoc(doc(this.$db, 'traveler', user.uid).withConverter(travelerConverter), {
          id: user.uid, // uid
          name: user.displayName, // displayName
          email: user.email, // email
          joinedTravels: [],
        })
        this.setTraveler({
          id: user.uid, // uid
          name: user.displayName, // displayName
          email: user.email, // email
          joinedTravels: [],
        })
        console.log('Document written with ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
  },
  setup() {
    return {
      icons: {
        mdiAccountOutline,
        mdiCogOutline,
        mdiLogoutVariant,
        mdiLoginVariant,
      },
    }
  },
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
