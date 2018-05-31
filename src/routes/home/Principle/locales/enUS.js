const dicts = {
  title: 'The technical principle of ECHO',
  menus: ['Security', 'Extensibility', 'Stability', 'Applicability', 'Controllability'],
  chapters: [
    {
      title1: 'Security',
      ol1: '<li>Cryptographic Security</li><li>Data Security</li><li>Asset Security</li>',
      title2: 'Security Implementation',
      ol2: '<li>Encrypted Quantum</li><li>Quantum communication</li>',
    },
    {
      title1: 'Extensibility',
      ol1: '<li>solutions to main chain and side chain</li><li>Inetercation btween main chain and side chain</li><li>Chain organization form,chain network</li>',
      title2: 'Extensibility Implementation',
      ol2: '<li>Tokens</li><li>Witness as a node</li><li>Committee</li><li>Mechanism of proof of interest</li><li>Voting</li><li>Budget</li><li>Atomic transactions</li><li>Encrypted asset hosting gateway</li><li>Decentralized public offering platform</li><li>Price Stable communication</li>',
    },
    {
      title1: 'Stability',
      ol1: '<li>Stability of the main chain</li><li>Stability of data</li><li>Consensus and conflict</li><li>Storage optimaization</li>',
      title2: 'The realization of stability',
      ol2: '<li>Distributed availability</li><li>Self-healing of failure</li><li>Data persistence</li><li>Storage capacity</li>',
    },
    {
      title1: 'Applicability',
      ol1: '<li>Big data supevises the ecloogy of chain</li><li>Compatible with pubic chains</li><li>Authority SDK</li>',
    },
    {
      title1: 'Controllability',
      p1: 'ECHO uses a sidechain archtecture that differs from Ethereum and Bitcion,where Dapp runs on the sidechain,and each sidechain corresponds to a Dapp',
      title2: 'Controllability Implementation',
      p2: 'ECHO provides users with a choice of flexibility and has a mutually beneficial relationship between the main chain and the side chain, providing the infrastructure for the side chain, such as APIs for database writing, network communication APIs, encryption APIs, etc., and the side chain can supplement ECHO with more nodes to develop the entire system.',
    },
  ],
};

export default dicts;
