let players = [
  { name: "wangkech", id: "f1a8ba0f-1d1a-4277-95c3-96bd2d86cd4c" },
  { name: "Hothnyang", id: "751694b3-1d1a-4154-a443-3ecf261f78b5" },
];
let roundPlayers = [];

players.map((player) => {
  roundPlayers.push([
    (function () {
      const roundPlayer = {
        ...player,
        isActive: true,
        isKnocked: false,
        ballBasket: [],
        score: 0,
      };
      return {
        roundPlayer,

        potBall() {
          roundPlayer.ballBasket.push(3);
        },
      };
    })(),
  ]);
});
