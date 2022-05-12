import { Translation } from './Translation';
export declare enum CheckState {
    MODERATED = "moderated",
    REJECTED = "rejected",
    APPROVED = "approved"
}
export declare class CheckStatus {
    id: number;
    name: CheckState;
    comment: Translation;
    translation: Translation;
}
