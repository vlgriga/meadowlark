var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js');

//HANDLEBARS
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');



app.use(express.static(__dirname + '/public'));


app.set('port' , process.env.PORT || 3000);

app.get('/' , function(req,res) {
	// res.type('text/plain');
	// res.status(200);
	// res.send('Meadowlark Travel');
	res.render('home');
});

app.get('/about' , function(req,res) {
	// res.type('text/plain');
	// res.send('About Meadowlark Travel');
	res.render('about', { fortune: fortune.getFortune() });
});

app.use(function(req, res) {
	// res.type('text/plain');
	// res.send("404 - page not found");
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res , next) {
	// console.log(err.stack);
	// res.type('text/plain');
	// res.status(500);
	// res.send("500 - Server error");
	res.status(500);
	res.render('500');
});


app.listen(app.get('port') , function() {
	console.log("Server is running on " + app.get('port'));
});