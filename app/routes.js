const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/encounter-type', function (req, res) {
  res.render('encounter-type')
})

router.post('/encounter-type', function (req, res) {
  const answer = req.session.data['encounter-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'encounter-type': 'Select what type of encounter you had' }
    return res.render('encounter-type')
  }
  res.redirect('/witness-confirmation')
})

router.get('/witness-confirmation', function (req, res) {
  res.render('witness-confirmation')
})

router.post('/witness-confirmation', function (req, res) {
  const answer = req.session.data['witness-confirmation']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'witness-confirmation': 'Select yes if someone else witnessed the encounter' }
    return res.render('witness-confirmation')
  }
  res.redirect('/location')
})

router.get('/location', function (req, res) {
  res.render('location')
})

router.post('/location', function (req, res) {
  const answer = req.session.data['location']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'location': 'Enter where the encounter happened' }
    return res.render('location')
  }
  res.redirect('/recent-encounter')
})

router.get('/recent-encounter', function (req, res) {
  res.render('recent-encounter')
})

router.post('/recent-encounter', function (req, res) {
  const answer = req.session.data['recent-encounter']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'recent-encounter': 'Select yes if the encounter happened in the last 30 days' }
    return res.render('recent-encounter')
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-recent-encounter')
  }
  res.redirect('/description')
})

router.get('/ineligible-recent-encounter', function (req, res) {
  res.render('ineligible-recent-encounter')
})

router.get('/description', function (req, res) {
  res.render('description')
})

router.post('/description', function (req, res) {
  const answer = req.session.data['description']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'description': 'Enter a description of what happened during the encounter' }
    return res.render('description')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('AE')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
