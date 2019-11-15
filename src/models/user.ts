import { model, Schema, Document } from 'mongoose'
import { encrypt } from '../helpers/bcryptjs'

export interface IUser extends Document {
  email: string
  password: string
  tags?: string[]
}

const userSchema = new Schema({
  email: { type: String, required: [true, 'Email required'], unique: true },
  password: { type: String, required: [true, 'Password required'] },
  tags: { type: [String] },
})

userSchema.pre<IUser>('save', async function(next) {
  this.password = await encrypt(this.password)
  next()
})

export default model<IUser>('Users', userSchema)