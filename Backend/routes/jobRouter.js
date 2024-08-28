import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJob,
  getSingleJob,
  updateJob,
  getCategories,
} from "../controllers/jobController.js";
import { isAuthorized } from "../middleware/auth.js";
import { postJob } from "../controllers/jobController.js";
const router = express.Router();

router.get("/getall", getAllJobs);

router.post("/post", isAuthorized, postJob);

router.get("/getmyjob", isAuthorized, getMyJob);

router.put("/update/:id", isAuthorized, updateJob);

router.delete("/delete/:id", isAuthorized, deleteJob);

router.get("/:id", isAuthorized, getSingleJob);

router.get("/getcategory", isAuthorized, getCategories);

// router.route("/getallByCategory").get(getJobsByCategory);
// router.get("/getallByCategory", isAuthorized, getJobsByCategory);

router.post("/getcategory", isAuthorized, getCategories);

export default router;
