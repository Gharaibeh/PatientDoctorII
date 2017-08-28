exports.index = function(request, response){
    response.render('default', {
        title: 'Home Page'
    });
}

exports.about = function(request, response){
    response.render('default', {
        title: 'About Us'
    });
}