"use client"

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import apiService from '@/utils/apiService';


const ChatWidget = () => {
  const user = useAppSelector((state) => state.value);
  const crypto = require("crypto");
  const [userProfile, setUser] = useState();

  const key = "nj4Rk7eeLMDVGMuRWokrcLxE";
  // const message = "some-unique-identifier";

  // Generate the HMAC

  const getUser = () => {
    apiService.get(`user/profile/${user.id}`)
      .then(function (response) {
        setUser(response.data.user)
      })
  }
  useEffect(() => {
    if (user && userProfile && userProfile.premiumPlan === "enterprise") {
      // console.log(user)
      const identifierHash = crypto
        .createHmac("sha256", key)
        .update(user?.id)
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

    getUser()
  }, [user, userProfile])


  return null;
}

export default ChatWidget;