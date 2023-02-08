import { registerEnumType } from "@nestjs/graphql";

export enum MARKET_CAP_SORT {
    NAME = 'name',
    SYMBOL = 'symbol',
    DATE_ADDED = 'date_added',
    MARKET_CAP = 'market_cap',
    CIRCULATING_SUPPLY = 'circulating_supply',
    TOTAL_SUPPLY = 'total_supply',
    MAX_SUPPLY = 'max_supply',
    MARKET_CAP_STRICT = 'market_cap_strict',
    MARKET_CAP_BY_TOTAL_SUPPLY_STRICT = 'market_cap_by_total_supply_strict',
    VOLUME_7D = 'volume_7d',
    VOLUME_30D = 'volume_30d',
}

registerEnumType(MARKET_CAP_SORT, {
    name: 'MARKET_CAP_SORT',
    description: 'Market cap sort',
});


export enum MAP_SORT_TYPE {
    ID = 'id',
    CMC_RANK = 'cmc_rank',
}

registerEnumType(MAP_SORT_TYPE, {
    name: 'MAP_SORT_TYPE',
    description: 'Market cap sort',
});

export enum SORT_DIRECTION {
    ASC = 'asc',
    DESC = 'desc',
}


registerEnumType(SORT_DIRECTION, {
    name: 'SORT_DIRECTION',
    description: 'Args Sort direction',
});


export enum OPTIONAL_COING_META_FIELDS {
    URLS = 'urls',
    LOGO = 'logo',
    DESCRIPTION = 'description',
    TAGS = 'tags',
    PLATFORM = 'platform',
    DATE_ADDED = 'date_added',
    NOTICE = 'notice',
}

registerEnumType(SORT_DIRECTION, {
    name: 'OPTIONAL_COING_META_FIELDS',
    description: 'Optionally list of supplemental data fields to return',
});