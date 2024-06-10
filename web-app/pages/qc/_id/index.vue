<template>
  <a-layout-content class="px-2 md:px-16">
    <div class="my-4 flex flex-row justify-between">
      <a-breadcrumb class="content-center">
        <a-breadcrumb-item>
          <nuxt-link :to="`/qc`">Quality Control</nuxt-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          Edit
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="gap-2">
        <nuxt-link :to="`/qc/${$route.params.id}/status`">
          <a-button>
            Add status
          </a-button>
        </nuxt-link>
        <!-- <nuxt-link :to="`/qc/${$route.params.id}/result`">
          <a-button>
            Add result
          </a-button>
        </nuxt-link> -->

      </div>
    </div>

    <div class=" bg-white w-full p-4  md:p-6 flex flex-col gap-4">
      <div class="grid justify-center overflow-auto">
        <a-form-model ref="ruleForm" :model="form" layout="vertical" class="w-full md:w-96">
          <a-form-model-item label="Name" class="w-full" prop="name">
            <a-input disabled v-model="form.name" placeholder="name" />
          </a-form-model-item>
          <a-form-model-item label="Description" class="w-full" prop="description">
            <a-input disabled v-model="form.description" placeholder="description" />
          </a-form-model-item>
          <a-form-model-item label="Expected end date" class="w-full" prop="expectEnd">
            <a-date-picker disabled v-model="form.expectEnd" class="w-full" />
          </a-form-model-item>
          <a-form-item label="Goods" class="w-full" prop="goodTemplates">

            <a-table :columns="goodColumns" :data-source.sync="goods" bordered>
              <nuxt-link slot="action" slot-scope="actionId" :to="`/qc/${$route.params.id}/test/${actionId}`">
                test
              </nuxt-link>
            </a-table>

          </a-form-item>
          <a-form-item label="Statuses" class="w-full">
            <a-table :columns="statusInputColumns" :data-source.sync="statusInputs" bordered>
            </a-table>
          </a-form-item>

        </a-form-model>
      </div>
    </div>
  </a-layout-content>
</template>
<script>
const moment = require('moment')
export default {
  data() {
    return {
      goodColumns: [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Goods',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Operation',
          key: 'operation',
          dataIndex: 'id',
          scopedSlots: { customRender: 'action' },
        }
      ],
      goods: [],
      loading: false,
      prod: {},



      statusInputColumns: [
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Start',
          dataIndex: 'startDate',
          key: 'startDate',
        },
      ],
      statusInputs: [],
      form: {
        name: '',
        description: '',
        expectEnd: null,
      },
    }
  },
  mounted() {
    this.getQc()
  },
  methods: {
    async getQc() {
      try {
        this.loading = true
        const qc = await this.$axios.$get(`/quality-controls/${this.$route.params.id}`)

        this.form.name = qc.name
        this.form.description = qc.description
        this.form.expectEnd = qc.expectEnd

        this.goods = qc.goods.map(gr => {
          return {
            ...gr,
            name: gr.template?.name,
            slug: gr.template?.name,
            description: gr.template?.description,
            key: gr.id,
          }
        })
        this.statusInputs = qc.statuses.map(s => {
          return {
            ...s,
            startDate: moment(s.start).format(),
            key: s.id
          }
        })

        this.loading = false
      } catch (error) {
        this.$message.error(error.message)
        this.loading = true
      }
    }
  }
}
</script>