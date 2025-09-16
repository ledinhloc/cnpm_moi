import React, { useState, useEffect } from "react";
import {
  Input,
  Pagination,
  Spin,
  Select,
  message,
  Typography,
  Button,
  Row,
  Col,
  Space,
} from "antd";
import ProductCard from "../components/ProductCard";
import { fetchCategoriesApi, fetchProductsApi } from "../util/productApi";

const { Title } = Typography;
const { Option } = Select;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");

  // Lấy danh mục
  const fetchCategories = async () => {
    try {
      const data = await fetchCategoriesApi();
      setCategories(data);
    } catch {
      message.error("Không thể tải danh mục");
    }
  };

  // Lấy sản phẩm
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        query,
        category: selectedCategory,
        minPrice,
        maxPrice,
        sortBy,
        page,
        limit: 8,
      };
      const response = await fetchProductsApi(params);
      setProducts(response.products);
      setCurrentPage(page);
      setTotalPages(Math.ceil(response.total / params.limit));
    } catch {
      message.error("Không thể tải sản phẩm. Vui lòng thử lại.");
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

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Tìm kiếm sản phẩm</Title>

      {/* Bộ lọc */}
      <Space wrap style={{ marginBottom: 24 }}>
        <Input
          placeholder="Nhập tên sản phẩm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Chọn danh mục"
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          allowClear
          style={{ width: 180 }}
        >
          {categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>
              {cat.name}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Giá từ"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ width: 120 }}
        />
        <Input
          placeholder="Giá đến"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ width: 120 }}
        />
        <Select
          placeholder="Sắp xếp"
          value={sortBy}
          onChange={(value) => setSortBy(value)}
          allowClear
          style={{ width: 160 }}
        >
          <Option value="price_asc">Giá tăng dần</Option>
          <Option value="price_desc">Giá giảm dần</Option>
          <Option value="latest">Mới nhất</Option>
        </Select>
        <Button type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </Space>

      {/* Danh sách sản phẩm */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <Spin tip="Đang tải..." />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {/* Phân trang */}
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Pagination
              current={currentPage}
              total={totalPages * 8}
              pageSize={8}
              onChange={(page) => fetchProducts(page)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
