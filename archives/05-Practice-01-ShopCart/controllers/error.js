module.exports.get404 = (req, res, next) => {
  const config = {
    pageTitle: '404 Page',
    content: 'Page Not Found!',
    path: '/404',
  };

  res
    .status(404)
    .render('404', config)
}