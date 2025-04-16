
import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { UploadOutlined, CloseOutlined, LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default function IDUploader(props) {
  const [files, setFiles] = useState({
    front: null,
    back: null
  });
  const [processing, setProcessing] = useState({
    front: false,
    back: false
  });
  const compressImage = async (file, side) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(resolve => {
      reader.onload = async e => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          let width = img.width;
          let height = img.height;

          // 限制最大宽度800px
          if (width > 800) {
            height = height * (800 / width);
            width = 800;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(blob => {
            if (blob.size > 200000) {
              canvas.toBlob(newBlob => resolve(newBlob), 'image/jpeg', 0.6);
            } else {
              resolve(blob);
            }
          }, 'image/jpeg', 0.8);
        };
      };
    });
  };
  const handleUpload = async (e, side) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('文件大小不能超过5MB');
      return;
    }
    setProcessing(prev => ({
      ...prev,
      [side]: true
    }));
    try {
      const compressedBlob = await compressImage(file, side);
      const previewUrl = URL.createObjectURL(compressedBlob);
      setFiles(prev => ({
        ...prev,
        [side]: {
          preview: previewUrl,
          size: compressedBlob.size
        }
      }));
      props.onUploadComplete && props.onUploadComplete(side, compressedBlob);
    } catch (error) {
      console.error('压缩失败:', error);
    }
    setProcessing(prev => ({
      ...prev,
      [side]: false
    }));
  };
  const UploadCard = ({
    side
  }) => <div style={{ 
    position: 'relative',
    height: '240px',
    width: '100%',
    border: '2px dashed #d9d9d9',
    borderRadius: '8px',
    transition: 'all 0.3s',
    ':hover': {
      borderColor: '#1890ff'
    }
  }}>
      <input type="file" id={`upload-${side}`} style={{ display: 'none' }} accept="image/*" onChange={e => handleUpload(e, side)} />
      
      <label htmlFor={`upload-${side}`} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: files[side] ? 'rgba(255,255,255,0.8)' : 'transparent'
      }}>
        {processing[side] ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <LoadingOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} spin />
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>正在压缩...</span>
          </div> : files[side] ? <>
            <img 
              src={files[side].preview} 
              alt={`身份证${side === 'front' ? '正面' : '反面'}`} 
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8 }} 
            />
            <div style={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', gap: 8 }}>
              <Button 
                type="text" 
                size="small" 
                style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                onClick={e => {
                  e.stopPropagation();
                  setFiles(prev => ({
                    ...prev,
                    [side]: null
                  }));
                }}
              >
                <CloseOutlined />
              </Button>
              <Button 
                type="text" 
                size="small" 
                style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                onClick={e => e.stopPropagation()}
              >
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
              </Button>
            </div>
            <span style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 12, background: 'rgba(255,255,255,0.9)', padding: '2px 8px', borderRadius: 4 }}>
              {(files[side].size / 1024).toFixed(1)}KB
            </span>
          </> : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(0,0,0,0.45)' }}>
            <UploadOutlined style={{ fontSize: 32, marginBottom: 16 }} />
            <p style={{ fontWeight: 500 }}>点击上传</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>身份证{side === 'front' ? '正面' : '反面'}</p>
          </div>}
      </label>
    </div>;
  return <div style={{ width: '100%', padding: '0' }}>
      <Card style={{ padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: '100%' }}>
        <div style={{ 
          display: 'flex', 
          gap: '16px',
          flexDirection: 'row',
          marginTop: '8px'
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>人像面</h3>
            <UploadCard side="front" />
          </div>
          
          <div style={{ flex: 1, marginLeft: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>国徽面</h3>
            <UploadCard side="back" />
          </div>
        </div>
        
        <div style={{ 
          marginTop: '20px', 
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          fontSize: '12px', 
          color: '#666'
        }}>
          <p style={{ marginBottom: '4px' }}>• 支持 JPG/PNG 格式，单张不超过5MB</p>
          <p style={{ marginBottom: '4px' }}>• 系统将自动压缩至200KB以下</p>
          <p>• 请确保证件四角完整，文字清晰</p>
        </div>
      </Card>
    </div>;
}
