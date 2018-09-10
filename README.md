区块连公链项目官网，所用脚手架react-start-kit，服务器端渲染。

## API Response:
    ```json
    {
      info: '', // 返回结果的简要描述.如'success'表示正常.
      status: 10000, // 错误代码,详细的错误代码列表见 src/controllers/errors_constant.js  当status!=10000时,表示有错误发生,参考info字段获取错误信息
      data: ... // 接口正常时返回的数据
    }
    ```
 ## Our API Goal:
1. ### 登录
    ```
    **ApiL: POST /api/login  
    Params: 
      email
      password //长度[6,20]含区间
    ```
    
1. ### 注册
    ```
    **Api: POST /api/register  
    Params:
      email
      captcha
      password
      password_confirm
    ```
    
3. ###  获取验证码
    ```
    Api: POST /api/captcha/send
    Params:
      email
      scenario 枚举['reg', 'reset']
    ```
    
4. ### 重置密码邮件
    ```
    ** Api: POST /api/password/reset-link
    Params:
      email
    ```
    
5. ### 修改密码
    ```
    ** Api: POST /api/password/recover
    Params:
      email
      captcha
      password
      password_confirm
    ```
    
6. ### 加入 Echo 链
    ```
    Api: POST /api/join
    Params:
       organization 机构名称
       industry 行业
       mobile 移动电话
       phone 座机
       email 邮箱
       description 机构简介及合作计划
    ```

6. ### 获取个人资料
    ```
    * Api: GET /api/profile
    ```

7. ### 提交个人资料
    ```
    * Api: POST /api/profile
    Params:
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

8. ### 登记以太地址
    ```
    * Api: POST /api/profile/address
    Params:
      * address 以太地址
    ```

注： \**标识的接口标识需在非登录状态
    \*  标识的接口需在登录状态
    
#安装canvas依赖包  
```bash
sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++
```


### Blockchain Watcher
开发模式:
* `node blockchain.js` 启动脚本后,自动监听新交易,并将config.Blockchain.targetAddress的交易记录仅数据库

生产模式
* `pm2 start echosystem.config.js --only="blkwatcher"`

查看已募集到的以太总额:
GET `/api/totalRaised` (不需登录), 返回结果:  
```
{
  info: "success",
  status: 10000,
  data: 0.0246
}
```


### 新增api
* POST /api/is-crowdfunding
```
{
  info: "success",
  status: 10000,
  data: {
    status: false, //是否公募
    start: 1529337600000, //开始时间,microtime
    end: 1529424000000 //结束时间,microtime
  }
}
```

* GET /api/totalRaised
```
{
  info: "success",
  status: 10000,
  data: 0.0246
}
```

* GET /api/kyc-status
```
{
  info: "success",
  status: 10000,
  data: 1
}
```

* GET /api/address
```
{
  info: "success",
  status: 10000,
  data: "0x3A1CBB00730dDf72f3172C78fb5fbBefFFcc62A7"
}
```
