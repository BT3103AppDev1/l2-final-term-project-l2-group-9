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

      // Prepare data for the pie chart
      const chartData = {
        labels: Object.keys(statusCounts),
        datasets: [
          {
            data: Object.values(statusCounts),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#C9CBCF',
            ],
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
  height: 75vh;
  width: 75vw;
}

@media (max-width: 600px) {
  .chart-container {
    width: 95vw;
  }
}
</style>
