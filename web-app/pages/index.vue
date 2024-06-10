<template>
  <a-layout-content class="px-2 md:px-16">
    <div class="my-4 flex flex-row justify-between">
      <a-breadcrumb>
        <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class=" bg-white w-full p-4  md:p-6 flex flex-col gap-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a-card>
          <client-only placeholder="Loading...">
            <DoughnutChart :chart-data="sdData" :chart-options="sdOptions" :height="430" />
          </client-only>
        </a-card>

        <a-card>
          <client-only placeholder="Loading...">
            <BarChart :chart-data="goData" :chart-options="goOptions" :height="430" />
          </client-only>
        </a-card>
        <a-card>
          <client-only placeholder="Loading...">
            <DoughnutChart :chart-data="gsData" :chart-options="gsOptions" :height="430" />
          </client-only>
        </a-card>
        <a-card>
          <client-only placeholder="Loading...">
            <BarChart :chart-data="mData" :chart-options="mOptions" :height="430" />
          </client-only>
        </a-card>
      </div>

    </div>
  </a-layout-content>

</template>

<script>
export default {
  name: 'Dashboard',

  data() {
    return {
      customColor: [
        '#ff7875',
        '#1677ff',
        '#fadb14',
        '#f759ab',
        '#9254de',
        '#389e0d',
        '#87e8de',
        '#91caff'
      ],

      sdOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Overall Production Status (sec)'
          }
        }
      },
      sdLoading: false,
      sdData: {},
      goLoading: false,
      goData: {
        labels: [],
        datasets: []
      },
      goOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Overall Production Goods'
          }
        }
      },
      mData: {
        labels: [],
        datasets: []
      },
      mOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Overall Materials Inventory'
          }
        }
      },
      gsData: {
        labels: [],
        datasets: []
      },
      gsOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Overall Goods Status'
          }
        }
      }
    }
  },
  mounted() {
    this.getStatusDuration()
    this.getGoodOutput()
    this.getGoodsStatus()
    this.getMaterialUnused()
  },
  methods: {
    async getGoodsStatus() {
      try {


        const result = await this.$axios.$get('/goods/status-info')
        const labels = [];
        const datasets = [{
          data: [],
          backgroundColor: []
        }];
        result.forEach((r, index) => {
          labels.push(r.status)
          datasets[0].data.push(r.count)
          datasets[0].backgroundColor.push(this.customColor[index])
        })
        this.gsData = { labels, datasets }
      } catch (error) {
        console.error(error)
        this.$message.error(error.message)
      }
    },
    async getStatusDuration() {

      try {
        this.sdLoading = true;

        const result = await this.$axios.$get('/productions/status-duration')
        const datasets = [{
          data: [],
          backgroundColor: []
        }];
        const labels = []
        result.forEach((r, index) => {
          labels.push(r.status)
          datasets[0].data.push(r.sum)
          datasets[0].backgroundColor.push(this.customColor[index])
        })
        this.sdData = { labels, datasets }
        this.sdLoading = false;

      } catch (error) {
        console.error(error)
        this.$message.error(error.message)
        this.sdLoading = false;
      }
    },
    async getGoodOutput() {
      try {
        this.goLoading = true;

        const goodOutputs = await this.$axios.$get('/productions/good-output')
        const labels = []
        const goodIndexs = {};
        const dataset = {
          label: 'goods',
          data: [],
          backgroundColor: [this.customColor[5]]
        }
        let datasets = []

        if (goodOutputs && goodOutputs.length) {
          const names = []
          goodOutputs.forEach((go, index) => {
            labels.push(go.name)
            const { goods } = go
            goods.forEach((good, index) => {
              names.push(good.name)
            })
            //dataset.backgroundColor.push(this.customColor[index])
          })
          datasets = [...new Set(names)].map((n, index) => {
            return {
              label: n,
              backgroundColor: [this.customColor[index]],
              data: [],
            }
          })
          goodOutputs.forEach((go, index) => {
            datasets.forEach((ds, index) => {
              const found = go.goods.find(d => d.name === ds.label)
              if (found) {
                ds.data.push(found.number)
              } else {
                ds.data.push(0)
              }
            })
          })

        }

        this.goData = {
          labels,
          datasets
        }

        this.goLoading = false;

      } catch (error) {
        console.error(error)
        this.$message.error(error.message)
        this.goLoading = false;
      }
    },
    async getMaterialUnused() {
      try {


        const result = await this.$axios.$get('/materials?countMode=unused')
        const labels = [];
        const datasets = [{
          label: 'stock',
          data: [],
          backgroundColor: ['#91caff']
        }];
        result.forEach((r, index) => {
          labels.push(r.name)
          datasets[0].data.push(r.count)
          //datasets[0].backgroundColor.push(this.customColor[index])
        })
        this.mData = { labels, datasets }
      } catch (error) {
        console.error(error)
        this.$message.error(error.message)
      }
    }
  }
}
</script>
