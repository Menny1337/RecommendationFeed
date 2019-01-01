import "./style.css";
import RecommendedItem from "../recommendedItem";

export default class RecommendationList {
    static getListTemplate(recommendationList) {
        const listItemsString = recommendationList.map( singleItem => {
            return `<div class="recommendation-list-item">
    ${RecommendedItem.getItemTemplate(singleItem)}
</div>`
        } ).join('\n');

        return `<div id="recommendation-list-con">
<h3>Powered By Taboola</h3>
<div class="recommendation-list">
${listItemsString}
</div>
</div>`;
    }
}