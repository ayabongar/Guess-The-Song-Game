const { load } = require('cheerio');
const Moment = require('moment');
const Axios = require('axios');
const Constants = require('../utils/constants.js');
const {StatusCodes} = require("http-status-codes");

exports.getChart = async (name, date) => {
  let chartName = name;
  let chartDate = date;

  const chart = {};
  chart.songs = [];

  const requestURL = `${Constants.BILLBOARD_BASE_URL}${Constants.BILLBOARD_CHARTS_URL}${chartName}/${chartDate}`;
  const { data } = await Axios.get(requestURL).catch((error) => {
    return {
      ok: false,
      status: error.code || StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        message: 'Songs not found.',
        error: error.message,
        stackTrace: error.stack,
        caughtIn: 'Billboard-top-100::getChart'
      }
    };
  });

  if(!!(data.error || data.stackTrace)) {
    return data;
  }
  const $ = load(data);

  let d;
  for (let i = 0; i < $('.c-heading').length; i += 1) {
    if ($('.c-heading')[i].children[0].data.includes('Week of ')) {
      d = Moment(new Date($('.c-heading')[i].children[0].data.trim().slice('Week of '.length)));
      break;
    }
  }

  chart.week = d.format('YYYY-MM-DD');

  const prevWeek = d.subtract(7, 'days').format('YYYY-MM-DD');
  chart.previousWeek = {
    date: prevWeek,
    url: `${Constants.BILLBOARD_BASE_URL}${Constants.BILLBOARD_CHARTS_URL}${chartName}/${prevWeek}`,
  };

  const nextWeek = d.add(14, 'days').format('YYYY-MM-DD');
  chart.nextWeek = {
    date: nextWeek,
    url: `${Constants.BILLBOARD_BASE_URL}${Constants.BILLBOARD_CHARTS_URL}${chartName}/${nextWeek}`,
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
