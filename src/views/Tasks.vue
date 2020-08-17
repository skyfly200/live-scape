<template lang="pug">
.tasks
  v-container.tasks(fluid).d-flex
    v-card.ma-2.pa-2(v-for="task in tasks")
      v-img(v-if="task.images.length", :src="task.images[0]", height="200")
      v-card-title {{ task.title }}
      v-card-subtitle {{ task.description }}
      v-divider
      v-card-text
        h4 Customer Name
        p {{ locations[task.location].customerName }}
        h4 Address
        p {{ locations[task.location].address }}
        v-expansion-panels(flat)
          v-expansion-panel
            v-expansion-panel-header Tools
            v-expansion-panel-content
              v-list(avatar, dense)
                v-list-item(v-for="t in task.tools", two-line)
                  v-list-item-avatar(v-if="tools[t].image")
                    v-img(:src="tools[t].image")
                  v-list-item-content
                    v-list-item-title {{ tools[t].name }}
                    v-list-item-subtitle {{ tools[t].description }}
      v-card-actions
        v-btn View Job
        v-spacer
        v-btn Start
</template>

<script>
export default {
  name: "Tasks",
  data: () => ({
    tasks: [
      {
        id: 0,
        location: 0,
        title: "Weed and Deadhead",
        description: "Weed and deadhead the back and side yards",
        notes: "",
        tools: [0, 1, 2],
        images: [
          "https://lh3.googleusercontent.com/k7vCCwIjHUt-9TnUltysFDAK5DQ5XifzdGefg-ypZNOQvE8NeOfqqRpvixDAQQCHzrveLvlwFdHGQcpd2Bv7vo6AoLpJqdYnpATSVu-93A6u0U7RPmxVUKO504X9IFnYNSTdVZxn84sdv_qSxO1LP9p_jTcA0792swb_psPkPSCxWEM_LbC8nsb9fIW3N6FF-YcR8H47IKw9NIN13JrOuoFPdvq5pVE7jCEjscYQhBvVaMy4MDK0Nk4zCVy52ILf20ijNFIqNPGuPx2rMxQSRyxoIoM9vUQ5me6-j3VkpXgi2fLwMwwR9SSo2XlKsy-4d1ZgmJ-vCyYP5plwFw6kkmy89i1y_nleJRAtKFfyKL6eoAddsUDGe_43FUr3DP2sp6wphldbVj0RJP64BEVlW6Qbl_hBmcwZeUZsJnRzz0x4F-BbV9utObr9L17Ir8K0N30xEl41JHLUcIlsUnzuOUf7tDarSF4R_yRaElGWUrQzAr2yej2oxKeWqesf9MFSgsZ-KXiFaiDhZBQMsX5KKQ0GG1L4XRPPX0Plm7YZuTzl3WElW1_kNE0m6SDZZ4r4R3dd5N_Z2V1ogaNsm2gQgzRLb2cqziT8LAUCVa6h4zc_Pw7glsNwXGVcv09PSxU9WTSUBT6fuxZBi_GcdCHErAS2pgeUsiJGuHdYJlqzeobUsdGNgc71tOFr_6j7W6g=w1382-h1841-no?authuser=0",
        ],
      },
      {
        id: 1,
        location: 1,
        title: "Plant Suculants",
        description: "Plant the suculants in the garden",
        notes: "",
        tools: [0, 1, 2],
        images: [
          "https://lh3.googleusercontent.com/pzU8OZXCX7jflHPy7ciwXDT_jbL2z3eyDvyckQ12mpKHjoJ7_wry0z0W_-fmF7pxKtlUzA8Q5L909qNZOr15FrS_DDPxjIDcQmUCwmYqzUjd4he6Ho9L_MREDtt-Do8zR4f9f20a8cL0dvLq_BbSsil6d-P7ZKgtkmi7mPatSVRwWecaLG_xECrGeheGuaHK3HOt7sM5bQChkFuohHbptebiRPx1n10bJ-fTN9Rlw1UJVMy_Cz0eenrZlGxzLI7fRpEuPSA6_DUXxvle-fsK0tBjftpTQEHTJrwNF9zBpN55os6SUOiW59f3UeU63GUIwSV5CzSh082R1RTg2ZqgEl-XoXKlR4b_AX42MoivLq0jaTVVZCD2ixY7qLhFtcermXnm-s5a-5X9o93149FbSPmPqgBm74_1suc0zJqBlb6592fpC6BY7URSRrz8FU_j5bUlIS2BKuh6JNgLe6_zR9EroyWK5PS6ggxVn_Ksr9o9uDmrwA2Ri9erywTZYz5OKypeggkI3OJKUE8QbcyJIZTjT-SZUbiuqwpcMUnBM2JcAxSRh8DMmI_wo-bUAeHZRF0eRDO4s1e9hcdRc0oq9HG5Etukri2FYTJK00KMXTgnqAljeGCNLfft9djbMhqP82C4-QLZhMDC63TKerIv_FwvznZlgyCxkJ_0e76u_uvQG0QOE4KkVqismKN9IRM=w2455-h1843-no?authuser=0",
        ],
      },
    ],
    locations: [
      {
        customerName: "Dan Brown",
        address: "1203 Spruce St. Boulder, CO",
        notes: "Close the gate",
      },
      {
        customerName: "Jerry Mathews",
        address: "1234 Bluff St. Boulder, CO",
        notes: "Don't run the blower",
      },
    ],
    tools: [
      {
        name: "Weeding Tool",
        image:
          "https://www.gardenersedge.com/images/500/4752.jpg?v=100000227430-2",
        size: "small",
        description: "For pulling up weeds at the root",
      },
      {
        name: "Hand Pruners",
        image:
          "https://p0.pikist.com/photos/117/802/background-isolated-garden-scissors-pruner-shears-secateurs-object-equipment.jpg",
        size: "small",
        description: "For pruning and deadheading",
      },
      {
        name: "Bucket",
        image:
          "https://images.homedepot-static.com/productImages/db7d4968-169c-4360-aece-5fd544701f00/svn/orange-the-home-depot-paint-buckets-lids-05glhd2-c3_1000.jpg",
        size: "medium",
        description: "for collecting debris",
      },
    ],
  }),
};
</script>

<style lang="sass" scoped>
.tasks
  display: flex
</style>
