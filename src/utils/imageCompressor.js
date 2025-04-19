
import Compressor from 'compressorjs';

const compressionPresets = {
  standard: [
    { quality: 0.75, maxWidth: 1000, maxHeight: 1000 },
    { quality: 0.8, maxWidth: 1200, maxHeight: 1200 },
    { quality: 0.85, maxWidth: 1500, maxHeight: 1500 },
    { quality: 0.9, maxWidth: 2000, maxHeight: 2000 }
  ]
};

export async function compressImage(file) {
  try {
    const testResults = await Promise.all(
      compressionPresets.standard.map(params => 
        new Promise((resolve) => {
          new Compressor(file, {
            ...params,
            success(result) {
              resolve({
                params,
                size: result.size,
                file: result
              });
            },
            error(err) {
              resolve({
                params,
                size: file.size,
                file: file
              });
            }
          });
        })
      )
    );

    const bestResult = testResults[0];
    return new File([bestResult.file], file.name, {
      type: bestResult.file.type,
    });
  } catch (error) {
    console.error('压缩失败:', error);
    return file;
  }
}
