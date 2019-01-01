import "./index.css";
import Feed from "./feed";

(function main() {
    const feedConId = "feed";
    const apiKey = "f9040ab1b9c802857aa783c469d0e0ff7e7366e4";
    const type = "desktop";
    const name = "taboola-templates";
    const options = {
        "rec.count" : 4,
        "source.type" : "photo",
        "source.id": "taboola-templates",
        "source.url" : "http://www.test.test.com",
        "user.session" : "init",
    };

    const feedObj = new Feed(feedConId,apiKey,type,name);
    feedObj.renderFeed(options);
})();
