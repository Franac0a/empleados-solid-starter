// Regla de negocio: +2% del salario base por cada año de antigüedad.
export const BONUS_RATE_PER_YEAR = 0.02;

export const calculateFinalSalary = (
  baseSalary: number,
  yearsOfService: number,
): number => {
  const bonus = baseSalary * BONUS_RATE_PER_YEAR * yearsOfService;
  return baseSalary + bonus;
};
