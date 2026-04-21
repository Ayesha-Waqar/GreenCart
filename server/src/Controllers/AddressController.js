const Address = require('../Models/AddressModel');

// /api/address/add
const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.userId;

    if (!address || !userId) {
      return res.status(400).json({
        success: false,
        message: "Enter complete credentials",
      });
    }

    await Address.create({ ...address, userId });

    return res.status(200).json({
      success: true,
      message: "Address added",
    });

  } catch (err) {
    console.log("error adding address", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// /api/address/get
const getAddress = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Enter complete credentials",
      });
    }

    const address = await Address.find({ userId });

    if (!address || address.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No addresses found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Addresses fetched",
      address,
    });

  } catch (err) {
    console.log("error getting address", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { addAddress, getAddress };