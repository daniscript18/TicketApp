const Mongoose = require("mongoose");

const Schema = Mongoose.Schema
(
    {
        SERVER: String,
        TICKETS:
        {
            COUNT: Number,
            PREFIX:
            {
                OPEN: String,
                CLOSE: String
            },
            PERMISSIONS:
            {
                ROLES: Array,
                ADMINS: Array,
                CHANNELS:
                {
                    USERS: 
                    {
                        ALLOW: [String],
                        DENY: [String]
                    },
                    ROLES:
                    {
                        ALLOW: [String],
                        DENY: [String]
                    },
                    ADMINS:
                    {
                        ALLOW: [String],
                        DENY: [String]
                    }
                },
                COMMANDS:
                {
                    HELP: Array,
                    OPEN: Array,
                    CLOSE: Array,
                    DELETE: Array,
                    CONFIG: Array
                }
            }
        }
    }
);

module.exports = Mongoose.model("Servers", Schema);