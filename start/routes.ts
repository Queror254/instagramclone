
import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')
Route.on('/signup').render('auth/signup')
Route.on('/login').render('auth/login1')
Route.post('/signup', 'AuthController.signup')
Route.post('/login', 'AuthController.login')