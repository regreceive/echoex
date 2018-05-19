function HomeController() {}

HomeController.JoinEcho = (req, res) => {
  res.json({ message: '提交成功，ECHO会与您取得联系' });
};

HomeController.ApplyProfile = (req, res) => {
  const result = {
    user: req.user,
    cookie: req.cookies,
    session: req.session,
  };
  res.json(result);
};

export default HomeController;
