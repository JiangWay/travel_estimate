<template>
  <v-menu offset-y left nudge-bottom="14" min-width="230" content-class="user-profile-menu-content">
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
        <v-avatar size="40px" v-bind="attrs" v-on="on">
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
        <div class="d-inline-flex flex-column justify-center ms-3" style="vertical-align:middle">
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
      <v-list-item v-if="userInfo.isLogin" link @click="logout()">
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
      <v-list-item v-else link @click="login()">
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
import { reactive } from '@vue/composition-api'

export default {
  data() {
    return {}
  },
  computed: {},
  methods: {},
  setup() {
    const auth = getAuth()

    // 登入狀態

    // const user = auth.currentUser
    const userInfo = reactive({
      displayName: 'wyn',
      email: '123@mail.com',
      isLogin: false,
    })

    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('已登入')
        console.log(user)
        userInfo.displayName = user.displayName
        userInfo.email = user.email
        userInfo.isLogin = true
        console.log(userInfo.isLogin)
      } else {
        console.log('已被登出')
        userInfo.displayName = ''
        userInfo.email = ''
        userInfo.isLogin = false
      }
    })

    const logout = async () => {
      await signOut(auth)
        .then(() => {
          console.log('登出成功')
        })
        .catch(error => {
          console.log(error)
        })
    }
    const login = async () => {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        login_hint: 'user@webcomm.com.tw',
      })

      // const auth = getAuth()

      signInWithPopup(auth, provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken

          // The signed-in user info.
          const { user1 } = result

          // ...
          console.log(token)
          console.log(user1)

          console.log('登入成功')
        })
        .catch(error => {
          // Handle Errors here.
          // eslint-disable-next-line no-unused-vars
          const errorCode = error.code
          // eslint-disable-next-line no-unused-vars
          const errorMessage = error.message

          // The email of the user's account used.
          // eslint-disable-next-line no-unused-vars
          const { email } = error

          // The AuthCredential type that was used.
          // eslint-disable-next-line no-unused-vars
          const credential = GoogleAuthProvider.credentialFromError(error)

          // ...
        })
    }

    return {
      icons: {
        mdiAccountOutline,
        mdiCogOutline,
        mdiLogoutVariant,
        mdiLoginVariant,
      },
      login,
      logout,
      userInfo,
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
