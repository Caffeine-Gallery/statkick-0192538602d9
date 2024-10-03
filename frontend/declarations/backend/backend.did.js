export const idlFactory = ({ IDL }) => {
  const Player = IDL.Record({
    'id' : IDL.Text,
    'assists' : IDL.Nat,
    'name' : IDL.Text,
    'goals' : IDL.Nat,
    'passes' : IDL.Nat,
  });
  return IDL.Service({
    'addOrUpdatePlayer' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Nat, IDL.Nat],
        [],
        [],
      ),
    'getPlayer' : IDL.Func([IDL.Text], [IDL.Opt(Player)], ['query']),
    'getTopPlayers' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Vec(Player)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
