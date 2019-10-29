<template>
  <card class="card-user">
      <paper-table :data="data" :columns="columns" :type="type" :title="title" :subTitle="subTitle">
        <slot name="columns"></slot>
        <slot></slot>
      </paper-table>
      <slot name="footer"></slot>
  </card>
</template>
<script>

import { Card } from "@/components";
import { PaperTable } from "@/components";

export default {
  components: {
    PaperTable,
    Card
  },
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      details: [
        {
          title: "12",
          subTitle: "Files"
        },
        {
          title: "2GB",
          subTitle: "Used"
        },
        {
          title: "24,6$",
          subTitle: "Spent"
        }
      ]
    };
  },
  methods: {
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-lg-3 offset-lg-1";
      } else if (remainder === 2) {
        return "col-lg-4";
      } else {
        return "col-lg-3";
      }
    }
  }
};
</script>
<style>
</style>
