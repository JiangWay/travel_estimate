<template>
  <div>
    <v-row>
      <!-- Lifetime Membership -->
      <v-col
        md="6"
        lg="8"
        cols="12"
      >
        <v-card class="overflow-hidden">
          <v-row class="ma-0 h-full">
            <v-col
              cols="12"
              sm="8"
              md="12"
              lg="8"
              order="2"
              order-lg="1"
            >
              <v-card-title>2021人超多旅行團</v-card-title>
              <v-card-text>
                六福村 X 逢甲夜市 X 森森燒肉
              </v-card-text>
              <v-card-text>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <div class="me-auto pe-4">
                  <p class="d-flex align-center mb-6">
                    <v-icon color="primary">
                      {{ icons.mdiLockOpenOutline }}
                    </v-icon>
                    <span class="ms-3">Full Access</span>
                  </p>
                  <p class="d-flex align-center mb-0">
                    <v-icon color="primary">
                      {{ icons.mdiAccountOutline }}
                    </v-icon>
                    <span class="ms-3">23 Members</span>
                  </p>
                </div>

                <v-divider
                  v-if="$vuetify.breakpoint.smAndUp"
                  vertical
                  inset
                >
                </v-divider>

                <div class="ms-auto ps-4">
                  <p class="d-flex align-center mb-6">
                    <v-icon color="primary">
                      {{ icons.mdiStarOutline }}
                    </v-icon>
                    <span class="ms-3">Access all Features</span>
                  </p>
                  <p class="d-flex align-center mb-0">
                    <v-icon color="primary">
                      {{ icons.mdiTrendingUp }}
                    </v-icon>
                    <span class="ms-3">Lifetime Free Update</span>
                  </p>
                </div>
              </v-card-actions>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="12"
              lg="4"
              order="1"
              order-lg="2"
              class="memberpricing-bg"
            >
              <div class="membership-pricing">
                <p class="mt-16 text--primary">
                  <sub class="text-2xl">$</sub>
                  <sup class="font-weight-semibold">10,000</sup>
                  <sub class="text-xl">NTD</sub>
                </p>
                <p class="my-6 text--secondary text-sm">
                  偉康科技旅遊補助
                </p>
                <v-btn
                  color="primary"
                  class="mt-6"
                  @click="readyToJoin()"
                >
                  確定加入
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  mdiChevronUp,
  mdiChevronDown,
  mdiCartPlus,
  mdiShareVariantOutline,
  mdiLockOpenOutline,
  mdiStarOutline,
  mdiAccountOutline,
  mdiTrendingUp,
  mdiHelpCircleOutline,
} from '@mdi/js'

export default {
  setup(props, context) {
    console.log(context)
    console.log(context.root)
    console.log(context.root.$router)
    console.log(context.$router)
    const router = context.root.$router
    const route = context.root.$route
    const { travel } = route.params
    console.log(travel)

    const readyToJoin = () => {
      router.push({
        name: 'travelForm',
        params: {
          travel: {
            id: travel.id,
            status: travel.status,
            info: travel.info,
            travelItems: travel.travelItems,
            travelType: travel.travelType,
          },
        },
      })
    }

    return {
      readyToJoin,

      // icons
      icons: {
        mdiChevronUp,
        mdiChevronDown,
        mdiCartPlus,
        mdiShareVariantOutline,
        mdiLockOpenOutline,
        mdiStarOutline,
        mdiAccountOutline,
        mdiTrendingUp,
        mdiHelpCircleOutline,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/plugins/vuetify/default-preset/preset/mixins.scss';

.avatar-center {
  top: -2rem;
  left: 1rem;
  border: 3px solid white;
  position: absolute;
}

// membership pricing
@include theme--child(memberpricing-bg) using ($material) {
  background-color: rgba(map-deep-get($material, 'primary-shade'), map-deep-get($material, 'states', 'hover'));
}

.memberpricing-bg {
  position: relative;
}
.membership-pricing {
  text-align: center;
  sup {
    font-size: 3.75rem;
    top: 9px;
  }
}
</style>
