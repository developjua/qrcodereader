const pool = require("../database/dataconn.js");



const newqrcode = async (req, res) => {
  const { id, content, scandata } = req.body;

  if (!content) {
    return res.status(400).json({
      error: "400",
      message: "content field is required",
    });
  }

  try {

    const [results] = await pool.execute(
      "INSERT INTO QR_code (id, content, scandata) VALUES (?, ?, ?)",
      [id, content, scandata]
    );

    return res.status(200).json({
      message: "Data inserted successfully",
      insertedId: results.insertId,
    });
  } catch (error) {
    console.error("Error inserting data into the database:", error);
    return res.status(500).json({
      error: "500",
      message: "Internal Server Error",
    });
  }
};


const listqrcode= async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM QR_code ');

    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error retrieving scanned QR codes:", error);
    return res.status(500).json({
      error: "500",
      message: "Internal Server Error",
    });
  }
}


const deleteqrcode=async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connection.execute('DELETE FROM QR_code WHERE id = ?', [id]);

    if (result.affectedRows === 1) {
      return res.status(200).json({ message: "QR code record deleted successfully" });
    } else {
      return res.status(404).json({ message: "QR code record not found" });
    }
  } catch (error) {
    console.error("Error deleting QR code record:", error);
    return res.status(500).json({
      error: "500",
      message: "Internal Server Error",
    });
  }
}



module.exports = { newqrcode, deleteqrcode, listqrcode };
