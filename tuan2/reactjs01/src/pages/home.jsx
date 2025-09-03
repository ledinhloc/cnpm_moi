import React, { useState, useEffect } from 'react';
import { CrownOutlined } from '@ant-design/icons';
import { Result, List, Card, Pagination, Spin, Typography, message } from 'antd';
import axios from '../util/axios.customize';

const { Title } = Typography;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Thay bằng categoryId thực tế từ DB (lấy từ seed hoặc API danh mục)
  const categoryId = '68b7ac99cbf0f65385eec4a9'; // Thay bằng ID thực tế

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/v1/api/products/${categoryId}`, {
        params: { page, limit: 5 } },);
      setProducts(response.products);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 401) {
        message.error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
      } else {
        message.error('Không thể tải sản phẩm. Vui lòng thử lại sau.');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  return (
    <div style={{ padding: 20 }}>
      <Result
        icon={<CrownOutlined />}
        title="JSON Web Token (React/Node.JS) - iostar.vn"
      />
      <Title level={2}>Danh sách sản phẩm</Title>
      {loading ? (
        <Spin tip="Đang tải..." />
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={products}
            renderItem={(product) => (
              <List.Item>
                <Card title={product.name}>
                  <p>{product.description}</p>
                  <p><strong>Giá:</strong> ${product.price}</p>
                  <p><strong>Danh mục:</strong> {product.category.name}</p>
                  <p><strong>Tồn kho:</strong> {product.stock}</p>
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ maxWidth: '100%' }}
                    />
                  )}
                </Card>
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            total={totalPages * 10} // Tổng số item = totalPages * limit
            pageSize={10}
            onChange={handlePageChange}
            style={{ marginTop: 20, textAlign: 'center' }}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;