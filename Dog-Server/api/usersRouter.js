const express = require('express');
const mongoose = require('mongoose');
const usersRouter = express.Router();
const usersController = require('./usersController');
const uri = 'mongodb+srv://david:Aa123456@cluster0.9epo2.mongodb.net/classdb?retryWrites=true&w=majority&appName=Cluster0';
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(uri, clientOptions);
//-------users settings-----------------//
usersRouter.post('/user', usersController.createUser);
usersRouter.get('/users', usersController.getAll);
usersRouter.get('/user/:id', usersController.getById); 
usersRouter.patch('/user/:id/name', usersController.updateName);
usersRouter.patch('/user/:id/profile', usersController.updateProfile);
usersRouter.delete('/user/:id', usersController.deleteUserById);
usersRouter.delete('/user/:id/profile', usersController.deleteProfile);
//-------favotites settings--------------------------------
usersRouter.post('/user/:id/favorite',usersController.addFavorite);
usersRouter.get('/user/:id/favorites',usersController.getAllFavorites);
usersRouter.patch('/user/:id/favorite/:favId/name',usersController.changeFavoriteName);
usersRouter.delete('/user/:id/favorite/:favId',usersController.deleteFavoriteById);


module.exports = usersRouter;