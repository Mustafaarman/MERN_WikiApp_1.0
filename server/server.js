const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

app.use(cors({origin: "*", methods: "GET, POST, PUT, PATCH, DELETE"}))

mongoose.connect('mongodb://localhost:27017/wikipedia', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const Schema = mongoose.Schema;
const articlesSchema = new Schema({title: String, content: String});
const Article = mongoose.model('Article', articlesSchema);

app.route('/articles')
  .get(function (req, res) {
  	Article.find(function(err, doc) {
  		if(doc) {
  			res.send(doc);
  		}
  		else{
  			res.send('no articles found');
  		}
  	})
    console.log('success, code passed');
  })
  .post(async function (req, res) {
	  
  	const newArticle = new Article({
		_id: req.body.id,
		title: req.body.title,
		content: req.body.content
	})
	console.log(newArticle);
  	await newArticle.save(function(err, doc) {
    	if(err) {
    		res.send(err)
    	}
    	else{
    		res.send(doc)
    	    console.log(doc);	
    	}
    	
  		})
 	 })
  .delete(async function(req, res) {
  	await Article.deleteMany(function(err, items) {
  		res.send(items)
  		console.log('all articles deleted');
  	})
	});


app.route('/articles/:id')
	.get(async function(req, res) {
		await Article.findById(req.params.id, function(err, doc) {
			if(doc) {
				res.send(doc)
			}
			else{
				res.send('this article not found')
			}
		})
	})
	.delete(async function(req, res) {
		await Article.findByIdAndDelete(req.params.id, function(err, item) {
			if (!err) {
				console.log("deleted an item successfully")
			}
			else{
				console.log(err)
			}
			
		})
  	})
	.put(async function(req, res) {
		await Article.findByIdAndUpdate(req.params.id,
			{title: req.body.title, content: req.body.content}, {overwrite: true}, function(err, doc) {
				if(!err) {
					res.send(doc);
				}
			})
	})
	.patch(async function(req, res) {
		await Article.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, doc) {
			if(!err) {
				res.send('succesfully update');
			}
			else{
				res.send(err);
			}
		})
	});

	

  app.listen(4000, () => {
  	console.log('server starting on 3000');
  });