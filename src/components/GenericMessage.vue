<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="error-template">
          <h1>
            {{messageTitle}}
          </h1>
          <div class="error-details">
            <p>{{messageContent}}</p>
          </div>
          <div class="error-actions">
            <a href="http://www.praqma.com" class="btn btn-primary btn-lg">
              <span class="glyphicon glyphicon-home"></span>
              Take Me to Praqma </a>
            <a href="http://www.praqma.com" class="btn btn-default btn-lg">
              <span class="glyphicon glyphicon-envelope"></span> Contact Support </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["messageTitle", "messageContent"]
};
</script>
<style>
.error-template {
  padding: 40px 15px;
  text-align: center;
}

.error-actions {
  margin-top: 15px;
  margin-bottom: 15px;
}

.error-actions .btn {
  margin-right: 10px;
}
</style>
