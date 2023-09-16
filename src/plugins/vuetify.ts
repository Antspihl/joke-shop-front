/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import {createVuetify} from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'barbie',
    themes: {
      barbie: {
        colors: {
          primary: '#B32370',
          secondary: '#F78CC5',
          accent: '#C4277B',
          background: '#F7D4E7',
          text: '#B42885',
        },
      },
      oppenheimer: {
        colors: {
          primary: '#1E3340',
          secondary: '#C49859',
          accent: '#D7D3Ae',
          background: '#A96250',
          text: '#fffcf5',
        },
      },
    },
  },
})
