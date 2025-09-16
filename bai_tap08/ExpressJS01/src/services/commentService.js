const Comment = require('../models/Comment')
const Product = require('../models/Product')

/* Them binh luan */
async function  addComment(userId, productId, content) {
    const product = await Product.findById(productId);
    if(!product){
        throw new Error('Product not found');
    }

    const comment = await Comment.create({
        user: new mongoose.Types.ObjectId(userId),
        product: new mongoose.Types.ObjectId(productId),
        content
    })
    console.log(comment);

    return comment.populate('user', 'name email');
}

/**
 * Lấy danh sách bình luận theo product
 */
async function getComments(productId, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const comments = await Comment.find({ product: productId, deleted: false })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'name email');

  const total = await Comment.countDocuments({ product: productId, deleted: false });

  return { total, comments };
}

/**
 * Sửa bình luận (chỉ cho chủ sở hữu)
 */
async function updateComment(userId, commentId, content) {
  const comment = await Comment.findOne({ _id: commentId, user: userId, deleted: false });
  if (!comment) throw new Error('Không tìm thấy bình luận hoặc bạn không có quyền');

  comment.content = content;
  await comment.save();
  return comment.populate('user', 'name email');
}

/**
 * Xóa bình luận (soft delete)
 */
async function deleteComment(userId, commentId) {
  const comment = await Comment.findOne({ _id: commentId, user: userId, deleted: false });
  if (!comment) throw new Error('Không tìm thấy bình luận hoặc bạn không có quyền');

  comment.deleted = true;
  await comment.save();
  return true;
}


module.exports = {
  addComment,
  getComments,
  updateComment,
  deleteComment,
}