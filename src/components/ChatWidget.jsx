import React, { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';


const ChatWidget = () => {
  const user = useAppSelector((state) => state.value);
  const crypto = require("crypto");

  const key = "nj4Rk7eeLMDVGMuRWokrcLxE";
  // const message = "some-unique-identifier";

  // Generate the HMAC


  useEffect(() => {
    if (user) {
      // console.log(user)
      const identifierHash = crypto
        .createHmac("sha256", key)
        .update(user.id)
        .digest("hex");

      window.chatwootSettings = {
        hideMessageBubble: false,
        position: 'right', // This can be left or right
        locale: 'en', // Language to be set
        type: 'standard', // [standard, expanded_bubble]
      };

      (function (d, t) {
        var BASE_URL = "https://app1.chatcloud.ai";
        var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
        g.src = 'https://chatcloud.b-cdn.net' + "/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g, s);
        g.onload = function () {
          window.chatcloudSDK.run({
            websiteToken: 'kRoSLfZRdV4gank5Pn7ZQwrK',
            baseUrl: BASE_URL,
            // identifier_hash: identifierHash,
          })
          window.$chatcloud.setUser(user.id, {
            name: user.fullName,
            email: user.email,
            identifier_hash: identifierHash,
          });
        }
      })(document, "script");
    }
  }, [user])


  return null;
}

export default ChatWidget;