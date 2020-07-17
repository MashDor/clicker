<template>
  <b-card bg-variant="dark" header="Points" text-variant="white">
    <div class="d-flex justify-content-between">
      <h5 class="text-success">{{points.success}}</h5>
      <h5 class="text-muted mx-2">/</h5>
      <h5 class="text-muted">{{points.unclicked}}</h5>
      <h5 class="text-muted mx-2">/</h5>
      <h5 class="text-danger">{{points.fail}}</h5>
    </div>
  </b-card>
</template>
<script>
export default {
  props: {
    points: Object
  }
}
</script>