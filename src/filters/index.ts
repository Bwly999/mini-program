/**
 * 金额转换（分->元）
 * 100 => 1
 * @param {number} num
 */
export function moneyFormatter(num: number) {
  return (isNaN(num) ? NaN : parseFloat((num / 100).toFixed(2)))
}
