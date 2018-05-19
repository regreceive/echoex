## API Response:
```json
{
  info: '', // 返回结果的简要描述.如'success'表示正常.
  status: 10000, // 错误代码,详细的错误代码列表见 src/controllers/errors_constant.js  当status!=10000时,表示有错误发生,参考info字段获取错误信息
  data: ... // 接口正常时返回的数据
}
```

## Our API Goal:

1.  \*\*POST /login: 登录 [√]
  * email
  * password //长度[6,20]含区间

2.  \*\*POST /register: 注册 [√]
  * email
  * captcha
  * password
  * password_confirm

3.  \*\*POST /captcha/send: 获取验证码 [√]
  * email

3.  \*\*POST /password/reset-link: 重置密码邮件 [√]
  * email
  
4. \*\* POST /password/recover: 修改密码 [√]
  * email
  * captcha
  * password
  * password_confirm

4.  POST /join: 加入 Echo 链
  * organization 机构名称
  * industry 行业
  * mobile 移动电话
  * phone 座机
  * email 邮箱
  * description 机构简介及合作计划

5.  \*POST /profile: 提交个人资料
  * name 姓名
  * firstname 名
  * lastname 姓
  * gender 性别[0 女 1 男]
  * birthday 出生日期
  * country 国家
  * city 城市
  * location 街道信息
  * passport_id 护照 id
  * passport_image_01 护照正面
  * passport_image_02 护照背面

6.  \*POST /profile/address: 登记以太地址 [√]
  * address 以太地址

注: \*星号标识的接口需要登录才能访问.  
\*\*双星号标识的接口只能在未登录状态下访问
