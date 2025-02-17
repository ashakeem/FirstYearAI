const Avatar = ({ src, name, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=c7d2fe&color=4f46e5`;

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-indigo-100`}>
      <img
        src={src || fallbackUrl}
        alt={name}
        className="h-full w-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackUrl;
        }}
      />
    </div>
  );
};

export default Avatar; 