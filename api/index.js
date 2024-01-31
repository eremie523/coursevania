const express = require('express');
const colors = require('colors')
const authRouter = require('./routes/authRoutes/')
const passport = require('passport')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const requestIp = require('request-ip');
const device = require('express-device');
const useragent = require('express-useragent');
const rootRouter = require('./routes/rootRoutes')

require('./db/')
require('./Strategies/Local.strat')

require('./Strategies/serialize_deserialize')

const app = new express()

app.use(cors({
    origin: ['http://allowed-origin.com', 'http://localhost:3000', 'http://localhost'],
    methods: 'GET,PUT,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}))

app.use(device.capture());
app.use(requestIp.mw());
app.use(useragent.express())

const mongoStore = new MongoStore({
    mongoUrl: 'mongodb://localhost:27017/attendance_project',
    collectionName: 'sessions',
    ttl:  7 * 24 * 60 * 60,
    autoRemove: 'interval',
    autoRemoveInterval: 10,
    HttpOnly: false
})

app.use(expressSession({
    secret: "secret",
    name: "Sessions",
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Session expiration time in milliseconds (1 day)
    },
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(rootRouter)
app.use("/auth", authRouter)

app.listen(4000, () => {
    console.log(colors.green('listening on port 4000'))
});