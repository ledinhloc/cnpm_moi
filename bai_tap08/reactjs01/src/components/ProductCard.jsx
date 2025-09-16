import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      cover={
        product.imageUrl ? (
          <img
            alt={product.name}
            src={product.imageUrl}
            style={{ height: 200, objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5f5f5",
              color: "#999",
            }}
          >
            No Image
          </div>
        )
      }
      onClick={() => navigate(`/products/${product.id}`)}
      style={{ borderRadius: 12 }}
    >
      <Title level={5} ellipsis>
        {product.name}
      </Title>
      <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
      <div>
        <Text strong type="danger">
          ${product.price?.toLocaleString()}
        </Text>
        <br />
        <Text type="secondary">Danh mục: {product.category?.name || "-"}</Text>
        <br />
        <Text type="secondary">Tồn kho: {product.stock}</Text>
      </div>
    </Card>
  );
};

export default ProductCard;
