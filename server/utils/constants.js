require('dotenv').config();

module.exports = {
    LYRICS_API_BASE_URL: 'https://api.musixmatch.com/ws/1.1/',
    LYRIC_MATCHER: 'matcher.lyrics.get',
    LYRICS_API_KEY: process.env.LYRICS_API_KEY,
    LASTFM_BASE_URL: 'http://www.last.fm/api/auth/',
    BILLBOARD_BASE_URL: 'http://www.billboard.com',
    BILLBOARD_CHARTS_URL: '/charts/',
    BILLBOARD_CHART_CATEGORY_URL_PREFIX: '/pmc-ajax/charts-fetch-all-chart/selected_category-',
    BILLBOARD_CHART_CATEGORY_URL_SUFFIX: '/chart_type-weekly/',
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PORT: process.env.DB_PORT
};
