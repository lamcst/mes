<template>
  <a-layout-content class="px-2 md:px-16">
    <div class="my-4 flex flex-row justify-between">
      <a-breadcrumb class="content-center">
        <a-breadcrumb-item>
          <nuxt-link :to="`/prod`">Prod</nuxt-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="gap-2">
        <nuxt-link :to="`/prod/add`">
          <a-button>
            Add Prod
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
          <div class="flex gap-4" slot="action" slot-scope="actionId">
            <nuxt-link :to="`/prod/${actionId}`">
              edit
            </nuxt-link>
            <a-popconfirm title="Sure to delete?" @confirm="() => onDelete(actionId)">
              <a href="javascript:;">delete</a>
            </a-popconfirm>
          </div>

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
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
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
    async onDelete(id) {
      try {
        await this.$axios.$delete(`/productions/${id}`)
        this.getData()
      } catch (error) {
        console.error(error)
        this.$message.error(error.message)
      }
    },
    async getData() {
      this.loading = true;
      try {
        const result = await this.$axios.$get(`/productions/?page=${this.page}&pageSize=${this.pageSize}`)
        this.data = result.data
        this.total = result.count
        this.loading = false;
      } catch (error) {
        console.error(error)
        this.loading = true;
        this.$message.error(error.message)
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
