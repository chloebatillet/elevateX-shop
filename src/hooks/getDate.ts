export const getDate = (startDate: Date, nbOfDaysAway: number) => {
  const date = new Date();
  date.setDate(startDate.getDate() + nbOfDaysAway);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return formatDate(date);
};
