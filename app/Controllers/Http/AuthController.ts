import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
//import rule from 'validator'

export default class SignupController {
    public async signup({request, response}:HttpContextContract){
        const req = await request.validate({ 
            schema:schema.create({
                username: schema.string(),
                email:schema.string({},[
                    rules.email()
                ]),
                password: schema.string([
                    rules.confirmed('password_confirmation')
                  ]),
                password_confirmation: schema.string()
        }),
        messages: {
            'username.required':'username is required to sign up',
            'email.required':'email is required to sign up',
            'password.required':'password is missing',
            'password_confirmation.confirmed':'password do not match'
            
        }
    
    })
        const user = new User()

        user.username = req.username
        user.email = req.email
        user.password = req.password
        user.password_confirmation = req.password_confirmation

        await user.save();

        return response.redirect('/')
    }

    public async login({request, auth, response}: HttpContextContract){
        const req = await request.validate({schema:schema.create({
            email:schema.string({},[
                rules.email()
            ]),

            password:schema.string({},[
                rules.minLength(4)
            ])
        }),
        messages: {
            //'username.required':'username is required to sign up',
            'email.required':'email is required to login',
            'password.required':'password is missing',
            'password.minLength':'password must be atleast 4 characters'
           // 'password_confirmation.confirmed':'password do not match'
            
        }

    })
    //fetching user data
   // const user = await User.findByOrFail('email', req.email)
    const email = req.email
    const password = req.password
    await auth.attempt(email, password)

    return response.redirect('/profile');
    }



}
