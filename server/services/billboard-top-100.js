import { load } from 'cheerio';
import moment from 'moment';
import axios from "axios";
import constants from "../utils/constants.js";

export const getChart = async (name, date) => {
  let chartName = name;
  let chartDate = date;

  const chart = {};
  chart.songs = [];

  const requestURL = `${constants.BILLBOARD_BASE_URL}${constants.BILLBOARD_CHARTS_URL}${chartName}/${chartDate}`;
  const { data } = await axios.get(requestURL, { responseType: 'document' });

  const $ = load(data);

  let d;
  for (let i = 0; i < $('.c-heading').length; i += 1) {
    if ($('.c-heading')[i].children[0].data.includes('Week of ')) {
      d = moment(new Date($('.c-heading')[i].children[0].data.trim().slice('Week of '.length)));
      break;
    }
  }

  chart.week = d.format('YYYY-MM-DD');

  const prevWeek = d.subtract(7, 'days').format('YYYY-MM-DD');
  chart.previousWeek = {
    date: prevWeek,
    url: `${constants.BILLBOARD_BASE_URL}${constants.BILLBOARD_CHARTS_URL}${chartName}/${prevWeek}`,
  };

  const nextWeek = d.add(14, 'days').format('YYYY-MM-DD');
  chart.nextWeek = {
    date: nextWeek,
    url: `${constants.BILLBOARD_BASE_URL}${constants.BILLBOARD_CHARTS_URL}${chartName}/${nextWeek}`,
  };

  const chartItems = $('.o-chart-results-list-row-container');
  for (let i = 0; i < chartItems.length; i += 1) {
    const infoContainer = chartItems[i].children[1];
    const titleAndArtistContainer = infoContainer.children[7].children[1].children[1];
    const posInfo = infoContainer.children[7].children[1];

    const rank = parseInt(infoContainer.children[1].children[1].children[0].data.trim(), 10);
    const title = titleAndArtistContainer.children[1].children[0].data.trim();
    const artist = titleAndArtistContainer.children[3]
      ? titleAndArtistContainer.children[3].children[0].data.trim() : undefined;
    const cover = infoContainer.children[3].children[1].children[1].children[1].attribs['data-lazy-src'];
    const position = {
      positionLastWeek: parseInt(posInfo.children[7].children[1].children[0].data.trim(), 10),
      peakPosition: parseInt(posInfo.children[9].children[1].children[0].data.trim(), 10),
      weeksOnChart: parseInt(posInfo.children[11].children[1].children[0].data.trim(), 10),
    };

    if (artist) {
      chart.songs.push({
        rank,
        title,
        artist,
        cover,
        position,
      });
    } else {
      chart.songs.push({
        rank,
        artist: title,
        cover,
        position,
      });
    }
  }

  if (chart.songs.length > 1) {
    return {
      ok: true,
      data: chart
    };
  } else {
    return {
      ok: false,
      data: {
        message: 'Songs not found.'
      }
    };
  }
}
