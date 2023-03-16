'use strict'

const express = require('express');
const mdAuthenticattion = require('../middlewares/authenticated');
const configApps = require('./../config/apps.json');
const dbModels = require('../models');
const app = express();
const Stripe = require('stripe');
const stripe = Stripe(configApps.production.keyStripe);
const { decodeBase64 } = require('bcryptjs');

app.post('/create-payment-method',mdAuthenticattion.checkToken,async (req, res, next ) => {

    const card = req.body;
    await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: card.number,
          exp_month: card.exp_month,
          exp_year: card.exp_year,
          cvc: card.cvc,
        },
        billing_details:{
            email: card.email,
            name: card.name,
            phone: card.phone
        }
      }).then(
        paymentMethod => {
            return res.status(200).send({
                success: true,
                message: 'Create Payment Methods',
                data: paymentMethod
            });
        }
        
        ).catch(
                error =>  {
                    return res.status(500).send({
                        success: false,
                        message: 'Payment Method Error.',
                        error: error
                    });
                }
        );

});


app.post('/create-payment-intent',mdAuthenticattion.checkToken,async (req, res, next ) => {
    
    const transaction = req.body;

    if(transaction.userID){
        let profile = await dbModels.profile.findOne({where: {userID: transaction.userID}});

        await stripe.paymentIntents.create({
            amount: parseFloat((parseFloat(transaction.amount) * 100).toString()).toFixed(),
            currency: 'eur',
            customer: profile.profileSTRIPECUSTOMER,
            payment_method: transaction.payment_method,
        }).then(
            paymentIntent => {
                return res.status(200).send({
                    success: true,
                    message: 'Payment Intent Create.',
                    data: paymentIntent
                });
            }
            
            ).catch(
                    error =>  {
                        return res.status(500).send({
                            success: false,
                            message: 'Payment Intent error.',
                            error: error
                        });
                    }
            );
    }
    else{
        await stripe.paymentIntents.create({
            amount: parseFloat((parseFloat(transaction.amount) * 100).toString()).toFixed(),
            currency: 'eur',
            // customer: customer,
            payment_method: transaction.payment_method,
        }).then(
            paymentIntent => {
                return res.status(200).send({
                    success: true,
                    message: 'Payment Intent Create.',
                    data: paymentIntent
                });
            }
            
            ).catch(
                    error =>  {
                        return res.status(500).send({
                            success: false,
                            message: 'Payment Intent error.',
                            error: error
                        });
                    }
            );
    }


});

app.post('/validate-payment-intent',mdAuthenticattion.checkToken,async (req, res, next ) => {

      await stripe.paymentIntents.retrieve(req.body.payment_intent
      ).then(
        paymentIntent => {
            if(paymentIntent.charges.data){
            return res.status(200).send({
                success: true,
                message: 'Payment Intent Success.',
                data: paymentIntent
             });
            }
            else{
                return res.status(200).send({
                    success: false,
                    message: 'Payment Intent without funds.',
                    data: paymentIntent
                });
            }
        }
        
        ).catch(
                error =>  {
                    return res.status(500).send({
                        success: false,
                        message: 'Payment Intent error.',
                        error: error
                    });
                }
        );

});

app.get('/get-cards/:userID',mdAuthenticattion.checkToken,async (req, res, next ) => {

    const userID = req.params.userID;

    let profile = await dbModels.profile.findOne({where: {userID: userID}});

    if(!profile.profileSTRIPECUSTOMER){
        return res.status(200).send({
            success: true,
            message: 'Cards User',
            data: null
        });
    }

    const cards  =  await stripe.paymentMethods.list({
        customer: profile.profileSTRIPECUSTOMER,
        type: 'card',
      });


    return res.status(200).send({
        success: true,
        message: 'Cards User',
        data: cards
    });


});

app.post('/save-card',mdAuthenticattion.checkToken,async (req, res, next ) => {

    const card = req.body;

    let profile = await dbModels.profile.findOne({where: {userID: req.body.userID}});

    let payment_method;
    
    await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: card.number,
          exp_month: card.exp_month,
          exp_year: card.exp_year,
          cvc: card.cvc,
        },
        billing_details:{
            email: card.email,
            name: card.name,
            phone: card.phone
        }
      }).then(
        paymentMethod => {
            payment_method = paymentMethod;
        }
        
        ).catch(
                error =>  {
                    return res.status(500).send({
                        success: false,
                        message: 'Payment Method Error.',
                        error: error
                    });
                }
        );
        

    if(profile.profileSTRIPECUSTOMER == null){
        
        
        const customer = await stripe.customers.create({payment_method: payment_method.id, email: req.body.email});
        
        profile.profileSTRIPECUSTOMER = customer.id;
 
        
        dbModels.profile.update(profile.toJSON(), {where: {id: profile.id}})
        
    }
    else{

       const paymentMethod = await stripe.paymentMethods.attach(
            payment_method.id,
            {
              customer: profile.profileSTRIPECUSTOMER,
            }
          );   

    }

    return res.status(200).send({
        success: true,
        message: 'Profile',
        data: profile
    });

});

module.exports = app;