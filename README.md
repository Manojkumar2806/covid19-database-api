
# 🦠 COVID-19 Database API

## 📌 Overview

The **COVID-19 Database API** is a **RESTful API** built using **Node.js** and **Express.js**, with an SQLite database to manage COVID-19 statistics efficiently. It provides endpoints to **store, retrieve, update, and delete** data related to states and districts, including cases, recoveries, active cases, and deaths.

---

## 🚀 Features

- 📌 CRUD Operations on states and districts
- 🔍 Fetch state-wise and district-wise COVID-19 data
- 📊 Retrieve statistics such as total cases, cured, active, and deaths
- 🔗 Express.js for backend handling
- 🗄️ SQLite as the database
---

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite** - Lightweight database
- **Git & GitHub** - Version control

---

## 📊 Database Schema

**State Table**

| Columns    | Type    |
| ---------- | ------- |
| state_id   | INTEGER |
| state_name | TEXT    |
| population | INTEGER |

**District Table**

| Columns       | Type    |
| ------------- | ------- |
| district_id   | INTEGER |
| district_name | TEXT    |
| state_id      | INTEGER |
| cases         | INTEGER |
| cured         | INTEGER |
| active        | INTEGER |
| deaths        | INTEGER |

---

## 📌 API Endpoints

**1️⃣ Get All States**

Endpoint: `GET /states/`
```
[
  {"stateId": 1, "stateName": "Andhra Pradesh", "population": 49586799},
  {"stateId": 2, "stateName": "Telangana", "population": 35003674}
]
```

**2️⃣ Get Specific State Details**

Endpoint: `GET /states/:stateId/`
```
{
  "stateId": 1,
  "stateName": "Andhra Pradesh",
  "population": 49586799
}
```
**3️⃣ Add a New District**

Endpoint: `POST /districts/`

```
{
  "districtName": "Guntur",
  "stateId": 1,
  "cases": 50000,
  "cured": 48000,
  "active": 1500,
  "deaths": 500
}
```

**4️⃣ Get District Details**

Endpoint: `GET /districts/:districtId/`

```
{
  "districtId": 3,
  "districtName": "Vizag",
  "stateId": 1,
  "cases": 80000,
  "cured": 75000,
  "active": 3000,
  "deaths": 1000
}
```

**5️⃣ Update District Details**

Endpoint: `PUT /districts/:districtId/`

```
{
  "districtName": "Guntur Updated",
  "stateId": 1,
  "cases": 51000,
  "cured": 49000,
  "active": 1000,
  "deaths": 500
}
```

**6️⃣ Delete a District**
Endpoint: `DELETE /districts/:districtId/`

```

Response: { "message": "District Removed Successfully" }
```

**7️⃣ Get State Name from District ID**

Endpoint: `GET /districts/:districtId/details/`

```
{
  "stateName": "Maharashtra"
}
```

**8️⃣ Get State Statistics**


Endpoint: `GET /states/:stateId/stats/`
```
{
  "totalCases": 100000,
  "totalCured": 90000,
  "totalActive": 8000,
  "totalDeaths": 2000
}
```
---
## Thank You!

Thanks for visiting my repo! Feel free to suggest improvements or contribute.
