<template>
  <div class="chart-container">
    <canvas ref="funnelCanvas"></canvas>
  </div>
</template>

<!-- <script>
import { defineComponent, onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import 'chartjs-plugin-funnel';

Chart.register(...registerables);

export default defineComponent({
  props: {
    jobs: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const funnelCanvas = ref(null);
    let chartInstance = null;

    const processJobData = () => {
      const statusCounts = props.jobs.reduce((acc, { status }) => {
        const cleanStatus = status ? status.toLowerCase() : 'undefined';
        acc[cleanStatus] = (acc[cleanStatus] || 0) + 1;
        return acc;
      }, {});
      return {
        labels: Object.keys(statusCounts),
        data: Object.values(statusCounts),
      };
    };

    onMounted(() => {
      if (funnelCanvas.value) {
        createChart();
      }
    });

    watch(() => props.jobs, (newJobs, oldJobs) => {
      if (newJobs !== oldJobs) {
        if (chartInstance) {
          chartInstance.destroy();
        }
        createChart();
      }
    }, { deep: true });

    function createChart() {
      const { labels, data } = processJobData();
      const ctx = funnelCanvas.value.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'funnel',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true
            },
            datalabels: {
              color: 'white',
              display: true,
              formatter: (value, context) => {
                return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
              }
            }
          }
        }
      });
    }

    return {
      funnelCanvas,
    };
  },
  beforeUnmount() {
    if (chartInstance) {
      chartInstance.destroy();
    }
  },
});
</script> -->

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 40vh;
  width: 80vw;
}
@media (max-width: 600px) {
  .chart-container {
    width: 95vw;
  }
}
</style>
