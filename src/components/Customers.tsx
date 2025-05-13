import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, message, Button, Modal, Input } from 'antd';
import { UploadOutlined, PlusOutlined, EditOutlined, DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import ExcelImport from './ExcelImport'; // Adjust the import path as necessary

const apiUrl = 'https://xeno-mini-crm-server.onrender.com/api/customers';

interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpend: number;
  visitCount: number;
  segments: string[];
  createdAt: string;
  updatedAt: string;
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, [pagination.page]);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          page: pagination.page,
          limit: pagination.limit
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setCustomers(response.data.data);
      console.log('Fetched customers:', response.data.data);
      console.log('Total customers:', response.data.total);
      setPagination(prev => ({
        ...prev,
        total: response.data.total
      }));
    } catch (err) {
      handleApiError(err, 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error: any, defaultMessage: string) => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with a status code outside 2xx
      setApiError(error.response.data.message || defaultMessage);
    } else if (error.request) {
      // Request was made but no response received
      setApiError('Network error - please check your connection');
    } else {
      // Something else happened
      setApiError(defaultMessage);
    }
    message.error(apiError || defaultMessage);
  };

  const handleCreateCustomer = async () => {
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 201) {
        message.success('Customer created successfully');
        setCreateModalVisible(false);
        setFormData({ name: '', email: '' });
        fetchCustomers();
      }
    } catch (err) {
      handleApiError(err, 'Failed to create customer');
    }
  };

  const handleUpdateCustomer = async () => {
    if (!currentCustomer) return;
    
    try {
        console.log('Updating customer:', currentCustomer.id, formData);
     console.log('Form data:', formData);
      const response = await axios.put(`${apiUrl}/${currentCustomer.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        message.success('Customer updated successfully');
        setEditModalVisible(false);
        fetchCustomers();
      }
    } catch (err) {
      handleApiError(err, 'Failed to update customer');
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        message.success('Customer deleted successfully');
        fetchCustomers();
      }
    } catch (err) {
      handleApiError(err, 'Failed to delete customer');
    }
  };

  const handleBulkImport = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        const customersToImport = jsonData.map((item: any) => ({
          name: item.name || item.Name || item['Customer Name'],
          email: item.email || item.Email,
          totalSpend: item.totalSpend || item['Total Spend'] || 0,
          visitCount: item.visitCount || item['Visit Count'] || 0,
        }));

        const response = await axios.post(`${apiUrl}/bulk`, customersToImport, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 201) {
          message.success(`${customersToImport.length} customers imported successfully`);
          fetchCustomers();
        }
      } catch (err) {
        handleApiError(err, 'Failed to import customers');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const beforeUpload = (file: File) => {
    const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                   file.type === 'application/vnd.ms-excel';
    if (!isExcel) {
      message.error('You can only upload Excel files!');
    }
    return isExcel;
  };

  const handleEditClick = (customer: Customer) => {
    setCurrentCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email
    });
    setEditModalVisible(true);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(pagination.total / pagination.limit)) return;
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Customer Management</h2>
        <div className="flex space-x-4">
          {/* <Upload 
            beforeUpload={beforeUpload}
            customRequest={({ file }) => handleBulkImport(file as File)}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Import Excel</Button>
          </Upload> */}
          <ExcelImport />
  
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            Add Customer
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {apiError && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{apiError}</p>
        </div>
      )}

      {/* Customer Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spend</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    <span>Loading customers...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${customer.totalSpend.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.visitCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(customer)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <EditOutlined />
                    </button>
                    <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="text-red-600 hover:text-red-900"
                    >
                        <DeleteOutlined />
                      
                       
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Fixed for both desktop and mobile */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-b-lg">
        <div className="flex-1 flex items-center justify-between">
          <div className="sm:hidden">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page * pagination.limit >= pagination.total}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span>{' '}
                of <span className="font-medium">{pagination.total}</span> customers
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Previous</span>
                <LeftOutlined className="h-4 w-4" />
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
              </span>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page * pagination.limit >= pagination.total}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Next</span>
                <RightOutlined className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Customer Modal */}
      <Modal
        title="Create New Customer"
        visible={createModalVisible}
        onOk={handleCreateCustomer}
        onCancel={() => setCreateModalVisible(false)}
        okText="Create"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
      </Modal>

      {/* Edit Customer Modal */}
      <Modal
        title="Edit Customer"
        visible={editModalVisible}
        onOk={handleUpdateCustomer}
        onCancel={() => setEditModalVisible(false)}
        okText="Update"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomersPage;