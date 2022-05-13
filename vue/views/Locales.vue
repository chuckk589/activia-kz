<template>

  <div>
    <CCard>
      <CCardHeader>
        <strong>Locales</strong>
      </CCardHeader>
      <CCardBody>
        <CTabs>
          <CTab :title="key" v-for="(locale, key, index) in locales" :key="index" :active="index == 0"
            @click.native="current = key">
            <CTextarea v-for="(translationKey, key, index) in locale" :label="key" v-model="locale[key]" horizontal
              rows="3" :key="index" />
          </CTab>
        </CTabs>
      </CCardBody>
      <CCardFooter>
        <CLoadingButton disabled-on-loading :loading="submitting" @click.native="update()" size="sm" color="primary"
          style="margin-right:5px;">
          Применить
        </CLoadingButton>
        <CLoadingButton disabled-on-loading :loading="cancelling" @click.native="load()" size="sm" color="danger">
          Сбросить
        </CLoadingButton>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>

export default {
  name: "Locales",
  data() {
    return {
      locales: {},
      submitting: false,
      current: 'ru'
    };
  },
  created: function () {
    this.load()
  },
  methods: {
    load() {
      this.cancelling = true
      this.$http({ method: 'GET', url: `/v1/status/locales` }).then((res) => {
        this.cancelling = false
        this.locales = res.data
      })
    },
    update() {
      this.submitting = true
      this.$http({ method: 'PUT', url: `/v1/status/locales`, data: { [this.current]: this.locales[this.current] } }).then(() => {
        this.submitting = false
      })
    }
  }
};
</script>