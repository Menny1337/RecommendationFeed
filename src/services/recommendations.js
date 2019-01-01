export default class Recommendations {
    apiUrl = "http://api.taboola.com/1.1/json/";
    publisherName = "taboola-templates";
    apiKey;
    type;
    name;

    responseId;
    responseSession;

    /**
     *
     * @param apiKey
     * @param type
     * @param name
     */
    constructor( apiKey, type, name = '') {
        this.apiKey = apiKey; // Required
        this.type = type; // Required
        this.name = name; // Optional
    }

    /**
     *
     * @param options
     * @returns {*}
     */
    getRecommendations(options){
        const missingFields = [];
        // checking if we got the required fields
        if( !options.hasOwnProperty('rec.count') ) {
            missingFields.push('rec.count');
        }
        if( !options.hasOwnProperty('source.type') ) {
            missingFields.push('source.type');
        }
        if( !options.hasOwnProperty('source.id') ) {
            missingFields.push('source.id');
        }
        if( !options.hasOwnProperty('source.url') ) {
            missingFields.push('source.url');
        }
        if( !options.hasOwnProperty('user.session') ) {
            missingFields.push('user.session');
        }
        // if Required fields are missing we will print an error to the console and return with out doing the request
        if(missingFields.length){
            console.error(`getRecommendations Request Missing Required Fields: ${missingFields}`);
            return false;
        }

        const requestBody = {
            "app.type" : this.type,
            "app.apikey": this.apiKey,
            "app.name": this.name,
            ...options
        };
        const queryString = Recommendations.toQueryString(requestBody);
        const requestUrl = `${this.apiUrl}\/${this.publisherName}/recommendations.get?${queryString}`;

        return fetch(requestUrl).then(request => request.json()).then(answer => {
            // saving the response ID and Session
            this.responseId = answer.id;
            this.responseSession = answer.session;

            return answer.list;
        });
    }

    notifyClick(options){
        const missingFields = [];
        // checking if we got the required fields
        if( !options.hasOwnProperty('item.type') ) {
            missingFields.push('item.type');
        }
        if( !options.hasOwnProperty('item.id') ) {
            missingFields.push('item.id');
        }
        // if Required fields are missing we will print an error to the console and return with out doing the request
        if(missingFields.length){
            console.error(`notifyClick Request Missing Required Fields: ${missingFields}`);
            return false;
        }

        if( !this.responseId || !this.responseSession ) {
            console.error(`notifyClick Request must be after getRecommendations`);
            return false;
        }

        const requestBody = {
            "app.type" : this.type,
            "app.apikey" : this.apiKey,
            "response.id" : this.responseId,
            "response.session" : this.responseSession,
            ...options
        };

        console.log(Recommendations.toQueryString(requestBody));
    }

    notifyVisible(){
        // checking if we got the required fields
        // if Required fields are missing we will print an error to the console and return with out doing the request
        if( !this.responseId || !this.responseSession ) {
            console.error(`notifyVisible Request must be after getRecommendations`);
            return false;
        }

        const requestBody = {
            "app.type" : this.type,
            "app.apikey" : this.apiKey,
            "response.id" : this.responseId,
            "response.session" : this.responseSession,
        };

        console.log(Recommendations.toQueryString(requestBody));
    }

    static toQueryString = obj => Object.keys(obj).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&');

}