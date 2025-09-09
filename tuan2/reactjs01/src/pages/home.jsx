import React, { useState, useEffect } from 'react';
import { Input, List, Card, Pagination, Spin, Select, message, Typography } from 'antd';
import axios from '../util/axios.customize';
const { Title } = Typography;
const { Option } = Select;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Lấy danh mục từ API
  const fetchCategories = async () => {
    try {
      const res = await axios.get('/v1/api/categories');
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch sản phẩm với query và filter
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        query,
        category: selectedCategory,
        minPrice,
        maxPrice,
        page,
        limit: 8, // Số sản phẩm/trang
      };
      const response = await axios.get('/v1/api/products/search', { params });
      setProducts(response.products);
      setCurrentPage(page);
      setTotalPages(Math.ceil(response.data.total / params.limit));
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Không thể tải sản phẩm. Vui lòng thử lại.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(1);
  }, []);

  const handleSearch = () => {
    fetchProducts(1);
  };

  const handlePageChange = (page) => {
    fetchProducts(page);
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Tìm kiếm sản phẩm</Title>

      {/* Thanh tìm kiếm + filter */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <Input
          placeholder="Nhập tên sản phẩm..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Chọn danh mục"
          value={selectedCategory}
          onChange={value => setSelectedCategory(value)}
          allowClear
          style={{ width: 180 }}
        >
          {categories.map(cat => (
            <Option key={cat._id} value={cat._id}>
              {cat.name}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Giá từ"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{ width: 100 }}
        />
        <Input
          placeholder="Giá đến"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={{ width: 100 }}
        />
        <button onClick={handleSearch} style={{ padding: '0 15px' }}>Tìm kiếm</button>
      </div>

      {loading ? (
        <Spin tip="Đang tải..." />
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={products}
            renderItem={product => (
              <List.Item>
                <Card title={product.name}>
                  <p>{product.description}</p>
                  <p><strong>Giá:</strong> ${product.price}</p>
                  <p><strong>Danh mục:</strong> {product.category?.name || '-'}</p>
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
            total={totalPages * 8} // totalPages * limit
            pageSize={8}
            onChange={handlePageChange}
            style={{ marginTop: 20, textAlign: 'center' }}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
