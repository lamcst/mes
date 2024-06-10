<template>
  <a-layout-content class="px-2 md:px-16">
    <div class="my-4 flex flex-row justify-between">
      <a-breadcrumb class="content-center">
        <a-breadcrumb-item>
          <nuxt-link :to="`/prod`">Prod</nuxt-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          Edit
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex gap-2">
        <span class="font">
          

        </span> 
        <a-button :loading="loading" @click="getProd">
          Reload
        </a-button>
        <nuxt-link :to="`/prod/${$route.params.id}/status`">
          <a-button>
            Add status
          </a-button>
        </nuxt-link>
        <nuxt-link :to="`/prod/${$route.params.id}/good`">
          <a-button>
            Produce good
          </a-button>
        </nuxt-link>

      </div>
    </div>

    <div class=" bg-white w-full p-4  md:p-6 flex flex-col gap-4">
      
      <div class="grid justify-center overflow-auto">
        
        <a-form-model 
          ref="ruleForm"
          :model="form" 
          layout="vertical" class="w-full md:w-96" >
          <a-form-model-item
            label="Name"
            class="w-full"
            prop="name"
          >
            <a-input 
            disabled
            v-model="form.name"
            placeholder="name" />
          </a-form-model-item>
          <a-form-model-item
            label="Description"
            class="w-full"
            prop="description"
          >
            <a-input 
            disabled
            v-model="form.description"
            placeholder="description" />
          </a-form-model-item>
          <a-form-model-item
            label="Expected end date"
            class="w-full"
            prop="expectEnd"
          >
            <a-date-picker 
              disabled
              v-model="form.expectEnd"
              class="w-full" />
          </a-form-model-item>
          <a-form-item
            label="Remaining Goods"
            class="w-full"
            prop="goodTemplates"
          >
            
            <a-table :columns="goodInputsColumns" :data-source.sync="goodInputs"   bordered>
              
            </a-table>
            
          </a-form-item>
          <a-form-item
            label="Output Goods"
            class="w-full"
          >
            <a-table :columns="goodOutputColumns" :data-source.sync="goodOutputs"   bordered>  
            </a-table>
          </a-form-item>
          
          <a-form-item
            label="Statuses (*real time update)"
            class="w-full"
          >
            <a-table :columns="statusInputColumns" :data-source.sync="statusInputs"   bordered>  
            </a-table>
          </a-form-item>
          <a-form-item
            label="Remaining Materials"
            class="w-full"
            prop="materials"
          >
            <a-table :columns="materialInputsColumns" :data-source.sync="materialInputs"   bordered>

            </a-table>
          </a-form-item>
        </a-form-model>
      </div>
    </div>
  </a-layout-content>
</template>
<script>
import startIO from '../../../libs/startIO';
const moment = require('moment')
export default {
  data() {
    return {
      loading: false,
      prod: {},
      goodOutputs: [],
      goodOutputColumns: [
        {
          title: 'Product',
          dataIndex: 'slug',
          key: 'slug',
        },
        {
          title: 'Number',
          dataIndex: 'number',
          key: 'number',
        },
      ], 
      goodInputs: [],
      goodInputsColumns: [
        {
          title: 'Product',
          dataIndex: 'slug',
          key: 'slug',
        },
        {
          title: 'Number',
          dataIndex: 'remaining',
          key: 'remaining',
        },
      ],
      materialInputs:[],
      materialInputsColumns: [
        {
          title: 'Material',
          dataIndex: 'slug',
          key: 'slug',
        },
        {
          title: 'Number',
          dataIndex: 'number',
          key: 'number',
        },
      ],
      statusInputColumns:[
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
      statusInputs:[],
      form:{
        name:'',
        description:'',
        expectEnd:undefined,
      },
      interval: undefined,
      socket: undefined
    }
  },
  mounted() {
    this.getProd()
    const socket = startIO()
    
    socket.on("new-status", (arg) => {
      const { proStatus } = arg
      if(proStatus && this.statusInputs.indexOf(si=>si.id === proStatus.id) < 0){
        proStatus.startDate = moment(proStatus.start).format()

        this.statusInputs = [proStatus, ...this.statusInputs]
      }
      
    });
    this.socket =socket
  },
  beforeRouteLeave(to,from, next){
    this.socket.disconnect()
    next()
  },
  methods: {
    async getProd() {
      try {
        this.loading = true
        const prod = await this.$axios.$get(`/productions/${this.$route.params.id}`)
        this.prod = prod
        this.form.name = prod.name
        this.form.description = prod.description
        this.form.expectEnd = prod.expectEnd
        this.materialInputs = prod.materials
        this.goodInputs = prod.goodTemplates
        this.goodOutputs = prod.goods
        this.statusInputs = prod.statuses.map(s=>{
          return {
            ...s,
            startDate: moment(s.start).format()
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
</script>../../../libs/startIO