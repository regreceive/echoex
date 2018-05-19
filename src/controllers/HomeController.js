import * as Errors from './errors_constant';
import WE from './exception';
import UserEthAddress from '../data/models/UserEthAddress';

function checkEthAddress(address) {
  const addr = address.toLowerCase();
  const prefix = addr.slice(0, 2);
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

HomeController.SubmitEthAddress = (req, res) => {
  tryErrors(req, res, async () => {
    const { address, user } = req.body;
    const err = checkEthAddress(address);
    if (err) throw new WE(Errors.ETH_ADDR_INVALID);
    if (!user) throw new WE(Errors.MUST_LOGIN);

    await UserEthAddress.createNewRecord(user.id, address);
    res.json({info:'success',status:10000,data:null});
  });
};

export default HomeController;
