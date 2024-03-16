export type YachtCategoryId = string;
export type YachtName = string;
export type YachtShortName = string;
export type YachtDescription = string;

export type YachtCategories<AdditionalOptions> = {
    yacht_cat_id: YachtCategoryId;
    name: YachtName;
    short_name: YachtShortName;
    description: YachtDescription;
    options: AdditionalOptions;
}