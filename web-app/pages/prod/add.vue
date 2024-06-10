<template>
  <a-layout-content class="px-2 md:px-16">
    <div class="my-4 flex flex-row justify-between">
      <a-breadcrumb class="content-center">
        <a-breadcrumb-item>
          <nuxt-link :to="`/prod`">Prod</nuxt-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          Add
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class=" bg-white w-full p-4  md:p-6 flex flex-col gap-4">
      <div class="grid justify-center overflow-auto">
        <a-form-model ref="ruleForm" :model="form" :rules="rules" layout="vertical" class="w-full md:w-96"
          @submit="submit">
          <a-form-model-item label="Name" class="w-full" prop="name">
            <a-input v-model="form.name" placeholder="name" />
          </a-form-model-item>
          <a-form-model-item label="Description" class="w-full" prop="description">
            <a-input v-model="form.description" placeholder="description" />
          </a-form-model-item>
          <a-form-model-item label="Expected end date" class="w-full" prop="expectEnd">
            <a-date-picker v-model="form.expectEnd" class="w-full" />
          </a-form-model-item>
          <a-form-item label="Expected Goods" class="w-full" prop="goodTemplates">
            <div class="flex flex-col gap-2">
              <div class="w-full flex flex-row gap-2">
                <a-select :loading="gtLoading" v-model="goodSlug">
                  <a-select-option v-for=" gt in goodTemplatesSelection" :key="gt.id" :value="gt.slug">
                    {{ gt.name }}
                  </a-select-option>
                </a-select>
                <a-input-number :min="0" v-model="goodNum" placeholder="no" :precision="0" />
                <a-button type="primary" @click="addGood">
                  +
                </a-button>
              </div>
              <div>
                <a-table :columns="goodInputsColumns" :data-source.sync="goodInputs" :pagination="false" bordered>
                  <template slot="operation" slot-scope="text, record">
                    <a-popconfirm v-if="goodInputs.length" title="Sure to delete?"
                      @confirm="() => onGoodInputsDelete(record.key)">
                      <a href="javascript:;">Delete</a>
                    </a-popconfirm>
                  </template>
                </a-table>
              </div>
            </div>



          </a-form-item>
          <a-form-item label="Expected Materials" class="w-full" prop="materials">
            <a-table :columns="materialInputsColumns" :data-source.sync="materialInputs" :pagination="false" bordered>

            </a-table>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="submit">
              Submit
            </a-button>
          </a-form-item>
        </a-form-model>
      </div>

    </div>
  </a-layout-content>
</template>
<script>
export default {
  data() {
    return {
      materialsSelection: [],
      msLoading: false,
      goodTemplatesSelection: [],
      gtLoading: false,
      goodInputs: [],
      goodSlug: '',
      goodNum: 0,
      goodInputsColumns: [
        {
          title: 'Product',
          dataIndex: 'slug',
          key: 'slug',
        },
        {
          title: 'Number',
          dataIndex: 'num',
          key: 'num',
        },
        {
          title: 'Operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
      materialInputs: [],
      materialInputsColumns: [
        {
          title: 'Material',
          dataIndex: 'slug',
          key: 'slug',
        },
        {
          title: 'Required Number',
          dataIndex: 'num',
          key: 'num',
        },
        {
          title: 'Inventary Number',
          dataIndex: 'invNum',
          key: 'invNum',
        },
      ],
      submitLoading: false,
      form: {
        name: '',
        description: '',
        expectEnd: undefined,
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
        /* goodTemplates: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one good',
            trigger: 'change',
          },
        ],
        materials: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one material',
            trigger: 'change',
          },
        ], */
      },
    };
  },
  mounted() {
    this.getMaterialSelections();
    this.getGoodsTemplate();
  },
  watch() {

  },
  methods: {
    async submit(e) {
      e.preventDefault();
      this.$refs.ruleForm.validate(async valid => {
        if (!this.materialInputs.length) {
          this.$message.error("Please input materials")

        }
        if (!this.goodInputs.length) {
          this.$message.error("Please input goods")
        }
        if (valid) {

          const input = {
            name: this.form.name,
            expectEnd: this.form.expectEnd.toDate().toISOString(),
            description: this.form.description,
            materials: this.materialInputs.map(mi => {
              return { id: mi.id, number: mi.num }
            }),
            goodTemplates: this.goodInputs.map(gt => {
              return { id: gt.id, number: gt.num }
            })
          }
          try {
            this.submitLoading = true
            await this.$axios.$post(`/productions?countMode=unused`, input)
            this.submitLoading = false
            this.$router.push('/prod');
          } catch (error) {
            this.$message.error(error.message);
            this.submitLoading = false
          }
          /* this.materialInputs.length
          
           */
        }
      });

    },
    onGoodInputsDelete(key) {
      this.goodInputs = this.goodInputs.filter(gi => gi.key !== key)
      this.refreshMaterial()
      /* this.goodInputs.forEach(gi=>{
        this.refreshMaterial(gi.num, gi.materials)
      }) */
    },
    refreshMaterial() {
      const materialsInput = this.materialsSelection.map(sel => {
        return { ...sel, invNum: sel.count, num: 0 }
      })
      this.goodInputs.forEach(gi => {
        const { materials } = gi
        materials.forEach(m => {
          //const sel = this.materialsSelection.find(ms=>ms.slug === mt.slug)
          const num = gi.num * m.number
          const mFound = materialsInput.find(mi => mi.slug === m.slug)
          if (mFound) {
            mFound.num = mFound.num + num
          }
        })

      });
      this.materialInputs = materialsInput
    },
    addGood() {
      if (this.goodSlug && Number(this.goodNum)) {
        const goodSel = this.goodTemplatesSelection.find(gi => gi.slug === this.goodSlug)

        const currentInput = this.goodInputs.find(gi => gi.slug === this.goodSlug)

        if (currentInput) {
          currentInput.num = currentInput.num + Number(this.goodNum)
        }
        else {
          this.goodInputs.push({
            id: goodSel.id,
            slug: this.goodSlug,
            num: Number(this.goodNum),
            key: this.goodSlug,
            materials: goodSel.materials
          })
        }
        this.refreshMaterial()
      }
      this.goodSlug = ''
      this.goodNum = 0
    },
    async getMaterialSelections() {
      this.msLoading = true;
      try {
        const result = await this.$axios.$get(`/materials?countMode=unused`)
        this.materialsSelection = result
        this.msLoading = false;
      } catch (error) {

        console.error(error)
        this.msLoading = true;
      }
    },
    async getGoodsTemplate() {
      /* /good-templates */
      this.gtLoading = true;
      try {
        const result = await this.$axios.$get(`/good-templates`)
        this.goodTemplatesSelection = result
        this.gtLoading = false;
      } catch (error) {
        console.error(error)
        this.$message.error(error.message);
        this.gtLoading = true;
      }
    },
  }
};
</script>