<template>
  <a-layout-content class="px-2 md:px-16">
    <div class="my-4 flex flex-row justify-between">
      <a-breadcrumb class="content-center">
        <a-breadcrumb-item> 
          <nuxt-link  :to="`/qc`">Quality Control</nuxt-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="gap-2">
        <nuxt-link  :to="`/qc/add`">
          <a-button>
          Add QC
        </a-button>
        </nuxt-link>
       
      </div>
    </div>

    <div class=" bg-white w-full p-4  md:p-6 flex flex-col gap-4">

      <div class="flex flex-col overflow-auto">
        <a-table :columns="columns" :data-source="data" :loading="loading" :pagination="false" bordered>
          <span slot="date" slot-scope="text">
            {{ text | toDateTime }}
          </span>
          <nuxt-link slot="action" slot-scope="actionId" :to="`/qc/${actionId}`">
            edit
          </nuxt-link>
        </a-table>
      </div>
      <a-pagination @change="onPageChange" :loading="loading" :default-current="page" :total="total" />

    </div>
  </a-layout-content>

</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Code name',
    dataIndex: 'codeName',
    key: 'codeName',
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
  },
  {
    title: 'Expect End',
    key: 'expectEnd',
    dataIndex: 'expectEnd',
    scopedSlots: { customRender: 'date' },
  },
  {
    title: 'Operation',
    key: 'id',
    dataIndex: 'id',
    scopedSlots: { customRender: 'action' },
  }
];
export default {
  name: 'Production',
  data() {
    return {
      columns,
      data: [],
      loading: false,
      page: 1,
      pageSize: 10,
      total: 0
    }
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      try {
        const result = await this.$axios.$get(`/quality-controls/?page=${this.page}&pageSize=${this.pageSize}`)
        this.data = result.data
        this.total = result.count
        this.loading = false;
      } catch (error) {
        this.$message.error(error.message)
        this.loading = true;
      }
    },
    onPageChange(page, pageSize) {
      this.page = page
      this.pageSize = pageSize
      this.getData();
    }
  }
}
</script>
