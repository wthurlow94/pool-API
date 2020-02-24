import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  console.log("Get match");
  res.send("Get Users");
});


router.get('/:userId', (req, res) => {
  console.log("Get user" + req.params.userId);
  res.send("Get user" + req.params.userId);
});

export default router;
