'use strict'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body

    try {
     const lineItems = products.map((product) => ({
        price_data: {
         currency: 'usd',
         product_data: {
         name: product.name,
    },
    unit_amount: Math.round(product.price * 100),
  },
  quantity: product.quantity || 1,
}));

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        line_items: lineItems,
      })

      await strapi.service('api::order.order').create({
        data: {
          products,
          stripeId: session.id,
        },
      })

      return { url: session.url }
    } catch (err) {
      console.error(err)
      ctx.response.status = 500
      return { error: err.message }
    }
  },
}))
