'use strict'

// Requires
const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql2');
const config = require('./config/config.json');
const http = require('http');
const cron = require('node-cron');
const socketIO = require('socket.io');


const app = express();
var httpServer = http.createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-localization, APP-NAME');
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Content-Type', 'text/plain', 'x-localization', 'APP-NAME');
    next();
});

const whitelist = ['http://localhost:4201','http://localhost:4200','https://app.protocol73.com','https://app-test.protocol73.com'];
module.exports.io = socketIO(httpServer, {
    cors: {
        origin: whitelist, 
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Import Routes
const appRoutes = require('./routes/app');
const userRoutes = require('./routes/user');
const promtpRoutes = require('./routes/promtp');
const profileRoutes = require('./routes/profile');
const uniqueRoutes = require('./routes/unique');
const planRoutes = require('./routes/plan');
const balanceRoutes =require('./routes/balance');
const promtpAvailableRoutes = require('./routes/promtpAvailable');
const stripeRoutes = require('./routes/stripe');
const imageRoutes = require('./routes/image');
const uniqueAvailableRoutes = require('./routes/uniqueAvailable');
const uniqueLikeRoutes = require('./routes/uniqueLike');
var uploadhRoutes = require('./routes/upload');
var dashboardRoutes = require('./routes/dashboard');
var storyRoutes = require('./routes/story');
var rankingsRoutes = require('./routes/rankings');
var registerExcutionsRoutes = require('./routes/registerExecution');
var profileLikeRoutes = require('./routes/profileLike');
var uniqueCategoryRoutes = require('./routes/uniqueCategory');
var uniqueDownloadRoutes = require('./routes/uniqueDowload');
var uniqueSellRoutes = require('./routes/uniqueSell');
var myTokenRoutes = require('./routes/myToken');
var auctionOffersRoutes = require('./routes/auctionOffer');
var reportProblemRoutes = require('./routes/reportProblem');
var notificationRoutes = require('./routes/notification');
const voucherRoutes = require('./routes/voucher');
const payToOwnRoutes = require('./routes/payToOwn');
const profileObservation = require('./routes/profileObservation');
const transactionRoutes = require('./routes/transacccion');
const algorithmRequestRoutes = require('./routes/algorithmRequest');
const passRoutes = require('./routes/pass');
const uniqueTokenOfferRoutes = require('./routes/uniqueTokenOffer');
const nftRoutes = require('./routes/nft');
const debtNFTRoutes = require('./routes/nftDebt');

// create the connection to database
const connection = mysql.createConnection({
    host: config.production.host,
    user: config.production.username,
    password: config.production.password,
    database: config.production.database,
    port: config.production.port
});

require('./sockets/socket');

connection.connect((err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos: ' + connection.config.database + '\x1b[32m%s\x1b[0m', ' Online');
        // Escuchar peticiones
        // var server = http.createServer(app).listen(3000, () => {
        //     console.log('Express Server Puerto: 3000: \x1b[32m%s\x1b[0m', 'Online');
        // });
        // server.timeout = 120000;
        httpServer.listen(3000, () => {
            console.log('Express Server Puerto: 3000: \x1b[32m%s\x1b[0m', 'Online');
        });
    }
})

connection.end();

// Routes
app.use('/api', appRoutes);
app.use('/api/user', userRoutes);
app.use('/api/promtp',promtpRoutes);
app.use('/api/profile',profileRoutes);
app.use('/api/unique',uniqueRoutes);
app.use('/api/plan',planRoutes);
app.use('/api/balance',balanceRoutes);
app.use('/api/promtp-available',promtpAvailableRoutes);
app.use('/api/stripe',stripeRoutes);
app.use('/api/image',imageRoutes);
app.use('/api/unique-available',uniqueAvailableRoutes);
app.use('/api/upload', uploadhRoutes);
app.use('/api/unique-like',uniqueLikeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/rankings', rankingsRoutes);
app.use('/api/register-excution',registerExcutionsRoutes);
app.use('/api/profile-like',profileLikeRoutes);
app.use('/api/unique-category',uniqueCategoryRoutes);
app.use('/api/unique-download', uniqueDownloadRoutes);
app.use('/api/unique-sell',uniqueSellRoutes);
app.use('/api/my-token',myTokenRoutes);
app.use('/api/auction-offer',auctionOffersRoutes);
app.use('/api/report-problem',reportProblemRoutes);
app.use('/api/notification',notificationRoutes);
app.use('/api/voucher',voucherRoutes);
app.use('/api/pay-to-own',payToOwnRoutes);
app.use('/api/profile-observation',profileObservation);
app.use('/api/transaction',transactionRoutes);
app.use('/api/algorithm-request',algorithmRequestRoutes);
app.use('/api/pass',passRoutes);
app.use('/api/unique-token-offer',uniqueTokenOfferRoutes);
app.use('/api/nft',nftRoutes);
app.use('/api/debt-nft',debtNFTRoutes);

//Jobs Requeried

const {auctionJob} = require('./jobs/auctionJob');
const {auctionNoMetJob} = require('./jobs/auctionNoMetJob');
const {voucherJob} = require('./jobs/voucherJob');
const {passMoodUseJob} = require('./jobs/passMoodUseJob');
const {passArtMovementUseJob} = require('./jobs/passArtMovementUseJob');
const {passElementUseJob} = require('./jobs/passElementUseJob');
const {planUpdateJob} = require('./jobs/planUpdateJob');
const {uniqueTokenOfferJob} = require('./jobs/uniqueTokenOfferJob');

//Jobs Execution
cron.schedule('0 0 * * *',() => {
    planUpdateJob();
    auctionJob();
   auctionNoMetJob();
   voucherJob();
   passMoodUseJob();
   passElementUseJob();
   passArtMovementUseJob();
   uniqueTokenOfferJob();
})

