<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              Materio
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            歡迎又來漆桃! 🍑
          </p>
          <!-- <p class="mb-2">
            請登入
          </p> -->
        </v-card-text>

        <!-- social links -->
        <v-card-actions class="d-flex justify-center">
          <v-btn v-for="link in socialLink" :key="link.icon" icon class="ms-1">
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color" @click="link.login()">
              {{ link.icon }} </v-icon
            >登入
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
    />

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiGoogle } from '@mdi/js'

import { onMounted } from '@vue/composition-api'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import router from '@/router'

export default {
  setup() {
    const getGoogleAuth = async () => {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        login_hint: 'user@webcomm.com.tw',
      })
      const auth = getAuth()

      signInWithPopup(auth, provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken

          // The signed-in user info.
          const { user } = result

          // ...
          console.log(token)
          console.log(user)
          router.push({ name: 'allTravels' })
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
    onMounted(() => {})
    const socialLink = [
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
        login: () => {
          getGoogleAuth()
        },
      },
    ]

    return { getGoogleAuth, socialLink }
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
