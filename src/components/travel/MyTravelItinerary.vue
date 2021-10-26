<template>
  <v-card>
    <v-card-title class="align-start">
      {{ itinerary.name }}

      <v-spacer></v-spacer>

      <v-btn
        small
        icon
        class="me-n3 mt-n1"
      >
        <v-icon>
          {{ mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="text-no-wrap text--primary mt-3">
      <p class="font-weight-semibold text-sm mb-1">
        <!-- {{ itinerary.startDate }} -->
        <!-- ~ {{ Date(item.endDate).toLocaleString() }} -->
        費用 : {{ itinerary.travelCost.cost | numeral(0,0) }}
      </p>
      <!--
      <div class="d-flex align-end flex-wrap">
        <span class="font-weight-semibold text-2xl me-1 mb-2">{{ statistics }}</span>
        <span
          class="percentage text-xs mb-2"
          :class="checkChange(change) ? 'success--text':'error--text'"
        > {{ change }}</span>
      </div> -->
      <p class="text-xs text--secondary mb-0">
        {{ itinerary.desc }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDotsVertical } from '@mdi/js'

// import { Timestamp } from 'firebase/firestore'

export default {
  props: {
    statTitle: { type: String, default: '六福村' },
    date: { type: String, default: '11/13' },
    subtitle: { type: String, default: 'Last week' },
    item: { type: Object, default: () => {} },
  },
  computed: {
    itinerary() {
      const data = this.$lodash.cloneDeep(this.item)

      data.startDate = Date(data.startDate.toDate)

      // console.log(new Timestamp(data.startDate).toDate())

      // console.log(Timestamp().now())

      // data.startDate = this.$moment(data.startDate.seconds).format('YYYY-MM-DD')

      return data
    },
  },
  setup() {
    const checkChange = value => {
      const firstChar = value.charAt(0)
      if (firstChar === '+') {
        return true
      }

      return false
    }

    return {
      mdiDotsVertical,
      checkChange,
    }
  },
}
</script>

<style lang="scss" scoped>
.percentage {
  top: -8px;
  position: relative;
}
</style>
