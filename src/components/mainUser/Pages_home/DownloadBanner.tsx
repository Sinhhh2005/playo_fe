const DownloadFloating = () => {
  return (
    <div className="fixed bottom-6 right-6 bg-gray-100 text-gray-900 rounded-lg shadow-md z-50 p-2 flex items-center gap-2">
      {/* QR Code */}
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://playo.co"
        alt="QR Code"
        className="w-14 h-14 rounded"
      />

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-medium">DOWNLOAD</span>
        <span className="text-sm font-semibold">THE APP</span>
      </div>
    </div>
  );
};

export default DownloadFloating;
