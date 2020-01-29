export type SORT_BY = 'RATING_ASC' | 'RATING_DESC';
export type FILTER_BY = 'RATING_5' | 'RATING_4' | 'RATING_3' | 'RATING_2' | 'RATING_1';

interface Args<T> {
  sortBy?: SORT_BY;
  filterBy?: FILTER_BY;
  restaurants: T[];
}

export function sortAndFilterRestaurants<T extends { averageRating: number; }>({ sortBy, filterBy, restaurants }: Args<T>): T[] {
  let updatedRestaurants = restaurants;

  if (!!sortBy) {
    if (sortBy === 'RATING_ASC') {
      updatedRestaurants = updatedRestaurants.sort((a, b) => a.averageRating - b.averageRating);
    }
    if (sortBy === 'RATING_DESC') {
      updatedRestaurants = updatedRestaurants.sort((a, b) => b.averageRating - a.averageRating);
    }
  }

  if (!!filterBy) {
    if (filterBy === 'RATING_5') {
      updatedRestaurants = updatedRestaurants.filter(r => r.averageRating === 5);
    }
    if (filterBy === 'RATING_4') {
      updatedRestaurants = updatedRestaurants.filter(r => r.averageRating >= 4);
    }
    if (filterBy === 'RATING_3') {
      updatedRestaurants = updatedRestaurants.filter(r => r.averageRating >= 3);
    }
    if (filterBy === 'RATING_2') {
      updatedRestaurants = updatedRestaurants.filter(r => r.averageRating >= 2);
    }
    if (filterBy === 'RATING_1') {
      updatedRestaurants = updatedRestaurants.filter(r => r.averageRating >= 1);
    }
  }

  return updatedRestaurants;
}