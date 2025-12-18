const mongoose = require("mongoose");
require("dotenv").config();

const Admin = require("./models/Admin");

async function checkAdmins() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected\n");

    const admins = await Admin.find();
    console.log(`📋 Total Admins in Database: ${admins.length}\n`);
    
    if (admins.length === 0) {
      console.log("❌ No admin accounts found!");
      console.log("💡 Create an admin account by:");
      console.log("   1. Going to http://localhost:5174/admin-signup");
      console.log("   2. Or use the admin registration endpoint\n");
    } else {
      console.log("Admin Accounts:");
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. Username: ${admin.username}`);
        console.log(`   ID: ${admin._id}`);
        console.log(`   Created: ${admin._id.getTimestamp()}\n`);
      });
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

checkAdmins();
