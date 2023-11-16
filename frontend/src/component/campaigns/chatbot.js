import React, { useEffect } from 'react';

const ChatComponent = () => {
    useEffect(() => {
        (function (d, m) {
            if(m // ?? null and undefined check
            && Object.keys(m).length === 0){
            var kommunicateSettings = {
                "appId": "39dcd1b2b8d18a26f8f6f3dea18dd3c16",
                "popupWidget": true,
                "automaticChatOpenOnNavigation": true
            };
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            window.kommunicate = m;
            m._globals = kommunicateSettings;
        }
        })(document, window.kommunicate || {});
    }, []);

    return (
        <div>
            {/* Your component content */}
        </div>
    );
};

export default ChatComponent;
