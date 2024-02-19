import Table from 'cli-table';

export const table = new Table({
  head: ['title', 'description', 'city', 'houseType', 'rooms', 'guests', 'isPremium', 'rentalCost', 'name', 'email'],
  colWidths: [15, 15, 10, 10, 10, 10, 10, 10, 10, 10],
});
