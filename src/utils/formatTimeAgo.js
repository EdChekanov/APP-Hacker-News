export const formatTimeAgo = (timestampMs) => {
  const periods = [
    { value: 31536000000, singular: 'год', few: 'года', many: 'лет' },
    { value: 2592000000, singular: 'месяц', few: 'месяца', many: 'месяцев' },
    { value: 86400000, singular: 'день', few: 'дня', many: 'дней' },
    { value: 3600000, singular: 'час', few: 'часа', many: 'часов' },
    { value: 60000, singular: 'минута', few: 'минуты', many: 'минут' },
    { value: 1000, singular: 'секунда', few: 'секунды', many: 'секунд' },
  ];

  const now = Date.now();
  const diff = now - timestampMs;

  for (const { value, singular, few, many } of periods) {
    if (diff >= value) {
      const count = Math.floor(diff / value);
      return `${count} ${formatRussianPlural(count, singular, few, many) + ' назад'}`;
    }
  }

  return 'только что';
};

function formatRussianPlural(number, singular, few, many) {
  const n = Math.abs(number) % 100;
  const lastDigit = n % 10;

  if (n >= 11 && n <= 19) return many;
  if (lastDigit === 1) return singular;
  if (lastDigit >= 2 && lastDigit <= 4) return few;
  return many;
}
