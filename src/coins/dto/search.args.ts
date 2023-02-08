import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsEnum, Min } from 'class-validator';

import { MAP_SORT_TYPE, MARKET_CAP_SORT, SORT_DIRECTION } from 'src/common/enums';

@ArgsType()
export class BaseArgs {
    @Field(type => Int)
    @Min(0)
    page = 0;

    @Field(type => Int)
    @Min(1)
    take = 25;
}

@ArgsType()
export class SearchArgs extends BaseArgs {

    @Field(type => String, { nullable: true, defaultValue: '' })
    search: string;

    @Field(() => MARKET_CAP_SORT, { nullable: true, defaultValue: MARKET_CAP_SORT.MARKET_CAP })
    @IsEnum(MARKET_CAP_SORT)
    sort: MARKET_CAP_SORT;

    @Field(type => SORT_DIRECTION, { nullable: true, defaultValue: SORT_DIRECTION.DESC })
    @IsEnum(SORT_DIRECTION)
    sort_dir: SORT_DIRECTION;
}


@ArgsType()
export class MapSearchArgs extends BaseArgs {

    @Field(type => [ Int ], { defaultValue: [] })
    id: number[];

    @Field(() => MAP_SORT_TYPE, { nullable: true, defaultValue: MAP_SORT_TYPE.ID })
    @IsEnum(MAP_SORT_TYPE)
    sort: MAP_SORT_TYPE;
}

@ArgsType()
export class CoinMetaArgs {

    @Field(type => [ Int ], { defaultValue: [] })
    @IsArray()
    ids: number[];

    @Field(type => [ String ], { nullable: true, defaultValue: [] })
    @IsArray()
    slugs: string[];

    @Field(type => [ String ], { nullable: true, defaultValue: [] })
    @IsArray()
    symbols: string[];

    @Field(type => String, { nullable: true, defaultValue: '' })
    address: string;

    // @Field(type => [ OPTIONAL_COING_META_FIELDS ], { nullable: true, defaultValue: [] })
    // add_fields_returns: OPTIONAL_COING_META_FIELDS[];
}