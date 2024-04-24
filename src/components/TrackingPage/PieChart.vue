<template>
  <div class="chart-container">
    <canvas ref="pieCanvas"></canvas>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watchEffect } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default defineComponent({
  props: {
    jobs: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const pieCanvas = ref(null);
    let pieChartInstance = null;

    onMounted(() => {
      const ctx = pieCanvas.value.getContext('2d');
      
      // Count job statuses for the pie chart
      const statusCounts = props.jobs.reduce((acc, { status }) => {
        if (!acc[status]) {
          acc[status] = 0;
        }
        acc[status] += 1;
        return acc;
      }, {});

      const statusColorMap = {
        applied: '#526d82',
        pending: '#a4d0a4',
        interview: '#ffead2',
        offered: '#00bf63',
        rejected: '#ce243b',
        closed: '#85586f',
      };

      // Prepare data for the pie chart
      const chartData = {
        labels: Object.keys(statusCounts),
        datasets: [
          {
            data: Object.values(statusCounts),
            backgroundColor: Object.keys(statusCounts).map(status => statusColorMap[status]),
            hoverOffset: 4
          },
        ],
      };

      // Create the pie chart
      pieChartInstance = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed !== null) {
                    label += context.parsed;
                  }
                  return label;
                },
              },
            },
          },
        },
      });
    });

    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        if (pieChartInstance) {
          pieChartInstance.destroy();
        }
      });
    });

    return {
      pieCanvas,
    };
  },
});
</script>

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 81vh;
  width: 80vw;
}

@media (max-width: 600px) {
  .chart-container {
    width: 95vw;
  }
}
</style>
