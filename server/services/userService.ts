import { prisma } from '../lib/prisma';

interface UpdateUserData {
  name?: string | undefined,
  email?: string | undefined
}

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      transactions: true,
      createdAt: true
    }
  });

  return users;
}

export const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      email: true,
      name: true,
      transactions: true,
      createdAt: true
    }
  });

  return user;
}

export const updateUser = async (id: number, data: UpdateUserData) => {
  const updatedUser = await prisma.user.update({
    where: {
      id
    },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email })
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  })

  return updatedUser;
}

export const removeUser = async (id: number) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  })

  return deletedUser;
}