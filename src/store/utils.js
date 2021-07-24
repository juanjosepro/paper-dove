// import Vue from 'vue';

// import { createApp } from 'vue';

const actions = {
  /* requestConfirmation(context, { props, component }) {
    return new Promise((resolve, reject) => {
      const Component = () => import(`@/components/${component}Component.vue`);
      const dialog = new Vue({
        methods: {
          actionHandler(fn, arg) {
            return () => {
              fn(arg);
              dialog.$destroy();
              dialog.$el.remove();
            };
          },
        },
        render(h) {
          return h(Component, {
            props,
            on: {
              confirm: (data) => {
                this.actionHandler(resolve, data)();
              },
              cancel: this.actionHandler(reject, new Error('Action cancelled')),
            },
          });
        },
      }).$mount();
      document.getElementById('app').appendChild(dialog.$el);
    });
  }, */
};

export default {
  namespaced: true,
  actions,
};
