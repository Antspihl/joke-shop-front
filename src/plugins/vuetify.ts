/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'oppenheimer',
    themes: {
      barbie: {
        colors: {
          primary: '#B32370',
          secondary: '#F78CC5',
          accent: '#C4277B',
          background: '#F7D4E7',
          text: '#ffffff',
        },
      },
      oppenheimer: {
        colors: {
          surface: '#C49859',
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
