<template>
    <div class="chart-container">
      <canvas ref="timelineCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref, watchEffect } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import 'chartjs-adapter-date-fns';
  
  Chart.register(...registerables);
  
  export default defineComponent({
    props: {
      jobs: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      const timelineCanvas = ref(null);
      let chartInstance = null;
  
      onMounted(() => {
        try {
          const ctx = timelineCanvas.value.getContext('2d');
  
          const sortedJobs = [...props.jobs].sort((a, b) => new Date(a.date) - new Date(b.date));
          const chartData = sortedJobs.map((job, index) => ({
            x: new Date(job.date).toISOString(),
            y: index,
          }));
  
          const yLabels = sortedJobs.map((job, index) => `${index + 1}: ${job.company}`);
  
          chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Job Applications',
                    data: chartData,
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    pointRadius: 5,
                    lineTension: 0, // Setting this to 0 to ensure straight lines between points
                }],

            },
            options: {
              scales: {
                x: {
                  type: 'time',
                  time: {
                    parser: 'yyyy-MM-dd',
                    tooltipFormat: 'MMM dd, yyyy',
                    unit: 'day',
                  },
                  title: {
                    display: true,
                    text: 'Date of Application',
                  },
                },
                y: {
                  type: 'category',
                  labels: yLabels,
                  title: {
                    display: true,
                    text: 'Companies',
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const labelIndex = context.dataIndex;
                      return `${yLabels[labelIndex]}: ${context.formattedValue}`;
                    },
                  },
                },
              },
              responsive: true,
              maintainAspectRatio: false,
            },
          });
  
        } catch (error) {
          console.error('Error creating the chart:', error);
        }
      });
  
      watchEffect((onInvalidate) => {
        onInvalidate(() => {
          if (chartInstance) {
            chartInstance.destroy();
          }
        });
      });
  
      return {
        timelineCanvas,
      };
    },
  });
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    margin: auto;
    height: 40vh;
    width: 70vw;
  }
  
  @media (max-width: 600px) {
    .chart-container {
      width: 95vw;
    }
  }
  </style>
  