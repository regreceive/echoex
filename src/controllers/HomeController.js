import * as Errors from './errors_constant';
import WE from './exception';
import User from '../data/models/User';

function checkEthAddress(address) {
  const addr = address.toLowerCase();
  const prefix = addr.slice(0, 2);
  if (!address) return Errors.ETH_ADDR_INVALID;
  if (prefix !== '0x') return Errors.ETH_ADDR_INVALID;
  if (address.length !== 42) return Errors.ETH_ADDR_INVALID;
  return null;
}
const tryErrors = function tryErrors(req, res, fn) {
  try {
    fn().catch(err => {
      if (err instanceof WE) {
        res.json(err.ToJSON());
      } else {
        console.error(err);
        res.json({
          info: 'unknown',
          status: -1,
          data: null,
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.json({
      info: 'unknown',
      status: -1,
      data: null,
    });
  }
};
function HomeController() {}

HomeController.JoinEcho = (req, res) => {
  tryErrors(req, res, async () => {
    const {organization, industry, mobile, phone, email, description} = req.body;

  })
};

HomeController.ApplyProfile = (req, res) => {
  const result = {
    user: req.user,
    cookie: req.cookies,
    session: req.session,
  };
  res.json(result);
};

HomeController.SubmitEthAddress = (req, res) => {
  tryErrors(req, res, async () => {
    const { address } = req.body;
    const { user } = req;
    const err = checkEthAddress(address);
    if (err) throw new WE(Errors.ETH_ADDR_INVALID);
    if (!user) throw new WE(Errors.MUST_LOGIN);

    await User.saveEthAddress(1, address);
    res.json({info:'success',status:10000,data:null});
  });
};

export default HomeController;
