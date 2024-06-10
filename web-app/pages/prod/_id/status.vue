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
          Status
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class=" bg-white w-full p-4  md:p-6 flex flex-col gap-4">
      <div class="grid justify-center overflow-auto">
        <a-form-model ref="ruleForm" :model="form" :rules="rules" layout="vertical" class="w-48 md:w-96">
          <a-form-model-item label="Status" class="w-full" prop="status">
            <a-select v-model="form.status">
              <a-select-option value="start">
                Start
              </a-select-option>
              <a-select-option value="stop">
                Stop
              </a-select-option>
              <a-select-option value="pause">
                Pause
              </a-select-option>
              <a-select-option value="shut-down">
                Shut down
              </a-select-option>
              <a-select-option value="close">
                Close
              </a-select-option>
              <a-select-option value="done">
                Done
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="submit">
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
      form: {
        status: ''
      },
      rules: {

        status: [{ required: true, message: 'Please pick status', trigger: 'change' }],
      },
      submitLoading: false
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            this.submitLoading = true
            await this.$axios.$post(`/productions/status`, { 
              prodId: this.$route.params.id, 
              status: this.form.status
            })
            this.submitLoading = false
            this.$router.push(`/prod/${this.$route.params.id}`);
          } catch (error) {
            this.$message.error(error.message);
            this.submitLoading = false
          }
        }
      })
    }
  }
}
</script>