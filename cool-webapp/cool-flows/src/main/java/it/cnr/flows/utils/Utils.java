package it.cnr.flows.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by francesco on 19/02/15.
 */
public class Utils {

    private static final Logger LOGGER = LoggerFactory.getLogger(Utils.class);

    public static boolean isPublicUrl (String url) {

        String [] publicUrls = {
                "/rest/security",
                "/rest/proxy",
                "/rest/bulkInfo",
                "/rest/i18n"
        };

        LOGGER.info(url);

        boolean allowed = false;

        if (url.indexOf("/rest") == 0) {

          for (String publicUrl : publicUrls) {
              if (url.indexOf(publicUrl) == 0) {
                  allowed = true;
              }
          }

        } else {
          allowed = true;
        }

        return allowed;

    }


    public static String cacheHeaderPublic(int hours) {
        return cacheHeader(hours, "public");
    }

    public static String cacheHeader(int hours, String type) {
        int seconds = hours * 60 * 60;
        String cacheValue = String.format("max-age=%d, %s", seconds, type);
        return cacheValue;
    }

    public static Map<String, Serializable> getAsMap(String key, Serializable value){
        Map<String, Serializable> r = new HashMap<>();
        r.put(key, value);
        return r;
    }


}
