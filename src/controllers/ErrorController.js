function ErrorController() {}

ErrorController.Error = (res, msg) => {
  res.json({ error: msg });
};

export default ErrorController;
