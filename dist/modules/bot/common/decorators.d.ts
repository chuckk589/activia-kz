import { Composer, Context } from 'grammy';
import { BotContext } from 'src/types/interfaces';
export declare type MenuKeyFunction = (ctx: BotContext) => {
    keys: string[];
};
export declare function ComposerController<T extends {
    new (...args: any[]): any;
}>(constructor: T): {
    new (...args: any[]): {
        [x: string]: any;
        _composer: Composer<Context>;
    };
} & T;
export declare const Use: (payload?: unknown, parent?: string) => PropertyDecorator;
export declare const Command: (payload?: string, parent?: string) => PropertyDecorator;
export declare const On: (payload?: ("message" | "edited_message" | "channel_post" | "edited_channel_post" | "inline_query" | "chosen_inline_result" | "callback_query" | "shipping_query" | "pre_checkout_query" | "poll" | "poll_answer" | "my_chat_member" | "chat_member" | "chat_join_request" | "message:poll" | "message:new_chat_members" | "message:left_chat_member" | "message:group_chat_created" | "message:supergroup_chat_created" | "message:migrate_to_chat_id" | "message:migrate_from_chat_id" | "message:successful_payment" | "message:connected_website" | "message:passport_data" | "message:sticker" | "message:video_note" | "message:voice" | "message:contact" | "message:dice" | "message:venue" | "message:new_chat_title" | "message:new_chat_photo" | "message:delete_chat_photo" | "message:message_auto_delete_timer_changed" | "message:pinned_message" | "message:invoice" | "message:proximity_alert_triggered" | "message:video_chat_scheduled" | "message:video_chat_started" | "message:video_chat_ended" | "message:video_chat_participants_invited" | "message:web_app_data" | "message:forward_date" | "message:is_automatic_forward" | "message:text" | "message:animation" | "message:audio" | "message:document" | "message:photo" | "message:video" | "message:game" | "message:location" | "message:entities" | "message:caption_entities" | "message:caption" | "edited_message:poll" | "edited_message:new_chat_members" | "edited_message:left_chat_member" | "edited_message:group_chat_created" | "edited_message:supergroup_chat_created" | "edited_message:migrate_to_chat_id" | "edited_message:migrate_from_chat_id" | "edited_message:successful_payment" | "edited_message:connected_website" | "edited_message:passport_data" | "edited_message:sticker" | "edited_message:video_note" | "edited_message:voice" | "edited_message:contact" | "edited_message:dice" | "edited_message:venue" | "edited_message:new_chat_title" | "edited_message:new_chat_photo" | "edited_message:delete_chat_photo" | "edited_message:message_auto_delete_timer_changed" | "edited_message:pinned_message" | "edited_message:invoice" | "edited_message:proximity_alert_triggered" | "edited_message:video_chat_scheduled" | "edited_message:video_chat_started" | "edited_message:video_chat_ended" | "edited_message:video_chat_participants_invited" | "edited_message:web_app_data" | "edited_message:forward_date" | "edited_message:is_automatic_forward" | "edited_message:text" | "edited_message:animation" | "edited_message:audio" | "edited_message:document" | "edited_message:photo" | "edited_message:video" | "edited_message:game" | "edited_message:location" | "edited_message:entities" | "edited_message:caption_entities" | "edited_message:caption" | "channel_post:poll" | "channel_post:sticker" | "channel_post:video_note" | "channel_post:voice" | "channel_post:contact" | "channel_post:dice" | "channel_post:venue" | "channel_post:new_chat_title" | "channel_post:new_chat_photo" | "channel_post:delete_chat_photo" | "channel_post:message_auto_delete_timer_changed" | "channel_post:pinned_message" | "channel_post:invoice" | "channel_post:proximity_alert_triggered" | "channel_post:video_chat_scheduled" | "channel_post:video_chat_started" | "channel_post:video_chat_ended" | "channel_post:video_chat_participants_invited" | "channel_post:web_app_data" | "channel_post:forward_date" | "channel_post:is_automatic_forward" | "channel_post:text" | "channel_post:animation" | "channel_post:audio" | "channel_post:document" | "channel_post:photo" | "channel_post:video" | "channel_post:game" | "channel_post:location" | "channel_post:entities" | "channel_post:caption_entities" | "channel_post:caption" | "channel_post:channel_chat_created" | "edited_channel_post:poll" | "edited_channel_post:sticker" | "edited_channel_post:video_note" | "edited_channel_post:voice" | "edited_channel_post:contact" | "edited_channel_post:dice" | "edited_channel_post:venue" | "edited_channel_post:new_chat_title" | "edited_channel_post:new_chat_photo" | "edited_channel_post:delete_chat_photo" | "edited_channel_post:message_auto_delete_timer_changed" | "edited_channel_post:pinned_message" | "edited_channel_post:invoice" | "edited_channel_post:proximity_alert_triggered" | "edited_channel_post:video_chat_scheduled" | "edited_channel_post:video_chat_started" | "edited_channel_post:video_chat_ended" | "edited_channel_post:video_chat_participants_invited" | "edited_channel_post:web_app_data" | "edited_channel_post:forward_date" | "edited_channel_post:is_automatic_forward" | "edited_channel_post:text" | "edited_channel_post:animation" | "edited_channel_post:audio" | "edited_channel_post:document" | "edited_channel_post:photo" | "edited_channel_post:video" | "edited_channel_post:game" | "edited_channel_post:location" | "edited_channel_post:entities" | "edited_channel_post:caption_entities" | "edited_channel_post:caption" | "edited_channel_post:channel_chat_created" | "callback_query:data" | "callback_query:game_short_name" | "my_chat_member:from" | "chat_member:from" | "message:new_chat_members:me" | "message:new_chat_members:is_bot" | "message:left_chat_member:me" | "message:left_chat_member:is_bot" | "message:entities:bold" | "message:entities:code" | "message:entities:mention" | "message:entities:hashtag" | "message:entities:cashtag" | "message:entities:bot_command" | "message:entities:url" | "message:entities:email" | "message:entities:phone_number" | "message:entities:italic" | "message:entities:underline" | "message:entities:strikethrough" | "message:entities:spoiler" | "message:entities:pre" | "message:entities:text_link" | "message:entities:text_mention" | "message:caption_entities:bold" | "message:caption_entities:code" | "message:caption_entities:mention" | "message:caption_entities:hashtag" | "message:caption_entities:cashtag" | "message:caption_entities:bot_command" | "message:caption_entities:url" | "message:caption_entities:email" | "message:caption_entities:phone_number" | "message:caption_entities:italic" | "message:caption_entities:underline" | "message:caption_entities:strikethrough" | "message:caption_entities:spoiler" | "message:caption_entities:pre" | "message:caption_entities:text_link" | "message:caption_entities:text_mention" | "edited_message:new_chat_members:me" | "edited_message:new_chat_members:is_bot" | "edited_message:left_chat_member:me" | "edited_message:left_chat_member:is_bot" | "edited_message:entities:bold" | "edited_message:entities:code" | "edited_message:entities:mention" | "edited_message:entities:hashtag" | "edited_message:entities:cashtag" | "edited_message:entities:bot_command" | "edited_message:entities:url" | "edited_message:entities:email" | "edited_message:entities:phone_number" | "edited_message:entities:italic" | "edited_message:entities:underline" | "edited_message:entities:strikethrough" | "edited_message:entities:spoiler" | "edited_message:entities:pre" | "edited_message:entities:text_link" | "edited_message:entities:text_mention" | "edited_message:caption_entities:bold" | "edited_message:caption_entities:code" | "edited_message:caption_entities:mention" | "edited_message:caption_entities:hashtag" | "edited_message:caption_entities:cashtag" | "edited_message:caption_entities:bot_command" | "edited_message:caption_entities:url" | "edited_message:caption_entities:email" | "edited_message:caption_entities:phone_number" | "edited_message:caption_entities:italic" | "edited_message:caption_entities:underline" | "edited_message:caption_entities:strikethrough" | "edited_message:caption_entities:spoiler" | "edited_message:caption_entities:pre" | "edited_message:caption_entities:text_link" | "edited_message:caption_entities:text_mention" | "channel_post:entities:bold" | "channel_post:entities:code" | "channel_post:entities:mention" | "channel_post:entities:hashtag" | "channel_post:entities:cashtag" | "channel_post:entities:bot_command" | "channel_post:entities:url" | "channel_post:entities:email" | "channel_post:entities:phone_number" | "channel_post:entities:italic" | "channel_post:entities:underline" | "channel_post:entities:strikethrough" | "channel_post:entities:spoiler" | "channel_post:entities:pre" | "channel_post:entities:text_link" | "channel_post:entities:text_mention" | "channel_post:caption_entities:bold" | "channel_post:caption_entities:code" | "channel_post:caption_entities:mention" | "channel_post:caption_entities:hashtag" | "channel_post:caption_entities:cashtag" | "channel_post:caption_entities:bot_command" | "channel_post:caption_entities:url" | "channel_post:caption_entities:email" | "channel_post:caption_entities:phone_number" | "channel_post:caption_entities:italic" | "channel_post:caption_entities:underline" | "channel_post:caption_entities:strikethrough" | "channel_post:caption_entities:spoiler" | "channel_post:caption_entities:pre" | "channel_post:caption_entities:text_link" | "channel_post:caption_entities:text_mention" | "edited_channel_post:entities:bold" | "edited_channel_post:entities:code" | "edited_channel_post:entities:mention" | "edited_channel_post:entities:hashtag" | "edited_channel_post:entities:cashtag" | "edited_channel_post:entities:bot_command" | "edited_channel_post:entities:url" | "edited_channel_post:entities:email" | "edited_channel_post:entities:phone_number" | "edited_channel_post:entities:italic" | "edited_channel_post:entities:underline" | "edited_channel_post:entities:strikethrough" | "edited_channel_post:entities:spoiler" | "edited_channel_post:entities:pre" | "edited_channel_post:entities:text_link" | "edited_channel_post:entities:text_mention" | "edited_channel_post:caption_entities:bold" | "edited_channel_post:caption_entities:code" | "edited_channel_post:caption_entities:mention" | "edited_channel_post:caption_entities:hashtag" | "edited_channel_post:caption_entities:cashtag" | "edited_channel_post:caption_entities:bot_command" | "edited_channel_post:caption_entities:url" | "edited_channel_post:caption_entities:email" | "edited_channel_post:caption_entities:phone_number" | "edited_channel_post:caption_entities:italic" | "edited_channel_post:caption_entities:underline" | "edited_channel_post:caption_entities:strikethrough" | "edited_channel_post:caption_entities:spoiler" | "edited_channel_post:caption_entities:pre" | "edited_channel_post:caption_entities:text_link" | "edited_channel_post:caption_entities:text_mention" | "my_chat_member:from:me" | "my_chat_member:from:is_bot" | "chat_member:from:me" | "chat_member:from:is_bot" | "msg" | "edit" | ":poll" | "msg:poll" | ":new_chat_members" | "msg:new_chat_members" | ":left_chat_member" | "msg:left_chat_member" | ":group_chat_created" | "msg:group_chat_created" | ":supergroup_chat_created" | "msg:supergroup_chat_created" | ":migrate_to_chat_id" | "msg:migrate_to_chat_id" | ":migrate_from_chat_id" | "msg:migrate_from_chat_id" | ":successful_payment" | "msg:successful_payment" | ":connected_website" | "msg:connected_website" | ":passport_data" | "msg:passport_data" | "message:file" | ":sticker" | ":file" | "msg:sticker" | "msg:file" | ":video_note" | "msg:video_note" | ":voice" | "msg:voice" | ":contact" | "msg:contact" | ":dice" | "msg:dice" | ":venue" | "msg:venue" | ":new_chat_title" | "msg:new_chat_title" | ":new_chat_photo" | "msg:new_chat_photo" | ":delete_chat_photo" | "msg:delete_chat_photo" | ":message_auto_delete_timer_changed" | "msg:message_auto_delete_timer_changed" | ":pinned_message" | "msg:pinned_message" | ":invoice" | "msg:invoice" | ":proximity_alert_triggered" | "msg:proximity_alert_triggered" | ":video_chat_scheduled" | "msg:video_chat_scheduled" | ":video_chat_started" | "msg:video_chat_started" | ":video_chat_ended" | "msg:video_chat_ended" | ":video_chat_participants_invited" | "msg:video_chat_participants_invited" | ":web_app_data" | "msg:web_app_data" | ":forward_date" | "msg:forward_date" | ":is_automatic_forward" | "msg:is_automatic_forward" | ":text" | "msg:text" | ":animation" | "msg:animation" | ":audio" | "msg:audio" | ":document" | "msg:document" | "message:media" | ":photo" | ":media" | "msg:photo" | "msg:media" | ":video" | "msg:video" | ":game" | "msg:game" | ":location" | "msg:location" | ":entities" | "msg:entities" | ":caption_entities" | "msg:caption_entities" | ":caption" | "msg:caption" | "edit:poll" | "edit:new_chat_members" | "edit:left_chat_member" | "edit:group_chat_created" | "edit:supergroup_chat_created" | "edit:migrate_to_chat_id" | "edit:migrate_from_chat_id" | "edit:successful_payment" | "edit:connected_website" | "edit:passport_data" | "edited_message:file" | "edit:sticker" | "edit:file" | "edit:video_note" | "edit:voice" | "edit:contact" | "edit:dice" | "edit:venue" | "edit:new_chat_title" | "edit:new_chat_photo" | "edit:delete_chat_photo" | "edit:message_auto_delete_timer_changed" | "edit:pinned_message" | "edit:invoice" | "edit:proximity_alert_triggered" | "edit:video_chat_scheduled" | "edit:video_chat_started" | "edit:video_chat_ended" | "edit:video_chat_participants_invited" | "edit:web_app_data" | "edit:forward_date" | "edit:is_automatic_forward" | "edit:text" | "edit:animation" | "edit:audio" | "edit:document" | "edited_message:media" | "edit:photo" | "edit:media" | "edit:video" | "edit:game" | "edit:location" | "edit:entities" | "edit:caption_entities" | "edit:caption" | "channel_post:file" | "channel_post:media" | ":channel_chat_created" | "msg:channel_chat_created" | "edited_channel_post:file" | "edited_channel_post:media" | "edit:channel_chat_created" | ":new_chat_members:me" | "msg:new_chat_members:me" | ":new_chat_members:is_bot" | "msg:new_chat_members:is_bot" | ":left_chat_member:me" | "msg:left_chat_member:me" | ":left_chat_member:is_bot" | "msg:left_chat_member:is_bot" | "message::bold" | ":entities:bold" | "::bold" | "msg:entities:bold" | "msg::bold" | "message::code" | ":entities:code" | "::code" | "msg:entities:code" | "msg::code" | "message::mention" | ":entities:mention" | "::mention" | "msg:entities:mention" | "msg::mention" | "message::hashtag" | ":entities:hashtag" | "::hashtag" | "msg:entities:hashtag" | "msg::hashtag" | "message::cashtag" | ":entities:cashtag" | "::cashtag" | "msg:entities:cashtag" | "msg::cashtag" | "message::bot_command" | ":entities:bot_command" | "::bot_command" | "msg:entities:bot_command" | "msg::bot_command" | "message::url" | ":entities:url" | "::url" | "msg:entities:url" | "msg::url" | "message::email" | ":entities:email" | "::email" | "msg:entities:email" | "msg::email" | "message::phone_number" | ":entities:phone_number" | "::phone_number" | "msg:entities:phone_number" | "msg::phone_number" | "message::italic" | ":entities:italic" | "::italic" | "msg:entities:italic" | "msg::italic" | "message::underline" | ":entities:underline" | "::underline" | "msg:entities:underline" | "msg::underline" | "message::strikethrough" | ":entities:strikethrough" | "::strikethrough" | "msg:entities:strikethrough" | "msg::strikethrough" | "message::spoiler" | ":entities:spoiler" | "::spoiler" | "msg:entities:spoiler" | "msg::spoiler" | "message::pre" | ":entities:pre" | "::pre" | "msg:entities:pre" | "msg::pre" | "message::text_link" | ":entities:text_link" | "::text_link" | "msg:entities:text_link" | "msg::text_link" | "message::text_mention" | ":entities:text_mention" | "::text_mention" | "msg:entities:text_mention" | "msg::text_mention" | ":caption_entities:bold" | "msg:caption_entities:bold" | ":caption_entities:code" | "msg:caption_entities:code" | ":caption_entities:mention" | "msg:caption_entities:mention" | ":caption_entities:hashtag" | "msg:caption_entities:hashtag" | ":caption_entities:cashtag" | "msg:caption_entities:cashtag" | ":caption_entities:bot_command" | "msg:caption_entities:bot_command" | ":caption_entities:url" | "msg:caption_entities:url" | ":caption_entities:email" | "msg:caption_entities:email" | ":caption_entities:phone_number" | "msg:caption_entities:phone_number" | ":caption_entities:italic" | "msg:caption_entities:italic" | ":caption_entities:underline" | "msg:caption_entities:underline" | ":caption_entities:strikethrough" | "msg:caption_entities:strikethrough" | ":caption_entities:spoiler" | "msg:caption_entities:spoiler" | ":caption_entities:pre" | "msg:caption_entities:pre" | ":caption_entities:text_link" | "msg:caption_entities:text_link" | ":caption_entities:text_mention" | "msg:caption_entities:text_mention" | "edit:new_chat_members:me" | "edit:new_chat_members:is_bot" | "edit:left_chat_member:me" | "edit:left_chat_member:is_bot" | "edited_message::bold" | "edit:entities:bold" | "edit::bold" | "edited_message::code" | "edit:entities:code" | "edit::code" | "edited_message::mention" | "edit:entities:mention" | "edit::mention" | "edited_message::hashtag" | "edit:entities:hashtag" | "edit::hashtag" | "edited_message::cashtag" | "edit:entities:cashtag" | "edit::cashtag" | "edited_message::bot_command" | "edit:entities:bot_command" | "edit::bot_command" | "edited_message::url" | "edit:entities:url" | "edit::url" | "edited_message::email" | "edit:entities:email" | "edit::email" | "edited_message::phone_number" | "edit:entities:phone_number" | "edit::phone_number" | "edited_message::italic" | "edit:entities:italic" | "edit::italic" | "edited_message::underline" | "edit:entities:underline" | "edit::underline" | "edited_message::strikethrough" | "edit:entities:strikethrough" | "edit::strikethrough" | "edited_message::spoiler" | "edit:entities:spoiler" | "edit::spoiler" | "edited_message::pre" | "edit:entities:pre" | "edit::pre" | "edited_message::text_link" | "edit:entities:text_link" | "edit::text_link" | "edited_message::text_mention" | "edit:entities:text_mention" | "edit::text_mention" | "edit:caption_entities:bold" | "edit:caption_entities:code" | "edit:caption_entities:mention" | "edit:caption_entities:hashtag" | "edit:caption_entities:cashtag" | "edit:caption_entities:bot_command" | "edit:caption_entities:url" | "edit:caption_entities:email" | "edit:caption_entities:phone_number" | "edit:caption_entities:italic" | "edit:caption_entities:underline" | "edit:caption_entities:strikethrough" | "edit:caption_entities:spoiler" | "edit:caption_entities:pre" | "edit:caption_entities:text_link" | "edit:caption_entities:text_mention" | "channel_post::bold" | "channel_post::code" | "channel_post::mention" | "channel_post::hashtag" | "channel_post::cashtag" | "channel_post::bot_command" | "channel_post::url" | "channel_post::email" | "channel_post::phone_number" | "channel_post::italic" | "channel_post::underline" | "channel_post::strikethrough" | "channel_post::spoiler" | "channel_post::pre" | "channel_post::text_link" | "channel_post::text_mention" | "edited_channel_post::bold" | "edited_channel_post::code" | "edited_channel_post::mention" | "edited_channel_post::hashtag" | "edited_channel_post::cashtag" | "edited_channel_post::bot_command" | "edited_channel_post::url" | "edited_channel_post::email" | "edited_channel_post::phone_number" | "edited_channel_post::italic" | "edited_channel_post::underline" | "edited_channel_post::strikethrough" | "edited_channel_post::spoiler" | "edited_channel_post::pre" | "edited_channel_post::text_link" | "edited_channel_post::text_mention") | ("message" | "edited_message" | "channel_post" | "edited_channel_post" | "inline_query" | "chosen_inline_result" | "callback_query" | "shipping_query" | "pre_checkout_query" | "poll" | "poll_answer" | "my_chat_member" | "chat_member" | "chat_join_request" | "message:poll" | "message:new_chat_members" | "message:left_chat_member" | "message:group_chat_created" | "message:supergroup_chat_created" | "message:migrate_to_chat_id" | "message:migrate_from_chat_id" | "message:successful_payment" | "message:connected_website" | "message:passport_data" | "message:sticker" | "message:video_note" | "message:voice" | "message:contact" | "message:dice" | "message:venue" | "message:new_chat_title" | "message:new_chat_photo" | "message:delete_chat_photo" | "message:message_auto_delete_timer_changed" | "message:pinned_message" | "message:invoice" | "message:proximity_alert_triggered" | "message:video_chat_scheduled" | "message:video_chat_started" | "message:video_chat_ended" | "message:video_chat_participants_invited" | "message:web_app_data" | "message:forward_date" | "message:is_automatic_forward" | "message:text" | "message:animation" | "message:audio" | "message:document" | "message:photo" | "message:video" | "message:game" | "message:location" | "message:entities" | "message:caption_entities" | "message:caption" | "edited_message:poll" | "edited_message:new_chat_members" | "edited_message:left_chat_member" | "edited_message:group_chat_created" | "edited_message:supergroup_chat_created" | "edited_message:migrate_to_chat_id" | "edited_message:migrate_from_chat_id" | "edited_message:successful_payment" | "edited_message:connected_website" | "edited_message:passport_data" | "edited_message:sticker" | "edited_message:video_note" | "edited_message:voice" | "edited_message:contact" | "edited_message:dice" | "edited_message:venue" | "edited_message:new_chat_title" | "edited_message:new_chat_photo" | "edited_message:delete_chat_photo" | "edited_message:message_auto_delete_timer_changed" | "edited_message:pinned_message" | "edited_message:invoice" | "edited_message:proximity_alert_triggered" | "edited_message:video_chat_scheduled" | "edited_message:video_chat_started" | "edited_message:video_chat_ended" | "edited_message:video_chat_participants_invited" | "edited_message:web_app_data" | "edited_message:forward_date" | "edited_message:is_automatic_forward" | "edited_message:text" | "edited_message:animation" | "edited_message:audio" | "edited_message:document" | "edited_message:photo" | "edited_message:video" | "edited_message:game" | "edited_message:location" | "edited_message:entities" | "edited_message:caption_entities" | "edited_message:caption" | "channel_post:poll" | "channel_post:sticker" | "channel_post:video_note" | "channel_post:voice" | "channel_post:contact" | "channel_post:dice" | "channel_post:venue" | "channel_post:new_chat_title" | "channel_post:new_chat_photo" | "channel_post:delete_chat_photo" | "channel_post:message_auto_delete_timer_changed" | "channel_post:pinned_message" | "channel_post:invoice" | "channel_post:proximity_alert_triggered" | "channel_post:video_chat_scheduled" | "channel_post:video_chat_started" | "channel_post:video_chat_ended" | "channel_post:video_chat_participants_invited" | "channel_post:web_app_data" | "channel_post:forward_date" | "channel_post:is_automatic_forward" | "channel_post:text" | "channel_post:animation" | "channel_post:audio" | "channel_post:document" | "channel_post:photo" | "channel_post:video" | "channel_post:game" | "channel_post:location" | "channel_post:entities" | "channel_post:caption_entities" | "channel_post:caption" | "channel_post:channel_chat_created" | "edited_channel_post:poll" | "edited_channel_post:sticker" | "edited_channel_post:video_note" | "edited_channel_post:voice" | "edited_channel_post:contact" | "edited_channel_post:dice" | "edited_channel_post:venue" | "edited_channel_post:new_chat_title" | "edited_channel_post:new_chat_photo" | "edited_channel_post:delete_chat_photo" | "edited_channel_post:message_auto_delete_timer_changed" | "edited_channel_post:pinned_message" | "edited_channel_post:invoice" | "edited_channel_post:proximity_alert_triggered" | "edited_channel_post:video_chat_scheduled" | "edited_channel_post:video_chat_started" | "edited_channel_post:video_chat_ended" | "edited_channel_post:video_chat_participants_invited" | "edited_channel_post:web_app_data" | "edited_channel_post:forward_date" | "edited_channel_post:is_automatic_forward" | "edited_channel_post:text" | "edited_channel_post:animation" | "edited_channel_post:audio" | "edited_channel_post:document" | "edited_channel_post:photo" | "edited_channel_post:video" | "edited_channel_post:game" | "edited_channel_post:location" | "edited_channel_post:entities" | "edited_channel_post:caption_entities" | "edited_channel_post:caption" | "edited_channel_post:channel_chat_created" | "callback_query:data" | "callback_query:game_short_name" | "my_chat_member:from" | "chat_member:from" | "message:new_chat_members:me" | "message:new_chat_members:is_bot" | "message:left_chat_member:me" | "message:left_chat_member:is_bot" | "message:entities:bold" | "message:entities:code" | "message:entities:mention" | "message:entities:hashtag" | "message:entities:cashtag" | "message:entities:bot_command" | "message:entities:url" | "message:entities:email" | "message:entities:phone_number" | "message:entities:italic" | "message:entities:underline" | "message:entities:strikethrough" | "message:entities:spoiler" | "message:entities:pre" | "message:entities:text_link" | "message:entities:text_mention" | "message:caption_entities:bold" | "message:caption_entities:code" | "message:caption_entities:mention" | "message:caption_entities:hashtag" | "message:caption_entities:cashtag" | "message:caption_entities:bot_command" | "message:caption_entities:url" | "message:caption_entities:email" | "message:caption_entities:phone_number" | "message:caption_entities:italic" | "message:caption_entities:underline" | "message:caption_entities:strikethrough" | "message:caption_entities:spoiler" | "message:caption_entities:pre" | "message:caption_entities:text_link" | "message:caption_entities:text_mention" | "edited_message:new_chat_members:me" | "edited_message:new_chat_members:is_bot" | "edited_message:left_chat_member:me" | "edited_message:left_chat_member:is_bot" | "edited_message:entities:bold" | "edited_message:entities:code" | "edited_message:entities:mention" | "edited_message:entities:hashtag" | "edited_message:entities:cashtag" | "edited_message:entities:bot_command" | "edited_message:entities:url" | "edited_message:entities:email" | "edited_message:entities:phone_number" | "edited_message:entities:italic" | "edited_message:entities:underline" | "edited_message:entities:strikethrough" | "edited_message:entities:spoiler" | "edited_message:entities:pre" | "edited_message:entities:text_link" | "edited_message:entities:text_mention" | "edited_message:caption_entities:bold" | "edited_message:caption_entities:code" | "edited_message:caption_entities:mention" | "edited_message:caption_entities:hashtag" | "edited_message:caption_entities:cashtag" | "edited_message:caption_entities:bot_command" | "edited_message:caption_entities:url" | "edited_message:caption_entities:email" | "edited_message:caption_entities:phone_number" | "edited_message:caption_entities:italic" | "edited_message:caption_entities:underline" | "edited_message:caption_entities:strikethrough" | "edited_message:caption_entities:spoiler" | "edited_message:caption_entities:pre" | "edited_message:caption_entities:text_link" | "edited_message:caption_entities:text_mention" | "channel_post:entities:bold" | "channel_post:entities:code" | "channel_post:entities:mention" | "channel_post:entities:hashtag" | "channel_post:entities:cashtag" | "channel_post:entities:bot_command" | "channel_post:entities:url" | "channel_post:entities:email" | "channel_post:entities:phone_number" | "channel_post:entities:italic" | "channel_post:entities:underline" | "channel_post:entities:strikethrough" | "channel_post:entities:spoiler" | "channel_post:entities:pre" | "channel_post:entities:text_link" | "channel_post:entities:text_mention" | "channel_post:caption_entities:bold" | "channel_post:caption_entities:code" | "channel_post:caption_entities:mention" | "channel_post:caption_entities:hashtag" | "channel_post:caption_entities:cashtag" | "channel_post:caption_entities:bot_command" | "channel_post:caption_entities:url" | "channel_post:caption_entities:email" | "channel_post:caption_entities:phone_number" | "channel_post:caption_entities:italic" | "channel_post:caption_entities:underline" | "channel_post:caption_entities:strikethrough" | "channel_post:caption_entities:spoiler" | "channel_post:caption_entities:pre" | "channel_post:caption_entities:text_link" | "channel_post:caption_entities:text_mention" | "edited_channel_post:entities:bold" | "edited_channel_post:entities:code" | "edited_channel_post:entities:mention" | "edited_channel_post:entities:hashtag" | "edited_channel_post:entities:cashtag" | "edited_channel_post:entities:bot_command" | "edited_channel_post:entities:url" | "edited_channel_post:entities:email" | "edited_channel_post:entities:phone_number" | "edited_channel_post:entities:italic" | "edited_channel_post:entities:underline" | "edited_channel_post:entities:strikethrough" | "edited_channel_post:entities:spoiler" | "edited_channel_post:entities:pre" | "edited_channel_post:entities:text_link" | "edited_channel_post:entities:text_mention" | "edited_channel_post:caption_entities:bold" | "edited_channel_post:caption_entities:code" | "edited_channel_post:caption_entities:mention" | "edited_channel_post:caption_entities:hashtag" | "edited_channel_post:caption_entities:cashtag" | "edited_channel_post:caption_entities:bot_command" | "edited_channel_post:caption_entities:url" | "edited_channel_post:caption_entities:email" | "edited_channel_post:caption_entities:phone_number" | "edited_channel_post:caption_entities:italic" | "edited_channel_post:caption_entities:underline" | "edited_channel_post:caption_entities:strikethrough" | "edited_channel_post:caption_entities:spoiler" | "edited_channel_post:caption_entities:pre" | "edited_channel_post:caption_entities:text_link" | "edited_channel_post:caption_entities:text_mention" | "my_chat_member:from:me" | "my_chat_member:from:is_bot" | "chat_member:from:me" | "chat_member:from:is_bot" | "msg" | "edit" | ":poll" | "msg:poll" | ":new_chat_members" | "msg:new_chat_members" | ":left_chat_member" | "msg:left_chat_member" | ":group_chat_created" | "msg:group_chat_created" | ":supergroup_chat_created" | "msg:supergroup_chat_created" | ":migrate_to_chat_id" | "msg:migrate_to_chat_id" | ":migrate_from_chat_id" | "msg:migrate_from_chat_id" | ":successful_payment" | "msg:successful_payment" | ":connected_website" | "msg:connected_website" | ":passport_data" | "msg:passport_data" | "message:file" | ":sticker" | ":file" | "msg:sticker" | "msg:file" | ":video_note" | "msg:video_note" | ":voice" | "msg:voice" | ":contact" | "msg:contact" | ":dice" | "msg:dice" | ":venue" | "msg:venue" | ":new_chat_title" | "msg:new_chat_title" | ":new_chat_photo" | "msg:new_chat_photo" | ":delete_chat_photo" | "msg:delete_chat_photo" | ":message_auto_delete_timer_changed" | "msg:message_auto_delete_timer_changed" | ":pinned_message" | "msg:pinned_message" | ":invoice" | "msg:invoice" | ":proximity_alert_triggered" | "msg:proximity_alert_triggered" | ":video_chat_scheduled" | "msg:video_chat_scheduled" | ":video_chat_started" | "msg:video_chat_started" | ":video_chat_ended" | "msg:video_chat_ended" | ":video_chat_participants_invited" | "msg:video_chat_participants_invited" | ":web_app_data" | "msg:web_app_data" | ":forward_date" | "msg:forward_date" | ":is_automatic_forward" | "msg:is_automatic_forward" | ":text" | "msg:text" | ":animation" | "msg:animation" | ":audio" | "msg:audio" | ":document" | "msg:document" | "message:media" | ":photo" | ":media" | "msg:photo" | "msg:media" | ":video" | "msg:video" | ":game" | "msg:game" | ":location" | "msg:location" | ":entities" | "msg:entities" | ":caption_entities" | "msg:caption_entities" | ":caption" | "msg:caption" | "edit:poll" | "edit:new_chat_members" | "edit:left_chat_member" | "edit:group_chat_created" | "edit:supergroup_chat_created" | "edit:migrate_to_chat_id" | "edit:migrate_from_chat_id" | "edit:successful_payment" | "edit:connected_website" | "edit:passport_data" | "edited_message:file" | "edit:sticker" | "edit:file" | "edit:video_note" | "edit:voice" | "edit:contact" | "edit:dice" | "edit:venue" | "edit:new_chat_title" | "edit:new_chat_photo" | "edit:delete_chat_photo" | "edit:message_auto_delete_timer_changed" | "edit:pinned_message" | "edit:invoice" | "edit:proximity_alert_triggered" | "edit:video_chat_scheduled" | "edit:video_chat_started" | "edit:video_chat_ended" | "edit:video_chat_participants_invited" | "edit:web_app_data" | "edit:forward_date" | "edit:is_automatic_forward" | "edit:text" | "edit:animation" | "edit:audio" | "edit:document" | "edited_message:media" | "edit:photo" | "edit:media" | "edit:video" | "edit:game" | "edit:location" | "edit:entities" | "edit:caption_entities" | "edit:caption" | "channel_post:file" | "channel_post:media" | ":channel_chat_created" | "msg:channel_chat_created" | "edited_channel_post:file" | "edited_channel_post:media" | "edit:channel_chat_created" | ":new_chat_members:me" | "msg:new_chat_members:me" | ":new_chat_members:is_bot" | "msg:new_chat_members:is_bot" | ":left_chat_member:me" | "msg:left_chat_member:me" | ":left_chat_member:is_bot" | "msg:left_chat_member:is_bot" | "message::bold" | ":entities:bold" | "::bold" | "msg:entities:bold" | "msg::bold" | "message::code" | ":entities:code" | "::code" | "msg:entities:code" | "msg::code" | "message::mention" | ":entities:mention" | "::mention" | "msg:entities:mention" | "msg::mention" | "message::hashtag" | ":entities:hashtag" | "::hashtag" | "msg:entities:hashtag" | "msg::hashtag" | "message::cashtag" | ":entities:cashtag" | "::cashtag" | "msg:entities:cashtag" | "msg::cashtag" | "message::bot_command" | ":entities:bot_command" | "::bot_command" | "msg:entities:bot_command" | "msg::bot_command" | "message::url" | ":entities:url" | "::url" | "msg:entities:url" | "msg::url" | "message::email" | ":entities:email" | "::email" | "msg:entities:email" | "msg::email" | "message::phone_number" | ":entities:phone_number" | "::phone_number" | "msg:entities:phone_number" | "msg::phone_number" | "message::italic" | ":entities:italic" | "::italic" | "msg:entities:italic" | "msg::italic" | "message::underline" | ":entities:underline" | "::underline" | "msg:entities:underline" | "msg::underline" | "message::strikethrough" | ":entities:strikethrough" | "::strikethrough" | "msg:entities:strikethrough" | "msg::strikethrough" | "message::spoiler" | ":entities:spoiler" | "::spoiler" | "msg:entities:spoiler" | "msg::spoiler" | "message::pre" | ":entities:pre" | "::pre" | "msg:entities:pre" | "msg::pre" | "message::text_link" | ":entities:text_link" | "::text_link" | "msg:entities:text_link" | "msg::text_link" | "message::text_mention" | ":entities:text_mention" | "::text_mention" | "msg:entities:text_mention" | "msg::text_mention" | ":caption_entities:bold" | "msg:caption_entities:bold" | ":caption_entities:code" | "msg:caption_entities:code" | ":caption_entities:mention" | "msg:caption_entities:mention" | ":caption_entities:hashtag" | "msg:caption_entities:hashtag" | ":caption_entities:cashtag" | "msg:caption_entities:cashtag" | ":caption_entities:bot_command" | "msg:caption_entities:bot_command" | ":caption_entities:url" | "msg:caption_entities:url" | ":caption_entities:email" | "msg:caption_entities:email" | ":caption_entities:phone_number" | "msg:caption_entities:phone_number" | ":caption_entities:italic" | "msg:caption_entities:italic" | ":caption_entities:underline" | "msg:caption_entities:underline" | ":caption_entities:strikethrough" | "msg:caption_entities:strikethrough" | ":caption_entities:spoiler" | "msg:caption_entities:spoiler" | ":caption_entities:pre" | "msg:caption_entities:pre" | ":caption_entities:text_link" | "msg:caption_entities:text_link" | ":caption_entities:text_mention" | "msg:caption_entities:text_mention" | "edit:new_chat_members:me" | "edit:new_chat_members:is_bot" | "edit:left_chat_member:me" | "edit:left_chat_member:is_bot" | "edited_message::bold" | "edit:entities:bold" | "edit::bold" | "edited_message::code" | "edit:entities:code" | "edit::code" | "edited_message::mention" | "edit:entities:mention" | "edit::mention" | "edited_message::hashtag" | "edit:entities:hashtag" | "edit::hashtag" | "edited_message::cashtag" | "edit:entities:cashtag" | "edit::cashtag" | "edited_message::bot_command" | "edit:entities:bot_command" | "edit::bot_command" | "edited_message::url" | "edit:entities:url" | "edit::url" | "edited_message::email" | "edit:entities:email" | "edit::email" | "edited_message::phone_number" | "edit:entities:phone_number" | "edit::phone_number" | "edited_message::italic" | "edit:entities:italic" | "edit::italic" | "edited_message::underline" | "edit:entities:underline" | "edit::underline" | "edited_message::strikethrough" | "edit:entities:strikethrough" | "edit::strikethrough" | "edited_message::spoiler" | "edit:entities:spoiler" | "edit::spoiler" | "edited_message::pre" | "edit:entities:pre" | "edit::pre" | "edited_message::text_link" | "edit:entities:text_link" | "edit::text_link" | "edited_message::text_mention" | "edit:entities:text_mention" | "edit::text_mention" | "edit:caption_entities:bold" | "edit:caption_entities:code" | "edit:caption_entities:mention" | "edit:caption_entities:hashtag" | "edit:caption_entities:cashtag" | "edit:caption_entities:bot_command" | "edit:caption_entities:url" | "edit:caption_entities:email" | "edit:caption_entities:phone_number" | "edit:caption_entities:italic" | "edit:caption_entities:underline" | "edit:caption_entities:strikethrough" | "edit:caption_entities:spoiler" | "edit:caption_entities:pre" | "edit:caption_entities:text_link" | "edit:caption_entities:text_mention" | "channel_post::bold" | "channel_post::code" | "channel_post::mention" | "channel_post::hashtag" | "channel_post::cashtag" | "channel_post::bot_command" | "channel_post::url" | "channel_post::email" | "channel_post::phone_number" | "channel_post::italic" | "channel_post::underline" | "channel_post::strikethrough" | "channel_post::spoiler" | "channel_post::pre" | "channel_post::text_link" | "channel_post::text_mention" | "edited_channel_post::bold" | "edited_channel_post::code" | "edited_channel_post::mention" | "edited_channel_post::hashtag" | "edited_channel_post::cashtag" | "edited_channel_post::bot_command" | "edited_channel_post::url" | "edited_channel_post::email" | "edited_channel_post::phone_number" | "edited_channel_post::italic" | "edited_channel_post::underline" | "edited_channel_post::strikethrough" | "edited_channel_post::spoiler" | "edited_channel_post::pre" | "edited_channel_post::text_link" | "edited_channel_post::text_mention")[], parent?: string) => PropertyDecorator;
export declare const Filter: (payload?: unknown, parent?: string) => PropertyDecorator;
export declare const Hears: (payload?: unknown, parent?: string) => PropertyDecorator;
