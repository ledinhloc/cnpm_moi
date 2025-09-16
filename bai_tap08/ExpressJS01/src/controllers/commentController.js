const commentService = require('../services/commentService')

/* add comment */
async function addComment(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Nội dung không được rỗng' });

    const comment = await commentService.addComment(
      userId,
      req.params.productId,
      content
    );

    return res.status(201).json({ success: true, comment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getComments(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const data = await commentService.getComments(req.params.productId, page, limit);
    return res.json({ success: true, ...data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function updateComment(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Nội dung không được rỗng' });

    const comment = await commentService.updateComment(userId, req.params.id, content);
    return res.json({ success: true, comment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteComment(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    await commentService.deleteComment(userId, req.params.id);
    return res.json({ success: true, message: 'Đã xóa bình luận' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  addComment,
  getComments,
  updateComment,
  deleteComment
};
