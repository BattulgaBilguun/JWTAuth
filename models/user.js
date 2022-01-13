var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  lastName: {
    type: String,
    required: [true, "овогоо оруулна уу"],
  },
  firstName: {
    type: String,
    required: [true, "нэрээ оруулна уу"],
  },
  email: {
    type: String,
    unique: [true, "емайл хаяг бүртгэгдсэн байна"],
    lowercase: true,
    trim: true,
    required: [true, "емайл хаягаа оруулна уу"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} буруу бичигдсэн емайл хаяг байна!'
    }
  },
  role: {
    type: String,
    enum: ["normal", "admin"],
    required: [true, ""]
  },
  password: {
    type: String,
    required: true
  },
  gender:{
    type: Number,
    required: true
  },
  createUser:{
    type: String,
    required: false,    
  },
  picture:{
    type: String,
    required: false,
  },
  birthDate:{
    type: Date,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);