const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const multer = require("multer");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Configure Multer to use Firebase Storage
const multerStorage = multer.memoryStorage();

const multerMiddleware = multer({
  storage: multerStorage,
});

router.post("", multerMiddleware.single("categoryImage"), async (req, res) => {
  if (!req.file) {
    categoryController.createCategory(req, res);
  } else {
    // Set the destination path within the bucket (you may customize this)
    const storageRef = ref(storage, `files/${req.body.name}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    req.body.icon = downloadURL;

    // Process the rest of your logic
    categoryController.createCategory(req, res);
  }

 
});

router.get("", categoryController.getAllCategories);
router.get("/:categoryId", categoryController.getCategoryById);
router.put(
  "/:categoryId",
  multerMiddleware.single("categoryImage"),
  categoryController.updateCategory
);
router.delete("/:categoryId", categoryController.deleteCategory);
module.exports = router;
