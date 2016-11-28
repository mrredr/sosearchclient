export var Config = {
  apiUrls: {
    popularQuestoinsOfUser : (user_id) => 'https://api.stackexchange.com/2.2/users/' + user_id + '/questions?order=desc&sort=votes&site=stackoverflow&filter=!1PUgU9fzk8.9nthtTvTdYMRxYy7(q6)pT',

    popularQuestionsOfTag: (tag) => 'https://api.stackexchange.com/2.2/tags/' + tag + '/faq?site=stackoverflow&filter=!PvyfukusNkR_Du.7Uw)pPIlGNV-E31',

    // popularQuestionsOfTag: (any) => 'http://httpstat.us/500',

    searchByString: (query) => 'https://api.stackexchange.com/2.2/search?order=desc&sort=votes&intitle=' + query + '&site=stackoverflow&filter=!.Iwe-B)-NojreaCsn1*9W0d.gy_Du'
  }
};
