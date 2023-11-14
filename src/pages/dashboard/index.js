const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper@example.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
];

import endPoints from '@services/api';
import useFetch from '@hooks/useFetch';
import { Chart } from '../../common/Chart';

const PRODUCT_LIMIT = 60;
const PRODUCT_OFFSET = 60;

export default function Dashboard() {
  const products = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, PRODUCT_OFFSET));

  const categoryNames = products?.map((product) => product.category);
  const categoryCount = categoryNames?.map((category) => category.name);

  console.log(categoryNames);
  console.log(categoryCount);

  const countOccurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categoryCount),
        bordeWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50af95', 'f3ba2f', '#2a71d0'],
      },
    ],
  };

  return (
    <>
      <Chart className="mb-8 mt-2" chartData={data} />
    </>
  );
}
