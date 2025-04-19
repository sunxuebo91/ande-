
import React, { useState } from 'react';
import { Upload, Button, message, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const SimpleIDUploader = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('idCardFiles', file.originFileObj);
    });
    formData.append('name', '身份证上传');
    formData.append('orderStatus', 'accepting');

    try {
      setUploading(true);
      setProgress(0);

      const res = await axios.post('http://localhost:3001/api/workers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        onUploadProgress: progressEvent => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        }
      });

      message.success('上传成功');
      console.log('服务器响应:', res.data);
    } catch (error) {
      console.error('上传错误详情:', {
        request: error.request,
        response: error.response?.data,
        config: error.config
      });
      message.error(`上传失败: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <Upload
        fileList={fileList}
        beforeUpload={(file) => {
          const isImage = file.type.startsWith('image/');
          if (!isImage) {
            message.error('只能上传图片文件!');
            return false;
          }
          setFileList([file]);
          return false;
        }}
        maxCount={1}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />}>选择身份证照片</Button>
      </Upload>

      {fileList.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={uploading}
            loading={uploading}
          >
            {uploading ? '上传中...' : '开始上传'}
          </Button>
          {uploading && <Progress percent={progress} status="active" />}
        </div>
      )}
    </div>
  );
};

export default SimpleIDUploader;
