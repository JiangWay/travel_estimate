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
    const router = context.root.$router
    const route = context.root.$route
    const { travel } = route.params
    console.log('travel = ', travel)

    // 獲得會員資料 vue2 的用法
    const store = context.root.$store
    const { traveler } = store.state
    console.log('traveler = ', traveler)

    // 響應 joinedTravel
    const joinedTravel = reactive(new JoinedTravel())
    console.log('joinedTravel = ', joinedTravel)
    try {
      joinedTravel.travelId = travel.id
      joinedTravel.travelStatus = travel.status
      joinedTravel.joinedItems = []
      const travelItems = Object.keys(travel.travelItems).map(key => ({ itemId: key, ...travel.travelItems[key] }))
      travelItems.forEach(item => {
        console.log(item)
        const joinedItem = new JoinedItem()
        joinedItem.itemId = item.itemId
        joinedItem.name = item.name
        joinedItem.enrollment = 1
        joinedItem.note = item.desc
        joinedTravel.joinedItems.push(joinedItem)
      })
    } catch (err) {
      console.log(err)
    }
    console.log('joinedTravel = ', joinedTravel)

    const submit = async () => {
      console.log(joinedTravel.joinedItems)
      const form = { ...joinedTravel }
      form.joinedItems = form.joinedItems.map(item => ({ ...item }))
      console.log(form)

      // access an action
      await store.dispatch('submitJoinTravelFrom', form)
      router.push({ name: 'allTravels' })
    }
    console.log(joinedTravel.joinedItems)

    return {
      joinedItems: joinedTravel.joinedItems,
      submit,
    }
  },
}
</script>
