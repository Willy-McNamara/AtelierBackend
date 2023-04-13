import axios from 'axios';

jest.setTimeout(60000);

test('Get Products/product_id returns specified product', () => {
  return axios.get('http://localhost:3099/products/5')
    .then((res) => {
      console.log(res.data);
      return res.data
    })
    .then(product => {
      expect(product.id).toBe(5)
    })
})

test('Get products styles returns a non empty array of styles that are associated with the provided product ID', () => {
  return axios.get('http://localhost:3099/products/5/styles')
    .then(res => {
      expect(res.data.product_id).toBe(5)
      expect(res.data.results.length).toBeGreaterThan(0)
    })
})

test('Get related products returns a non-empty array of nums', () => {
  return axios.get('http://localhost:3099/products/2/related')
    .then(res => {
      // need a test which illustrates that the res is the desired format
      expect(typeof res.data[0]).toBe('number')
      expect(res.data.length).toBeGreaterThan(0)
    })
})