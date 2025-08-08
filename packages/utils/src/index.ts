export function add(a: number, b: number): number {
  return a + b;
}

/**
 * 计算年龄
 *
 * @param birthDate 出生日期字符串，格式为 YYYY-MM-DD
 * @returns 年龄，以年为单位
 * @throws 如果输入日期格式不正确，将抛出错误
 */
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);

  // 验证日期有效性
  if (isNaN(birth.getTime())) {
    throw new Error('Invalid date format. Use YYYY-MM-DD');
  }

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // 如果当前月份小于出生月份，或同月但日期未到生日
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
