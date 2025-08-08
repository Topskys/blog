import { calculateAge } from '@blog/utils';
import { expect, it, describe, test } from 'vitest';

test('calculateAge', () => {
  expect(calculateAge('2000-01-01')).toBe(25);
});

describe('calculateAge Function', () => {
  // 基本功能测试
  test('计算精确年龄', () => {
    const today = new Date();

    // 测试今天生日
    const todayStr = today.toISOString().split('T')[0];
    expect(calculateAge(todayStr)).toBe(0);

    // 测试昨天出生
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    expect(calculateAge(yesterday.toISOString().split('T')[0])).toBe(0);

    // 测试去年出生
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    expect(calculateAge(lastYear.toISOString().split('T')[0])).toBe(1);
  });

  // 边界条件测试
  test('处理闰年日期', () => {
    // 闰年出生（2020-02-29）
    expect(calculateAge('2020-02-29')).toBe(2); // 未到生日
    expect(calculateAge('2020-02-29')).toBe(3); // 已过生日
  });

  // 异常处理测试
  test('无效日期抛出错误', () => {
    expect(() => calculateAge('invalid-date')).toThrow('Invalid date format');
    expect(() => calculateAge('2023-13-01')).toThrow('Invalid date format');
  });

  // 未来日期测试
  test('未来日期返回负数', () => {
    const nextYear = new Date();
    nextYear.setFullYear(new Date().getFullYear() + 1);
    expect(calculateAge(nextYear.toISOString().split('T')[0])).toBe(-1);
  });
});
