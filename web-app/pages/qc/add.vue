<template>
  <a-layout-content class="px-2 md:px-16">
    <div class="my-4 flex flex-row justify-between">
      <a-breadcrumb class="content-center">
        <a-breadcrumb-item>
          <nuxt-link :to="`/qc`">Quality Control</nuxt-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          Add
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class=" bg-white w-full p-4  md:p-6 flex flex-col gap-4">
      <div class="grid justify-center overflow-auto">
        <a-form-model ref="ruleForm" :model="form" :rules="rules" layout="vertical" class="w-full md:w-96"
          >
          <a-form-model-item label="Name" class="w-full" prop="name">
            <a-input v-model="form.name" placeholder="name" />
          </a-form-model-item>
          <a-form-model-item label="Description" class="w-full" prop="description">
            <a-input v-model="form.description" placeholder="description" />
          </a-form-model-item>
          <a-form-model-item label="Expected end date" class="w-full" prop="expectEnd">
            <a-date-picker v-model="form.expectEnd" class="w-full" />
          </a-form-model-item>
          <a-form-model-item label="Expected Goods" class="w-full" prop="goods">
            <a-table
              :row-selection="{ selectedRowKeys: goodsTableKeys, onChange: goodsTableChange }"
              :columns="goodsColumns"
              :data-source.sync="goods"
            />
          </a-form-model-item>
          
          <a-form-model-item>
            <a-button :loading="submitLoading" type="primary" @click="submit">
              Submit
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>

    </div>
  </a-layout-content>
</template>
<script>
export default {
  data() {
    return {
      goodsTableKeys:[],
      goodsColumns:[
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

        ],
      goods:[],

    
      submitLoading: false,
      form: {
        name: '',
        description: '',
        expectEnd: undefined,
        goods:[],
      },
      rules: {
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' },
          { min: 4, max: 100, message: 'Length should be 4 to 100', trigger: 'blur' },
        ],
        description: [
          { required: true, message: 'Please input description', trigger: 'blur' },
          { min: 4, max: 100, message: 'Length should be 4 to 100', trigger: 'blur' },
        ],
        expectEnd: [{ required: true, message: 'Please pick a expect date', trigger: 'change' }],
        goods: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one good',
            trigger: 'change',
          },
        ],
      },
      gLoading: false,
    };
  },
  mounted() {
    this.getGoods()
  },
  methods: {
    async getGoods(){
      this.gLoading = true;
      try {
        const goodResults = await this.$axios.$get(`/goods`)
        this.goods = goodResults.map(gr=>{
          return {
            ...gr,
            name:gr.template?.name,
            slug: gr.template?.name,
            description: gr.template?.description,
            key:gr.id,
          }
        })
        this.gLoading = false;
      } catch (error) {
        console.error(error)
        this.$message.error(error.message);
        this.gLoading = true;
      }
    },
    goodsTableChange(keys){
      this.goodsTableKeys = keys
      this.form.goods = this.goods.filter((g)=>{
        return keys.indexOf(g.id) > -1
      })
    },
    async submit(e) {
      e.preventDefault();
      this.$refs.ruleForm.validate(async valid => {
        
        if (valid) {
          

          const input = {
            name: this.form.name,
            expectEnd: this.form.expectEnd.toDate().toISOString(),
            description: this.form.description,
            goods: this.form.goods
          }
          try {
            this.submitLoading = true
            await this.$axios.$post(`/quality-controls`, input)
            this.submitLoading = false
            this.$router.push('/qc');
          } catch (error) {
            this.$message.error(error.message);
            this.submitLoading = false
          }
          /* this.materialInputs.length
          
           */
        }
      });

    },
    

  }
};
</script>