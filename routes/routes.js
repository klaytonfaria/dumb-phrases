exports.index = function(res, res) {
  res.render('index', {
    title: 'Teste',
    author: {name: 'Klayton Faria', age:27},
    phrase: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, officiis temporibus id voluptatum ad iste!'
  });
};

exports.all = function(req, res) {	
  dumbPhrasesProvider.findAll(function(error, phrases){
      res.render('all', {
      title: "Dumb Phrases",
      phrases : phrases
    });
  });
}

exports.new_get = function(req, res) {
    res.render('new', {
        title: 'New awesome dumb phrase'
    });
};

exports.new_post = function(req, res) {
	dumbPhrasesProvider.save({      
		title: req.param('title'),
		author: {
			name: req.param('name'), 
			age: req.param('mental-age')
		},
		phrase : req.param('phrase')
	}, function(error, docs) {
		res.redirect('/')
	});
}