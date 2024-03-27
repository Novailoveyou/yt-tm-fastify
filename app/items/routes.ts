import Fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import {
  getItems,
  getItem,
  postItem,
  updateItem,
  deleteItem,
} from './controllers'

type FastifyOptions = Parameters<ReturnType<typeof Fastify>['get']>['1']

const Item = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
} as const

const ItemBody = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string' },
  },
}

const getItemsOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item,
      },
    },
  },
  handler: getItems,
} satisfies FastifyOptions

const getItemOptions = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getItem,
} satisfies FastifyOptions

const postItemOptions = {
  schema: {
    response: {
      201: Item,
    },
    body: ItemBody,
  },
  handler: postItem,
} satisfies FastifyOptions

const updateItemOptions = {
  schema: {
    response: {
      200: Item,
    },
    body: ItemBody,
  },
  handler: updateItem,
} satisfies FastifyOptions

const deleteItemOptions = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: deleteItem,
} satisfies FastifyOptions

const itemRoutes = (
  fastify: ReturnType<typeof Fastify>,
  options: Parameters<typeof Fastify>['0'],
  done: (err?: FastifyError) => void,
) => {
  fastify.get('/items', getItemsOptions)

  fastify.get('/items/:id', getItemOptions)

  fastify.post('/items', postItemOptions)

  fastify.put('/items/:id', updateItemOptions)

  fastify.delete('/items/:id', deleteItemOptions)

  done()
}

export default itemRoutes
