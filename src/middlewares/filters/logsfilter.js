import Log from "../../models/log";
import qs from "qs";
import _ from "lodash";

export default function getFilters(req, res, next) {
    const availableFilters = Object.keys(Log.schema.paths);
    const filters = qs.parse(req.query);

    const modelFilters = _.pickBy(filters, (value, key) => availableFilters.indexOf(key) > -1);

    let searchFilter = {};
    if (filters.search) {
        searchFilter = {
            $text: {
                $search: filters.search,
                $caseSensitive: false,
                $diacriticSensitive: false
            }
        }
    }

    req.filters = {...searchFilter, ...modelFilters};
    next();
}