const mongoose = require("mongoose");
const mhsSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  nbi: {
    type: Number,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
  tglMasuk: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mahasiswa", mhsSchema);
