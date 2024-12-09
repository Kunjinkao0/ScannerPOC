import React, { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const drawImageToCanvas = async (canvas: any, url: string) => {
  const ctx = canvas.getContext('2d');
  const response = await fetch(url);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);

  const scale = canvas.height / bitmap.height;
  const targetWidth = bitmap.width * scale;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const offsetX = (canvas.width - targetWidth) / 2;

  ctx.drawImage(bitmap, offsetX, 0, targetWidth, canvas.height);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CameraModal = ({ isOpen, onClose, onCapture }: any) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [capturedFrame, setCapturedFrame] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isOpen]);

  // 启动摄像头
  const startCamera = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream; // 将视频流直接绑定到 <video>
      }
    } catch (error) {
      console.error('摄像头启动失败:', error);
    }
  };


  // 拍照并返回图像
  const handleCapture = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        await drawImageToCanvas(canvas, '/passport.png');

        video.pause();
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedFrame(imageData);
        console.log(imageData);
        // onCapture(imageData);

        video.style.display = 'none';
        canvas.style.display = 'block';

      }
    }
  };

  // 停止摄像头
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null; // 清空视频流
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">拍照</h2>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-h-64"
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCapture}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            拍照
          </button>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-2"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CameraModal;
