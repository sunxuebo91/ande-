
import React from 'react';
import { Card } from 'antd';
import ResumeForm from '../../components/ResumeForm';

export default function ResumeCreate() {
  return (
    <Card title="创建简历" style={{ maxWidth: 800, margin: '0 auto' }}>
      <ResumeForm />
    </Card>
  );
}
