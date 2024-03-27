import Fastify from 'fastify'

import dotenv from 'dotenv'

dotenv.config()

const fastify = Fastify({ logger: true })

// * won't work cuz depracated
// fastify.register(import('fastify-swagger'), {
//   exposeRoute: true,
//   routePrefix: '/docs',
//   swagger: {
//     info: { title: 'fastify-api' },
//   },
// })

fastify.register(import('./items/routes'))

fastify.listen({ port: +process.env.PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
