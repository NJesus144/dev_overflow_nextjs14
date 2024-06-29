'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mogoose'
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from './shared.types'
import { revalidatePath } from 'next/cache'
import Question from '@/database/question.model'
import console from 'console'

export async function getUserById(params: any) {
  try {
    connectToDatabase()

    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    return user
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase()

    const newUsewr = await User.create(userData)

    return newUsewr
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase()

    const { clerkId, updateData, path } = params

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase()

    const { clerkId } = params

    const user = await User.findOneAndDelete({ clerkId })

    if (!user) {
      throw new Error('User not found')
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user questions ids
    // eslint-disable-next-line no-unused-vars
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      '_id',
    )

    // delete user questions
    await Question.deleteMany({ author: user._id })

    const deletedUser = await User.findByIdAndDelete(user._id)

    return deletedUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase()

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 })

    return { users }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function saveQuestion(params: ToggleSaveQuestionParams) {
  try {
    const { userId, questionId, path } = params

    const user = await User.findOne({ userId })

    await User.findByIdAndUpdate(
      user._id,
      { $addToSet: { saved: questionId } },
      {
        new: true,
      },
    )

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
