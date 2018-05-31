const dicts = {
  title: 'ECHO技术理念',
  menus: ['安全性', '扩展性', '稳定性', '适用性', '可控性'],
  chapters: [
    {
      title1: '安全性',
      ol1: '<li>密码学安全</li><li>数据安全</li><li>资产安全</li><li>共识安全</li><li>身份安全</li>',
      title2: '安全实现',
      ol2: '<li>量子加密</li><li>量子通信</li>',
    },
    {
      title1: '扩展性',
      ol1: '<li>主侧链方案</li><li>主链和侧链交互</li><li>链组织形态、链网</li>',
      title2: '扩展性实现',
      ol2: '<li>通证</li><li>见证人节点</li><li>委员会</li><li>主链和侧链交互</li><li>权益证明机制</li><li>投票</li><li>预算</li><li>原子交易</li><li>去中心化公售平台</li><li>价格稳定通证</li>',
    },
    {
      title1: '稳定性',
      ol1: '<li>主链健壮性</li><li>数据稳定</li><li>共识与冲突</li><li>存储优化</li>',
      title2: '稳定性实现',
      ol2: '<li>分布式可用性</li><li>故障自愈</li><li>数据持久</li><li>存储容灭</li>',
    },
    {
      title1: '适用性',
      ol1: '<li>大数据监督链生态</li><li>兼容公有链</li><li>权威SDK</li>',
    },
    {
      title1: '可控性',
      p1: 'ECHO使用的是不同于以太坊和比特币的侧链架构，dapp是运行在侧链上的，每套侧链对应 一个dapp。',
      title2: '可控性实现',
      p2: 'ECHO给用户提供了一种可以选择的灵活性。 ECHO的主链与侧链之间是互惠互利的关系，ECHO为侧链提供基础设施，比如数据库写入 的api，网络通讯api，加密api等等，侧链则可以为ECHO补充更多的节点，以壮大整个系统。',
    },
  ],
};

export default dicts;
