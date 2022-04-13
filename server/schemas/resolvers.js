const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const Consumable = require('../models/Consumable');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {new: true});
      }
    },
    addConsumable: async (parent, args, context) => {
      const consumable = await Consumable.create(args);
      return consumable;
    },
    updateConsumable: async (parent, args, context) => {
      if (context.consumable) {
        return await Consumable.findByIdAndUpdate(context.consumable._id, args, {new: true});
      }
    },
    addMood: async (parent, args, context) => {
      const mood = await Mood.create(args);
      return mood;
    }
  }
};

module.exports = resolvers;
