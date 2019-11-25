export default class CursorLinksGenerator {
    constructor(req, model) {
        this.req = req;
        this.model = model;
        this.perPageParams = req.query.per_page;
    }

    generateNext() {
        if (this.model.hasNext) {
            let originalUrl = this.clearOriginalUrl();
            originalUrl += this.getPerPageParamsIfExist();

            return `${this.req.protocol}://${this.req.get('host')}${originalUrl}next=${this.model.next}`;
        }

        return '';
    }

    generatePrevious() {
        if (this.model.hasPrevious) {
            let originalUrl = this.clearOriginalUrl();
            originalUrl += this.getPerPageParamsIfExist();

            return `${this.req.protocol}://${this.req.get('host')}${originalUrl}previous=${this.model.previous}`;
        }

        return '';
    }

    clearOriginalUrl() {
        return this.req.originalUrl.replace(/\?(.)*/g, '');
    }

    getPerPageParamsIfExist() {
        return (typeof this.perPageParams !== 'undefined') ? `?per_page=${this.perPageParams}&` : "?";
    }
}