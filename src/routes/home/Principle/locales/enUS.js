const dicts = {
  title: 'The Technical Principle of ECHO',
  menus: [
    'Security',
    'Extensibility',
    'Stability',
    'Applicability',
    'Controllability',
  ],
  sections: [
    {
      t1: 'Security',
      d1:
        'Cryptographic Security / Data Security / Asset Security',
      t2: 'Security Implementation',
      d2: 'Encrypted Quantum / Quantum communication',
    },
    {
      t1: 'Extensibility',
      d1:
        'solutions to main chain and side chain / Inetercation btween main chain and side chain / Chain organization form,chain network',
      t2: 'Extensibility Implementation',
      d2:
        'Tokens / Witness as a node / Committee / Mechanism of proof of interest / Voting / Budget / Atomic transactions / Encrypted asset hosting gateway / Decentralized public offering platform / Price Stable communication',
    },
    {
      t1: 'Stability',
      d1:
        'Stability of the main chain / Stability of data / Consensus and conflict / Storage optimaization',
      t2: 'The realization of stability',
      d2:
        'Distributed availability / Self-healing of failure / Data persistence / Storage capacity',
    },
    {
      t1: 'Applicability',
      d1:
        'Big data supevises the ecloogy of chain / Compatible with pubic chains / Authority SDK',
    },
    {
      t1: 'Controllability',
      d1:
        'ECHO uses a sidechain archtecture that differs from Ethereum and Bitcion,where Dapp runs on the sidechain,and each sidechain corresponds to a Dapp',
      t2: 'Controllability Implementation',
      d2:
        'ECHO provides users with a choice of flexibility and has a mutually beneficial relationship between the main chain and the side chain, providing the infrastructure for the side chain, such as APIs for database writing, network communication APIs, encryption APIs, etc., and the side chain can supplement ECHO with more nodes to develop the entire system.',
    },
  ],
};

export default dicts;
