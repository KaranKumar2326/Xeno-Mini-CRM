import React, { useState } from 'react';
import { Upload, Button, Table, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

interface ExcelCustomer {
  name: string;
  email: string;
  totalSpend?: number;
  visitCount?: number;
  Visits?: number; // Add Visits property to match the Excel data
  TotalSpend?: number; // Add TotalSpend property to match the Excel data
}

const ExcelImport = () => {
  const [excelData, setExcelData] = useState<ExcelCustomer[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [apiUrl] = useState('https://xeno-mini-crm-server.onrender.com/api/customers');

  const beforeUpload = (file: File) => {
    console.log('Upload started with file:', file);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        console.log('File read successfully. Parsing as Excel...');
        
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: ExcelCustomer[] = XLSX.utils.sheet_to_json(firstSheet);
        
        console.log('Parsed data from Excel:', jsonData);

        // Validate and transform data
        const validatedData = jsonData
          .map((item) => ({
            name: item.name || '', // Use 'Name' instead of 'name'
            email: item.email || '', // Use 'Email' instead of 'email'
            totalSpend: Number(item.TotalSpend || 0), // Use 'TotalSpend' instead of 'totalSpend'
            visitCount: Number(item.Visits || 0), // Use 'Visits' instead of 'visitCount'
          }))
          .filter((item) => item.name && item.email); // Filter out empty rows

        console.log('Validated and transformed data:', validatedData);
        
        setExcelData(validatedData);
        setPreviewVisible(true);
      } catch (error) {
        message.error('Failed to parse Excel file');
        console.error('Excel parse error:', error);
      }
    };
    reader.readAsArrayBuffer(file);
    return false; // Prevent default upload
  };

  const handleImport = async () => {
    console.log('Import process started');
    if (!excelData.length) {
      console.log('No data to import');
      message.warning('No data to import');
      return;
    }

    setUploading(true);
    let successCount = 0;
    let errorCount = 0;

    for (const customer of excelData) {
      try {
        console.log(`Sending POST request for customer: ${customer.name} (${customer.email})`);
        
        // Using individual API calls since bulk endpoint isn't available
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customer),
        });

        if (response.ok) {
          console.log(`Successfully imported customer: ${customer.name}`);
          successCount++;
        } else {
          errorCount++;
          console.error('Failed to create customer:', await response.text());
        }
      } catch (error) {
        errorCount++;
        console.error('API error during import:', error);
      }
    }

    setUploading(false);
    setPreviewVisible(false);
    setExcelData([]);

    message.info(
      `Import completed: ${successCount} succeeded, ${errorCount} failed`
    );
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Total Spend',
      dataIndex: 'totalSpend',
      key: 'totalSpend',
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Visits',
      dataIndex: 'visitCount',
      key: 'visitCount',
    },
  ];

  return (
    <div>
      <Upload
        beforeUpload={beforeUpload}
        accept=".xlsx, .xls"
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Import Excel</Button>
      </Upload>

      <Modal
        title="Preview Import Data"
        visible={previewVisible}
        onOk={handleImport}
        onCancel={() => setPreviewVisible(false)}
        okText={uploading ? 'Importing...' : 'Confirm Import'}
        okButtonProps={{ disabled: uploading }}
        cancelButtonProps={{ disabled: uploading }}
        width={800}
      >
        <div style={{ marginBottom: 16 }}>
          <p>Found {excelData.length} records to import</p>
          <p className="text-sm text-gray-500">
            Note: This will create {excelData.length} individual API calls since bulk import isn't available.
          </p>
        </div>
        <Table
          columns={columns}
          dataSource={excelData}
          rowKey={(record) => `${record.name}-${record.email}`}
          pagination={false}
          scroll={{ y: 300 }}
          size="small"
        />
      </Modal>
    </div>
  );
};

export default ExcelImport;
