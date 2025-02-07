const Document = require("../models/documentModel");

exports.getDocuments = async (req, res) => {
  const documents = await Document.findAll();
  res.json(documents);
};

exports.createDocument = async (req, res) => {
  const { title, category, has_comments } = req.body;
  try {
    const newDocument = await Document.create({
      title,
      date_created: new Date(),
      date_updated: new Date(),
      category,
      has_comments,
    });
    res.status(201).json({
      timestamp: Date.now(),
      message: "Документ успешно создан",
      document: newDocument,
    });
  } catch (error) {
    res.status(500).json({
      timestamp: Date.now(),
      message: "Ошибка создания документа",
      errorCode: 2342,
    });
  }
};
