import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
  type Player = {
    id: Text;
    name: Text;
    goals: Nat;
    assists: Nat;
    passes: Nat;
  };

  stable var playersEntries : [(Text, Player)] = [];
  var players = HashMap.HashMap<Text, Player>(0, Text.equal, Text.hash);

  public func addOrUpdatePlayer(id: Text, name: Text, goals: Nat, assists: Nat, passes: Nat) : async () {
    let player : Player = {
      id;
      name;
      goals;
      assists;
      passes;
    };
    players.put(id, player);
  };

  public query func getPlayer(id: Text) : async ?Player {
    players.get(id)
  };

  public query func getTopPlayers(stat: Text, limit: Nat) : async [Player] {
    let allPlayers = Iter.toArray(players.vals());
    let sortedPlayers = switch (stat) {
      case "goals" Array.sort(allPlayers, func(a: Player, b: Player) : { #less; #equal; #greater } {
        if (a.goals > b.goals) #less else if (a.goals < b.goals) #greater else #equal
      });
      case "assists" Array.sort(allPlayers, func(a: Player, b: Player) : { #less; #equal; #greater } {
        if (a.assists > b.assists) #less else if (a.assists < b.assists) #greater else #equal
      });
      case "passes" Array.sort(allPlayers, func(a: Player, b: Player) : { #less; #equal; #greater } {
        if (a.passes > b.passes) #less else if (a.passes < b.passes) #greater else #equal
      });
      case _ allPlayers;
    };
    Array.subArray(sortedPlayers, 0, Nat.min(limit, sortedPlayers.size()))
  };

  system func preupgrade() {
    playersEntries := Iter.toArray(players.entries());
  };

  system func postupgrade() {
    players := HashMap.fromIter<Text, Player>(playersEntries.vals(), 0, Text.equal, Text.hash);
  };
}
