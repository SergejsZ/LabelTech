import PageLayout from '@/app/admin/page';
import ProductGrid from '@/components/ProductGrid';

const products = [
  { name: 'Mini portobello', code: '1234', retailer: 'Tesco', expiryDate: '2024/01/19', imageUrl: '../../../../utils/images/miniPortobello.jpeg' },
  { name: 'Baby button', code: '6543', retailer: 'Dubbes', expiryDate: '2024/01/20', imageUrl: '../../../../utils/images/babyButton.jpeg' },
  { name: 'White button', code: '9876', retailer: 'Tesco', expiryDate: '2024/01/21', imageUrl: '../../../../utils/images/button.jpeg' },
  { name: 'Baby button', code: '6543', retailer: 'Dubbes', expiryDate: '2024/01/20', imageUrl: '../../../../utils/images/babyButton.jpeg' },

];

const page = () => {
  return (
    <PageLayout >
    <div className='ml-96 mt-10'>
      <h2 className='text-2xl font-bold mb-10'>products managment</h2>
      <ProductGrid products={products} />
    </div>
    </PageLayout >
  );
};

export default page;