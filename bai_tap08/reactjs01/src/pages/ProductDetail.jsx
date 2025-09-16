// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductByIdApi,
  toggleFavoriteApi,
  addViewApi,
  getSimilarApi,
  getStatsApi,
  getCommentsApi,
  addCommentApi,
} from "../util/productApi";
import {
  Card,
  Button,
  List,
  Input,
  Typography,
  message,
  Row,
  Col,
  Statistic,
  Space,
  Avatar,
} from "antd";

const { Title, Paragraph, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [stats, setStats] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Lấy dữ liệu sản phẩm
  const fetchData = async () => {
    try {
      const res = await getProductByIdApi(id);
      setProduct(res);

      await addViewApi(id);

      const sim = await getSimilarApi(id);
      setSimilar(sim.products || []);

      const s = await getStatsApi(id);
      setStats(s);

      const c = await getCommentsApi(id);
      setComments(c.comments || []);
    } catch (error) {
      console.error(error);
      message.error("Không thể tải dữ liệu sản phẩm");
    }
  };

  const handleToggleFavorite = async () => {
    try {
      await toggleFavoriteApi(id);
      message.success("Đã cập nhật sản phẩm yêu thích!");
    } catch (error) {
      message.error("Lỗi khi thêm sản phẩm yêu thích");
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await addCommentApi(id, newComment);
      setComments([res.comment, ...comments]);
      setNewComment("");
    } catch (error) {
      message.error("Lỗi khi thêm bình luận");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: 24 }}>
      {/* Thông tin sản phẩm */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col xs={24} md={10}>
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: "100%", borderRadius: 8 }}
              />
            ) : (
              <div
                style={{
                  height: 300,
                  background: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                }}
              >
                No Image
              </div>
            )}
          </Col>
          <Col xs={24} md={14}>
            <Title level={3}>{product.name}</Title>
            <Paragraph>{product.description}</Paragraph>
            <Space direction="vertical" size="small">
              <Text strong>Giá: </Text>
              <Title level={4} type="danger">
                ${product.price}
              </Title>
              <Text strong>Tồn kho: </Text>
              <Text>{product.stock}</Text>
            </Space>

            <Space style={{ marginTop: 16 }}>
              <Button type="primary" onClick={handleToggleFavorite}>
                ❤️ Yêu thích
              </Button>
              <Statistic
                title="Khách mua"
                value={stats.buyersCount || 0}
                prefix="👥"
              />
              <Statistic
                title="Bình luận"
                value={stats.commentsCount || 0}
                prefix="💬"
              />
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Sản phẩm tương tự */}
      <Title level={4}>Sản phẩm tương tự</Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={similar}
        renderItem={(p) => (
          <List.Item>
            <Card hoverable title={p.name}>
              <Text strong type="danger">
                ${p.price}
              </Text>
            </Card>
          </List.Item>
        )}
        style={{ marginBottom: 32 }}
      />

      {/* Bình luận */}
      <Title level={4} className="mt-6">
        Bình luận
      </Title>
      <div className="flex gap-2 mb-4">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết bình luận..."
        />
        <Button type="primary" onClick={handleAddComment}>
          Gửi
        </Button>
      </div>

      <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={(c) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{c.user?.name?.[0] || "U"}</Avatar>}
              title={<Text strong>{c.user?.name || "Ẩn danh"}</Text>}
              description={c.content}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductDetail;
