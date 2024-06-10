<template>
  <a-layout-content class="px-2 md:px-16">
    <div class="my-4 flex flex-row justify-between">
      <a-breadcrumb class="content-center">
        <a-breadcrumb-item>
          <nuxt-link :to="`/prod`">Prod</nuxt-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <nuxt-link :to="`/prod/${$route.params.id}`">Edit</nuxt-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          Produce good
        </a-breadcrumb-item>
      </a-breadcrumb>

    </div>

    <div class=" bg-white w-full p-4  md:p-6 flex flex-col gap-4">
      <div class="grid justify-center overflow-auto">
        <a-form-model ref="ruleForm" :model="form" :rules="rules" layout="vertical" class="w-48 md:w-96">
          <a-form-model-item label="Goods" class="w-full" prop="goodId">
            <a-select :loading="loading" v-model="form.goodId">
              <a-select-option v-for=" gt in goodTemplates" :key="gt.id" :value="gt.id">
                {{ gt.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-item label="Materials" class="w-full">
            <div class="flex flex-col gap-2">
              <div class="w-full flex flex-row gap-2">
                <a-select :loading="loading" v-model="materialId">
                  <a-select-option v-for=" m in materials" :key="m.id" :value="m.id">
                    {{ m.name }}
                  </a-select-option>
                </a-select>
                <a-input-number :min="0" :max="materialIndexed[materialId] || 0" v-model="materialNum" :precision="0" />
                <a-button type="primary" @click="addMaterial">
                  +
                </a-button>
              </div>
              <div>
                <a-table :columns="materialInputColumns" :data-source.sync="materialInputs" :pagination="false" bordered>
                  <template slot="operation" slot-scope="text, record">
                    <a-popconfirm title="Sure to delete?"
                      @confirm="() => removeMaterial(record.key)">
                      <a href="javascript:;">Delete</a>
                    </a-popconfirm>
                  </template>
                </a-table>
              </div>
            </div>

          </a-form-item>
        </a-form-model>
        <a-form-model-item>
            <a-button type="primary" @click="submit">
              Submit
            </a-button>
          </a-form-model-item>
      </div>
    </div>
  </a-layout-content>
</template>
<script>
export default {
  data() {
    return {
      form: {
        goodId: '',
      },
      rules: {
        goodId: [{ required: true, message: 'Please pick a expect date', trigger: 'change' }],
      },
      loading: false,
      
      materialId: '',
      goodTemplates: [],
      materials: [],
      materialIndexed: {},
      materialNum: 0,
      materialInputColumns:[{
          title: 'Material',
          dataIndex: 'slug',
          key: 'slug',
        },
        {
          title: 'Number',
          dataIndex: 'number',
          key: 'number',
        },
        {
          title: 'Operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
      materialInputs:[],
      submitLoading: false,
    }
  },
  mounted() {
    this.getProd()
  },
  methods: {
    submit(e){
      e.preventDefault();
      this.$refs.ruleForm.validate(async valid => {
        if (!this.materialInputs.length) {
          this.$message.error("Please input materials")
        }
        if(valid){
          try{
            this.submitLoading = true
            await this.$axios.$post(`/productions/good`, { 
              prodId: this.$route.params.id, 
              goodTemplateId: this.form.goodId,
              materials: this.materialInputs.map(mi=>{
                return { id: mi.id, number: mi.number }
              })
            })
            this.submitLoading = false
            this.$router.push(`/prod/${this.$route.params.id}`);
          } catch (error) {
            this.$message.error(error.message);
            this.submitLoading = false
          }
        }
      })
    },
    removeMaterial(key){
      this.materialId = ''
      this.materialNum =0
      const currentInput = this.materialInputs.find(m => m.id === key)
      this.materialIndexed[key] = this.materialIndexed[key] + Number(currentInput.number)

      this.materialInputs = this.materialInputs.filter(mi=> mi.id !== key)
     
    },
    addMaterial() {
      if(this.materialId && Number(this.materialNum)){
        const matSel = this.materials.find(m => m.id === this.materialId)

        const currentInput = this.materialInputs.find(m => m.id === this.materialId)

        if (currentInput) {
          currentInput.number = currentInput.number + Number(this.materialNum)
        }
        else {
          this.materialInputs.push({
            id: matSel.id,
            slug: matSel.slug,
            number: Number(this.materialNum),
            key: matSel.id
          })
        }
        this.materialIndexed[this.materialId] = this.materialIndexed[this.materialId] - Number(this.materialNum)
      }
      this.materialId = ''
      this.materialNum =0
    },
    async getProd() {
      try {
        this.loading = true
        const prod = await this.$axios.$get(`/productions/${this.$route.params.id}`)
        this.prod = prod
        this.goodTemplates = prod.goodTemplates.filter(gt=>{
          return gt.remaining > 0
        })
        this.materials = prod.materials
        this.materialIndexed = prod.materials.reduce((result, m) => {
          return {
            ...result,
            [m.id]: m.number
          }
        }, {})
        this.loading = false
      } catch (error) {
        this.$message.error(error.message)
        this.loading = true
      }
    }
  }
}
</script>