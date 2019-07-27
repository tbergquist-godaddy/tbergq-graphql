// @flow

import type { GraphqlContextType } from '../../common/services/GraphqlContext';

type DataLoader = $PropertyType<GraphqlContextType, 'dataLoader'>;

const resolvePreviusEpisode = async (dataLoader: DataLoader, id: number) => {
  const episodes = await await dataLoader.tvhelper.episodes.load(id.toString());
  const today = new Date();
  const tomorrow = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 1));
  const dates = episodes.reduce((acc, curr) => {
    if (curr.airdate == null) {
      return acc;
    }
    const airdate = new Date(curr.airdate);
    if (airdate < tomorrow) {
      return [...acc, airdate];
    }
    return acc;
  }, []);
  const date = dates.length > 0 ? new Date(Math.max(...dates)) : null;

  return date;
};

export default resolvePreviusEpisode;
