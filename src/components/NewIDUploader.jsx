
import React, { useState } from 'react';
import { Upload, Button, App, Progress, Image } from 'antd';
import { UploadOutlined, EyeOutlined } from '@ant-design/icons';
import Compressor from 'compressorjs';

const NewIDUploader = () => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [previewImage, setPreviewImage] = useState('');

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      App.useApp().message.error('只能上传图片文件!');
      return false;
    }
    return true;
  };

  const handleChange = async ({ file }) => {
    if (file.status === 'removed') {
      setFileList([]);
      return;
    }

    if (file.status === 'done') {
      try {
        setLoading(true);
        
        // 1. 压缩图片
        const compressedFile = await new Promise((resolve, reject) => {
          new Compressor(file.originFileObj, {
            quality: 0.75,
            maxWidth: 1000,
            maxHeight: 1000,
            success: (result) => {
              console.log('压缩成功', {
                originalSize: file.size,
                compressedSize: result.size
              });
              resolve(result);
            },
            error: (err) => {
              console.error('压缩失败:', err);
              reject(err);
            }
          });
        });

        // 2. 准备上传数据
        const formData = new FormData();
        formData.append('idCardFiles', compressedFile, file.name);
        formData.append('name', '未命名工作者');
        formData.append('uploadTime', new Date().toISOString());
        // 添加后端需要的空数组字段
        formData.append('skills', '[]');
        formData.append('medicalReports', '[]');
        formData.append('photos', '[]'); 
        formData.append('certificates', '[]');
        formData.append('workExperiences', '[]');
        formData.append('orderStatus', 'accepting');

        // 3. 提交到服务器
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        console.log('请求参数:', {
          url: `${API_URL}/api/workers`,
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Accept': 'application/json'
          },
          body: formData
        });
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            setUploadPercent(percent);
          }
        };
        
        xhr.open('POST', `${API_URL}/api/workers`);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token') || ''}`);
        xhr.setRequestHeader('Accept', 'application/json');
        
        const response = await new Promise((resolve, reject) => {
          xhr.onload = () => resolve(xhr);
          xhr.onerror = () => reject(new Error('上传失败'));
          xhr.send(formData);
        });
        console.log('响应状态:', response.status, response.statusText);

        if (!response.ok) {
          let errorDetail = {};
          try {
            const errorText = await response.text();
            errorDetail = JSON.parse(errorText);
          } catch (e) {
            errorDetail = {
              status: response.status,
              statusText: response.statusText,
              url: response.url
            };
          }
          console.error('完整错误响应:', {
            ...errorDetail,
            headers: Object.fromEntries(response.headers.entries())
          });
          throw new Error(
            errorDetail.message || 
            errorDetail.error ||
            `${response.status} ${response.statusText}` ||
            '上传服务不可用'
          );
        }

        const result = await response.json();
        message.success('上传成功');
        console.log('服务器返回:', result);

        // 4. 更新状态
        setFileList([{
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: result.url
        }]);

      } catch (error) {
        console.error('上传流程出错:', error);
        const { message } = App.useApp();
        message.error(`上传失败: ${error.message}`);
        setFileList([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <Upload
        name="idCard"
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={1}
        accept="image/*"
        onPreview={(file) => setPreviewImage(file.url || URL.createObjectURL(file.originFileObj))}
      >
        {fileList.length >= 1 ? null : (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>上传身份证</div>
          </div>
        )}
      </Upload>

      {uploadPercent > 0 && uploadPercent < 100 && (
        <Progress percent={uploadPercent} status="active" />
      )}

      {previewImage && (
        <Image
          width={200}
          style={{ display: 'none' }}
          src={previewImage}
          preview={{
            visible: !!previewImage,
            onVisibleChange: (visible) => !visible && setPreviewImage(''),
            mask: <EyeOutlined />,
            maskClassName: "custom-preview-mask"
          }}
        />
      )}

      <div style={{ marginTop: 16, color: '#999', fontSize: 12 }}>
        支持JPG/PNG格式，大小不超过5MB
      </div>
    </div>
  );
};

export default NewIDUploader;
