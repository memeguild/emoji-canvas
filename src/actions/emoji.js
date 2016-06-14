
export const CUSTOM_EMOJI_REQUEST = 'CUSTOM_EMOJI_REQUEST';
function customEmojiRequest(){
    return {
        type: CUSTOM_EMOJI_REQUEST,
    };
}

export const CUSTOM_EMOJI_SUCCESS = 'CUSTOM_EMOJI_SUCCESS';
function customEmojiSuccess(payload){
    return {
        type: CUSTOM_EMOJI_SUCCESS,
        payload,
    };
}

export const CUSTOM_EMOJI_FAILURE = 'CUSTOM_EMOJI_FAILURE';
function customEmojiFailure(){
    return {
        type: CUSTOM_EMOJI_FAILURE,
    };
}

export function fetchCustomEmoji(){
    return (dispatch) => {
        dispatch(customEmojiRequest());
        // TODO(ndrwhr): Insert an access token into this request.
        return fetch('https://slack.com/api/emoji.list?token=')
            .then(response => response.json())
            .then(json => dispatch(customEmojiSuccess(json)))
            .catch(() => dispatch(customEmojiFailure()));
    };
}

