/* eslint-disable no-unused-vars */
<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <v-card-title class="text-no-wrap pt-1 ps-2">
        新增行程
      </v-card-title>
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
      <v-btn @click="createTravel()">
        create Travel
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore'
import {
  Travel, TravelInfo, TravelType, TravelItem, TravelCost, Company,
} from '@/store/model'

// const db = getFirestore()

// demos
// import DashboardCardSalesByCountries from '@/views/dashboard/DashboardCardSalesByCountries.vue'
// import DashboardDatatable from '@/views/dashboard/DashboardDatatable.vue'

export default {
  components: {

    //   DashboardCardSalesByCountries,
    //   DashboardDatatable,
  },
  mounted() {

  },
  methods: {
    createTravel() {
      const travel = new Travel()
      travel.id = '1'
      travel.status = 'ing'
      travel.info = { ...this.getTravelInfo() }
      travel.travelType = { ...this.getTravelType() }// 旅遊型態 員工旅遊
      travel.travelItems = { ...this.getTravelItems() }
      this.uploadTravel({ ...travel })
    },
    getTravelInfo() {
      const info = new TravelInfo()
      info.title = '2021人還是有夠多員旅 version 2'
      info.subTitle = '六福村 X 夜市 X 燒肉'
      info.desc = '六福村 X 夜市 X 燒肉'
      info.startDate = new Date(2021, 10, 13)
      info.endDate = new Date(2021, 10, 14)
      info.type = 'empTravel'

      return info
    },
    getTravelType() {
      const type = new TravelType()
      type.type = 'empTravel' //  員工旅遊
      type.company = { ...new Company() }

      return type
    },
    getTravelItems() {
      return [
        { ...new TravelItem('六福村', '遊樂園', '開心玩', { ...new TravelCost('itinerary', 'perPerson', 749, true) }, new Date(2021, 10, 13), new Date(2021, 10, 13), []) },
        { ...new TravelItem('坐巴士', '交通', '開心玩', { ...new TravelCost('itinerary', 'total', 25000, true) }, new Date(2021, 10, 13), new Date(2021, 10, 13), []) },
        { ...new TravelItem('葉綠宿', '住宿', '開心玩', { ...new TravelCost('itinerary', 'byCase', 2500, true) }, new Date(2021, 10, 13), new Date(2021, 10, 13), []) },
        { ...new TravelItem('森森燒肉', '食', '開心玩', { ...new TravelCost('itinerary', 'perPerson', 25000, true) }, new Date(2021, 10, 13), new Date(2021, 10, 13), []) },
      ]
    },
    async uploadTravel(travel) {
      try {
      // eslint-disable-next-line no-undef
        const docRef = await addDoc(collection(this.$db, 'travel'), travel)
        console.log('Document written with ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
  },

}
</script>
