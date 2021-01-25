import {h, onMounted, onUnmounted, reactive, ref} from 'vue'
import Chart from 'chart.js'

export const generateChart = (chartId, chartType) => ({
  props: {
    chartId: {
      default: chartId,
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    },
    cssClasses: {
      type: String,
      default: ''
    },
    styles: {
      type: Object
    },
    plugins: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props) {
    const {
      chartId,
      cssClasses,
      data,
      height,
      options,
      plugins,
      styles,
      width
    } = reactive(props)

    const canvasRef = ref()
    const chartRef = ref()

    onMounted(() => {
      if (chartRef.value) {
        chartRef.value.destroy()
      }

      if (!canvasRef.value) {
        throw new Error('Canvas `ref` does not exist')
      }

      const chart = new Chart(
        canvasRef.value.getContext('2d'), {
          type: chartType,
          data,
          options,
          plugins
        }
      )

      chartRef.value = chart
    })

    onUnmounted(() => {
      if (chartRef.value) {
        chartRef.value.destroy()
      }
    })

    return () => h(
      'div',
      {
        style: styles,
        class: cssClasses
      },
      [
        h('canvas', {
          id: chartId,
          width: width,
          height: height,
          ref: canvasRef
        })
      ]
    )
  }
})

export const Bar = generateChart('bar-chart', 'bar')
export const Doughnut = generateChart('doughnut-chart', 'doughnut')
export const Line = generateChart('line-chart', 'line')
export const Pie = generateChart('pie-chart', 'pie')
export const PolarArea = generateChart('polar-chart', 'polarArea')
export const Radar = generateChart('radar-chart', 'radar')
export const Bubble = generateChart('bubble-chart', 'bubble')
export const Scatter = generateChart('scatter-chart', 'scatter')
export const HorizontalBar = generateChart(
  'horizontalbar-chart',
  'horizontalBar'
)
