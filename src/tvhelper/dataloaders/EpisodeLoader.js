// @flow

import Dataloader from 'dataloader';

import fetch from '../../common/services/Fetch';
import type { Episode } from './TvShowEpisodesLoader';

const fetchEpisode = async (ids: $ReadOnlyArray<string>) =>
  Promise.all(ids.map(id => fetch(`http://api.tvmaze.com/episodes/${id}`)));

export default () => new Dataloader<string, Episode>(fetchEpisode);
