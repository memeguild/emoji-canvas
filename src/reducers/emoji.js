import * as EmojiActions from '../actions/emoji';
import {STOCK_EMOJI_POSITIONS} from '../data/stockEmoji';

const DEFAULT_EMOJI = {
    stock: STOCK_EMOJI_POSITIONS,
    custom: {
        fetched: false,
        fetching: false,
        emoji: {},
    },
}

function handleCustomEmojiSuccess(emoji, payload){
    const customEmoji = Object.keys(payload.emoji).sort().reduce((acc, key) => {
        const value = payload.emoji[key];

        if (/^alias:/.test(value)){
            const aliasFor = value.replace(/^alias:/g, '');
            if (!acc[aliasFor]) acc[aliasFor] = {aliases: []};
            acc[aliasFor].aliases.push(key);
        } else {
            acc[key] = Object.assign({
                aliases: [],
            }, acc[key], {
                url: value
            });
        }

        return acc;
    }, {});

    const updatedEmoji = Object.assign({}, emoji);
    updatedEmoji.custom = Object.assign({}, updatedEmoji.custom, {
        fetching: false,
        fetched: true,
        emoji: customEmoji,
    });

    return updatedEmoji;
}

export default function emojiReducer(emoji = DEFAULT_EMOJI, action){
    switch(action.type){
        case EmojiActions.CUSTOM_EMOJI_REQUEST:
            // TODO(ndrwhr): Add fetching state.
            return emoji;
        case EmojiActions.CUSTOM_EMOJI_SUCCESS:
            return handleCustomEmojiSuccess(emoji, action.payload);
        case EmojiActions.CUSTOM_EMOJI_FAILURE:
            console.log('failure');
            return emoji;
        default:
            return emoji;
    }
}