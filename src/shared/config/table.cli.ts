import Table from 'cli-table';

export const table = new Table({
  head: [
    'title',
    'description',
    'publicationDate',
    'city',
    'rating',
    'houseType',
    'rooms',
    'guests',
    'isPremium',
    'isFavorite',
    'rentalCost',
    'name',
    'email',
  ],
  colWidths: [15, 15, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
});
