<template lang="pug">
v-container(fluid)
  v-row
    v-col.locations
      h1.page-title Locations
      v-data-iterator(
        :items="location.locations",
        :items-per-page.sync="itemsPerPage",
        :sort-desc="sortDesc",
        :search="search",
        :page="page",
        hide-default-footer,
        dark
      )
        template(v-slot:header)
          v-toolbar.mb-2(color="green darken-3", dark, flat)
            v-text-field(
              v-model="search",
              clearable,
              flat,
              solo-inverted,
              hide-details,
              prepend-inner-icon="mdi-magnify",
              label="Search"
            )
            v-spacer
            v-btn-toggle(v-model="sortDesc", mandatory)
              v-btn(large, depressed, color="green", :value="false")
                v-icon mdi-arrow-up
              v-btn(large, depressed, color="green", :value="true")
                v-icon mdi-arrow-down
        template(v-slot:default="props")
          v-row
            v-col(
              v-for="item in props.items",
              :key="item.name",
              cols="12",
              sm="6",
              md="4",
              lg="3"
            )
              v-card(dark)
                v-img.street-view(
                  :src="streetViewURL + encodeURI(item.address)",
                  contain
                )
                v-card-title {{ item.title }}
                v-card-subtitle {{ item.address }}
                v-divider
                v-card-text
                  h2 Notes:
                  v-expansion-panels.notes
                    v-expansion-panel.note(
                      v-for="(note, i) in item.notes",
                      :key="i"
                    )
                      v-expansion-panel-header.text-truncate {{ note }}
                      v-expansion-panel-content {{ note }}
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Locations",
  computed: {
    ...mapState([
      "taskSys",
      ["tasks"],
      "location",
      ["locations"],
      "contacts",
      ["contacts"],
      "tools",
      ["tools"],
      "materials",
      ["materials"],
      "jobs",
      ["jobs"],
      "clients",
      ["clients"],
      "contractors",
      ["contractors"],
    ]),
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== `Name`);
    },
  },
  data: () => ({
    itemsPerPage: 10,
    page: 0,
    search: "",
    sortDesc: false,
    streetViewURL:
      "https://maps.googleapis.com/maps/api/streetview?size=300x200&fov=80&pitch=0&key=AIzaSyDPbvEAlVbD1oME8UH9b2pbTQJympA5lM8&location=",
  }),
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>

<style lang="sass" scoped>
.jobs
    display: flex
    flex-wrap: wrap
    justify-content: space-around
.page-title
    color: #FFF
    text-align: center
</style>
