module.exports = function(app) {
 
const Event = require('./models/Event');
const Rsvp = require('./models/Rsvp');

/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

 const _eventListProjection = 'title startDatetime endDatetime viewPublic';

  // GET list of public events starting in the future
  app.get('/api/events', (req, res) => {
    Event.find({viewPublic: true, startDatetime: { $gte: new Date() }}, _eventListProjection, (err, events) => {
      let eventsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (events) {
        events.forEach(event => {
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);
    });
  });
  
  // GET list of all events, public and private (admin only)
  app.get('/api/events/admin', (req, res) => {
    Event.find({}, _eventListProjection, (err, events) => {
      let eventsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (events) {
        events.forEach(event => {
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);
    });
  });
  
  // GET event by event ID
  app.get('/api/event/:id', (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }
      res.send(event);
    });
  });
  
  // GET RSVPs by event ID
  app.get('/api/event/:eventId/rsvps', (req, res) => {
    Rsvp.find({eventId: req.params.eventId}, (err, rsvps) => {
      let rsvpsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (rsvps) {
        rsvps.forEach(rsvp => {
          rsvpsArr.push(rsvp);
        });
      }
      res.send(rsvpsArr);
    });
  });


  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

};