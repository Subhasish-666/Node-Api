//montion all mongodb module and database path
const { ObjectId } = require("mongodb");
const { getDB } = require("../db");


// GET /events?id=:event_id
// GET /events?type=latest&limit=5&page=1
exports.getEvents = async (req, res) => {
  try {
    const db = getDB();
    if (!db) {
      return res.status(500).json({ message: "DB not ready" });
    }

    const { id, type } = req.query;

    /* ===============================
       CASE 1: GET NUDGE BY ID
       =============================== */
    if (id) {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid Nudge_id",
        });
      }

      const event = await db.collection("events").findOne({
        _id: new ObjectId(id),
      });

      if (!event) {
        return res.status(404).json({
          message: "Nudge not found",
        });
      }

      return res.json(event);
    }

    /* ===============================
       CASE 2: GET LATEST EVENTS
       =============================== */
    if (type === "latest") {
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(parseInt(req.query.limit, 10) || 5, 50);
      const skip = (page - 1) * limit;

      const events = await db
        .collection("events")
        .find({})
        .sort({ _id: -1 }) // latest inserted
        .skip(skip)
        .limit(limit)
        .toArray();

      return res.status(200).json({
        type: "latest",
        page,
        limit,
        count: events.length,
        data: events,
      });
    }

    /* ===============================
       INVALID QUERY
       =============================== */
    return res.status(400).json({
      message: "Invalid query",
    });

  } catch (error) {
    console.error("GET NUDGE ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch Nudge",
    });
  }
};





// // if header POST and required this /events with those payloads name, files[image], tagline, schedule, description, moderator, category, sub_category, rigor_rank
exports.createEvent = async (req, res) => {
  try {
    const {
      type,
      uid,
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
      attendees,
    } = req.body;
    // for image from system
     const image = req.file?.filename;
    // Basic validation (no schema enforcement as per requirement)
    if (!uid || !name || !schedule || !category || !image) {
     return res.status(400).json({
       message: "Required fields missing",
     });
   }
   
    // attendees parsing (form-data sends string)
    let parsedAttendees = [];
    if (typeof attendees === "string") {
      parsedAttendees = attendees
        .replace(/[\[\]\s]/g, "")
        .split(",")
        .filter(Boolean)
        .map(Number);
    }
    
    const db = getDB();

// All events data
    const eventData = {
      type,
      uid: Number(uid),
      name,
      tagline,
      schedule: Number(schedule), // timestamp
      description,
      files: {
        image, // saved filename
      },
      moderator,
      category,
      sub_category,
      rigor_rank: Number(rigor_rank),
      attendees: parsedAttendees,
      created_at: new Date(),
      updated_at: new Date(),
    };

// 
    const result = await db.collection("events").insertOne(eventData);
    
      res.status(201).json({
      message: "Nudge created successfully",
      event_id: result.insertedId,
    });
  } catch (error) {
    console.error("CREATE NUDGE ERROR:", error);
    res.status(500).json({
      message: "Failed to create Nudge",
    });
  }
};




//if header PUT and required this /events/:id with those payloads name, files[image], tagline, schedule, description, moderator, category, sub_category, rigor_rank
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // validate id FIRST
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Nudge id",
      });
    }

    const {
      type,
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
      attendees,
    } = req.body || {};

    // Optional new image
    const image = req.file?.filename;

    // parse attendees safely
    let parsedAttendees;
    if (Array.isArray(attendees)) {
      parsedAttendees = attendees.map(Number);
    } else if (typeof attendees === "string") {
      parsedAttendees = attendees
        .replace(/[\[\]\s]/g, "")
        .split(",")
        .filter(Boolean)
        .map(Number);
    }

    // Build update object dynamically
    const updateData = {
  ...(type && String(type).trim() && { type: String(type).trim() }),
  ...(name && String(name).trim() && { name: String(name).trim() }),
  ...(tagline && String(tagline).trim() && { tagline: String(tagline).trim() }),
  ...(schedule && !isNaN(Number(schedule)) && {
    schedule: Number(schedule),
  }),
  ...(description && String(description).trim() && {
    description: String(description).trim(),
  }),
  ...(moderator && String(moderator).trim() && {
    moderator: String(moderator).trim(),
  }),
  ...(category && String(category).trim() && {
    category: String(category).trim(),
  }),
  ...(sub_category && String(sub_category).trim() && {
    sub_category: String(sub_category).trim(),
  }),
  ...(rigor_rank !== undefined && rigor_rank !== "" && {
    rigor_rank: Number(rigor_rank),
  }),
  ...(parsedAttendees && parsedAttendees.length > 0 && {
    attendees: parsedAttendees,
  }),
  updated_at: new Date(),
    };
    
    // Optional for image
    if (image) {
      updateData["files.image"] = image;
    }

    // check valid fields
    if (Object.keys(updateData).length === 1) {
      return res.status(400).json({
        message: "No valid fields provided for update",
      });
    }

    const db = getDB();

    const result = await db.collection("events").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
// check all events that found or not or create or not
    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Nudge not found",
      });
    }

    return res.json({
      message: "Event updated successfully",
    });
  } catch (error) {
    console.error("UPDATE NUDGE ERROR:", error);
    return res.status(500).json({
      message: "Failed to update Nudge",
    });
  }
};






//if header DELETTE and required this /events/:id

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const db = getDB();
// provide for check uid
    const result = await db.collection("events").deleteOne({
      _id: new ObjectId(id),
    });
// if not found it then return this
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Nudge not found",
      });
    }
//If found then return this
    res.json({
      message: "Nudge deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid nudge id",
    });
  }
};
