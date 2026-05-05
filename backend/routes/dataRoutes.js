const router = require("express").Router();

// simulación de IA
router.post("/analyze", (req, res) => {
  const { temperatura, carga } = req.body;

  let estado = "normal";

  if (temperatura > 90) estado = "alert";
  else if (carga > 80) estado = "warning";

  res.json({ estado });
});

module.exports = router;