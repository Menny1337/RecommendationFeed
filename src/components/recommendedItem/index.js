import "./style.css";

export default class RecommendedItem {
    static getItemTemplate(itemObj){
        const imgSrc = itemObj.thumbnail.length > 0 ? itemObj.thumbnail[0].url : '';
        const isSponsored = itemObj.origin ? itemObj.origin === "sponsored" : false;
        const target = isSponsored ? `_blank` : `_self`;
        const branding = isSponsored ? `<div class="recommended-item-branding">${itemObj.branding}</div>` : null;

        return `<div class="recommended-item-con" id="${itemObj.id}">
    <a href="${itemObj.url}" target="${target}">
        <div class="recommended-item-image-con">
            <img src="${imgSrc}" alt="${itemObj.name}" />
        </div>
        <div class="recommended-item-title">
            ${itemObj.name}
            ${branding}
        </div>
    </a>
</div>`;
    }

}