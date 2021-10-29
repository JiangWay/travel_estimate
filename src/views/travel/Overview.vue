/* eslint-disable no-unused-vars */
<template>
  <v-row>
    <!-- 總覽 -->
    <v-col
      cols="12"
      md="8"
    >
      <overview-statistics-card
        :over-status-card="overStatusCard"
      ></overview-statistics-card>
      <!-- {{ itinerarayTotalCost }} -->
    </v-col>

    <!-- 團購總覽 -->
    <v-col
      cols="12"
      md="4"
    >
      <v-card-title class="text-no-wrap pt-1 ps-2">
        團購
      </v-card-title>
    </v-col>
    <!-- 我的項目 -->
    <v-col
      cols="12"
      md="4"
    >
      <v-card-title class="text-no-wrap pt-1 ps-2">
        我的項目
      </v-card-title>
    </v-col>
    <!-- 行程 -->
    <v-col
      cols="12"
      md="4"
    >
      <v-card-title class="text-no-wrap pt-1 ps-2">
        旅遊行程
      </v-card-title>
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <v-row class="match-height">
        <v-col
          v-for="(item ,idx) in travel.travelItems"
          :key="idx"
          cols="12"
          sm="6"
        >
          <MyTravelItinerary
            :item="item"
          >
          </MyTravelItinerary>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
// eslint-disable-next-line no-unused-vars
import { mdiLabelVariantOutline, mdiWalletTravel, mdiBus } from '@mdi/js'
import OverviewStatisticsCard from '@/components/travel/OverviewStatisticsCard.vue'
import MyTravelItinerary from '@/components/travel/MyTravelItinerary.vue'
import { Travel } from '@/store/model'

export default {
  components: {
    OverviewStatisticsCard,
    MyTravelItinerary,

  },
  data() {
    return {
      travel: new Travel(),
      cardInfos: [],
    }
  },
  computed: {
    travelItems() {
      return Object.keys(this.travel.travelItems).map(key => this.travel.travelItems[key])
    },
    itinerarayTotalCost() {
      const totalCost = this.travelItems.reduce((accumulator, item) => {
        if (item.travelCost.cost && item.travelCost.countType === 'perPerson') {
          return accumulator + item.travelCost.cost
        }

        if (item.travelCost.cost && item.travelCost.countType === 'total') {
          return accumulator + item.travelCost.cost / 20
        }

        return accumulator
      }, 0)
      console.log(totalCost)

      return totalCost
    },
    totalCost() {
      return this.itinerarayTotalCost + 500 + 700
    },
    overStatusCard() {
      const array = [
        { title: '旅遊行程', total: this.itinerarayTotalCost },
        { title: '團購', total: 500 },
        { title: '我的項目', total: 700 },
        { title: '總花費', total: this.totalCost },
      ]
      console.log(array)

      return this.$lodash.cloneDeep(array)
    },
  },
  created() {
    this.travel = this.$route.params.travel
  },

  mounted() {

    // console.log(this.travel)
  },
  methods: {

  },
  setup() {
    // vertical card options
    const newProject = {
      statTitle: '2021人超多員旅',
      icon: mdiBus,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: '862',
      change: '-18%',
    }
    const wynTest = {
      statTitle: 'wynTest',
      icon: mdiLabelVariantOutline,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: '862',
      change: '-18%',
    }

    return {
      newProject,
      wynTest,
    }
  },
}
</script>
