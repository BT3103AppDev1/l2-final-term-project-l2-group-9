<template>
    <div v-if="visible" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h3>Application Timeline</h3>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <timeline-chart :jobs="jobs" />
      </div>
    </div>
  </template>
  
  <script>
  import TimelineChart from './TimelineChart.vue';
  
  export default {
    components: { TimelineChart },
    props: {
      visible: Boolean,
      jobs: Array
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 11;
  }
  
  .modal {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    max-width: 80%;
    width: 90%;
    height: 90%;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  </style>
  