// @flow

import Dataloader from 'dataloader';

import fetch from '../../common/services/Fetch';
import type { Episode } from './TvShowEpisodesLoader';

const fetchEpisode = (ids: $ReadOnlyArray<string>) =>
  Promise.all(ids.map(id => fetch(`http://api.tvmaze.com/episodes/${id}`)));

const EpisodeLoader = () => new Dataloader<string, Episode>(fetchEpisode);

export default EpisodeLoader;
