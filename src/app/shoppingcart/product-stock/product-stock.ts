export interface ProductStock {
    //export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  }
  
  export const products = [
    {
      id: 1,
      name: 'Oktaマグ',
      price: 2999,
      description: 'Oktaロゴ入りマグ',
      image: 'assets/img/okta_mug.png'
    },
    {
      id: 2,
      name: 'Oktaバッグ',
      price: 6999,
      description: 'Oktaロゴ入りバッグ',
      image: 'assets/img/okta_bag.jpg'
    },
    {
      id: 3,
      name: 'Oktaパーカー',
      price: 9999,
      description: 'Oktaのロゴ入りパーカー',
      image: 'assets/img/okta_hooddie.png'
    }
  ];
  