require("dotenv").config();
const connection = require("./config/database");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const leaveRoute = require("./routes/leaveRoutes");
const emailRoute = require("./routes/emailRoutes");
const levaeTypeRoute = require("./routes/leaveTypeRoutes");
const leaveAllocationRoute = require('./routes/leaveAllocationRoutes');
const jobRoute = require("./routes/job-route");
const userRoute = require("./routes/user-route");
const pageRoute = require("./routes/pageRoutes");
const pagegroupRoute = require("./routes/pagegroupRoutes");
const permissionRoute = require("./routes/permissionRoutes");
const roleRoute = require("./routes/roleRoutes");
const rolepermissionRoute = require("./routes/rolepermissionRoutes");
const authRoute = require("./routes/authRoutes");
const employeeRoute = require("./routes/employeeRoutes");
const userProfileRoutes = require("./routes/profileRoute");
const documentRRoute = require("./routes/documentRRoutes");
const documentSRoute = require("./routes/documentSRoute");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "my-upload/images")));

app.use("/leave", leaveRoute);
app.use("/job", jobRoute);
app.use("/user", userRoute);
app.use("/page", pageRoute);
app.use("/pagegroup", pagegroupRoute);
app.use("/permission", permissionRoute);
app.use("/rolepermission", rolepermissionRoute);
app.use("/role", roleRoute);
app.use("/auth", authRoute);
app.use("/employee", employeeRoute);
app.use("/api", userProfileRoutes);
app.use("/email",emailRoute);
app.use("/allocation",leaveAllocationRoute);
app.use("/leaveType",levaeTypeRoute);
app.use("/api", documentRRoute);
app.use("/api", documentSRoute);

app.listen(PORT, () => {
  console.log(`server has started at port ${PORT}`);
});
