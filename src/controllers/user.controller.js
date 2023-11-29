export async function registerUser(req, res) {
  try {
    const {} = req.body;
    return res.status(201).json({ status: "success", message: "ok" });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    return res.status(200).json({ status: "success", message: "ok" });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}
