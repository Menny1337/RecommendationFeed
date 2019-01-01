import RecommendationList from "./components/recommendationList";
import Recommendations from "./services/recommendations";

export default class Feed {
    constructor(feedConId, apiKey, type, name = '') {
        this.feedCon = document.getElementById(feedConId);
        this.recommendationService = new Recommendations(apiKey, type, name);
    }

    renderFeed(options) {
        this.recommendationService.getRecommendations(options).then((recommendationList) => {
            const htmlString = RecommendationList.getListTemplate(recommendationList);
            // creating html element so we can append it to the starting element.
            const htmlContainer = document.createElement("div");
            htmlContainer.innerHTML = htmlString;
            this.feedCon.appendChild(htmlContainer);
        });
    }
}