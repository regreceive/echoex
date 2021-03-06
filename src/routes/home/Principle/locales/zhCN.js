import uuid from 'uuid';

const dicts = {
  title: 'ECHO技术理念',
  menus: ['安全性', '扩展性', '稳定性', '适用性', '可控性'],
  sections: [
    {
      id: uuid(),
      t1: '安全性',
      d1: '密码学安全 / 数据安全 / 资产安全 / 共识安全 / 身份安全',
      t2: '安全实现',
      d2: '量子加密 / 量子通信',
    },
    {
      id: uuid(),
      t1: '扩展性',
      d1: '主侧链方案 / 主链和侧链交互 / 链组织形态、链网',
      t2: '扩展性实现',
      d2:
        '通证 / 见证人节点 / 委员会 / 主链和侧链交互 / 权益证明机制 / 投票 / 预算 / 原子交易 / 去中心化公售平台 / 价格稳定通证',
    },
    {
      id: uuid(),
      t1: '稳定性',
      d1: '主链健壮性 / 数据稳定 / 共识与冲突 / 存储优化',
      t2: '稳定性实现',
      d2: '分布式可用性 / 故障自愈 / 数据持久 / 存储容灭',
    },
    {
      id: uuid(),
      t1: '适用性',
      d1: '大数据监督链生态 / 兼容公有链 / 权威SDK',
    },
    {
      id: uuid(),
      t1: '可控性',
      d1:
        'ECHO使用的是不同于以太坊和比特币的侧链架构，dapp是运行在侧链上的，每套侧链对应 一个dapp。',
      t2: '可控性实现',
      d2:
        'ECHO给用户提供了一种可以选择的灵活性。 ECHO的主链与侧链之间是互惠互利的关系，ECHO为侧链提供基础设施，比如数据库写入 的api，网络通讯api，加密api等等，侧链则可以为ECHO补充更多的节点，以壮大整个系统。',
    },
  ],
};

export default dicts;
