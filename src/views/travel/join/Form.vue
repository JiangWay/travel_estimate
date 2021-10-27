<template>
  <v-row class="match-height">
    <!-- horizontal -->
    <v-col
      cols="12"
      md="6"
    >
      <v-card>
        <v-card-title>行前問券</v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <template
                v-for="(item,idx) in joinedItems"
              >
                <v-col
                  :key="idx"
                  cols="12"
                  md="3"
                >
                  <label for="firstname">{{ item.name }} 人數</label>
                </v-col>

                <v-col
                  :key="idx + 'enroll'"
                  cols="12"
                  md="9"
                >
                  <v-text-field
                    id="firstname"
                    v-model="item.enrollment"
                    outlined
                    dense
                    placeholder="人數"
                    hide-details
                  ></v-text-field>
                </v-col>
              </template>
              <!-- <v-col
                cols="12"
                md="3"
              >
                <label for="firstname">六福村 人數</label>
              </v-col>

              <v-col
                cols="12"
                md="9"
              >
                <v-text-field
                  id="firstname"
                  v-model="firstname"
                  outlined
                  dense
                  placeholder="六福村 人數"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="3"
              >
                <label for="email">巴士 人數</label>
              </v-col>

              <v-col
                cols="12"
                md="9"
              >
                <v-text-field
                  id="email"
                  v-model="email"
                  outlined
                  dense
                  placeholder="巴士 人數"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="3"
              >
                <label for="mobile">住宿 人數</label>
              </v-col>

              <v-col
                cols="12"
                md="9"
              >
                <v-text-field
                  id="mobile"
                  v-model="mobile"
                  type="number"
                  outlined
                  dense
                  placeholder="住宿 人數"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="3"
              >
                <label for="password">燒肉 人數</label>
              </v-col>

              <v-col
                cols="12"
                md="9"
              >
                <v-text-field
                  id="password"
                  v-model="password"
                  type="number"
                  outlined
                  dense
                  placeholder="燒肉 人數"
                  hide-details
                ></v-text-field>
              </v-col> -->

              <!-- <v-col
                offset-md="3"
                cols="12"
              >
                <v-checkbox
                  v-model="checkbox"
                  label="Remember me"
                  class="mt-0"
                  hide-details
                ></v-checkbox>
              </v-col> -->

              <v-col
                offset-md="3"
                cols="12"
              >
                <v-btn
                  color="primary"
                  @click="submit()"
                >
                  Submit
                </v-btn>
                <v-btn
                  type="reset"
                  class="mx-2"
                  outlined
                >
                  Reset
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import { reactive } from '@vue/composition-api'

import { JoinedTravel, JoinedItem } from '@/store/model'

export default {
  setup(props, context) {
    // const router = context.root.$router
    const route = context.root.$route
    const { travel } = route.params
    console.log('travel = ', travel)

    // 獲得會員資料 vue2 的用法
    const store = context.root.$store
    const { traveler } = store.state
    console.log('traveler = ', traveler)

    // TODO: 響應 joinedTravel
    const joinedTravel = reactive(new JoinedTravel())
    console.log('joinedTravel = ', joinedTravel)
    try {
      joinedTravel.travelId = travel.id
      joinedTravel.travelStatus = travel.status
      joinedTravel.JoinedItems = []
      const travelItems = Object.keys(travel.travelItems).map(key => ({ itemId: key, ...travel.travelItems[key] }))
      travelItems.forEach(item => {
        console.log(item)
        const joinedItem = new JoinedItem()
        joinedItem.itemId = item.itemId
        joinedItem.name = item.name
        joinedItem.enrollment = 1
        joinedItem.note = item.desc
        joinedTravel.JoinedItems.push(joinedItem)
      })
    } catch (err) {
      console.log(err)
    }
    console.log('joinedTravel = ', joinedTravel)

    // const formArray = []
    // const firstname = ref('')
    // const email = ref('')
    // const mobile = ref()
    // const password = ref()
    // const checkbox = ref(false)

    const submit = () => {
      console.log(joinedTravel.JoinedItems)
    }

    return {
      // firstname,
      // email,
      // mobile,
      // password,
      // checkbox,
      joinedItems: joinedTravel.JoinedItems,
      submit,
    }
  },
}
</script>
