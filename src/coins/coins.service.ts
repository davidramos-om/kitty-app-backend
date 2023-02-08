import { Injectable } from "@nestjs/common";

import { HttpGet } from 'src/util/fetch.service';
import { QueryString, Slugify } from 'src/util/helper';
import { MARKET_CAP_SORT, SORT_DIRECTION } from "src/common/enums";
import { CoinDto, CoinMetaDto, CoinStatsModel } from "./models/coins.model";
import { CoinMetaArgs, MapSearchArgs, SearchArgs } from './dto/search.args';

import config from '../config';

const cf = config();
let cache: {
    [ key: string ]: CoinStatsModel[];
} = {};

@Injectable()
export class CoinsService {

    constructor() { }

    async findStats(agrs: SearchArgs): Promise<CoinStatsModel[]> {

        const page = agrs.take <= 0 ? 1 : agrs.page;
        const skip = agrs.take <= 0 ? 0 : (page - 1) * agrs.take;

        const params = {
            start: skip <= 0 ? 1 : skip,
            limit: agrs.take,
            sort: agrs.sort || null,
            sort_dir: agrs.sort_dir || null,
        }

        const queryString = QueryString(params);

        const _inCache = cache[ queryString ];
        if (_inCache)
            return _inCache;

        const result = await HttpGet('cmc', 'v1/cryptocurrency/listings/latest?' + queryString);
        const coins = result?.data || null;

        if (Array.isArray(coins)) {

            const ids = coins.map((value: any) => { return parseInt(value.id); });
            const names = coins.map((value: any) => { return Slugify(value.name) });

            const meta_info_promise = this.coinMetaInfo({ ids: ids, slugs: [], symbols: [], address: '' });
            const market_chart_promise = this.coingeckoData({ ids: names, page, per_page: agrs.take });

            const [ meta_info, market_chart ] = await Promise.all([ meta_info_promise, market_chart_promise ]);

            const deserialized = coins.map((value: any) => {

                const _marketInfo = market_chart?.find((x: any) => (x.symbol === value.symbol.toLowerCase() || x.name === value.name.toUpperCase()));

                const coinInfo: CoinStatsModel = {
                    id: String(value.id || ''),
                    name: value.name || '',
                    symbol: value.symbol || '',
                    usd_price: value.quote?.USD?.price || 0,
                    creationDate: value.date_added ? new Date(value.date_added) : null,
                    cmc_rank: value.cmc_rank || 0,
                    max_supply: value.max_supply || 0,
                    circulating_supply: value.circulating_supply || 0,
                    total_supply: value.total_supply || 0,
                    market_cap_usd: value.quote.USD.market_cap || 0,
                    icon: meta_info.find((x) => x.id === String(value.id))?.icon || '',
                    platform: value?.platform ? {
                        id: String(value?.platform?.id || ''),
                        name: value?.platform?.name || '',
                        symbol: value?.platform?.symbol || '',
                        slug: value?.platform?.slug || '',
                        token_address: value?.platform?.token_address || '',
                    } : null,
                    ath: _marketInfo?.ath || 0,
                    atl: _marketInfo?.atl || 0,
                    sparkline_in_7d: _marketInfo?.sparkline_in_7d?.price || [],
                };

                return coinInfo;
            });

            cache[ queryString ] = deserialized;
            return deserialized;
        }

        return new Array<CoinStatsModel>();
    }

    async coingeckoData(arg0: { ids: string[]; page: number, per_page: number; }) {

        const params = {
            ids: arg0.ids.join(','),
            order: 'market_cap_desc',
            page: arg0.page,
            per_page: arg0.per_page,
            sparkline: true,
            vs_currency: 'usd',
        };

        const queryString = QueryString(params);
        const url = 'coins/markets?' + queryString;

        const result = await HttpGet('coingecko', url);
        const data = result?.data || null;
        return data;
    }

    async coinMap(agrs: MapSearchArgs): Promise<CoinDto[]> {

        const page = agrs.take <= 0 ? 1 : agrs.page;
        const skip = agrs.take <= 0 ? 0 : (page - 1) * agrs.take;

        const params = {
            start: skip <= 0 ? 1 : skip,
            limit: agrs.take,
            sort: agrs.sort || null,
        };

        const queryString = QueryString(params);
        const result = await HttpGet('cmc', 'v1/cryptocurrency/map?' + queryString);
        const coins = result?.data || null;

        if (Array.isArray(coins)) {

            const ids = coins.map((value: any) => { return parseInt(value.id); });

            const meta_promise = this.coinMetaInfo({ ids: ids, slugs: [], symbols: [], address: '' });
            const stats_promise = this.findStats({
                page: 1,
                take: cf.crypto.MAX_PAGINATION,
                sort: MARKET_CAP_SORT.MARKET_CAP,
                sort_dir: SORT_DIRECTION.DESC,
                search: '',
            });

            const [ meta, stats ] = await Promise.all([ meta_promise, stats_promise ]);


            const deserialized = coins.map((value: any) => {

                const coinInfo: CoinDto = {
                    id: String(value.id || ''),
                    rank: value.rank || 0,
                    name: value.name || '',
                    symbol: value.symbol || '',
                    icon: meta.find((x) => x.id === String(value.id))?.icon || '',
                    usd_price: stats.find((x) => x.id === String(value.id))?.usd_price || 0,
                };

                return coinInfo;
            });

            return deserialized;
        }

        return new Array<CoinDto>();
    }

    async coinMetaInfo(args: CoinMetaArgs): Promise<CoinMetaDto[]> {

        const params = {};
        if (args.ids.length > 0)
            params[ 'id' ] = args.ids.join(',');

        if (args.slugs.length > 0)
            params[ 'slug' ] = args.slugs.join(',');

        if (args.symbols.length > 0)
            params[ 'symbol' ] = args.symbols.join(',');

        if (args.address)
            params[ 'address' ] = args.address;

        const queryString = QueryString(params);
        const result = await HttpGet('cmc', 'v2/cryptocurrency/info?' + queryString);
        const coins = result?.data || null;

        if (coins) {

            const keys = Object.keys(coins);
            const deserialized = keys.map((key: string) => {

                const coinInfo: CoinMetaDto = {
                    id: String(coins[ key ].id || ''),
                    name: coins[ key ].name || '',
                    symbol: coins[ key ].symbol || '',
                    description: coins[ key ].description || '',
                    icon: coins[ key ].logo || '',
                };

                return coinInfo;
            });

            return deserialized;
        }

        return new Array<CoinMetaDto>();
    }
}
