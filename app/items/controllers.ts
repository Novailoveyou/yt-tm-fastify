import { FastifyReply, FastifyRequest } from 'fastify'
import { v4 as uuidv4 } from 'uuid'
import { items } from './data'

type Id = { id: string }
type Item = { name: string }

export const getItems = (_, reply: FastifyReply) => {
  return reply.send(items)
}

export const getItem = async (
  request: FastifyRequest<{ Params: Id }>,
  reply: FastifyReply,
) => {
  const id = request.params.id

  if (!id) {
    return reply.code(400).send({ error: 'Invalid id' })
  }

  return reply.send(items.find(item => item.id === id) || null)
}

export const postItem = async (
  request: FastifyRequest<{ Body: Item }>,
  reply: FastifyReply,
) => {
  const name = request.body?.name || ''

  const item = {
    id: uuidv4(),
    name,
  }

  items.push(item)

  return reply.code(201).send(item)
}

export const updateItem = async (
  request: FastifyRequest<{ Params: Id; Body: Item }>,
  reply: FastifyReply,
) => {
  const id = request.params.id
  const name = request.body?.name || ''

  if (!id) {
    return reply.code(400).send({ error: 'Invalid id' })
  }

  if (!name) {
    return reply.code(400).send({ error: 'Invalid name' })
  }

  const itemIndex = items.findIndex(item => item.id === id)

  if (itemIndex === -1) {
    return reply.code(404).send({ error: 'Item not found' })
  }

  const item = { ...items[itemIndex], name }

  items[itemIndex] = item

  return reply.send(item)
}

export const deleteItem = async (
  request: FastifyRequest<{ Params: Id }>,
  reply: FastifyReply,
) => {
  const id = request.params.id

  if (!id) {
    return reply.code(400).send({ error: 'Invalid id' })
  }

  const index = items.findIndex(item => item.id === id)

  if (index === -1) {
    return reply.code(404).send({ error: 'Item not found' })
  }

  items.splice(index, 1)

  return reply.send({})
}
