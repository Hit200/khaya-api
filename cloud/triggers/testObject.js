Parse.Cloud.beforeSave("TestObject", function(request, response) {
  if (!request.object.get("foo")) {
    response.error("foo must be set");
  } else {
    response.success();
  }
});