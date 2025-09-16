import axios from '../util/axios.customize';

// Search + category
export const searchProductsApi = (params) => axios.get('/v1/api/products/search', { params });
export const getCategoriesApi = () => axios.get('/v1/api/categories');

// Product detail
export const getProductByIdApi = (id) => axios.get(`/v1/api/products/${id}`);

// Favourite
export const toggleFavoriteApi = (id) => axios.post(`/v1/api/products/${id}/favorite`);
export const getFavoritesApi = () => axios.get('/v1/api/users/me/favorites');

// Viewed
export const addViewApi = (id, sessionId = "guest123") => axios.post(`/v1/api/products/${id}/view`, { sessionId });
export const getViewedApi = () => axios.get('/v1/api/users/me/viewed');

// Similar
export const getSimilarApi = (id) => axios.get(`/v1/api/products/${id}/similar`);

// Stats
export const getStatsApi = (id) => axios.get(`/v1/api/products/${id}/stats`);

// Comment
export const addCommentApi = (productId, content) => axios.post(`/v1/api/products/${productId}/comments`, { content });
export const getCommentsApi = (productId) => axios.get(`/v1/api/products/${productId}/comments`);

  // Lấy danh mục
export const fetchCategoriesApi = async () => {
    try {
      const res = await axios.get('/v1/api/categories');
      return res.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
};

// Tìm kiếm sản phẩm
export const fetchProductsApi = async (params) => {
  try {
    const res = await axios.get("/v1/api/products/search", { params });
    return res;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};