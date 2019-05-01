// @flow

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

type DataLoader = $PropertyType<GraphqlContextType, 'dataLoader'>;

const resolveNextEpisode = async (dataLoader: DataLoader, id: number) => {
  const episodes = await await dataLoader.tvhelper.episodes.load(id.toString());
  const today = new Date();
  const utcToday = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  const dates = episodes.reduce((acc, curr) => {
    if (curr.airdate == null) {
      return acc;
    }
    const airdate = new Date(curr.airdate);

    if (airdate >= utcToday) {
      return [...acc, airdate];
    }
    return acc;
  }, []);
  const date = dates.length > 0 ? new Date(Math.min(...dates)) : null;

  return date;
};

export default resolveNextEpisode;
