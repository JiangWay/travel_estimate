/* eslint-disable no-unused-vars */
<template>
  <v-row>
    <!-- 金額總覽 -->
    <v-col
      cols="12"
      md="4"
    >
      <v-card-title class="text-no-wrap pt-1 ps-2">
        所有行程
      </v-card-title>
    </v-col>

    <v-col
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
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
// eslint-disable-next-line no-unused-vars
import { mdiLabelVariantOutline, mdiWalletTravel, mdiBus } from '@mdi/js'
import {
  collection, query, getDocs,
} from 'firebase/firestore'
import OneTravel from '@/components/travel/OneTravel.vue'

// demos
// import DashboardCardSalesByCountries from '@/views/dashboard/DashboardCardSalesByCountries.vue'
// import DashboardDatatable from '@/views/dashboard/DashboardDatatable.vue'

export default {
  components: {
    OneTravel,

    //   DashboardCardSalesByCountries,
    //   DashboardDatatable,
  },
  async mounted() {
    const q = query(collection(this.$db, 'travel'))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
    })
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
