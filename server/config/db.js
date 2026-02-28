import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Database Connected")
  } catch (error) {
    console.log("Database connection failed")
    console.error(error)
  }
}

export default connectDB
