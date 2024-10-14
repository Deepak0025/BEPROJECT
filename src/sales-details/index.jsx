import Sidebar from '@/components/ui/custom/Sidebar';
import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Ensure this is imported

function BillingInterface() {
  const [products, setProducts] = useState([
    { name: '', price: 0, quantity: 1, total: 0 },
  ]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;

    if (field === 'price' || field === 'quantity') {
      const price = parseFloat(updatedProducts[index].price) || 0;
      const quantity = parseInt(updatedProducts[index].quantity) || 1;
      updatedProducts[index].total = price * quantity;
    }

    setProducts(updatedProducts);
    updateGrandTotal(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { name: '', price: 0, quantity: 1, total: 0 }]);
  };

  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    updateGrandTotal(updatedProducts);
  };

  const updateGrandTotal = (updatedProducts) => {
    const totalAmount = updatedProducts.reduce(
      (acc, product) => acc + product.total,
      0
    );
    setGrandTotal(totalAmount);
  };

  const isFormValid = () => {
    return products.every(product => product.name && product.price > 0 && product.quantity > 0);
  };

  // Add handleCheckout here
  const handleCheckout = () => {
    if (!isFormValid()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Prepare data for Excel
    const data = products.map(({ name, price, quantity, total }) => ({
      'Product Name': name,
      'Price (₹)': price,
      Quantity: quantity,
      'Total (₹)': total,
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Billing');

    // Generate buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a Blob from the buffer
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Trigger the download
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'billing.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Billing Interface</h2>

        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className=" bg-[#f56551] text-left text-white">
              <th className="p-4">Product Name</th>
              <th className="p-4">Price (₹)</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Total (₹)</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      handleProductChange(index, 'name', e.target.value)
                    }
                    placeholder="Enter product name"
                    className="p-2 border border-gray-300 rounded-md w-full bg-white"
                    required
                  />
                </td>
                <td className="p-4">
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      handleProductChange(index, 'price', e.target.value)
                    }
                    placeholder="Price"
                    className="p-2 border border-gray-300 rounded-md w-full bg-white"
                    min="0"
                    required
                  />
                </td>
                <td className="p-4">
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleProductChange(index, 'quantity', e.target.value)
                    }
                    placeholder="Quantity"
                    className="p-2 border border-gray-300 rounded-md w-full bg-white"
                    min="1"
                    required
                  />
                </td>
                <td className="p-4">
                  ₹ {product.total.toFixed(2)}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => removeProduct(index)}
                    className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <button
            onClick={addProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>

        <div className="mt-8 text-2xl font-bold">
          Grand Total: ₹ {grandTotal.toFixed(2)}
        </div>

        {errorMessage && (
          <div className="mt-4 text-red-600">
            {errorMessage}
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-6">
            <button
              className={`w-full bg-[#f56551] text-white py-3 rounded-lg hover:bg-[#f56551] ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isFormValid()}
              onClick={handleCheckout}  // Attach handleCheckout here
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BillingInterface;
