import { Collection } from '@mikro-orm/core';
import { TranslationValue } from './TranslationValue';
import { Locale } from './User';
export declare class Translation {
    id: number;
    name: string;
    values: Collection<TranslationValue, unknown>;
    getLocalizedLabel(locale: Locale): string;
    getAllLabels(): {
        [key in Locale]: string;
    };
}
