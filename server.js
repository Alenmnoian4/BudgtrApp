const express = require('express')
const methodOverride = require('method-override')
const budget = require('./models/budget.js')
const PORT = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/static', express.static('public'))

// index route
app.get('/', (req, res) => {
    res.render('index.ejs', {
        totalBudgtr: budget,
        total: budget.reduce(function (totaled, item) { 
            return totaled + parseInt(item.amount)
          }, 0)
    })
})

// new route
app.get('/budget/new', (req, res) => {
    res.render('new.ejs')
})

// create route
app.post('/', (req, res) => {
    budget.push(req.body)
    res.redirect("/")
})

// show route
app.get('/budget/:id', (req, res) => {
    res.render('show.ejs', {
        budget: budget[req.params.id]
    })
})

app.listen(PORT, () => {
    console.log(`Listening...${PORT}`)
})