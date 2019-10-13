const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionContoller = require("./controllers/SessionController");
const SpotContoller = require("./controllers/SpotController");
const DashboardContoller = require("./controllers/DashboardController");
const BookingContoller = require("./controllers/BookingController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

const routes = express.Router();
const upload = multer(uploadConfig);

// req.query --> Acessar query params (para filtros)
// req.params --> Acessar route params (para edicao, delete)
// req.body --> Acessar corpo da requisicao (para criacao, adicao)

routes.post('/sessions', SessionContoller.store);

routes.post('/spots', upload.single('thumbnail'), SpotContoller.store);
routes.get('/spots', SpotContoller.index);

routes.get('/dashboard', DashboardContoller.show);

routes.post('/spots/:spot_id/bookings', BookingContoller.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;