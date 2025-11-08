const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri); // não precisa mais das opções deprecated
    console.log('✅ MongoDB Atlas conectado com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao conectar no MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
