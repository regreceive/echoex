## API Response:
```json
{
  info: '', // 返回结果的简要描述.如'success'表示正常.
  status: 10000, // 错误代码,详细的错误代码列表见 src/controllers/errors_constant.js  当status!=10000时,表示有错误发生,参考info字段获取错误信息
  data: ... // 接口正常时返回的数据
}
```

## Our API Goal:

### 登录
```
Request URL: /login
Request Method: POST

Form Data: 
  email
  password //长度[6,20]含区间
```

### 注册
```
Request URL: /register
Request Method: POST

Form Data:
  email
  captcha
  password
  password_confirm
```

###  获取验证码
```
Request URL: /captcha/send
Request Method: POST

Form Data:
  email
```

### 重置密码邮件
```
Request URL: /password/reset-link
Request Method: POST

Form Data:
  email
```
  
### 修改密码
```
Request URL: /password/recover
Request Method: POST

Form Data:
  email
  captcha
  password
  password_confirm
```

### 加入 Echo 链
```
Request URL: /join
Request Method: POST

Form Data:
   organization 机构名称
   industry 行业
   mobile 移动电话
   phone 座机
   email 邮箱
   description 机构简介及合作计划
```

### 提交个人资料
```
Request URL: /profile
Request Method: POST

Form Data:
  name 姓名
  firstname 名
  lastname 姓
  gender 性别[0 女 1 男]
  birthday 出生日期
  country 国家
  city 城市
  location 街道信息
  passport_id 护照 id
  passport_image_01 护照正面
  passport_image_02 护照背面
```

### 登记以太地址
```
Request URL: /profile/address
Request Method: POST

Form Data:
  * address 以太地址
```
