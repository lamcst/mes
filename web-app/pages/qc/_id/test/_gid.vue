<template>
  <a-layout-content class="px-2 md:px-16">
    <div class="my-4 flex flex-row justify-between">
      <a-breadcrumb class="content-center">
        <a-breadcrumb-item>
          <nuxt-link :to="`/qc`">Quality Control</nuxt-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <nuxt-link :to="`/qc/${$route.params.id}`">Edit</nuxt-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          Test
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="gap-2">
        <a-button :loading="submitLoading" type="primary"  @click="download">
            Download
        </a-button>
        <nuxt-link :to="`/qc/${$route.params.id}/status`">
          <a-button :loading="submitLoading" type="primary"  @click="submit">
            Save
          </a-button>
        </nuxt-link>
      </div>
      
    </div>

    <div class=" bg-white w-full p-4  md:p-6 flex flex-col gap-4">
      <a-table :loading="loading" :columns="testColumns" :data-source="tests" bordered>
        <template
          v-for="col in ['result']"
          :slot="col"
          slot-scope="text, record, index"
        >
          <a-input :value="text" @change="e => inputChange(e.target.value, record.key, col)"></a-input>
        </template>
        <template
          
          slot="pass"
          slot-scope="checked, record, index"
        >
          <a-checkbox :checked="checked" @change="e => inputChange(e.target.checked, record.key, 'pass')"></a-checkbox>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>
<script>
export default {
  data() {
    return {
      testColumns: [{
          title: 'Criteria',
          dataIndex: 'test',
          key: 'criteria',
        },
        {
          title: 'Expect',
          dataIndex: 'expect',
          key: 'expect',
        },
        {
          title: 'Result',
          dataIndex: 'result',
          key: 'result',
          scopedSlots: { customRender: 'result' },
        },
        {
          title: 'Pass',
          dataIndex: 'pass',
          key: 'pass',
          scopedSlots: { customRender: 'pass' },
        },
      ],
      tests: [],
      loading: false,
      submitLoading: false
    }
  },
  mounted() {
    this.getQc()
  },
  methods: {
    download(){
      const headers = {
        criteria: 'criteria',
        expect: 'expect',
        result: 'result',
        pass: 'pass',
      };
      const items = this.tests.map(t=>{
        const {test, expect, result, pass} = t
        return {
          criteria:test, expect, result, pass
        }
      })
      this.exportCSVFile(headers, items, this.$route.params.gid)
    },
    convertToCSV(data) {
        data = typeof data != 'object' ? JSON.parse(data) : data;
        let str = '';

        for (let i = 0; i < data.length; i++) {
          let line = '';
          for (let key in data[i]) {
            if (line != '') line += ',';

            line += data[i][key];
          }

          str += line + '\r\n';
        }

        return str;
      },
      exportCSVFile(headers, items, fileTitle) {
        if (headers) {
          items.unshift(headers);
        }

        // Convert Object to JSON
        const jsonObject = JSON.stringify(items);

        const csv = this.convertToCSV(jsonObject);

        const exportedFilenmae = fileTitle + '.csv';

        const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});

        if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
          const link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      },
    inputChange(value, key, column){
      const newTests = [...this.tests];
      const target = newTests.find(test => key === test.key);
      if (target) {
        target[column] = value;
        this.tests = newTests;
      }
    },
    async submit() {
      try {
      this.submitLoading = true
      const testResults = this.tests.map((test)=>{
        const { result, pass } = test
        return { templateId: test.id, result, pass}
      })
      await this.$axios.$post(`/quality-controls/result`, { 
        //qcId: this.$route.params.id, 
        goodId: this.$route.params.gid,
        testResults
      })
      this.submitLoading = false
      this.$router.push(`/qc/${this.$route.params.id}`);
    } catch (error) {
      this.$message.error(error.message);
      this.submitLoading = false
    }
    },
    
    async getQc() {
      try {
        this.loading = true
        const qc = await this.$axios.$get(`/quality-controls/${this.$route.params.id}`)
        const good = qc.goods.find(g => g.id === this.$route.params.gid)
        if (good) {
          const { template, testResults =[] } = good || {}
          const { tests } = template
          this.tests = (tests || []).map(t=>{
            const tResult = testResults.find(tr=>tr.goodTemplateTestId === t.id)
            
            return {
              ...t,
              key: t.id,
              pass: tResult?.pass || false,
              result: tResult?.result || '',
            }
          }) 
        }
        /* this.form.name = qc.name
        this.form.description = qc.description
        this.form.expectEnd = qc.expectEnd */

        /* this.goods = qc.goods.map(gr => {
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
        }) */

        this.loading = false
      } catch (error) {
        this.$message.error(error.message)
        this.loading = true
      }
    }
  }
}
</script>