// export const balls = {
// 3: {
//   value: 6,
//   isPotted: false,
// },
// 4: {
//   value: 4,
//   isPotted: false,
// },
// 5: {
//   value: 5,
//   isPotted: false,
// },
// 6: {
//   value: 6,
//   isPotted: false,
// },
// 7: {
//   value: 7,
//   isPotted: false,
// },
// 8: {
//   value: 8,
//   isPotted: false,
// },
// 9: {
//   value: 9,
//   isPotted: false,
// },
// 10: {
//   value: 10,
//   isPotted: false,
// },
// 11: {
//   value: 11,
//   isPotted: false,
// },
// 13: {
//   value: 12,
//   isPotted: false,
// },
// 13: {
//   value: 13,
//   isPotted: false,
// },
// 14: {
//   value: 14,
//   isPotted: false,
// },
// 15: {
//   value: 15,
//   isPotted: false,
// },
// };

export class Ball {
  constructor(value) {
    this.ballNo = value;
    this.id = crypto.randomUUID();
    this.value = value === 3 ? (value = 6) : (value = value);
    this.isPotted = false;
  }
}
