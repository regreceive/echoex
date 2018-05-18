function HomeController() {}

HomeController.JoinEcho = (req, res) => {
  res.json({ message: '提交成功，ECHO会与您取得联系' });
};

HomeController.ApplyProfile = (req, res) => {
  console.info(req.cookies);
  console.info(req.session);
  res.json(req.user);
};

export default HomeController;
