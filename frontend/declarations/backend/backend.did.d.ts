import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Player {
  'id' : string,
  'assists' : bigint,
  'name' : string,
  'goals' : bigint,
  'passes' : bigint,
}
export interface _SERVICE {
  'addOrUpdatePlayer' : ActorMethod<
    [string, string, bigint, bigint, bigint],
    undefined
  >,
  'getPlayer' : ActorMethod<[string], [] | [Player]>,
  'getTopPlayers' : ActorMethod<[string, bigint], Array<Player>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
