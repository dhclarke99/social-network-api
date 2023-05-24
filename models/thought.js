const { Schema, model, Types } = require('mongoose');


const reactionSchema = new Schema({
    // reactionId: {
    //   type: Types.ObjectId,
    //   default: new Types.ObjectId()
    // },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (value) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return value.toLocaleDateString(undefined, options);
      }
    }
  });
  
  
 
// Schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    })


// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
