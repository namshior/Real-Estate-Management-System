// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, message, Upload, DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import '../../style/addproperty.scss';
import moment from 'moment';

const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
};

const EditPropertyForm = () => {
  const [form] = Form.useForm();
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/properties/${propertyId}`);
        const property = response.data;

        const propertyImage = property.propertyImage ? [{
          uid: '-1', // Unique identifier
          name: 'image.jpg', // A unique name
          status: 'done', // Status of the image
          url: `data:image/jpeg;base64,${property.propertyImage}` // Convert byte array to base64 URL
        }] : [];

        setInitialValues({
          propertyName: property.propertyName,
          propertyType: property.propertyType,
          address: property.address,
          size: property.size,
          price: property.price,
          occupancyStatus: property.occupancyStatus,
          closingDate: moment(property.closingDate), // Convert to moment object
          depositPayment: property.depositPayment,
          description: property.description,
          propertyImage: propertyImage
        });
        
        form.setFieldsValue({
          propertyName: property.propertyName,
          propertyType: property.propertyType,
          address: property.address,
          size: property.size,
          price: property.price,
          occupancyStatus: property.occupancyStatus,
          closingDate: moment(property.closingDate),
          depositPayment: property.depositPayment,
          description: property.description,
        });
      } catch (error) {
        console.error('Error fetching property:', error);
        message.error('Failed to fetch property details.');
      }
    };

    fetchProperty();
  }, [form, propertyId]);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('property', JSON.stringify({
      propertyName: values.propertyName,
      propertyType: values.propertyType,
      address: values.address,
      size: values.size,
      price: values.price,
      occupancyStatus: values.occupancyStatus,
      closingDate: values.closingDate.format('YYYY-MM-DD'),
      depositPayment: values.depositPayment,
      description: values.description,
    }));

    if (values.propertyImage && values.propertyImage.length > 0) {
      const file = values.propertyImage[0].originFileObj;
      formData.append('propertyImage', file);
    } else if (initialValues.propertyImage.length > 0) {
      const existingImage = initialValues.propertyImage[0].url.replace('data:image/jpeg;base64,', '');
      formData.append('propertyImage', existingImage);
    }

    try {
      await axios.put(`http://localhost:8080/api/properties/edit/${propertyId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Property updated successfully!');
      navigate('/agent-dashboard');
    } catch (error) {
      console.error('Error updating property:', error);
      message.error('Failed to update property.');
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="add-property-form">
      <Form
        {...layout}
        form={form}
        name="edit-property-form"
        onFinish={onFinish}
        validateMessages={validateMessages}
        className='form-wid'
        initialValues={initialValues}
      >
        <h2 className='title'>Edit Property</h2>

        <Form.Item
          name="propertyName"
          label="Property Name"
          rules={[{ required: true, message: 'Please select the property name!' }]}
        >
          <Select placeholder="Select a property name">
            <Select.Option value="apartment">Apartment</Select.Option>
            <Select.Option value="house">House</Select.Option>
            <Select.Option value="villa">Villa</Select.Option>
            <Select.Option value="commercial">Commercial Space</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="propertyType"
          label="Property Type"
          rules={[{ required: true, message: 'Please select the property type!' }]}
        >
          <Select placeholder="Select a property type">
            <Select.Option value="sale">Sale</Select.Option>
            <Select.Option value="rent">Rent</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <TextArea rows={4} placeholder="Enter address" />
        </Form.Item>

        <Form.Item
          name="size"
          label="Size (in sq.ft)"
          rules={[{ required: true, message: 'Please input the size!' }]}
        >
          <InputNumber min={0} placeholder="Enter size" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber min={0} placeholder="Enter price" />
        </Form.Item>

        <Form.Item
          name="occupancyStatus"
          label="Occupancy Status"
          rules={[{ required: true, message: 'Please select the occupancy status!' }]}
        >
          <Select placeholder="Select occupancy status">
            <Select.Option value="occupied">Occupied</Select.Option>
            <Select.Option value="vacant">Vacant</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="closingDate"
          label="Closing Date"
          rules={[{ required: true, message: 'Please select the closing date!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="depositPayment"
          label="Deposit Payment"
          rules={[{ required: true, message: 'Please input deposit payment!' }]}
        >
          <InputNumber min={0} placeholder="Enter deposit payment" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <TextArea rows={15} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          name="propertyImage"
          label="Property Image"
          rules={[{ required: true, message: 'Please upload atleast one image!' }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            return Array.isArray(e) ? e : e?.fileList;
          }}
        >
          <Upload name="propertyImage" listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit" className='blue-button'>
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset} className='blue-button'>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPropertyForm;
