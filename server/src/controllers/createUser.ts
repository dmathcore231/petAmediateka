import { Request, Response, NextFunction } from 'express'
import { hash } from 'bcrypt'
import { UserModel } from '../models/userSchema'

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { type, email, password } = req.body
  const { error } = res.locals.localDataState

  if (error) {
    return next()
  }

  if (type === 'authSignUpEmail') {
    return next()
  }

  const hashedPassword = await hash(password, 10)

  const user = await UserModel.create({
    userPersonalData: {
      email,
      password: hashedPassword
    }
  })

  await user.save()

  res.locals.localDataState.user = await UserModel.findOne({ 'userPersonalData.email': email }).select('-userPersonalData.userCard').select('-userPersonalData.password')

  return next()
}
