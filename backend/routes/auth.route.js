import express from "express";
import passport from "passport";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();

// router.get("/login", (req, res) => {
//   res.send("You logged in");
// });

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: process.env.CLIENT_BASE_URL + "/login"
  }),
  function (req, res) {
    res.redirect(process.env.CLIENT_BASE_URL);
  }
);

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) 
  res.send({ user: req.user });
  else 
  res.send({ user: null });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.json({ message: "Logged out" });
  });
});

export default router;
