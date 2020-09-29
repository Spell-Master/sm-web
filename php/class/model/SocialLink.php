<?php

/**
 * @copyright Spell Master 2020
 */
class SocialLink {

    public function eMail($subject) {
        if (preg_match('/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{3})$/', $subject)) {
            return (true);
        }
    }

    public function webSite($subject) {
        if (preg_match('/^http(?:s)?:\/\/(www\.)?([a-zA-Z0-9 -_.\/:=&"?%+@#$!])+$/', $subject)) {
            return (true);
        }
    }

    public function youTube($subject) {
        if (preg_match('/^https\:\/\/www\.youtube\.com\/(?:channel|(?:c))\/[a-zA-Z0-9\-]+?(\/)?$/i', $subject)) {
            return (true);
        }
    }

    public function faceBook($subject) {
        if (preg_match('/^https\:\/\/www\.facebook\.com\/(?:([a-z0-9\-\_]+)|(?:profile\.php\?id\=([0-9]{15})))$/i', $subject)) {
            return (true);
        }
    }

    public function instagram($subject) {
        if (preg_match('/^(https?\:\/\/(?:www\.)?instagram\.com\/)([a-z0-9\-\_]+)?(\/)?$/i', $subject)) {
            return (true);
        }
    }

    public function twitter($subject) {
        if (preg_match('/^(https?\:\/\/(?:www\.)?twitter\.com\/)([a-z0-9\-\_]+)?(\/)?$/i', $subject)) {
            return (true);
        }
    }

    public function gitHub($subject) {
        if (preg_match('/^(https?\:\/\/(?:www\.)?github\.com\/)([a-z0-9\-\_]+)?(\/)?$/i', $subject)) {
            return (true);
        }
    }

    public function whatsApp($subject) {
        if (preg_match('/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/', $subject)) {
            return (true);
        }
    }

}
