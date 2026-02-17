import { prisma } from '../lib/prisma';

interface UpdateUserData {
  name?: string | undefined,
  email?: string | undefined
}

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      transactions: true
    }
  });

  return users;
}

export const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
    include: {
      transactions: true
    }
  });

  return user;
}

export const addUser = async (email: string, name: string) => {
  const newUser = await prisma.user.create({
    data: {
      name,
      email
    },
    include: {
      transactions: true
    }
  })

  return newUser;
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
    include: {
      transactions: true
    }
  })

  return updatedUser;
}

export const removeUser = async (id: number) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id
    },
    include: {
      transactions: true
    }
  })

  return deletedUser;
}