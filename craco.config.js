const CracoLessPlugin = require('craco-less')
const cracoPluginScopedCss = require('craco-plugin-scoped-css')
const CracoPluginScopedLess = require('craco-scoped-less')

module.exports = {
    plugins: [
      // {
      //   plugin: CracoLessPlugin,
      //   options: {
      //     lessLoaderOptions: {
      //       lessOptions: {
      //         modifyVars: { '@primary-color': '#1DA57A'},
      //         javascriptEnabled: true,
      //       },
      //     },
      //   },
      // },
      {
        plugin: cracoPluginScopedCss
      },
      // {
      //   plugin: CracoPluginScopedLess
      // }
    ],
  }