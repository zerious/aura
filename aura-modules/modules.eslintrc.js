module.exports = {
    "extends" : [ "plugin:raptor/recommended" ],
    "plugins" : [ "raptor" ],
    "rules" : {
        "raptor/no-inline-disable" : [
                1,
                {
                    "whitelist" : {
                        "raptor/no-set-timeout" : [ "**/aura-modules/src/test/modules/moduletest/async/async.js" ],
                        "dot-notation" : [ "**/aura-modules/src/test/modules/moduletest/exports/exports.js" ],
                        "no-console" : [ "**/src/test/modules/**/*.js" ],
                        "no-unused-vars" : [ "**/src/test/modules/**/*.js" ]
                    }
                } ]
    }
};
