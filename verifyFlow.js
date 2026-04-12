const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const User = require("./models/User");

const BASE_URL = process.env.VERIFY_BASE_URL || "http://localhost:5000";
const PASS = "Pass@1234";
const ADMIN_EMAIL = "admin@test.com";
const USER_EMAIL = "user@test.com";

const SPECIALIZATION = "cardiology";
const FEES = 500;

function getDatePlusDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

async function jsonRequest(method, path, { token, body } = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const msg = data?.msg ?? data?.message ?? `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

async function main() {
  // Register (ignore duplicate) and update admin role for a stable test.
  for (const [name, email] of [
    ["Admin", ADMIN_EMAIL],
    ["User", USER_EMAIL]
  ]) {
    try {
      await jsonRequest("POST", "/api/auth/register", {
        body: { name, email, password: PASS }
      });
    } catch (e) {
      // ignore 409 duplicate email
    }
  }

  await mongoose.connect(process.env.MONGO_URI);
  await User.updateOne({ email: ADMIN_EMAIL }, { $set: { role: "admin" } });
  await mongoose.disconnect();

  const adminLogin = await jsonRequest("POST", "/api/auth/login", {
    body: { email: ADMIN_EMAIL, password: PASS }
  });
  const adminToken = adminLogin.token;

  const userLogin1 = await jsonRequest("POST", "/api/auth/login", {
    body: { email: USER_EMAIL, password: PASS }
  });
  const userToken1 = userLogin1.token;

  // Apply doctor (pending approval).
  await jsonRequest("POST", "/api/doctors/apply", {
    token: userToken1,
    body: { specialization: SPECIALIZATION, fees: FEES }
  });

  // Admin approves the pending doctor.
  const pending = await jsonRequest(
    "GET",
    "/api/admin/doctors/pending",
    { token: adminToken }
  );
  const doctor = (pending || []).find(
    (d) =>
      d.specialization === SPECIALIZATION &&
      d.fees === FEES &&
      d.userId?.email === USER_EMAIL
  );
  if (!doctor) throw new Error("Doctor not found in pending list");

  const doctorId = doctor._id;
  await jsonRequest("PUT", `/api/admin/approve/${doctorId}`, {
    token: adminToken
  });

  // Login again to pick up updated role ("doctor").
  const userLogin2 = await jsonRequest("POST", "/api/auth/login", {
    body: { email: USER_EMAIL, password: PASS }
  });
  const userToken2 = userLogin2.token;

  // Book: create one appointment, then attempt a double-book for the same slot.
  const date = getDatePlusDays(10);
  const time1 = "09:30";
  const time2 = "10:00";

  const book1 = await jsonRequest("POST", "/api/appointments/book", {
    token: userToken2,
    body: { doctorId, date, timeSlot: time1 }
  });

  let doubleBookedAllowed = true;
  try {
    await jsonRequest("POST", "/api/appointments/book", {
      token: userToken2,
      body: { doctorId, date, timeSlot: time1 }
    });
  } catch (e) {
    doubleBookedAllowed = false;
  }

  const book3 = await jsonRequest("POST", "/api/appointments/book", {
    token: userToken2,
    body: { doctorId, date, timeSlot: time2 }
  });

  console.log("VERIFICATION_SUMMARY");
  console.log(`adminRole=${adminLogin.user?.role}`);
  console.log(`userRoleAfterApproval=${userLogin2.user?.role}`);
  console.log(`book1Msg=${book1.message}`);
  console.log(`doubleBookedAllowed=${doubleBookedAllowed}`);
  console.log(`book3Msg=${book3.message}`);
  console.log(`date=${date}`);
}

main().catch((err) => {
  console.error("Verification failed:", err.status ? `${err.status} ${err.message}` : err.message);
  if (err.data) console.error(err.data);
  process.exit(1);
});

