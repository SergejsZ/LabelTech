import PageLayout from '@/app/admin/page';
import Product from '@/components/Product';

const products = [
  { name: 'Baby button', code: '1234', retailer: 'Tesco', expiryDate: '2024/01/19', imageUrl: '../../../../utils/images/miniPortobello.jpeg' },
];

const page = () => {
  return (
    <PageLayout >
    <div>
      <p>production managment</p>
      <Product 
        name={products[0].name}
        code={products[0].code}
        retailer={products[0].retailer}
        expiryDate={products[0].expiryDate}
        imageUrl={products[0].imageUrl}
      />
    </div>
    </PageLayout >
  );
};

export default page;