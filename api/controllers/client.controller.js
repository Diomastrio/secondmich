import Client from "../models/client.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  try {
    // Extract client data from the request body
    const { name, email, phone, address, curp, birthdate } = req.body;

    // Validate data (optional, can be done on frontend too)
    if (!name || !email || !phone || !address || !curp || !birthdate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check for duplicate email or curp (using mongoose findOne)
    const existingClient = await Client.findOne({ $or: [{ email }, { curp }] });
    if (existingClient) {
      return res.status(409).json({ message: "Duplicate email or curp found" });
    }

    // Create a new client instance
    const newClient = new Client({
      name,
      email,
      phone,
      address,
      curp,
      birthdate,
    });

    // Save the new client to the database
    const savedClient = await newClient.save();

    // Send successful response with the created client data
    res.status(201).json(savedClient);
  } catch (error) {
    next(error);
  }
};

export const updateclient = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this client"));
  }
  try {
    const updateClient = await Client.findByIdAndUpdate(
      req.params.clientId,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          curp: req.body.curp,
          birthdate: req.body.birthdate,
        },
      },
      { new: true }
    );
    res.status(200).json(updateClient);
  } catch (error) {
    next(error);
  }
};

export const deleteclient = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this client"));
  }
  try {
    await Client.findByIdAndDelete(req.params.clientId);
    res.status(200).json("The client has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getclients = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const clients = await Client.find({
      ...(req.query.name && { name: req.query.name }),
      ...(req.query.email && { email: req.query.email }),
      ...(req.query.phone && { phone: req.query.phone }),
      ...(req.query.address && { address: req.query.address }),
      ...(req.query.curp && { curp: req.query.curp }),
      ...(req.query.birthdate && { birthdate: req.query.birthdate }),
      ...(req.query.searchTerm && {
        $or: [
          { name: { $regex: req.query.searchTerm, $options: "i" } },
          { email: { $regex: req.query.searchTerm, $options: "i" } },
          { phone: { $regex: req.query.searchTerm, $options: "i" } },
          { address: { $regex: req.query.searchTerm, $options: "i" } },
          { curp: { $regex: req.query.searchTerm, $options: "i" } },
          { birthdate: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalClients = await Client.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthClients = await Client.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      clients,
      totalClients,
      lastMonthClients,
    });
  } catch (error) {
    next(error);
  }
};
