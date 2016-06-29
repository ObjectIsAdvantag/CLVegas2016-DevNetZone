/**
 * Activity.js
 *
 * @description :: Activities in the DevNet zone
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK:true,
  schema:true,

  attributes: {
    id: {
      type: 'string', // short url to access the activity
      primaryKey: true
    },

    title: {
      type: 'string',
      required: true
    },

    url: {
      type: 'url', // where to get details about the session
      required: true
    },

    description: {
      type: 'string', // summary of what's happening
      size: 2048,
      required: false
    },

    day: {
      type: 'string',
      enum: ['week-end', 'monday', 'tuesday', 'wednesday', 'thursday'],
      required: true
    },

   
    begin: {
      type: 'string',  // local time format
       required: true
    },

    
    end: {
      type: 'string', // local time format
       required: true
    },

    beginDate: {
      type: 'datetime',  // CET 
      required: true
    },

    endDate: {
      type: 'datetime', // CET 
      required: true
    },

    category: { 
      type: 'string',
      enum: ['workshop', 'session', 'panel', 'demo', 'lab', 'event'],
      defaultsTo: 'session',
      required: true
    },

    location: {
      type: 'string',
      enum: ['ClassRoom1', 'ClassRoom2', 'DemoPods', 'LearningLab', 'Theater', 'WorkBench1', 'WorkBench2', 'WorkBench3', 'WorkBench4', 'Other'],
      required: true
    },

    location_url: {
      type: 'url',
      defaultsTo: 'https://developer.cisco.com/site/DevNetZone/',
      required: true
    },

    speaker: { 
      type: 'string', // May contain several speakers name
      required: true
    },

    speaker_url: { 
      type: 'url', // Only to one speaker
      required: true
    },

    // Hide internal structure
    toJSON: function () {
      var obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }

  }
};

