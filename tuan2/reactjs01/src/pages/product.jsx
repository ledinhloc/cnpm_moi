import { CrownOutlined } from '@ant-design/icons';
import { Result } from 'antd';

const ProductPage = () => {
  return (
    <div style={{ padding: 20 }}>
      <Result
        icon={<CrownOutlined />}
        title="Product"
      />
    </div>
  )
}

export default ProductPage;
