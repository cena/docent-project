var Resource = require('../server/models/embed');

var resources = {

	getAll: function(req, res) {
    Resource.find(function (err,resources) {
      if (err) {
        console.log(err);
      } else {
        res.send(resources);
      }
    });
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    Resource.findOne({ embedName: id }, function (err,resource) {
      if (err) {
        console.log(err);
      } else {
        if (resource) {
          res.send(resource);
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
  },
 
  create: function(req, res) {
    var body = req.body;
    Resource.findOne({  embedName: body.embedName }, function (err,resource) {
      if (err) {
        console.log(err);
      } else {
        if (resource) {
          res.status(409);
          res.json({
            "status": 409,
            "message": "Resource already exists."
          });
        } else {
          var newResource = new Resource({
          
            embedName: body.embedName,
            embedLink: body.embedLink,
            howto: body.howto,
            description: body.description,
            category: body.category,
            tags: body.tags,
            subject: body.subject,
            
          });
          newResource.save(function(err,newResource) {
            if (err) {
              return console.error(err);
            } else {
              res.json(newResource);
            }
          });
        }
      }
    });
  },
 
  update: function(req, res) {
    var body = req.body;
    var id = req.params.id;
 
    Resource.findOne({ embedName: id }, function (err,Resource) {
      if (err) {
        console.log(err);
      } else {
        if (Resource) {
          Resource.findOneAndUpdate({embedName:id},body, function (err,updatedResource) {
            if (err) {
              console.log(err);
            } else {
              res.json(updatedResource);
            }
          });
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    Resource.findOne({ embedName: id }, function (err,Resource) {
      if (err) {
        console.log(err);
      } else {
        if (Resource) {
          Resource.remove({embedName: id}, function (err,Resource) {
            if (err) {
              console.log(err);
            } else {
              // normally we would return a 'true' or 'false' to our client, but let's output a status
              // for illustration purposes
              res.status(200);
              res.json({
                "status": 200,
                "message": "delete of " + id + " succeeded."
              });
            }
          });
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
  }
};
 
module.exports = resources;