/* eslint-disable no-unused-vars */
<template>
  <v-row>
    <!-- 金額總覽 -->
    <v-col
      cols="12"
      md="4"
    >
      <v-card-title class="text-no-wrap pt-1 ps-2">
        已參加行程
      </v-card-title>
    </v-col>

    <!-- 已參加行程 -->
    <template v-for="(travel ,idx) in joinedTravels">
      <v-col
        :key="idx+'ed'"
        lg="4"
        sm="6"
        cols="12"
        class="align-self-start"
      >
        <v-card>
          <v-img src="@/assets/images/pages/card-basic-brown-watch.jpg"></v-img>
          <v-card-title>{{ travel.info.title }}</v-card-title>
          <v-card-text>
            <p class="text--primary text-base">
              {{ travel.status }}
            </p>
            {{ travel.info.subTitle }}
          </v-card-text>
          <v-card-actions
            class="primary pa-0"
            @click="goToTravel(travel)"
          >
            <v-btn
              color="primary"
              block
              dark
              large
            >
              查看詳情
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </template>
    <!-- 尚未參加行程 -->
    <v-col
      cols="12"
      md="4"
    >
      <v-card-title class="text-no-wrap pt-1 ps-2">
        行程探索
      </v-card-title>
    </v-col>

    <!-- 尚未參加行程 -->
    <template v-for="(travel ,idx) in travelList">
      <v-col
        :key="idx"
        lg="4"
        sm="6"
        cols="12"
        class="align-self-start"
      >
        <v-card>
          <v-img src="@/assets/images/pages/card-basic-brown-watch.jpg"></v-img>
          <v-card-title>{{ travel.info.title }}</v-card-title>
          <v-card-text>
            <p class="text--primary text-base">
              {{ travel.status }}
            </p>
            {{ travel.info.subTitle }}
          </v-card-text>
          <v-card-actions
            class="primary pa-0"
            @click="letsJoin(travel)"
          >
            <v-btn
              color="primary"
              block
              dark
              large
            >
              我要參加
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </template>
    <!-- <v-col
      cols="12"
      md="4"
    >
      <v-row class="match-height">
        <v-col
          cols="12"
          sm="6"
        >
          <one-travel
            :change="newProject.change"
            :color="newProject.color"
            :icon="newProject.icon"
            :statistics="newProject.statistics"
            :stat-title="newProject.statTitle"
            :subtitle="newProject.subtitle"
          >
          </one-travel>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <one-travel
            :change="wynTest.change"
            :color="wynTest.color"
            :icon="wynTest.icon"
            :statistics="wynTest.statistics"
            :stat-title="wynTest.statTitle"
            :subtitle="wynTest.subtitle"
          >
          </one-travel>
        </v-col>
      </v-row>
    </v-col> -->
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
// eslint-disable-next-line no-unused-vars
import { mdiLabelVariantOutline, mdiWalletTravel, mdiBus } from '@mdi/js'
import {
  collection, query, getDocs,
} from 'firebase/firestore'

import { mapState } from 'vuex'
import { TravelStatus } from '@/store/model'
import { travelConverter } from '@/store/model/travel'

export default {
  components: {
    // OneTravel,

    //   DashboardCardSalesByCountries,
    //   DashboardDatatable,
  },
  data() {
    return {
      travelList: [], // 未參加
      joinedTravels: [], // 已參加
    }
  },
  computed: { ...mapState(['traveler']) },
  async created() {
    const q = query(collection(this.$db, 'travel').withConverter(travelConverter))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      const travel = doc.data()
      console.log(travel.id)
      const joinedTravels = this.traveler.joinedTravels.find(t => t.travelId === travel.id)
      if (joinedTravels !== undefined) {
        this.joinedTravels.push(travel)
      } else {
        this.travelList.push(travel)
      }
    })
  },
  methods: {
    goToTravel(data) {
      this.$router.push({
        name: 'travelOverview',
        params: {
          travel: {
            id: data.id,
            status: data.status,
            info: data.info,
            travelItems: data.travelItems,
            travelType: data.travelType,
          },
        },
      })
    },
    letsJoin(data) {
      // 接續頁面可考慮做keepAlive
      // console.log(data)
      this.$router.push({
        name: 'travelAgreement',
        params: {
          travel: {
            id: data.id,
            status: data.status,
            info: data.info,
            travelItems: data.travelItems,
            travelType: data.travelType,
          },
        },
      })
    },
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
      TravelStatus,
    }
  },
}
</script>
