import Appointment from "../models/Appointment.js";

// ✅ Create new appointment
export const createAppointment = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      type,
      room,
      checkIn,
      checkOut,
      message,
    } = req.body;

    const appointment = new Appointment({
      firstName,
      lastName,
      email,
      phone,
      type,
      room,
      checkIn,
      checkOut,
      message,
    });

    const saved = await appointment.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// ✅ Get all appointments with optional search by name or email
export const getAppointments = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
    }
    const appointments = await Appointment.find(query);
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

// ✅ Get single appointment by ID
export const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Not found" });
    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

// ✅ Update appointment by ID
export const updateAppointment = async (req, res, next) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// ✅ Delete appointment by ID
export const deleteAppointment = async (req, res, next) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    next(err);
  }
};
