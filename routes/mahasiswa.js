const express = require("express");
const router = express.Router();
const Mahasiswa = require("../models/Mahasiswa");
const veryfytoken = require("../routes/veryfytoken");

// read
router.get("/", veryfytoken, async (req, res) => {
  const data = await Mahasiswa.find();
  res.status(200).json({
    message: "success",
    data: data,
  });
});
// Create
router.post("/", async (req, res) => {
  const mhsPost = new Mahasiswa({
    nama: req.body.nama,
    nbi: req.body.nbi,
    jurusan: req.body.jurusan,
  });
  try {
    const data = await mhsPost.save();
    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const data = await Mahasiswa.updateOne(
      { _id: req.params.id },
      {
        nama: req.body.nama,
        nbi: req.body.nbi,
        jurusan: req.body.jurusan,
      }
    );
    res.status(200).json({
      message: "Data berhasil di Update",
    });
  } catch (err) {
    console.log(err);
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const data = await Mahasiswa.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "data berhasil di hapus",
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
